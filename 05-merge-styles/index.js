const path = require('path');
const fs = require('fs');

const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const stylePath = path.join(__dirname, 'styles');

fs.writeFile(bundlePath, '', err => {if (err) throw err;});

fs.readdir(stylePath, {withFileTypes: true},(err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.isFile()){
      const filePath = path.join(stylePath, `${file.name}`);
      if(path.extname(filePath) === '.css'){
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) throw err;
          fs.appendFile(bundlePath, data, err => {if (err) throw err;});
        });
      }
    }
  });
});
