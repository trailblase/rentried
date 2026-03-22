var _fontCache  = {};
var _customFont = null;

var state = {
  fontSize: 42,
  fontWeight: 400,
  colorMode: 'solid',
  solidColor: '#ffffff',
  solidOpacity: 1,
  gradientStart: '#ff69b4',
  gradientEnd: '#00ffff',
  gradientDir: 'right',
  gradientOpacity: 1,
  effects: { bold: false, italic: false, blur: false },
  letterSpacing: 0,
  underline: { enabled: false, style: 'solid', color: '#ffffff', thickness: 2 },
  overline:  { enabled: false, style: 'solid', color: '#ffffff', thickness: 2 },
  outlineEnabled: false,
  outlineColor: '#ffffff',
  outlineWidth: 1,
  glowEnabled: false,
  glowColor: '#ff69b4',
  glowSize: 5,
  glowOpacity: 1,
  shadowEnabled: false,
  shadowColor: '#000000',
  shadowOpacity: 0.5,
  shadowX: 2,
  shadowY: 2,
  shadowBlur: 3,
  marqueeType: 'rtl',
  marqueeFade: false,
  animSpeed: 8
};

function el(id)  { return document.getElementById(id); }
function on(id, ev, fn) { el(id).addEventListener(ev, fn); }

function activeFamily() {
  return _customFont ? _customFont.family : el('fontPicker').value;
}

function setStatus(msg) { el('embedStatus').textContent = msg; }

function escXML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function hexToRgba(hex, opacity) {
  return 'rgba(' + parseInt(hex.slice(1,3),16) + ',' + parseInt(hex.slice(3,5),16) + ',' + parseInt(hex.slice(5,7),16) + ',' + opacity + ')';
}

function setColorMode(mode) {
  state.colorMode = mode;
  document.querySelectorAll('[data-color]').forEach(function(b) { b.classList.toggle('active', b.dataset.color === mode); });
  el('solidColorSection').style.display    = mode === 'solid' ? '' : 'none';
  el('gradientColorSection').style.display = mode === 'gradient' ? '' : 'none';
  updateLivePreview();
}

function setGradientDir(dir) {
  state.gradientDir = dir;
  document.querySelectorAll('.direction-btn').forEach(function(b) { b.classList.toggle('selected', b.dataset.dir === dir); });
  updateLivePreview();
}

function toggleEffect(effect) {
  state.effects[effect] = !state.effects[effect];
  document.querySelector('[data-effect="' + effect + '"]').classList.toggle('selected');
  updateLivePreview();
}

function toggleDecoration(type) {
  var isUl = type === 'underline';
  var key   = isUl ? 'underline' : 'overline';
  state[key].enabled = el(key + 'Enabled').checked;
  el(key + 'Settings').classList.toggle('visible', state[key].enabled);
  updateLivePreview();
}

function setUnderlineStyle(style) {
  state.underline.style = style;
  document.querySelectorAll('.underline-style').forEach(function(b) { b.classList.toggle('selected', b.dataset.ulstyle === style); });
}

function setOverlineStyle(style) {
  state.overline.style = style;
  document.querySelectorAll('.overline-style').forEach(function(b) { b.classList.toggle('selected', b.dataset.olstyle === style); });
}

function toggleOutline() {
  state.outlineEnabled = el('outlineEnabled').checked;
  el('outlineSettings').classList.toggle('visible', state.outlineEnabled);
  updateLivePreview();
}

function toggleGlow() {
  state.glowEnabled = el('glowEnabled').checked;
  el('glowSettings').classList.toggle('visible', state.glowEnabled);
  updateLivePreview();
}

function toggleShadow() {
  state.shadowEnabled = el('shadowEnabled').checked;
  el('shadowSettings').classList.toggle('visible', state.shadowEnabled);
  updateLivePreview();
}

function setMarqueeType(type) {
  state.marqueeType = type;
  document.querySelectorAll('[data-mtype]').forEach(function(b) { b.classList.toggle('selected', b.dataset.mtype === type); });
  updateLivePreview();
}

function setMarqueeFade(checkbox) {
  state.marqueeFade = checkbox.checked;
  updateLivePreview();
}

function updateLivePreview() {
  var span  = el('marqSpan');
  var track = el('marqTrack');
  var box   = el('marqBox');

  span.textContent     = el('textInput').value || 'Hello World';
  span.style.fontFamily    = '"' + activeFamily() + '", serif';
  span.style.fontSize      = state.fontSize + 'px';
  span.style.fontWeight    = state.effects.bold ? Math.max(state.fontWeight, 700) : state.fontWeight;
  span.style.fontStyle     = state.effects.italic ? 'italic' : '';
  span.style.letterSpacing = state.letterSpacing > 0 ? state.letterSpacing + 'px' : '';

  if (state.colorMode === 'gradient') {
    var dirs = { right:'to right', left:'to left', down:'to bottom', up:'to top' };
    span.style.background          = 'linear-gradient(' + dirs[state.gradientDir] + ',' + state.gradientStart + ',' + state.gradientEnd + ')';
    span.style.webkitBackgroundClip = 'text';
    span.style.backgroundClip      = 'text';
    span.style.webkitTextFillColor  = 'transparent';
    span.style.color   = '';
    span.style.opacity = state.gradientOpacity;
  } else {
    span.style.background          = '';
    span.style.webkitBackgroundClip = '';
    span.style.backgroundClip      = '';
    span.style.webkitTextFillColor  = '';
    span.style.color   = state.solidColor;
    span.style.opacity = state.solidOpacity;
  }

  span.style.webkitTextStroke = state.outlineEnabled ? state.outlineWidth + 'px ' + state.outlineColor : '';

  var filters = [];
  if (state.effects.blur)  filters.push('blur(1px)');
  if (state.shadowEnabled) filters.push('drop-shadow(' + state.shadowX + 'px ' + state.shadowY + 'px ' + state.shadowBlur + 'px ' + hexToRgba(state.shadowColor, state.shadowOpacity) + ')');
  if (state.glowEnabled)   filters.push('drop-shadow(0 0 ' + state.glowSize + 'px ' + hexToRgba(state.glowColor, state.glowOpacity) + ')');
  span.style.filter = filters.join(' ');

  var decors = [];
  if (state.underline.enabled) decors.push('underline');
  if (state.overline.enabled)  decors.push('overline');
  span.style.textDecoration = decors.join(' ');

  var fadeMask = state.marqueeFade ? 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' : '';
  box.style.maskImage       = fadeMask;
  box.style.webkitMaskImage = fadeMask;

  track.style.animation = (state.marqueeType === 'ltr' ? 'scroll-ltr' : 'scroll-rtl') + ' ' + state.animSpeed + 's linear infinite';
}

function loadFontFromUrl() {
  var raw = el('fontUrlInput').value.trim();
  if (!raw) return;
  var m = raw.match(/\/specimen\/([^?&#]+)/);
  if (!m) { setStatus('Not a valid Google Fonts specimen URL.'); return; }
  var slug   = m[1].replace(/ /g, '+');
  var family = decodeURIComponent(slug.replace(/\+/g, ' '));
  _customFont = { family: family, slug: slug };
  var prev = el('_dyn_font_link');
  if (prev) prev.remove();
  var link  = document.createElement('link');
  link.id   = '_dyn_font_link';
  link.rel  = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=' + slug + '&display=swap';
  document.head.appendChild(link);
  updateLivePreview();
}

function buildSubset(text) {
  var seen = {}, chars = '';
  for (var i = 0; i < text.length; i++) {
    var c = text[i];
    if (!seen[c]) { seen[c] = true; chars += c; }
  }
  return chars || ' ';
}

function bufToB64(buf) {
  var bytes = new Uint8Array(buf), out = '', C = 8192;
  for (var i = 0; i < bytes.length; i += C)
    out += String.fromCharCode.apply(null, bytes.subarray(i, i + C));
  return btoa(out);
}

function fetchB64(url) {
  return fetch(url).then(function(r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.arrayBuffer();
  }).then(bufToB64);
}

function extractUrls(css) {
  var urls = [];
  css.replace(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/g, function(_, u) { urls.push(u); });
  return urls;
}

function fetchLatinFromCss(famSlug) {
  return fetch('https://fonts.googleapis.com/css2?family=' + famSlug + '&display=swap')
    .then(function(r) { return r.text(); })
    .then(function(css) {
      var urls = extractUrls(css);
      if (!urls.length) throw new Error('No WOFF2 found for ' + famSlug);
      setStatus('Fetching Latin subset\u2026');
      return fetchB64(urls[urls.length - 1]).then(function(b) { return [b]; });
    });
}

function embedFont() {
  var fam      = activeFamily();
  var fallback = _customFont ? null : el('fontPicker').selectedOptions[0].dataset.url;
  var btn      = el('embedBtn');
  var subset   = buildSubset(el('textInput').value || 'Hello World');
  var cacheKey = fam + '\x00' + subset;

  if (_fontCache[cacheKey]) {
    buildSVG(fam, _fontCache[cacheKey]);
    el('copyBtn').disabled = false;
    return;
  }

  btn.disabled = true;
  setStatus('Fetching "' + fam + '" from Google Fonts\u2026');

  var famSlug = fam.replace(/ /g, '+');
  fetch('https://fonts.googleapis.com/css2?family=' + famSlug + '&text=' + encodeURIComponent(subset) + '&display=swap')
    .then(function(r) { return r.text(); })
    .then(function(css) {
      var urls = extractUrls(css);
      if (!urls.length) throw new Error('empty');
      setStatus('Downloading ' + urls.length + ' glyph subset(s)\u2026');
      return Promise.all(urls.map(fetchB64));
    })
    .catch(function() {
      return fallback
        ? (setStatus('Fetching Latin subset\u2026'), fetchB64(fallback).then(function(b) { return [b]; }))
        : fetchLatinFromCss(famSlug);
    })
    .then(function(b64arr) {
      _fontCache[cacheKey] = b64arr;
      buildSVG(fam, b64arr);
      btn.disabled = false;
      el('copyBtn').disabled = false;
      var kb = Math.round(b64arr.reduce(function(s, b) { return s + b.length * 0.75; }, 0) / 1024);
      setStatus('Done! ~' + kb + ' KB across ' + b64arr.length + ' subset(s).');
    })
    .catch(function(err) {
      btn.disabled = false;
      setStatus('Error: ' + (err && err.message ? err.message : String(err)));
    });
}

function buildSVG(fontFamily, b64arr) {
  var text = (el('textInput').value || 'Hello World').replace(/\n/g, ' ');
  var effectPadding = Math.max(
    state.glowEnabled   ? state.glowSize * 2 : 0,
    state.shadowEnabled ? Math.abs(state.shadowY) + state.shadowBlur : 0
  );
  var W     = 700;
  var H     = Math.ceil(state.fontSize + effectPadding * 2 + state.fontSize * 0.3);
  var textY = Math.ceil(effectPadding + state.fontSize);

  var fontFaces = b64arr.map(function(b64) {
    return '@font-face{font-family:"' + fontFamily + '";src:url("data:font/woff2;base64,' + b64 + '") format("woff2");}';
  }).join('');

  var textStyles = [
    'font-family:"' + fontFamily + '",serif',
    'font-size:' + state.fontSize + 'px',
    'font-weight:' + (state.effects.bold ? Math.max(state.fontWeight, 700) : state.fontWeight)
  ];
  if (state.effects.italic)    textStyles.push('font-style:italic');
  if (state.letterSpacing > 0) textStyles.push('letter-spacing:' + state.letterSpacing + 'px');

  var defsContent = '';
  if (state.colorMode === 'gradient') {
    var gdirs = {
      right: 'x1="0%" y1="0%" x2="100%" y2="0%"', left: 'x1="100%" y1="0%" x2="0%" y2="0%"',
      down:  'x1="0%" y1="0%" x2="0%" y2="100%"', up:   'x1="0%" y1="100%" x2="0%" y2="0%"'
    };
    var gop = state.gradientOpacity < 1 ? ' stop-opacity="' + state.gradientOpacity + '"' : '';
    defsContent += '<linearGradient id="g" ' + gdirs[state.gradientDir] + '>' +
      '<stop offset="0%" stop-color="' + state.gradientStart + '"' + gop + '/>' +
      '<stop offset="100%" stop-color="' + state.gradientEnd + '"' + gop + '/></linearGradient>';
    textStyles.push('fill:url(#g)');
  } else {
    textStyles.push('fill:' + state.solidColor);
    if (state.solidOpacity < 1) textStyles.push('fill-opacity:' + state.solidOpacity);
  }

  if (state.outlineEnabled) {
    textStyles.push('stroke:' + state.outlineColor, 'stroke-width:' + state.outlineWidth, 'paint-order:stroke fill');
  }

  var filters = [];
  if (state.effects.blur)  filters.push('blur(1px)');
  if (state.shadowEnabled) filters.push('drop-shadow(' + state.shadowX + 'px ' + state.shadowY + 'px ' + state.shadowBlur + 'px ' + hexToRgba(state.shadowColor, state.shadowOpacity) + ')');
  if (state.glowEnabled)   filters.push('drop-shadow(0 0 ' + state.glowSize + 'px ' + hexToRgba(state.glowColor, state.glowOpacity) + ')');
  if (filters.length) textStyles.push('filter:' + filters.join(' '));

  var dur   = state.animSpeed + 's';
  var fromX = state.marqueeType === 'ltr' ? '-100%' : '100%';
  var toX   = state.marqueeType === 'ltr' ? '100%'  : '-100%';
  var keyframes = '@keyframes marq{from{transform:translateX(' + fromX + ');}to{transform:translateX(' + toX + ');}}';
  var animStyle = 'animation:marq ' + dur + ' linear infinite;transform-box:view-box';
  var textEl    = '<text x="0" y="' + textY + '">' + escXML(text) + '</text>';

  if (state.marqueeFade) {
    defsContent +=
      '<linearGradient id="fadeL" x1="0" x2="1"><stop offset="0" stop-color="black"/><stop offset="1" stop-color="white"/></linearGradient>' +
      '<linearGradient id="fadeR" x1="0" x2="1"><stop offset="0" stop-color="white"/><stop offset="1" stop-color="black"/></linearGradient>' +
      '<mask id="fadeMask"><rect width="100%" height="100%" fill="white"/>' +
      '<rect width="15%" height="100%" fill="url(#fadeL)"/><rect x="85%" width="15%" height="100%" fill="url(#fadeR)"/></mask>';
  }

  var decorEl    = buildDecorations(text, textY);
  var innerGroup = '<g style="' + animStyle + '">' + textEl + decorEl + '</g>';
  if (state.marqueeFade) innerGroup = '<g style="mask:url(#fadeMask)">' + innerGroup + '</g>';

  var defsStr    = defsContent ? '<defs>' + defsContent + '</defs>' : '';
  var styleBlock = '<style>' + fontFaces + 'text{' + textStyles.join(';') + '}' + keyframes + '</style>';
  var svgContent = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '">' +
    defsStr + styleBlock + innerGroup + '</svg>';

  var b64 = btoa(Array.from(new TextEncoder().encode(svgContent), function(b) { return String.fromCharCode(b); }).join(''));
  el('codeOutput').textContent = '![](data:image/svg+xml;base64,' + b64 + ')';
}

function buildDecorations(text, textY) {
  if (!state.underline.enabled && !state.overline.enabled) return '';
  var textWidth = text.length * state.fontSize * 0.6 + state.letterSpacing * Math.max(0, text.length - 1);
  var result = '';
  if (state.underline.enabled) result += buildLineDecor(textWidth, textY + state.fontSize * 0.15,  state.underline);
  if (state.overline.enabled)  result += buildLineDecor(textWidth, textY - state.fontSize * 0.85, state.overline);
  return result;
}

function buildLineDecor(width, y, decor) {
  if (decor.style === 'wavy') {
    var amp = decor.thickness * 1.5, wl = decor.thickness * 4;
    return '<path d="' + buildWavyPath(width, y, amp, wl) + '" fill="none" stroke="' + decor.color + '" stroke-width="' + decor.thickness + '"/>';
  }
  var dash = decor.style === 'dashed' ? ' stroke-dasharray="' + decor.thickness * 3 + ' ' + decor.thickness * 2 + '"' : '';
  return '<line x1="0" y1="' + y + '" x2="' + width + '" y2="' + y + '" stroke="' + decor.color + '" stroke-width="' + decor.thickness + '"' + dash + '/>';
}

function buildWavyPath(width, y, amp, wl) {
  var segs = Math.ceil((width * 2) / wl) + 2;
  var path = 'M 0 ' + y + ' q ' + (wl/4) + ' ' + (-amp) + ' ' + (wl/2) + ' 0';
  for (var i = 1; i < segs; i++) path += ' t ' + (wl/2) + ' 0';
  return path;
}

on('fontUrlInput', 'paste',   function() { setTimeout(loadFontFromUrl, 30); });
on('fontUrlInput', 'keydown', function(e) { if (e.key === 'Enter') loadFontFromUrl(); });

on('fontPicker', 'change', function() {
  _customFont = null;
  el('fontUrlInput').value = '';
  updateLivePreview();
});

on('textInput', 'input', updateLivePreview);

on('fontSize', 'input', function(e) { state.fontSize = parseInt(e.target.value) || 42; updateLivePreview(); });
on('fontWeight', 'change', function(e) { state.fontWeight = parseInt(e.target.value); updateLivePreview(); });

function bindColorPair(colorId, hexId, stateKey) {
  on(colorId, 'input', function(e) {
    state[stateKey] = e.target.value;
    el(hexId).value = e.target.value;
    updateLivePreview();
  });
  on(hexId, 'input', function(e) {
    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      state[stateKey] = e.target.value;
      el(colorId).value = e.target.value;
      updateLivePreview();
    }
  });
}
bindColorPair('solidColor',    'solidColorHex',    'solidColor');
bindColorPair('gradientStart', 'gradientStartHex', 'gradientStart');
bindColorPair('gradientEnd',   'gradientEndHex',   'gradientEnd');

function bindOpacity(sliderId, labelId, stateKey) {
  on(sliderId, 'input', function(e) {
    state[stateKey] = parseFloat(e.target.value);
    el(labelId).textContent = Math.round(state[stateKey] * 100) + '%';
    updateLivePreview();
  });
}
bindOpacity('solidOpacity',    'solidOpacityValue',    'solidOpacity');
bindOpacity('gradientOpacity', 'gradientOpacityValue', 'gradientOpacity');
bindOpacity('glowOpacity',     'glowOpacityValue',     'glowOpacity');
bindOpacity('shadowOpacity',   'shadowOpacityValue',   'shadowOpacity');

on('letterSpacing', 'input', function(e) {
  state.letterSpacing = parseInt(e.target.value);
  el('spacingValue').textContent = state.letterSpacing + 'px';
  updateLivePreview();
});

on('underlineColor',     'input', function(e) { state.underline.color = e.target.value; });
on('underlineThickness', 'input', function(e) { state.underline.thickness = parseInt(e.target.value) || 2; });
on('overlineColor',      'input', function(e) { state.overline.color = e.target.value; });
on('overlineThickness',  'input', function(e) { state.overline.thickness = parseInt(e.target.value) || 2; });

on('outlineColor', 'input', function(e) { state.outlineColor = e.target.value; updateLivePreview(); });
on('outlineWidth', 'input', function(e) { state.outlineWidth = parseFloat(e.target.value) || 1; updateLivePreview(); });

on('glowColor', 'input', function(e) { state.glowColor = e.target.value; updateLivePreview(); });
on('glowSize',  'input', function(e) { state.glowSize = parseInt(e.target.value) || 5; updateLivePreview(); });

on('shadowColor', 'input', function(e) { state.shadowColor = e.target.value; updateLivePreview(); });
on('shadowBlur',  'input', function(e) { state.shadowBlur = parseInt(e.target.value) || 0; updateLivePreview(); });
on('shadowX',     'input', function(e) { state.shadowX = parseInt(e.target.value) || 0; updateLivePreview(); });
on('shadowY',     'input', function(e) { state.shadowY = parseInt(e.target.value) || 0; updateLivePreview(); });

on('animSpeed', 'input', function(e) {
  state.animSpeed = parseFloat(e.target.value);
  el('speedLabel').textContent = state.animSpeed + 's';
  updateLivePreview();
});

updateLivePreview();
