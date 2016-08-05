const dump = require('./lib/dump.js')

const divider = Array(80).fill('-').join('')
const wierd = Array(55).fill('-').join('')

dump()
  .then(data => {
    const docs = data.split(divider).slice(1)
    // console.log(docs.length)
      const results = docs
        .map(doc => {
          return doc
            .split('\n\t')
            .map(l => l.trim())
            .reduce((acc, curr, i) => {
              if (i === 0 && curr.indexOf('\nbundle\tid:')) {
                return acc
                  .concat(curr.slice(0, curr.indexOf('\n')))
                  .concat(curr.slice(curr.indexOf('\n') + 1).replace('\t', ' '))
              }
              if (curr.indexOf('displayVersion') === 0) {
                return acc.concat(Array.of(curr.replace('displayVersion', 'displayVersion:')))
              }
              if (curr.indexOf(wierd) === 0) {
                return acc
              }
              if (curr[0] !== '<') {
                return acc.concat(Array.of(curr))
              } else {
                const narr = [].concat(acc)
                narr[narr.length - 1] += curr
                return narr
              }
            }, [])
        })
        // Simple and not very effective test to see if every line in every doc contains a semicolon, indicating parsable data.
        // .reduce((semicolons, doc) => {
        //   const withsemicolon = doc.reduce((acc, curr) => {
        //     if (curr.indexOf(':')) {
        //       return acc + 1
        //     } else {
        //       return acc
        //     }
        //   }, 0)
        //   if (doc.length === withsemicolon) {
        //     return semicolons + 1
        //   } else {
        //     return semicolons
        //   }
        // }, 0)

        // Experimenting...
        // .reduce((jsdocs, doc) => {
        //   return jsdocs.concat([
        //     docs.reduce((obj, line) => {
        //       const key = line.slice(0, line.indexOf(':')).trim()
        //       const value = line.slice(line.indexOf(':') + 1).trim()
        //       const o = {}
        //       o[key] = value
        //       return Object.assign({}, obj, o)
        //     }, {})
        //   ])
        // }, [])
        // console.log(JSON.stringify(results, null, 2))

        // experimenting...
        // const ra = results.slice(100, 200)
        // const ro = ra.reduce((acc, doc) => {
        //   return acc.concat([
        //     doc.reduce((o, l) => {
        //       const k = l
        //         .slice(0, l.indexOf(':'))
        //         .replace(/\s./g, match => match[1].toUpperCase())
        //         .replace(/-/g, match => '_')
        //       const v = l.slice(l.indexOf(':') + 1).trim()
        //       const no = {}
        //       no[k] = v
        //       return Object.assign(o, no)
        //     }, {})
        //   ])
        // }, [])
        // process.stdout.write(JSON.stringify(ro, null, 2))

        .reduce((acc, doc) => {
          return acc.concat([
            doc.reduce((o, l) => {
              const k = l
                .slice(0, l.indexOf(':'))
                .replace(/\s./g, match => match[1].toUpperCase())
                .replace(/-/g, match => '_')
              const v = l.slice(l.indexOf(':') + 1).trim()
              const no = {}
              no[k] = v
              return Object.assign(o, no)
            }, {})
          ])
        }, [])

        process.stdout.write(JSON.stringify(results, null, 2))
  })
  .catch(e => console.error(e))
