<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/rss/channel">
  <html>
    <head>
      <title><xsl:value-of select="title" /></title>
      <link rel="stylesheet" href="/assets/main.css" />
    </head>
    <body>
      <div class="page-header">
        <div class="header-title__top">
          <div class="header-title">
            <h1 class="project-tagline"><a href="{link}"><xsl:value-of select="title" /></a></h1>
            <!-- <img src="{image/url}" alt="{image/title}" /> -->
            <em class="project-tagline"><xsl:value-of select="description" /></em>
          </div>
        </div>
      </div>
      <h2>Programas</h2>
      <xsl:for-each select="item">
      <div>
        <h3><xsl:value-of select="title" /></h3>
        <p><xsl:value-of select="description" /></p>
        <a href="{link}"><xsl:value-of select="link" /></a>
      </div>
      </xsl:for-each>
    </body>
  </html>
  </xsl:template>
</xsl:stylesheet>
