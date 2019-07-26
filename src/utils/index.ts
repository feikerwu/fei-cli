import execa from 'execa';

export type pkgTools = 'yarn' | 'npm';

export const curPkgTool: pkgTools = getPkgTool();

function getPkgTool(): pkgTools {
  try {
    execa.sync('yarn', ['--version']);
    return 'yarn';
  } catch {
    return 'npm';
  }
}

export const installCmd: string = curPkgTool === 'yarn' ? 'yarn' : 'npm i';
