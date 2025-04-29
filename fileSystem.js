import fs from 'fs';

fs.writeFile('text.txt', 'This is a first item', 'utf-8', () => {
  console.log('file created');
});

fs.appendFile(
  './text.txt',
  '\nThis is a second item',
  'utf-8'
);

const content = fs.readFileSync('./text.txt', 'utf-8');
console.log(content);
