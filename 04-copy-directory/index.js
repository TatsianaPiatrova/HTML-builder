const path = require('path');
const fs = require('fs');

const oldDirPath = path.join(__dirname, 'files');
const newDirPath = path.join(__dirname, 'files-copy');

async function copyDir(oldDirPath, newDirPath){
  await fs.promises.rm(newDirPath, {recursive: true, force: true}, err => {if(err) throw err;});

  await fs.promises.mkdir(newDirPath, 
    {recursive: true}, 
    (err) =>{ if(err) throw err;}
  );

  const files = await fs.promises.readdir(oldDirPath);

  files.forEach(file => {
    fs.copyFile(path.join(oldDirPath, file), path.join(newDirPath, file), err =>{if(err) throw err;});
  });
}

copyDir(oldDirPath, newDirPath);