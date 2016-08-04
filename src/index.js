const dump = require('./lib/dump.js')

const divider = Array(80).fill('-').join('')

dump()
  .then(d => {
    const docs = d.split(divider).slice(1)
    console.log(docs.length)
    // console.log(docs[0])
    // console.log(
    //   docs
    //     .map(doc => {
    //       return (
    //       doc
    //         .trim()
    //         .split('\n')
    //         .map(line => {
    //           return (
    //           line
    //             .split('\t')
    //             .join(' ')
    //             .trim()
    //           )
    //         })
    //         // .reduce((acc, line) => {
    //         //   const key = line.slice(0, line.indexOf(':'))
    //         //   const value = line.slice(line.indexOf(':') + 1).trim()
    //         //   const pair = {}
    //         //   pair[key] = value
    //         //   return Object.assign({}, acc, pair)
    //         // }, {})
    //       )
    //     })[0]
    // )
    console.log(
      docs
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
              if (curr[0] !== '<') {
                return acc.concat(Array.of(curr))
              } else {
                const narr = [].concat(acc)
                narr[narr.length - 1] += curr
                return narr
              }
            }, [])
        })[0]
    )
  })
  .catch(e => console.error(e))
