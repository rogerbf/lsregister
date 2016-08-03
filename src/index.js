const dump = require('./lib/dump.js')

const divider = Array(80).fill('-').join('')

dump()
  .then(d => {
    const docs = d.split(divider).slice(1)
    console.log(docs.length)
    console.log(docs.map(doc => doc.trim().split('\n').map(l => l.split('\t').join(' ').trim()).filter(l => l.split(':')[0] === 'bundle id')).length)
  })
  .catch(e => console.error(e))
