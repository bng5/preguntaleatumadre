import builder from 'xmlbuilder';

function pubDate (dateStr) {
  const date = dateStr
    ? new Date(dateStr)
    : new Date();
  const pieces = date.toString().split(' '),
      offsetTime = pieces[5].match(/[-+]\d{4}/),
      offset     = (offsetTime) ? offsetTime : pieces[5];
  return [
    pieces[0] + ',',
    pieces[2],
    pieces[1],
    pieces[3],
    pieces[4],
    offset
  ].join(' ');
}

export default posts => {
  const root = builder.create('rss', { encoding: 'UTF-8' })
    .att('version', '2.0')
    .att('xmlns:atom', "http://www.w3.org/2005/Atom")
    .att('xmlns:itunes', "http://www.itunes.com/dtds/podcast-1.0.dtd")
    .att('xmlns:patum', "http://www.preguntaleatumadre.com/Feed")
  .instructionBefore('xml-stylesheet', 'type="text/xsl" href="podcast.xsl"');
  const channel = root.ele('channel')
    .ele('atom:link', {
      href: "https://www.preguntaleatumadre.com/podcast.xml",
      rel: "self",
      type: "application/rss+xml"
    }).up()
    .ele('title', 'Preguntale a tu Madre').up()
    .ele('link', 'https://www.preguntaleatumadre.com').up()
    .ele('description', 'Donde no existen preguntas estúpidas…').up()
    .ele('lastBuildDate', pubDate()).up()
    .ele('language', 'es-UY').up()
    .ele('image')
      .ele('title', 'Preguntale a tu Madre').up()
      .ele('url', 'https://www.preguntaleatumadre.com/assets/images/patum.png').up()
      .ele('link', 'https://www.preguntaleatumadre.com').up()
    .up()
    .ele('itunes:type', 'episodic').up()
    .ele('itunes:category', { text: "Comedy" }).up()
    .ele('itunes:explicit', 'clean').up()
    .ele('itunes:author', 'Mediarte').up();
  posts.forEach(post => {
    channel.ele('item')
      .ele('title', post.title).up()
      .ele('link', `https://www.preguntaleatumadre.com/programas/${post.id}.html`).up()
      .ele('description').up()
      .ele('pubDate', pubDate(post.pubDate)).up()
      .ele('category', 'Podcast').up()
      .ele('guid', { isPermaLink: "true" }, `https://www.preguntaleatumadre.com${post.file}`).up()
      .ele('enclosure', {
        url: `https://www.preguntaleatumadre.com${post.file}`,
        length: post.filesize,
        type: "audio/mpeg"
      }).up()
      .ele('itunes:episode', post.episode).up()
      .ele('itunes:season', post.season).up()
      .ele('itunes:episodeType', 'full').up()
      .ele('itunes:duration', post.duration).up()
      .ele('itunes:explicit', 'clean').up()
      .ele('patum:date', post.date).up();
  });

  return root.end({ pretty: true });
};
