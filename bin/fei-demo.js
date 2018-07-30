#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const download = require('download-git-repo')
const ora = require('ora')

const nope = () => {}


const mkdir = function (dir) {
    const spinner = ora('create template dir')
    spinner.start()

    fs.mkdir(dir, (err) => {
        spinner.stop()
        err ? console.log(err) : ''
    })
}


const rmFiles = function (dir, files) {
    files.forEach(file => fs.unlink(path.resolve(dir, file), nope))
}

const rename = function(srcname, distname) {
    fs.rename(srcname, distname, nope)
}

module.exports = (...args) => {
    const demoName = args[0]
    const distPath = path.resolve(args[1], args[0])

    mkdir(distPath)
    const spinner = ora('download template')
    spinner.start()
    download('feikerwu/demo-template', distPath, (err) => {
        spinner.stop()
        rmFiles(distPath, ['.gitignore', 'README.md'])
        // rename(path.resolve(distPath, 'template.vue'), path.resolve(distPath, `${demoName}.vue`))
        console.log(err ? err : 'create template successfully')
    })


}