const fs = require('fs');

const filenames = fs.readdirSync('./dist');

const cssFormat = /^main\.[0-f]+\.css$/;
const cssFilename = filenames.find(filename => cssFormat.test(filename));
const xslFile = './dist/podcast.xsl';
const xsl = fs.readFileSync(xslFile, 'utf8');
const data = xsl.replace(/ href="\/main(\.[0-f]+)?\.css"/, ` href="/${cssFilename}"`);

fs.writeFileSync(xslFile, data, 'utf8');
