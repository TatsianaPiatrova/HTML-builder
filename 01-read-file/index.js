const path = require('path');
const fs = require('fs');

const rs = fs.ReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

rs.on('data', (chunk)=>console.log(chunk));