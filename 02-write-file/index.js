const path = require('path');
const fs = require('fs');
const process = require('process');
const {stdin,stdout, exit} = process;

const filePath = path.join(__dirname, 'text.txt');
const rs = fs.WriteStream(filePath);

stdout.write('Hi! Write your text here.\n');

stdin.on('data', data =>{
  if(data.toString().trim() === 'exit') exit();
  rs.write(data.toString());
});

process.on('SIGINT', exit);
process.on('exit', ()=> stdout.write('Bye!'));

