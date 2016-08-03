const dump = require('./lib/dump.js')

const divider = Array(80).fill('-').join('')

dump()
  .then(d => {
    const arr = d.split('\n')
    const firstOccurrence =
    console.log(
      arr.slice(arr.indexOf(divider) + 1, arr.slice(arr.indexOf(divider) + 1).indexOf(divider))
    )
  })
  .catch(e => console.error(e))
