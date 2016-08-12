#!/usr/bin/env node

const lsregister = require('../index.js')

lsregister.dump()
  .then(data => {
      process.stdout.write(JSON.stringify(data, null, 2))
  })
  .catch(e => console.error(e))
