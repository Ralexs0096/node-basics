import fs from 'fs';

fs.writeFile('text.pdf', 'This is a second test', 'utf-8', () => {
  console.log('file created');
});

fs.appendFileSync(
  './text.txt',
  '\nCarlos is asking if this value is going to overwrite the previous one',
  'utf-8'
);

const content = fs.readFileSync('./text.txt', 'utf-8');
console.log(content);
