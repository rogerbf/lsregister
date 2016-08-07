const divider80 = Array(80).fill('-').join('')

const separateDocs = data => data.split(divider80).slice(1)

const separateLines = str => str.split('\n\t')

const parse = db => {
  const normalized = db
    .replace(/----------*/g, divider80)
    .replace(/displayVersion/g, 'displayVersion:')
    .replace(/\nbundle\tid/g, '\n\tbundle id')
    .replace(/\nContainer/g, 'Container')
    .replace(/\n\t*</g, '<')
  return (
    separateDocs(normalized)
      .reduce((acc, doc) => {
        return acc.concat([
          separateLines(doc)
            .reduce((obj, line) => {
              const k = line.slice(0, line.indexOf(':')).trim()
              const v = line.slice(line.indexOf(':') + 1).trim()
              const o = {}
              o[k] = v
              if (k.length > 0) {
                return Object.assign(obj, o)
              } else {
                return obj
              }
            }, {})
        ])
      }, [])[50]
  )
}

module.exports = parse
