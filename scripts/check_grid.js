var page = require('webpage').create();

page.open('http://www.mediarte.com.uy/grilla-senal-1/', function(status) {
  if (status !== 'success') {
    console.log('Unable to access network');
  } else {
    var ua = page.evaluate(function() {
      
      var rows = document.getElementsByClassName('grilla-radio-1').item(0).getElementsByTagName('tr');
      var grilla = [];
      var r, c, cols, col, arr, el, hora, desplazamiento, contenidosFila;
      for (r = 0; r < rows.length; r++) {
        contenidosFila = 0;
        cols = rows.item(r).children;
        arr = new Array(7);
        desplazamiento = -1;
        for (c = 0; c < cols.length; c++) {
          col = cols.item(c);
          el = null;
          if (col.firstChild) {
            if (c === 0) {
              hora = col.textContent.trim().match(/^(\d+):(\d+)$/);
              if (hora) {
                el = parseInt(hora[1]);
                el += 3;
                el *= 100;
                el += parseInt(hora[2]);
                if (el >= 2400) {
                  el -= 2400;
                  desplazamiento = 0;
                }
                arr[c] = el;
                continue;
              }
            } else {
              contenidosFila++;
              el = {
                nombre: col.textContent.trim(),
                duracion: ((col.rowSpan || 1) * 0.5)
              };
              if (col.firstChild.nodeType === Node.ELEMENT_NODE && col.firstChild.tagName === 'A') {
                el.web = col.firstChild.href;
              }
            }
          }
          arr[parseInt(col.className.match(/^column-(\d)$/)[1]) + desplazamiento] = el;
        }
        if (contenidosFila) {
          grilla.push(arr);
        }
      }
      return JSON.stringify(grilla, null, 2);
      
    });
    console.log(ua);
  }
  phantom.exit();
});
