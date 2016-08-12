# lsregister

Interact with Launch Services database.

``` shell
npm install lsregister
```

Install globally to use ```lsregister-json```.

## Usage

``` javascript

const lsregister = require('lsregister')

lsregister.dump()
  .then(data => console.log(data[2380]))
  .catch(err => console.error(err))

// { claimId: '41148',
//   name: 'Tar Archive',
//   rank: 'Default',
//   reqCaps: '',
//   roles: 'Viewer',
//   flags: 'relative-icon-path  doc-type',
//   icon: 'Contents/Resources/archive.icns',
//   bindings: 'public.tar-archive' }

```
