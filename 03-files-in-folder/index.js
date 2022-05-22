const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, {withFileTypes: true}, (err, items) => {
  if(err) throw err;
  items.forEach(file => {
    if(file.isFile()){
      const filePath = path.join(__dirname, 'secret-folder', `${file.name}`);
      const fileNameFull = file.name;                                            
      const fileName = fileNameFull.substring(0, fileNameFull.indexOf('.')); 
      const fileExt = path.extname(filePath).slice(1);  
      fs.stat(filePath, (err, filestats) => {
        if(err) throw err; 
        const fileSize = filestats.size / 1000;
        console.log(`${fileName} - ${fileExt} - ${fileSize}kb\n`);
      });
    }
  });    
});