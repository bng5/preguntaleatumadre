<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/rss/channel">
    <html lang="es-UY">
      <head>
        <meta charset="UTF-8" />
        <title><xsl:value-of select="title" /></title>
        <link rel="stylesheet" href="/main.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type='text/javascript'>
function focusUrl (target) {
  target.select();
}

function copyText () {
  var copyText = document.getElementById('podcast-url');
  copyText.select();
  document.execCommand('copy');
  var tooltip = document.getElementById('copy-tooltip');
  tooltip.innerHTML = 'Copiado';
}

function copyMouseOut () {
  var tooltip = document.getElementById('copy-tooltip');
  tooltip.innerHTML = 'Copiar ruta';
}
        </script>
      </head>
      <body>
        <div id="root">
          <section class="page-header page-header--podcast">
            <div class="header-title__top">
              <div class="header-title">
                <a href="{link}"><img src="{image/url}" alt="{title}" /></a>
                <h2 class="project-tagline"><xsl:value-of select="description" /></h2>
              </div>
              <div class="podcast-subscription closed">
                <h3>Suscribirse al Podcast</h3>
                <p class="feed-url">
                  <span class="tooltip" onmouseout="copyMouseOut()">
                    <button class="icon-btn copy" onclick="copyText()">
                      <span id="copy-tooltip" class="tooltiptext">Copiar ruta</span>
                    </button>
                  </span>
                  <input id="podcast-url" type="text" value="https://www.preguntaleatumadre.com/podcast.xml" readonly="readonly" onfocus="focusUrl(this)" />
                </p>
                <p>Copiá la ruta del feed para agregarla en tu reproductor de podcast o seleccioná uno de los siguientes servicios.</p>
                <ul class="podcast-providers">
                  <li><a class="btn header-ctas-list__item" href="https://itunes.apple.com/uy/podcast/preguntale-a-tu-madre/id1384328001">iTunes</a></li>
                  <li><a class="btn header-ctas-list__item" href="https://open.spotify.com/show/2CIphN1cbPh4Z8AAhV08dH">Spotify</a></li>
                  <li><a class="btn header-ctas-list__item" href="http://tun.in/pi5TW">TuneIn</a></li>
                  <li><a class="btn header-ctas-list__item" href="https://player.fm/series/preguntale-a-tu-madre">PlayerFM</a></li>
                  <li><a class="btn header-ctas-list__item" href="https://www.ivoox.com/podcast-preguntale-a-tu-madre_sq_f1681139_1.html">iVoox</a></li>
                </ul>
              </div>
            </div>
            <ul class="social">
              <li class="social-item twitter"><a href="https://twitter.com/preguntaleatum" rel="noopener noreferrer" target="_blank">@preguntaleatum</a></li>
              <li class="social-item instagram"><a href="https://www.instagram.com/patumradio/" rel="noopener noreferrer" target="_blank">@patumradio</a></li>
              <li class="social-item facebook"><a href="https://www.facebook.com/2036459399960596/" rel="noopener noreferrer" target="_blank">Preguntale A Tu Madre</a></li>
              <li class="social-item whatsapp"><a href="https://wa.me/59892633427" rel="noopener noreferrer" target="_blank">+598 92 633 427</a></li>
            </ul>
          </section>
          <section class="main-content">
            <div id="home">
              <h2>Programas</h2>
              <xsl:for-each select="item">
                <div class="programa">
                  <h3 class="programa__titulo"><a href="{link}"><xsl:value-of select="title" /></a></h3>
                  <p class="programa__info">
                    Audio: <a href="{enclosure/@url}"><xsl:value-of select="enclosure/@url" /></a>
                  </p>
                </div>
              </xsl:for-each>
            </div>
          </section>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
