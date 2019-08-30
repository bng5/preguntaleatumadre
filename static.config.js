// import path from 'path';
// import { makePageRoutes } from 'react-static/node';
import fs from 'fs';
import yaml from 'yaml';
import React from 'react';

import createRss from './src/createRss';

// s3: "http://preguntaleatumadre.com.s3-website-us-west-2.amazonaws.com/"
const meses = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'setiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

export default {
  // siteRoot: 'https://www.preguntaleatumadre.com',
  stagingBasePath: 'dev.preguntaleatumadre.com',
  getSiteData: async ({ dev }) => ({
    title: 'Preguntale a tu Madre',
    tagline: 'Donde no existen preguntas estúpidas…',
  }),
  Document: ({
    Html,
    Head,
    Body,
    children,
    // state: { siteData, renderMeta, routeInfo },
  }) => (
    <Html lang="es-UY">
      <Head>
        <meta charSet="UTF-8" />
        <title>Preguntale a tu Madre</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#aaddd6" />
        <link rel="alternate" type="application/rss+xml" title="Preguntale a tu Madre - Podcast" href="/podcast.xml" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@preguntaleatum" />
        <meta name="twitter:creator" content="@bng5" />
        <meta name="twitter:description" content="Donde no existen preguntas estúpidas…" />
        <meta name="twitter:image" content="https://www.preguntaleatumadre.com/assets/images/patum.png" />
        <meta property="og:url" content="https://www.preguntaleatumadre.com" />
        <meta property="og:site_name" content="Preguntale a tu Madre" />
        <meta property="og:description" content="Donde no existen preguntas estúpidas…" />
        <meta property="og:locale" content="es_UY" />
        {/*
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-119802091-1"></script>
        <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() {dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-119802091-1');
        `}
        </script>
        */}
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
  getRoutes: async () => {
    const filenames = fs.readdirSync('./posts');
    const posts = filenames.map(filename => {
      const content = fs.readFileSync('./posts/' + filename, 'utf-8');
      const data = yaml.parse(content);
      const d = new Date(data.date);
      const match = filename.match(/^(\d+)-(\d+)-(\d+)-(.*)\.yml$/);
      const [ _, year, month, day, slug ] = match;
      return {
        id: filename.replace(/\.yml$/, '').replace(/-/g, '/'),
        path: `/${year}/${month}/${day}/${slug}`,
        slug,
        ...data,
        fecha: `${d.getDate()} de ${meses[d.getMonth()]}, ${d.getFullYear()}`,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

    fs.writeFileSync('./public/podcast.xml', createRss(posts));

    const seasons = posts.reduce((acc, post) => {
      if (!acc.includes(post.season)) {
        acc.push(post.season);
      }
      return acc;
    }, []);

    return [
      {
        path: '/',
        template: 'src/containers/List',
        getData: () => ({
          posts: posts.filter(post => post.season == seasons[0]),
          seasons,
          selectedSeason: seasons[0],
        }),
      },
      ...seasons.map(season => ({
        path: `/temporada${season}`,
        template: 'src/containers/List',
        getData: () => ({
          posts: posts.filter(post => post.season == season),
          seasons,
          selectedSeason: season,
        }),
      })),
      // ...makePageRoutes({
      //   items: posts,
      //   pageSize: 20,
      //   pageToken: 'page', // use page for the prefix, eg. blog/page/3
      //   route: {
      //     // Use this route as the base route
      //     path: '/',
      //     template: 'src/pages/index',
      //   },
      //   decorate: (posts, i, totalPages) => ({
      //     // For each page, supply the posts, page and totalPages
      //     getData: () => ({
      //       posts,
      //       currentPage: i,
      //       totalPages,
      //     }),
      //   }),
      // }),
      {
        path: 'programas',
        template: 'src/containers/List',
        getData: () => ({
          posts: posts,
          seasons,
          selectedSeason: seasons[0],
        }),
        children: posts.map((post, i) => ({
          path: post.path,
          template: 'src/containers/Post',
          getData: () => ({
            post,
            previous: (posts[i - 1] ? posts[i - 1] : null),
            next: (posts[i + 1] ? posts[i + 1] : null),
          }),
        })),
      },
      // ...posts.map(post => ({
      //   path: `programas${post.path}`,
      //   template: 'src/containers/Post',
      //   getData: () => ({
      //     post,
      //   }),
      // })),
      {
        path: '404',
        template: 'src/containers/NotFound',
      },
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
    'fix-css-route',
    // [
    //   require.resolve('react-static-plugin-source-filesystem'),
    //   {
    //     location: path.resolve('./src/pages'),
    //   },
    // ],
    // require.resolve('react-static-plugin-reach-router'),
    'react-static-plugin-react-router',
    //require.resolve('react-static-plugin-sitemap'),
    // "react-static-plugin-styled-components",
    [
      'react-static-plugin-sass',
      {
        includePaths: [ 'src/sass/' ]
      }
    ],
  ],
}
