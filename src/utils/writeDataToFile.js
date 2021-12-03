const fs = require('fs')

function writeDataToFile(path, content) {
  // eslint-disable-next-line no-path-concat
  fs.writeFileSync(path, JSON.stringify(content), 'utf8')
}


module.exports = {
  writeDataToFile
}