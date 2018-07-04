const fs = require('fs');

const COPIES = 5;

fs.readFile('./source.txt', 'utf-8', function(err, data) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  for (let i = 1; i <= COPIES; i++) {
    console.log(`Writing copy${i}.txt...`);
    fs.writeFile(`./copy${i}.txt`, data, err => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      console.log(`Finished copy${i}.txt...`);
    });
  }
});
