const dump = require('./lib/dump.js')
const parse = require('./lib/parser.js')

dump()
  .then(data => {
      process.stdout.write(JSON.stringify(parse(data), null, 2))
  })
  .catch(e => console.error(e))
