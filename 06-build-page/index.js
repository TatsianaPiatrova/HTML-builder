const path = require('path');
const fs = require('fs');

const outputDirPath = path.join(__dirname, 'project-dist');

const project = 'project-dist';
const projectPath = path.join(__dirname, project);

const stylePath = path.join(__dirname, 'styles');
const styleFile = 'style.css';
const newStylePath = path.join(projectPath, styleFile);

// const index = 'index.html';
// const template = path.join(__dirname, 'template.html');


async function createDir(){
  await fs.promises.rm(projectPath, {recursive: true, force: true});
  await fs.promises.mkdir(projectPath, {recursive: true});
}


async function createStyle(){
  const files = await fs.promises.readdir(stylePath, {withFileTypes: true},(err) => {if (err) throw err;}); 
  files.forEach(file => {      
    if (file.isFile()){
      const filePath = path.join(stylePath, file.name);
      if(path.extname(filePath) === '.css'){
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          fs.appendFile(newStylePath, data, err => {if (err) throw err;});
        });
      }
    }
  });
}

async function copyDir(oldDirPath, newDirPath){

  await fs.promises.rm(newDirPath, {recursive: true, force: true}, err => {if(err) throw err;});  
  await fs.promises.mkdir(newDirPath, {recursive: true}, (err) =>{ if(err) throw err;});
  
  const files = await fs.promises.readdir(oldDirPath, {withFileTypes: true}, (err) =>{ if(err) throw err;});
  
  files.forEach(file => {
    if(!file.isDirectory()){
      fs.promises.copyFile(path.join(oldDirPath, file.name), path.join(newDirPath, file.name));
    }
    else copyDir(path.resolve(oldDirPath, file.name), path.resolve(newDirPath, file.name));
  });
}

async function copyAssets(){
  await copyDir(path.join(__dirname, 'assets'), path.join(outputDirPath, 'assets'));
}

// function addContentToFile(path, data) { 
//   fs.appendFile(path, data, (err) => {if (err) throw err;});
// }

// //in this self-calling function created html (string) from template and tags
// (async function () {
//   //content from Template into strTemplate (string)    
//   const templateFile = async () => {
//     const templateContent = await fsPromise.readFile(pathTemplate, 'utf-8', (err) => { if (err) throw err });
//     return await templateContent.toString();
//   };
//   let strTemplate = await templateFile(); //content from template.html
//   //tag from strTemplate into array - tags
//   const tags = strTemplate.match(/{{[a-z]+}}/gi);  //example: ['{{header}}',...]
//   //circle on array - function for replace template tags contents from files 
//   async function processArray(array) {
//     for (const tag of array) {
//       let tag1 = tag.substring(2, tag.length - 2); //example: 'header'
//       let fileName = tag1 + '.html';
//       let pathTag = path.join(__dirname, 'components', `${fileName}`);
//       const tagFile = async () => {  //function - read content(tagContent) from file(pathTag)
//         const tagContent = await fsPromise.readFile(pathTag, 'utf-8', (err) => { if (err) throw err; });
//         return await tagContent.toString();
//       };
//       let strTag = await tagFile();
//       strTemplate = strTemplate.replace(tag, strTag);
//     }
//     return await strTemplate;
//   }
//   const newHtml = await processArray(tags); //string newHtml - call function 
//   addContentToFile(pathFileToHtml, newHtml);    //call function for write content(newHtml) into file 
// })();

async function create(){
  await createDir();  
  copyAssets();
  createStyle();
}

create();