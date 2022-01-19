import * as fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';

import execa from 'execa';
import jsonHi from 'json-hi';

const { Select, Input } = require('enquirer');
const cwd = process.cwd();

const project: {
  name: string;
  template: string;
} = {
  name: '',
  template: '',
};

export function init(dir?: string) {
  if (dir) {
    project.name = dir;
  }

  const { name } = project;
  const realProjectPath = path.join(cwd, name);
  fs.existsSync(realProjectPath)
    ? handleDirExist()
    : createProject(realProjectPath);
}

async function createProject(realProjectPath) {
  if (!project.template) {
    const prompt = new Select({
      message: 'pick a template',
      choices: fs.readdirSync(path.join(__dirname, '../../templates')),
    });

    project.template = await prompt.run();
  }

  const srcDir = path.resolve(__dirname, '../../templates', project.template);
  const destDir = path.resolve(cwd, realProjectPath);

  let spinner = ora({
    color: 'yellow',
    text: 'creating project',
  }).start();
  fs.copy(srcDir, destDir).then(
    async () => {
      spinner.succeed();
      process.chdir(destDir);
      changePkgName(path.resolve(destDir, 'package.json'), project.name);
      await execa('git', ['init']);
    },
    () => spinner.fail('failed')
  );
}

async function handleDirExist() {
  console.log(chalk.red('project exist!'));
  const anotherDirName = await new Input({
    message: 'input another name',
  }).run();

  project.name = anotherDirName;

  init();
}

/**
 * 动态改package名
 * @param pkg package.json 路径
 * @param name 改名
 */
function changePkgName(pkg: string, name: string): void {
  const editor = new jsonHi(pkg);
  editor.set('name', name);
  editor.save();
}
