const fs = require('fs');

const copyFiles = () => {
  try {
    fs.copyFileSync('./src/ui.html', './dist/ui.html');
  } catch (err) {
    console.error(err);
  }
};

copyFiles();
