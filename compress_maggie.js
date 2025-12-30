const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'images/Maggie';
const outputDir = 'images/compressed/Maggie';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read all files in inputDir
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    if (path.extname(file).toLowerCase() === '.jpg') {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);

      sharp(inputPath)
        .resize(800, null, { withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(outputPath)
        .then(() => {
          console.log(`Compressed ${file}`);
        })
        .catch(err => {
          console.error(`Error compressing ${file}:`, err);
        });
    }
  });
});
