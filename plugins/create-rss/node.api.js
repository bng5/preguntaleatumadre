import fs from 'fs';
import path from 'path';

import createRss from './createRss';

export default (options = {}) => ({
  afterExport: state => {
    const {
      config: {
        paths: { DIST },
      },
      routes,
    } = state;
    console.log('Creating podcast.xml...');
    const pathPrefix = /^programas\//;
    const posts = routes.filter(({ path }) => pathPrefix.test(path))
    .map(({ data }) => data.post);

    fs.writeFileSync(path.join(DIST, 'podcast.xml'), createRss(posts));
    return state;
  },
});
