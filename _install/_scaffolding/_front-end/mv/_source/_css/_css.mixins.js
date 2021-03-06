const wb = require(`${process.cwd()}/wb.config.js`);

const mixins = {
  'font-face': [],
};

// Create @font-face declarations from config file
Object.keys(wb.fonts).forEach((key) => {
  const font = wb.fonts[key];

  if (font.files) {
    const src = [];
    if (font.files.eot) {
      src.push(`url('${font.files.eot}')`);
    }
    if (font.files.woff2) {
      src.push(`url('${font.files.woff2}') format('woff2')`);
    }
    if (font.files.woff) {
      src.push(`url('${font.files.woff}') format('woff')`);
    }

    mixins['font-face'].push({
      '@font-face': {
        fontFamily: font.fontFamily,
        src: src.join(','),
        fontDisplay: font.fontDisplay || 'swap',
        fontStyle: font.fontStyle || 'normal',
        fontWeight: font.fontWeight || 'normal',
      },
    });
  }
});

module.exports = mixins;
