const PlistParser = require('macos-defaults/PlistParser')

const documentDivider = Array(80).fill('-').join('')

const separateDocuments = data => data.split(documentDivider).slice(1)

const separateLines = str => str.split('\n\t')

const normalizeData = data => {
  return (
    data
    .replace(/----------*/g, documentDivider)
    .replace(/displayVersion/g, 'displayVersion:')
    .replace(/\nbundle\tid/g, '\n\tbundle id')
    .replace(/\nContainer/g, 'Container')
    .replace(/\n\t*</g, '<')
  )
}

const normalizeKey = str => {
  return (
    str.slice(0, 1).toLowerCase() +
    str.slice(1)
      .replace(/\s./g, match => match[1].toUpperCase())
      .replace(/-/g, match => '_')
  )
}

const parse = data => {
  const normalizedData = normalizeData(data)
  return (
    separateDocuments(normalizedData)
      .reduce((acc, doc) => {
        return acc.concat([
          separateLines(doc)
            .reduce((obj, line) => {
              const k = normalizeKey(line.slice(0, line.indexOf(':')).trim())
              const v = line.slice(line.indexOf(':') + 1).trim()
              const o = {}
              o[k] = k === 'plistCommon' ? new PlistParser({plist: v}).start() : v;
              if (k.length > 0) {
                return Object.assign(obj, o)
              } else {
                return obj
              }
            }, {})
        ])
      }, [])
  )
}

module.exports = parse
