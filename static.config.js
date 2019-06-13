import path from 'path'
import { makePageRoutes } from 'react-static/node';
import fs from 'fs';
import yaml from 'yaml';
import builder from 'xmlbuilder';

export default {
  getRoutes: async () => {
    const filenames = fs.readdirSync('./posts');
    const posts = filenames.map(filename => {
      const content = fs.readFileSync('./posts/' + filename, 'utf-8');
      return {
        id: filename.replace(/\.yml$/, '').replace(/-/g, '/'),
        ...yaml.parse(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
console.log(posts)

var root = builder.create('squares');
for (var i = 1; i <= 5; i++) {
  var item = root.ele('data');
  item.att('x', i);
  item.att('y', i * i);
}
var xml = root.end({ pretty: true});
console.log(typeof xml)
fs.writeFileSync('./public/podcast.xml', xml)

console.log([
  ...makePageRoutes({
    items: posts,
    pageSize: 20,
    pageToken: 'page', // use page for the prefix, eg. blog/page/3
    route: {
      // Use this route as the base route
      path: '',
      template: 'src/pages/index',
    },
    decorate: (posts, i, totalPages) => ({
      // For each page, supply the posts, page and totalPages
      getData: () => ({
        posts,
        currentPage: i,
        totalPages,
      }),
    }),
  }),
  // Make the routes for each blog post
  ...posts.map(post => ({
    path: `/${post.id}`,
    template: 'src/containers/Post',
    getData: () => ({
      post,
      // user: post.userId,
    }),
  })),
  /*
  {
    path: '/blog',
    getData: () => ({
      posts,
    }),
    children: posts.map(post => ({
      path: `/post/${post.id}`,
      template: 'src/containers/Post',
      getData: () => ({
        post,
      }),
    })),
  },
  */
])
    return [
      ...makePageRoutes({
        items: posts,
        pageSize: 20,
        pageToken: 'page', // use page for the prefix, eg. blog/page/3
        route: {
          // Use this route as the base route
          path: '/',
          template: 'src/pages/index',
        },
        decorate: (posts, i, totalPages) => ({
          // For each page, supply the posts, page and totalPages
          getData: () => ({
            posts,
            currentPage: i,
            totalPages,
          }),
        }),
      }),
      // Make the routes for each blog post
      ...posts.map(post => ({
        path: `/${post.id}`,
        template: 'src/containers/Post',
        getData: () => ({
          post,
          // user: post.userId,
        }),
      })),
      /*
      {
        path: '/blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          template: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
      */
    ]
  },
  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
}
