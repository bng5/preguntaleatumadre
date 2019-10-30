const fs = require('fs');
const path = require('path');

export default (options = {}) => ({
  afterExport: state => {
    console.log('Fixing css path in podcast.xsl.');
    const cssFormat = /^main\.[0-f]+\.css$/;
    const cssFilename = state.clientStats.assetsByChunkName.main.find(filename => cssFormat.test(filename));
    // const cssFilename = state.clientStats.assetsByChunkName.styles[0];
    const xslFile = path.join(state.config.paths.DIST, 'podcast.xsl');
    const xsl = fs.readFileSync(xslFile, 'utf8');
    const data = xsl.replace(/ href="\/main(\.[0-f]+)?\.css"/, ` href="/${cssFilename}"`);
    fs.writeFileSync(xslFile, data, 'utf8');
    return state;
  },
});
