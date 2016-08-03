const exec = require('child_process').execFile
const binary = require('./defaultPath.js')

const dump = () => {
  return new Promise((resolve, reject) => {
    exec(binary, ['-dump'], { maxBuffer: 102400*102400 }, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      }
      if (stderr) reject(stderr)
      resolve(stdout.trim())
    })
  })
}

module.exports = dump
