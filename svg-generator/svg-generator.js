// added fallbacks just in case someone doesn't have these installed
const fonts = [
  { name: 'Georgia', family: 'Georgia, serif', category: 'serif' },
  { name: 'Times New Roman', family: 'Times New Roman, Times, serif', category: 'serif' },
  { name: 'Palatino', family: 'Palatino Linotype, Palatino, serif', category: 'serif' },
  { name: 'Book Antiqua', family: 'Book Antiqua, Palatino, serif', category: 'serif' },
  { name: 'Garamond', family: 'Garamond, serif', category: 'serif' },
  { name: 'Cambria', family: 'Cambria, serif', category: 'serif' },
  { name: 'Didot', family: 'Didot, serif', category: 'serif' },
  { name: 'Bodoni MT', family: 'Bodoni MT, serif', category: 'serif' },
  { name: 'Arial', family: 'Arial, Helvetica, sans-serif', category: 'sans-serif' },
  { name: 'Verdana', family: 'Verdana, Geneva, sans-serif', category: 'sans-serif' },
  { name: 'Trebuchet MS', family: 'Trebuchet MS, sans-serif', category: 'sans-serif' },
  { name: 'Tahoma', family: 'Tahoma, Geneva, sans-serif', category: 'sans-serif' },
  { name: 'Helvetica', family: 'Helvetica, Arial, sans-serif', category: 'sans-serif' },
  { name: 'Impact', family: 'Impact, Charcoal, sans-serif', category: 'sans-serif' },
  { name: 'Arial Black', family: 'Arial Black, Gadget, sans-serif', category: 'sans-serif' },
  { name: 'Lucida Sans', family: 'Lucida Sans Unicode, Lucida Grande, sans-serif', category: 'sans-serif' },
  { name: 'Century Gothic', family: 'Century Gothic, sans-serif', category: 'sans-serif' },
  { name: 'Segoe UI', family: 'Segoe UI, sans-serif', category: 'sans-serif' },
  { name: 'Calibri', family: 'Calibri, sans-serif', category: 'sans-serif' },
  { name: 'Candara', family: 'Candara, sans-serif', category: 'sans-serif' },
  { name: 'Optima', family: 'Optima, sans-serif', category: 'sans-serif' },
  { name: 'Gill Sans', family: 'Gill Sans, sans-serif', category: 'sans-serif' },
  { name: 'Franklin Gothic', family: 'Franklin Gothic Medium, sans-serif', category: 'sans-serif' },
  { name: 'Courier New', family: 'Courier New, Courier, monospace', category: 'monospace' },
  { name: 'Lucida Console', family: 'Lucida Console, Monaco, monospace', category: 'monospace' },
  { name: 'Consolas', family: 'Consolas, monospace', category: 'monospace' },
  { name: 'Monaco', family: 'Monaco, monospace', category: 'monospace' },
  { name: 'Andale Mono', family: 'Andale Mono, monospace', category: 'monospace' },
  { name: 'Source Code Pro', family: 'Source Code Pro, monospace', category: 'monospace' },
  { name: 'Comic Sans MS', family: 'Comic Sans MS, cursive', category: 'cursive' },
  { name: 'Lucida Handwriting', family: 'Lucida Handwriting, cursive', category: 'cursive' },
  { name: 'Segoe Script', family: 'Segoe Script, cursive', category: 'cursive' },
  { name: 'Brush Script MT', family: 'Brush Script MT, cursive', category: 'cursive' },
  { name: 'Snell Roundhand', family: 'Snell Roundhand, cursive', category: 'cursive' },
  { name: 'Papyrus', family: 'Papyrus, fantasy', category: 'fantasy' },
  { name: 'Copperplate', family: 'Copperplate, fantasy', category: 'fantasy' },
];

// this holds all the current settings for the text, class could've been used but oh well
// a lot of these are just default values that can be changed by the user afterwards
let state = {
  text: 'Hello World',
  textMode: 'single',
  font: fonts[0],
  fontSize: 18,
  fontWeight: 400,
  textAlign: 'center',
  colorMode: 'solid',
  solidColor: '#ffffff',
  solidOpacity: 1,
  gradientStart: '#ff69b4',
  gradientEnd: '#00ffff',
  gradientDir: 'right',
  gradientOpacity: 1,
  effects: {
    bold: false,
    italic: false,
    blur: false
  },
  underline: {
    enabled: false,
    style: 'solid',
    color: '#ffffff',
    thickness: 2
  },
  overline: {
    enabled: false,
    style: 'solid',
    color: '#ffffff',
    thickness: 2
  },
  transform: {
    rotate: 0,
    flipH: false,
    flipV: false
  },
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
  outlineEnabled: false,
  outlineColor: '#ffffff',
  outlineWidth: 1,
  letterSpacing: 0,
  animation: 'none',
  animSpeed: 2,
  marqueeDir: 'rtl',
  marqueeFade: false
};

function initFontGrid() {
  const grid = document.getElementById('fontGrid');
  fonts.forEach((font, index) => {
    const option = document.createElement('div');
    option.className = 'font-option' + (index === 0 ? ' selected' : '');
    option.style.fontFamily = font.family;
    option.textContent = font.name;
    option.onclick = () => selectFont(index);
    grid.appendChild(option);
  });
}

function selectFont(index) {
  state.font = fonts[index];
  // update the visual selection (remove from old, add to new)
  document.querySelectorAll('.font-option').forEach((el, i) => {
    el.classList.toggle('selected', i === index);
  });
  updatePreview();
}

function setTextMode(mode) {
  state.textMode = mode;
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  updatePreview();
}

function setColorMode(mode) {
  state.colorMode = mode; //the current color mode
  document.querySelectorAll('[data-color]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.color === mode);
  });
  
  document.getElementById('solidColorSection').style.display = mode === 'solid' ? 'block' : 'none';
  document.getElementById('gradientColorSection').style.display = mode === 'gradient' ? 'block' : 'none';
  updatePreview();
}

function setGradientDir(dir) {
  state.gradientDir = dir;
  document.querySelectorAll('.direction-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.dir === dir);
  });
  updatePreview();
}

function toggleEffect(effect) {
  state.effects[effect] = !state.effects[effect];
  document.querySelector(`[data-effect="${effect}"]`).classList.toggle('selected');
  updatePreview();
}

function setAnimation(anim) {
  state.animation = anim;
  document.querySelectorAll('.animation-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.anim === anim);
  });
  const dirRow = document.getElementById('marqueeDirRow');
  if (dirRow) dirRow.style.display = (anim === 'marquee') ? '' : 'none';
  updatePreview();
}

function setMarqueeDir(dir) {
  state.marqueeDir = dir;
  document.getElementById('dirLtr').classList.toggle('active', dir === 'ltr');
  document.getElementById('dirRtl').classList.toggle('active', dir === 'rtl');
  document.getElementById('dirBounce').classList.toggle('active', dir === 'bounce');
  updatePreview();
}

function setMarqueeFade(el) {
  state.marqueeFade = el.checked;
  updatePreview();
}
function setTextAlign(align) {
  state.textAlign = align;
  document.querySelectorAll('[data-align]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.align === align);
  });
  updatePreview();
}

function toggleDecoration(type) {
  if (type === 'underline') {
    state.underline.enabled = document.getElementById('underlineEnabled').checked;
    document.getElementById('underlineSettings').classList.toggle('visible', state.underline.enabled);
  } else if (type === 'overline') {
    state.overline.enabled = document.getElementById('overlineEnabled').checked;
    document.getElementById('overlineSettings').classList.toggle('visible', state.overline.enabled);
  }
  updatePreview();
}

function setUnderlineStyle(style) {
  state.underline.style = style;
  document.querySelectorAll('.underline-style').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.ulstyle === style);
  });
  updatePreview();
}

function setOverlineStyle(style) {
  state.overline.style = style;
  document.querySelectorAll('.overline-style').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.olstyle === style);
  });
  updatePreview();
}
// requires some fixing later since some animations dont account for flipping
function toggleTransform(type) {
  state.transform[type] = !state.transform[type];
  document.querySelector(`[data-transform="${type}"]`).classList.toggle('selected');
  updatePreview();
}

function toggleGlow() {
  state.glowEnabled = document.getElementById('glowEnabled').checked;
  document.getElementById('glowSettings').classList.toggle('visible', state.glowEnabled);
  updatePreview();
}

function toggleShadow() {
  state.shadowEnabled = document.getElementById('shadowEnabled').checked;
  document.getElementById('shadowSettings').classList.toggle('visible', state.shadowEnabled);
  updatePreview();
}

function toggleOutline() {
  state.outlineEnabled = document.getElementById('outlineEnabled').checked;
  document.getElementById('outlineSettings').classList.toggle('visible', state.outlineEnabled);
  updatePreview();
}


// event listeners update the preview box in real-time
// this is kinda long but pretty straightforward

function initEventListeners() {
  document.getElementById('textInput').addEventListener('input', (e) => {
    state.text = e.target.value;
    updatePreview();
  });

  document.getElementById('fontSize').addEventListener('input', (e) => {
    state.fontSize = parseInt(e.target.value) || 18;
    updatePreview();
  });

  document.getElementById('solidColor').addEventListener('input', (e) => {
    state.solidColor = e.target.value;
    document.getElementById('solidColorHex').value = e.target.value;
    updatePreview();
  });

  document.getElementById('solidColorHex').addEventListener('input', (e) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      state.solidColor = e.target.value;
      document.getElementById('solidColor').value = e.target.value;
      updatePreview();
    }
  });

    document.getElementById('gradientStart').addEventListener('input', (e) => {
    state.gradientStart = e.target.value;
    document.getElementById('gradientStartHex').value = e.target.value;
    updatePreview();
  });

  document.getElementById('gradientStartHex').addEventListener('input', (e) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      state.gradientStart = e.target.value;
      document.getElementById('gradientStart').value = e.target.value;
      updatePreview();
    }
  });
    document.getElementById('gradientEnd').addEventListener('input', (e) => {
    state.gradientEnd = e.target.value;
    document.getElementById('gradientEndHex').value = e.target.value;
    updatePreview();
  });

  document.getElementById('gradientEndHex').addEventListener('input', (e) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
      state.gradientEnd = e.target.value;
      document.getElementById('gradientEnd').value = e.target.value;
      updatePreview();
    }
  });

  document.getElementById('solidOpacity').addEventListener('input', (e) => {
    state.solidOpacity = parseFloat(e.target.value);
    document.getElementById('solidOpacityValue').textContent = Math.round(state.solidOpacity * 100) + '%';
    updatePreview();
  });

  document.getElementById('gradientOpacity').addEventListener('input', (e) => {
    state.gradientOpacity = parseFloat(e.target.value);
    document.getElementById('gradientOpacityValue').textContent = Math.round(state.gradientOpacity * 100) + '%';
    updatePreview();
  });

  document.getElementById('glowEnabled').addEventListener('change', toggleGlow);

  document.getElementById('glowColor').addEventListener('input', (e) => {
    state.glowColor = e.target.value;
    updatePreview();
  });

  document.getElementById('glowSize').addEventListener('input', (e) => {
    state.glowSize = parseInt(e.target.value) || 5;
    updatePreview();
  });

  document.getElementById('glowOpacity').addEventListener('input', (e) => {
    state.glowOpacity = parseFloat(e.target.value);
    document.getElementById('glowOpacityValue').textContent = Math.round(state.glowOpacity * 100) + '%';
    updatePreview();
  });

  document.getElementById('shadowEnabled').addEventListener('change', toggleShadow);

  document.getElementById('shadowColor').addEventListener('input', (e) => {
    state.shadowColor = e.target.value;
    updatePreview();
  });

  document.getElementById('shadowBlur').addEventListener('input', (e) => {
    state.shadowBlur = parseInt(e.target.value) || 3;
    updatePreview();
  });

  document.getElementById('shadowOpacity').addEventListener('input', (e) => {
    state.shadowOpacity = parseFloat(e.target.value);
    document.getElementById('shadowOpacityValue').textContent = Math.round(state.shadowOpacity * 100) + '%';
    updatePreview();
  });
    document.getElementById('shadowX').addEventListener('input', (e) => {
    state.shadowX = parseInt(e.target.value) || 0;
    updatePreview();
  });

  document.getElementById('shadowY').addEventListener('input', (e) => {
    state.shadowY = parseInt(e.target.value) || 0;
    updatePreview();
  });

  document.getElementById('outlineEnabled').addEventListener('change', toggleOutline);

  document.getElementById('outlineColor').addEventListener('input', (e) => {
    state.outlineColor = e.target.value;
    updatePreview();
  });

  document.getElementById('outlineWidth').addEventListener('input', (e) => {
    state.outlineWidth = parseFloat(e.target.value) || 1;
    updatePreview();
  });

  document.getElementById('letterSpacing').addEventListener('input', (e) => {
    state.letterSpacing = parseInt(e.target.value);
    document.getElementById('spacingValue').textContent = state.letterSpacing + 'px';
    updatePreview();
  });

  document.getElementById('animSpeed').addEventListener('input', (e) => {
    state.animSpeed = parseFloat(e.target.value);
    document.getElementById('speedValue').textContent = state.animSpeed + 's';
    updatePreview();
  });

  document.getElementById('fontWeight').addEventListener('change', (e) => {
    state.fontWeight = parseInt(e.target.value);
    updatePreview();
  });

  document.getElementById('underlineColor').addEventListener('input', (e) => {
    state.underline.color = e.target.value;
    updatePreview();
  });

  document.getElementById('underlineThickness').addEventListener('input', (e) => {
    state.underline.thickness = parseInt(e.target.value) || 2;
    updatePreview();
  });

  document.getElementById('overlineColor').addEventListener('input', (e) => {
    state.overline.color = e.target.value;
    updatePreview();
  });

  document.getElementById('overlineThickness').addEventListener('input', (e) => {
    state.overline.thickness = parseInt(e.target.value) || 2;
    updatePreview();
  });

  document.getElementById('textRotate').addEventListener('input', (e) => {
    state.transform.rotate = parseInt(e.target.value) || 0;
    updatePreview();
  });
}

// this is the main function that creates the rentry-compatible svg code
// it's pretty long because there's a lot of different options to handle
// the output uses data uri format which rentry supports

function generateCode() {
  const lines = state.textMode === 'multi' ? state.text.split('\n') : [state.text];
  const lineHeight = state.fontSize * 1.3;  // standard line height ratio

    const effectPadding = Math.max(
    state.glowEnabled ? state.glowSize * 2 : 0,
    state.shadowEnabled ? Math.abs(state.shadowY) + state.shadowBlur : 0,
    state.outlineEnabled ? state.outlineWidth * 2 : 0,
    state.animation === 'bounce' || state.animation === 'float' || state.animation === 'wave' ? 15 : 0,
    state.animation === 'zoom' ? state.fontSize * 0.15 : 0
  );
  const totalHeight = Math.ceil(lines.length * lineHeight + effectPadding * 2 + state.fontSize * 0.3);

  let styles = [];
  let defs = '';

  styles.push(`font-family:${state.font.family}`);
  styles.push(`font-size:${state.fontSize}px`);

   const effectiveWeight = state.effects.bold ? Math.max(state.fontWeight, 700) : state.fontWeight;
  styles.push(`font-weight:${effectiveWeight}`);

  if (state.colorMode === 'gradient') {
    const dirs = {
      'right': { x1: '0%25', y1: '0%25', x2: '100%25', y2: '0%25' },
      'left': { x1: '100%25', y1: '0%25', x2: '0%25', y2: '0%25' },
      'down': { x1: '0%25', y1: '0%25', x2: '0%25', y2: '100%25' },
      'up': { x1: '0%25', y1: '100%25', x2: '0%25', y2: '0%25' }
    };
    const d = dirs[state.gradientDir];
    const gradOpacity = state.gradientOpacity < 1 ? ` stop-opacity='${state.gradientOpacity}'` : '';
    defs = `<defs><linearGradient id='g' x1='${d.x1}' y1='${d.y1}' x2='${d.x2}' y2='${d.y2}'><stop offset='0%25' stop-color='${state.gradientStart.replace('#', '%23')}'${gradOpacity}/><stop offset='100%25' stop-color='${state.gradientEnd.replace('#', '%23')}'${gradOpacity}/></linearGradient></defs>`;
    styles.push('fill:url%28%23g%29');
  } else {
    // solid color is simpler
    styles.push(`fill:${state.solidColor.replace('#', '%23')}`);
    if (state.solidOpacity < 1) {
      styles.push(`fill-opacity:${state.solidOpacity}`);
    }
  }

  if (state.outlineEnabled) {
    styles.push(`stroke:${state.outlineColor.replace('#', '%23')}`);
    styles.push(`stroke-width:${state.outlineWidth}`);
    styles.push('paint-order:stroke fill');
  }

  if (state.effects.italic) styles.push('font-style:italic');
  if (state.letterSpacing > 0) styles.push(`letter-spacing:${state.letterSpacing}px`);

  let transforms = [];
  if (state.transform.rotate !== 0) {
    transforms.push(`rotate%28${state.transform.rotate}deg%29`);
  }
  if (state.transform.flipH) {
    transforms.push('scaleX%28-1%29');
  }
  if (state.transform.flipV) {
    transforms.push('scaleY%28-1%29');
  }

  let filters = [];
  let staticFilters = [];  // filters that stay constant (for glow-pulse animation)
  if (state.effects.blur) filters.push('blur%281px%29');
  if (state.shadowEnabled) {
    const shadowColorWithOpacity = hexToRgba(state.shadowColor, state.shadowOpacity);
    const shadowFilter = `drop-shadow%28${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${shadowColorWithOpacity}%29`;
    filters.push(shadowFilter);
    staticFilters.push(shadowFilter);
  }
  if (state.glowEnabled) {
    const glowColorWithOpacity = hexToRgba(state.glowColor, state.glowOpacity);
    filters.push(`drop-shadow%280 0 ${state.glowSize}px ${glowColorWithOpacity}%29`);
  }

  let animationProp = '';
  let animationKeyframes = '';
  const speed = state.animSpeed;

  switch (state.animation) {
    case 'bounce':
      animationProp = `animation:bounce ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes bounce{0%25,100%25{transform:translateY%280%29;}50%25{transform:translateY%28-5px%29;}}`;
      break;
    case 'pulse':
      animationProp = `animation:pulse ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes pulse{0%25,100%25{opacity:1;}50%25{opacity:0.5;}}`;
      break;
    case 'glow-pulse':
      const glowCol = state.glowColor.replace('#', '%23');
      const baseFilters = staticFilters.length > 0 ? staticFilters.join(' ') + ' ' : '';
      animationProp = `animation:glowp ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes glowp{0%25,100%25{filter:${baseFilters}drop-shadow%280 0 2px ${glowCol}%29;}50%25{filter:${baseFilters}drop-shadow%280 0 10px ${glowCol}%29;}}`;
      filters = staticFilters.slice();
      break;
    case 'color-shift':
      animationProp = `animation:colorshift ${speed}s linear infinite`;
      animationKeyframes = `@keyframes colorshift{0%25{fill:%23ff69b4;}33%25{fill:%2300ffff;}66%25{fill:%23ffd700;}100%25{fill:%23ff69b4;}}`;
      break;
    case 'float':
      animationProp = `animation:float ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes float{0%25,100%25{transform:translateY%280%29;}50%25{transform:translateY%28-8px%29;}}`;
      break;
    case 'wiggle':
    case 'zoom':
    case 'wave':
    case 'marquee':
    case 'scroll-up':
    case 'scroll-down':
      break;
  }

    if (filters.length > 0 && state.animation !== 'glow-pulse') {
    styles.push(`filter:${filters.join(' ')}`);
  }

  const isScrollAnim = state.animation === 'scroll-up' || state.animation === 'scroll-down';

  let groupTransforms = [];
  if (state.animation !== 'marquee' && !isScrollAnim) {
    groupTransforms = transforms.slice();
  }

  let groupAnimationCSS = '';
  let groupKeyframes = '';
  if (animationProp && ['bounce', 'float'].includes(state.animation)) {
    groupAnimationCSS = animationProp;
    groupKeyframes = animationKeyframes;
  } else if (animationProp && state.animation !== 'wave' && state.animation !== 'wiggle' &&
             state.animation !== 'zoom' && state.animation !== 'marquee' && !isScrollAnim) {
    styles.push(animationProp);
    groupKeyframes = animationKeyframes;
  }

  let textContent = '';
  const textY = Math.ceil(effectPadding + state.fontSize);

  let textAnchor = 'start';
  let textX = '0';
  if (state.textAlign === 'center') {
    textAnchor = 'middle';
    textX = '50%25';
  } else if (state.textAlign === 'right') {
    textAnchor = 'end';
    textX = '100%25';
  }

  const useMultiline = state.textMode === 'multi' && lines.length > 1 && state.animation !== 'marquee';
  const displayText = state.animation === 'marquee' ? state.text.replace(/\n/g, ' ') : state.text;

  let extraStyles = '';

  if (state.animation === 'wave') {
    const delay = 0.1;
    const charWidth = state.fontSize * 0.6;
    const step = charWidth + state.letterSpacing;
    const amp = Math.max(3, Math.round(state.fontSize * 0.25));
    const splines = '0.45 0 0.55 1;0.45 0 0.55 1';

    const buildLetters = (line, lineY, startIdx) => {
      const lineWidth = line.length > 0 ? line.length * step - state.letterSpacing : 0;
      const startX = state.textAlign === 'center' ? -(lineWidth / 2) : state.textAlign === 'right' ? -lineWidth : 0;
      const vals = `${lineY};${lineY - amp};${lineY}`;
      let letters = '';
      for (let i = 0; i < line.length; i++) {
        const char = escapeText(line[i] === ' ' ? '\u00A0' : line[i]);
        const lx = (startX + i * step).toFixed(1);
        const begin = ((startIdx + i) * delay).toFixed(1) + 's';
        letters += `<text x='${lx}' y='${lineY}'>${char}<animate attributeName='y' values='${vals}' dur='${speed}s' begin='${begin}' repeatCount='indefinite' calcMode='spline' keyTimes='0;0.5;1' keySplines='${splines}'/></text>`;
      }
      return letters;
    };

    if (useMultiline) {
      let inner = '', count = 0;
      lines.forEach((line, lineIdx) => {
        inner += buildLetters(line, textY + lineIdx * Math.ceil(lineHeight), count);
        count += line.length;
      });
      const anchorX = state.textAlign === 'center' ? '50%25' : '100%25';
      textContent = state.textAlign === 'left' ? inner : `<svg x='${anchorX}' overflow='visible'>${inner}</svg>`;
    } else {
      const inner = buildLetters(displayText, textY, 0);
      const anchorX = state.textAlign === 'center' ? '50%25' : '100%25';
      textContent = state.textAlign === 'left' ? inner : `<svg x='${anchorX}' overflow='visible'>${inner}</svg>`;
    }
  } else if (state.animation === 'marquee') {
    const text = displayText;
    const marqueeStyles = styles.join(';');
    const dir = state.marqueeDir || 'rtl';
    const isVert = dir === 'up' || dir === 'down';
    let keyframes, textEl;
    if (isVert) {
      const fromY = dir === 'up' ? '100%25' : '-100%25';
      const toY   = dir === 'up' ? '-100%25' : '100%25';
      keyframes = `@keyframes marq{from{transform:translateY%28${fromY}%29;}to{transform:translateY%28${toY}%29;}}`;
      textEl = `<text x='50%25' y='${textY}' text-anchor='middle'>${escapeText(text)}</text>`;
    } else if (dir === 'bounce') {
      keyframes = `@keyframes marq{0%25,100%25{transform:translateX%2880%25%29;}50%25{transform:translateX%28-80%25%29;}}`;
      textEl = `<text x='0' y='${textY}' text-anchor='start'>${escapeText(text)}</text>`;
    } else {
      const fromX = dir === 'ltr' ? '-100%25' : '100%25';
      const toX   = dir === 'ltr' ? '100%25'  : '-100%25';
      keyframes = `@keyframes marq{from{transform:translateX%28${fromX}%29;}to{transform:translateX%28${toX}%29;}}`;
      textEl = `<text x='0' y='${textY}' text-anchor='start'>${escapeText(text)}</text>`;
    }
    const animStyle = dir === 'bounce'
      ? `animation:marq ${speed * 3}s ease-in-out infinite;transform-box:view-box`
      : `animation:marq ${speed * 3}s linear infinite;transform-box:view-box`;
    const allStyles = `text{${marqueeStyles}}${keyframes}`;
    let scrollGroup;
    if (state.marqueeFade && !isVert) {
      defs += `<defs><mask id='fadeMask'><rect width='100%25' height='100%25' fill='white'/><rect width='15%25' height='100%25' fill='url%28%23fadeL%29'/><rect x='85%25' width='15%25' height='100%25' fill='url%28%23fadeR%29'/></mask><linearGradient id='fadeL' x1='0' x2='1'><stop offset='0' stop-color='black'/><stop offset='1' stop-color='white'/></linearGradient><linearGradient id='fadeR' x1='0' x2='1'><stop offset='0' stop-color='white'/><stop offset='1' stop-color='black'/></linearGradient></defs>`;
      scrollGroup = `<g style='mask:url%28%23fadeMask%29'><g style='${animStyle}'>${textEl}</g></g>`;
    } else if (state.marqueeFade && isVert) {
      defs += `<defs><mask id='fadeMask'><rect width='100%25' height='100%25' fill='white'/><rect width='100%25' height='15%25' fill='url%28%23fadeT%29'/><rect y='85%25' width='100%25' height='15%25' fill='url%28%23fadeB%29'/></mask><linearGradient id='fadeT' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='black'/><stop offset='1' stop-color='white'/></linearGradient><linearGradient id='fadeB' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='white'/><stop offset='1' stop-color='black'/></linearGradient></defs>`;
      scrollGroup = `<g style='mask:url%28%23fadeMask%29'><g style='${animStyle}'>${textEl}</g></g>`;
    } else {
      scrollGroup = `<g style='${animStyle}'>${textEl}</g>`;
    }
    const svg = `![](data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'>${defs}<style>/*<![CDATA[*/${allStyles}/*]]>*/</style>${scrollGroup}</svg>){100%:${totalHeight}}`;
    return svg;
  } else if (isScrollAnim) {
    const marqueeStyles = styles.join(';');
    const up = state.animation === 'scroll-up';
    const fromY = up ? '100%25' : '-100%25';
    const toY   = up ? '-100%25' : '100%25';
    const keyframes = `@keyframes marqv{from{transform:translateY%28${fromY}%29;}to{transform:translateY%28${toY}%29;}}`;
    const animStyle = `animation:marqv ${speed * 3}s linear infinite;transform-box:view-box`;
    let textEl;
    if (useMultiline) {
      const tspans = lines.map((line, i) =>
        `<tspan x='${textX}' ${i === 0 ? `y='${textY}'` : `dy='${Math.ceil(lineHeight)}'`}>${escapeText(line)}</tspan>`
      ).join('');
      textEl = `<text text-anchor='${textAnchor}'>${tspans}</text>`;
    } else {
      textEl = `<text x='50%25' y='${textY}' text-anchor='middle'>${escapeText(displayText)}</text>`;
    }
    const allStyles = `text{${marqueeStyles}}${keyframes}`;
    const scrollGroup = `<g style='${animStyle}'>${textEl}</g>`;
    const svg = `![](data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'>${defs}<style>/*<![CDATA[*/${allStyles}/*]]>*/</style>${scrollGroup}</svg>){100%:${totalHeight}}`;
    return svg;
  } else if (state.animation === 'wiggle' || state.animation === 'zoom') {
    const animName = state.animation;
    const keyframes = animName === 'wiggle'
      ? `@keyframes ${animName}{0%25,100%25{transform:rotate%280deg%29;}25%25{transform:rotate%283deg%29;}75%25{transform:rotate%28-3deg%29;}}`
      : `@keyframes ${animName}{0%25,100%25{transform:scale%281%29;}50%25{transform:scale%281.1%29;}}`;
    groupAnimationCSS = `animation:${animName} ${speed}s ease-in-out infinite;transform-origin:center;transform-box:fill-box`;
    extraStyles = keyframes;

    if (useMultiline) {
      const tspans = lines.map((line, i) => {
        return `<tspan x='${textX}' ${i === 0 ? `y='${textY}'` : `dy='${Math.ceil(lineHeight)}'`}>${escapeText(line)}</tspan>`;
      }).join('');
      textContent = `<text text-anchor='${textAnchor}'>${tspans}</text>`;
    } else {
      textContent = `<text x='${textX}' y='${textY}' text-anchor='${textAnchor}'>${escapeText(displayText)}</text>`;
    }
  } else if (useMultiline) {
    const tspans = lines.map((line, i) => {
      return `<tspan x='${textX}' ${i === 0 ? `y='${textY}'` : `dy='${Math.ceil(lineHeight)}'`}>${escapeText(line)}</tspan>`;
    }).join('');
    textContent = `<text text-anchor='${textAnchor}'>${tspans}</text>`;
  } else {
    textContent = `<text x='${textX}' y='${textY}' text-anchor='${textAnchor}'>${escapeText(displayText)}</text>`;
  }

  // had to do these manually because svg text-decoration doesn't work well in data uris
  let decorationElements = '';
  if (state.underline.enabled || state.overline.enabled) {
    const charWidth = state.fontSize * 0.6;

    function buildWavyPath(width, y, amp, wl) {
      const numSegments = Math.ceil((width * 2) / wl) + 2;
      let path = `M 0 ${y} q ${wl/4} ${-amp} ${wl/2} 0`;
      for (let i = 1; i < numSegments; i++) {
        path += ` t ${wl/2} 0`;
      }
      return path;
    }

   function generateLineDecor(lineText, baseY, xOffset) {
      let decor = '';
      const lineWidth = lineText.length * charWidth + state.letterSpacing * Math.max(0, lineText.length - 1);
      const ulY = baseY + state.fontSize * 0.15;
      const olY = baseY - state.fontSize * 0.85;

      if (state.underline.enabled) {
        const ulColor = state.underline.color.replace('#', '%23');
        const ulThickness = state.underline.thickness;
        if (state.underline.style === 'wavy') {
          const amp = ulThickness * 1.5, wl = ulThickness * 4;
          decor += `<path d='${buildWavyPath(lineWidth, ulY, amp, wl)}' fill='none' stroke='${ulColor}' stroke-width='${ulThickness}' transform='translate%28${xOffset},0%29'/>`;
        } else {
          const dash = state.underline.style === 'dashed' ? ` stroke-dasharray='${ulThickness * 3} ${ulThickness * 2}'` : '';
          decor += `<line x1='${xOffset}' y1='${ulY}' x2='${xOffset + lineWidth}' y2='${ulY}' stroke='${ulColor}' stroke-width='${ulThickness}'${dash}/>`;
        }
      }
      if (state.overline.enabled) {
        const olColor = state.overline.color.replace('#', '%23');
        const olThickness = state.overline.thickness;
        if (state.overline.style === 'wavy') {
          const amp = olThickness * 1.5, wl = olThickness * 4;
          decor += `<path d='${buildWavyPath(lineWidth, olY, amp, wl)}' fill='none' stroke='${olColor}' stroke-width='${olThickness}' transform='translate%28${xOffset},0%29'/>`;
        } else {
          const dash = state.overline.style === 'dashed' ? ` stroke-dasharray='${olThickness * 3} ${olThickness * 2}'` : '';
          decor += `<line x1='${xOffset}' y1='${olY}' x2='${xOffset + lineWidth}' y2='${olY}' stroke='${olColor}' stroke-width='${olThickness}'${dash}/>`;
        }
      }
      return decor;
    }

    if (useMultiline) {
      lines.forEach((line, i) => {
        const lineY = textY + i * Math.ceil(lineHeight);
        const lineWidth = line.length * charWidth + state.letterSpacing * Math.max(0, line.length - 1);
        decorationElements += `<g style='transform:translateX%28calc%28${state.textAlign === 'center' ? '50%25' : state.textAlign === 'right' ? '100%25' : '0%25'} - ${state.textAlign === 'center' ? lineWidth/2 : state.textAlign === 'right' ? lineWidth : 0}px%29%29'>${generateLineDecor(line, lineY, 0)}</g>`;
      });
    } else {
      const singleText = displayText.replace(/\n/g, ' ');
      const textWidth = singleText.length * charWidth + state.letterSpacing * Math.max(0, singleText.length - 1);
      decorationElements = generateLineDecor(singleText, textY, 0);
      let decorStyle = '';
      if (state.textAlign === 'center') {
        decorStyle = ` style='transform:translateX%28calc%2850%25 - ${textWidth/2}px%29%29'`;
      } else if (state.textAlign === 'right') {
        decorStyle = ` style='transform:translateX%28calc%28100%25 - ${textWidth}px%29%29'`;
      }
      decorationElements = `<g${decorStyle}>${decorationElements}</g>`;
    }
  }

  const styleStr = styles.join(';');

  // wrap content in group(s) for transforms and animations
  // use nested groups when both user transforms and transform-based animations exist
  // to prevent animation keyframes from overriding rotation/flip
  let content = `${textContent}${decorationElements}`;
  const transformAnimations = ['bounce', 'float', 'wiggle', 'zoom'];
  const hasTransformAnim = groupAnimationCSS && transformAnimations.includes(state.animation);
  const hasUserTransforms = groupTransforms.length > 0;

  if (hasUserTransforms && hasTransformAnim) {
    content = `<g style='${groupAnimationCSS}'>${content}</g>`;
    content = `<g style='transform:${groupTransforms.join(' ')};transform-origin:center center;transform-box:fill-box'>${content}</g>`;
  } else {
    const wrapperParts = [];
    if (hasUserTransforms) {
      wrapperParts.push(`transform:${groupTransforms.join(' ')}`);
      wrapperParts.push('transform-origin:center center');
      wrapperParts.push('transform-box:fill-box');
    }
    if (groupAnimationCSS) {
      wrapperParts.push(groupAnimationCSS);
    }
    if (wrapperParts.length > 0) {
      content = `<g style='${wrapperParts.join(';')}'>${content}</g>`;
    }
  }

    const allExtraStyles = extraStyles + groupKeyframes;
  const svg = `![](data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'>${defs}<style>/*<![CDATA[*/text{${styleStr}}${allExtraStyles}/*]]>*/</style>${content}</svg>){100%:${totalHeight}}`;

  return svg;
}

// escape special characters for svg/xml
// also url-encode stuff that breaks data uris
function escapeText(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/#/g, '%23');
}

function hexToRgba(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba%28${r},${g},${b},${opacity}%29`;
}

function hexToRgbaPlain(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}

// basically the same as generateCode but outputs regular svg for the preview
// not url-encoded so it actually renders in the browser
// yeah there's some code duplication here but it works
function updatePreview() {
  const code = generateCode();
  document.getElementById('codeOutput').textContent = code;

  const lines = state.textMode === 'multi' ? state.text.split('\n') : [state.text];
  const lineHeight = state.fontSize * 1.3;

  const effectPadding = Math.max(
    state.glowEnabled ? state.glowSize * 2 : 0,
    state.shadowEnabled ? Math.abs(state.shadowY) + state.shadowBlur : 0,
    state.outlineEnabled ? state.outlineWidth * 2 : 0,
    state.animation === 'bounce' || state.animation === 'float' || state.animation === 'wave' ? 15 : 0,
    state.animation === 'zoom' ? state.fontSize * 0.15 : 0
  );
  const totalHeight = Math.ceil(lines.length * lineHeight + effectPadding * 2 + state.fontSize * 0.3);

  let styles = [];
  let defs = '';

  styles.push(`font-family:${state.font.family}`);
  styles.push(`font-size:${state.fontSize}px`);

  const effectiveWeight = state.effects.bold ? Math.max(state.fontWeight, 700) : state.fontWeight;
  styles.push(`font-weight:${effectiveWeight}`);

  if (state.colorMode === 'gradient') {
    const dirs = {
      'right': { x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
      'left': { x1: '100%', y1: '0%', x2: '0%', y2: '0%' },
      'down': { x1: '0%', y1: '0%', x2: '0%', y2: '100%' },
      'up': { x1: '0%', y1: '100%', x2: '0%', y2: '0%' }
    };
    const d = dirs[state.gradientDir];
    const gradOpacity = state.gradientOpacity < 1 ? ` stop-opacity="${state.gradientOpacity}"` : '';
    defs = `<defs><linearGradient id="gp" x1="${d.x1}" y1="${d.y1}" x2="${d.x2}" y2="${d.y2}"><stop offset="0%" stop-color="${state.gradientStart}"${gradOpacity}/><stop offset="100%" stop-color="${state.gradientEnd}"${gradOpacity}/></linearGradient></defs>`;
    styles.push('fill:url(#gp)');
  } else {
    styles.push(`fill:${state.solidColor}`);
    if (state.solidOpacity < 1) {
      styles.push(`fill-opacity:${state.solidOpacity}`);
    }
  }

  if (state.outlineEnabled) {
    styles.push(`stroke:${state.outlineColor}`);
    styles.push(`stroke-width:${state.outlineWidth}`);
    styles.push('paint-order:stroke fill');
  }

  if (state.effects.italic) styles.push('font-style:italic');
  if (state.letterSpacing > 0) styles.push(`letter-spacing:${state.letterSpacing}px`);

  let transforms = [];
  if (state.transform.rotate !== 0) {
    transforms.push(`rotate(${state.transform.rotate}deg)`);
  }
  if (state.transform.flipH) {
    transforms.push('scaleX(-1)');
  }
  if (state.transform.flipV) {
    transforms.push('scaleY(-1)');
  }

  let filters = [];
  let staticFilters = [];
  if (state.effects.blur) filters.push('blur(1px)');
  if (state.shadowEnabled) {
    const shadowColorWithOpacity = hexToRgbaPlain(state.shadowColor, state.shadowOpacity);
    const shadowFilter = `drop-shadow(${state.shadowX}px ${state.shadowY}px ${state.shadowBlur}px ${shadowColorWithOpacity})`;
    filters.push(shadowFilter);
    staticFilters.push(shadowFilter);
  }
  if (state.glowEnabled) {
    const glowColorWithOpacity = hexToRgbaPlain(state.glowColor, state.glowOpacity);
    filters.push(`drop-shadow(0 0 ${state.glowSize}px ${glowColorWithOpacity})`);
  }

  let animationProp = '';
  let animationKeyframes = '';
  const speed = state.animSpeed;

  switch (state.animation) {
    case 'bounce':
      animationProp = `animation:bounce ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes bounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-5px);}}`;
      break;
    case 'pulse':
      animationProp = `animation:pulse ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}`;
      break;
    case 'glow-pulse':
      const baseFilters = staticFilters.length > 0 ? staticFilters.join(' ') + ' ' : '';
      animationProp = `animation:glowp ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes glowp{0%,100%{filter:${baseFilters}drop-shadow(0 0 2px ${state.glowColor});}50%{filter:${baseFilters}drop-shadow(0 0 10px ${state.glowColor});}}`;
      filters = staticFilters.slice();
      break;
    case 'color-shift':
      animationProp = `animation:colorshift ${speed}s linear infinite`;
      animationKeyframes = `@keyframes colorshift{0%{fill:#ff69b4;}33%{fill:#00ffff;}66%{fill:#ffd700;}100%{fill:#ff69b4;}}`;
      break;
    case 'float':
      animationProp = `animation:float ${speed}s ease-in-out infinite`;
      animationKeyframes = `@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}`;
      break;
    case 'wiggle':
    case 'zoom':
    case 'wave':
    case 'marquee':
    case 'scroll-up':
    case 'scroll-down':
      break;
  }

  if (filters.length > 0 && state.animation !== 'glow-pulse') {
    styles.push(`filter:${filters.join(' ')}`);
  }

  const isScrollAnim = state.animation === 'scroll-up' || state.animation === 'scroll-down';

  let groupTransforms = [];
  if (state.animation !== 'marquee' && !isScrollAnim) {
    groupTransforms = transforms.slice();
  }

  let groupAnimationCSS = '';
  let groupKeyframes = '';
  if (animationProp && ['bounce', 'float'].includes(state.animation)) {
    groupAnimationCSS = animationProp;
    groupKeyframes = animationKeyframes;
  } else if (animationProp && state.animation !== 'wave' && state.animation !== 'wiggle' &&
             state.animation !== 'zoom' && state.animation !== 'marquee' && !isScrollAnim) {
    styles.push(animationProp);
    groupKeyframes = animationKeyframes;
  }

  let textAnchor = 'start';
  let textX = '0';
  if (state.textAlign === 'center') {
    textAnchor = 'middle';
    textX = '50%';
  } else if (state.textAlign === 'right') {
    textAnchor = 'end';
    textX = '100%';
  }

  const textY = Math.ceil(effectPadding + state.fontSize);
  let textContent = '';
  let extraStyles = '';
  let allExtraStyles = '';

  const useMultiline = state.textMode === 'multi' && lines.length > 1 && state.animation !== 'marquee';
  const displayText = state.animation === 'marquee' ? state.text.replace(/\n/g, ' ') : state.text;

  if (state.animation === 'wave') {
    const delay = 0.1;
    const charWidth = state.fontSize * 0.6;
    const step = charWidth + state.letterSpacing;
    const amp = Math.max(3, Math.round(state.fontSize * 0.25));
    const splines = '0.45 0 0.55 1;0.45 0 0.55 1';

    const buildLetters = (line, lineY, startIdx) => {
      const lineWidth = line.length > 0 ? line.length * step - state.letterSpacing : 0;
      const startX = state.textAlign === 'center' ? -(lineWidth / 2) : state.textAlign === 'right' ? -lineWidth : 0;
      const vals = `${lineY};${lineY - amp};${lineY}`;
      let letters = '';
      for (let i = 0; i < line.length; i++) {
        const char = escapeHTML(line[i] === ' ' ? '\u00A0' : line[i]);
        const lx = (startX + i * step).toFixed(1);
        const begin = ((startIdx + i) * delay).toFixed(1) + 's';
        letters += `<text x="${lx}" y="${lineY}">${char}<animate attributeName="y" values="${vals}" dur="${speed}s" begin="${begin}" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="${splines}"/></text>`;
      }
      return letters;
    };

    if (useMultiline) {
      let inner = '', count = 0;
      lines.forEach((line, lineIdx) => {
        inner += buildLetters(line, textY + lineIdx * Math.ceil(lineHeight), count);
        count += line.length;
      });
      const anchorX = state.textAlign === 'center' ? '50%' : '100%';
      textContent = state.textAlign === 'left' ? inner : `<svg x="${anchorX}" overflow="visible">${inner}</svg>`;
    } else {
      const inner = buildLetters(displayText, textY, 0);
      const anchorX = state.textAlign === 'center' ? '50%' : '100%';
      textContent = state.textAlign === 'left' ? inner : `<svg x="${anchorX}" overflow="visible">${inner}</svg>`;
    }
  } else if (state.animation === 'marquee') {
    const text = displayText;
    const dir = state.marqueeDir || 'rtl';
    const isVert = dir === 'up' || dir === 'down';
    let textEl;
    if (isVert) {
      const fromY = dir === 'up' ? '100%' : '-100%';
      const toY   = dir === 'up' ? '-100%' : '100%';
      extraStyles = `@keyframes marq{from{transform:translateY(${fromY});}to{transform:translateY(${toY});}}`;
      textEl = `<text x="50%" y="${textY}" text-anchor="middle">${escapeHTML(text)}</text>`;
    } else if (dir === 'bounce') {
      extraStyles = `@keyframes marq{0%,100%{transform:translateX(80%);}50%{transform:translateX(-80%);}}`;
      textEl = `<text x="0" y="${textY}" text-anchor="start">${escapeHTML(text)}</text>`;
    } else {
      const fromX = dir === 'ltr' ? '-100%' : '100%';
      const toX   = dir === 'ltr' ? '100%'  : '-100%';
      extraStyles = `@keyframes marq{from{transform:translateX(${fromX});}to{transform:translateX(${toX});}}`;
      textEl = `<text x="0" y="${textY}" text-anchor="start">${escapeHTML(text)}</text>`;
    }
    const animStyle = dir === 'bounce'
      ? `animation:marq ${speed * 3}s ease-in-out infinite;transform-box:view-box`
      : `animation:marq ${speed * 3}s linear infinite;transform-box:view-box`;
    if (state.marqueeFade && !isVert) {
      defs += `<defs><mask id="fadeMask"><rect width="100%" height="100%" fill="white"/><rect width="15%" height="100%" fill="url(#fadeL)"/><rect x="85%" width="15%" height="100%" fill="url(#fadeR)"/></mask><linearGradient id="fadeL" x1="0" x2="1"><stop offset="0" stop-color="black"/><stop offset="1" stop-color="white"/></linearGradient><linearGradient id="fadeR" x1="0" x2="1"><stop offset="0" stop-color="white"/><stop offset="1" stop-color="black"/></linearGradient></defs>`;
      textContent = `<g style="mask:url(#fadeMask)"><g style="${animStyle}">${textEl}</g></g>`;
      groupAnimationCSS = '';
    } else if (state.marqueeFade && isVert) {
      defs += `<defs><mask id="fadeMask"><rect width="100%" height="100%" fill="white"/><rect width="100%" height="15%" fill="url(#fadeT)"/><rect y="85%" width="100%" height="15%" fill="url(#fadeB)"/></mask><linearGradient id="fadeT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="black"/><stop offset="1" stop-color="white"/></linearGradient><linearGradient id="fadeB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="white"/><stop offset="1" stop-color="black"/></linearGradient></defs>`;
      textContent = `<g style="mask:url(#fadeMask)"><g style="${animStyle}">${textEl}</g></g>`;
      groupAnimationCSS = '';
    } else {
      textContent = textEl;
      groupAnimationCSS = animStyle;
    }
  } else if (isScrollAnim) {
    const up = state.animation === 'scroll-up';
    const fromY = up ? '100%' : '-100%';
    const toY   = up ? '-100%' : '100%';
    extraStyles = `@keyframes marqv{from{transform:translateY(${fromY});}to{transform:translateY(${toY});}}`;
    const animStyle = `animation:marqv ${speed * 3}s linear infinite;transform-box:view-box`;
    if (useMultiline) {
      const tspans = lines.map((line, i) =>
        `<tspan x="${textX}" ${i === 0 ? `y="${textY}"` : `dy="${Math.ceil(lineHeight)}"`}>${escapeHTML(line)}</tspan>`
      ).join('');
      textContent = `<text text-anchor="${textAnchor}">${tspans}</text>`;
    } else {
      textContent = `<text x="50%" y="${textY}" text-anchor="middle">${escapeHTML(displayText)}</text>`;
    }
    groupAnimationCSS = animStyle;
  } else if (state.animation === 'wiggle' || state.animation === 'zoom') {
    const animName = state.animation;
    const keyframes = animName === 'wiggle'
      ? `@keyframes ${animName}{0%,100%{transform:rotate(0deg);}25%{transform:rotate(3deg);}75%{transform:rotate(-3deg);}}`
      : `@keyframes ${animName}{0%,100%{transform:scale(1);}50%{transform:scale(1.1);}}`;
    extraStyles = keyframes;
    groupAnimationCSS = `animation:${animName} ${speed}s ease-in-out infinite;transform-origin:center;transform-box:fill-box;`;

    if (useMultiline) {
      const tspans = lines.map((line, i) => {
        return `<tspan x="${textX}" ${i === 0 ? `y="${textY}"` : `dy="${Math.ceil(lineHeight)}"`}>${escapeHTML(line)}</tspan>`;
      }).join('');
      textContent = `<text text-anchor="${textAnchor}">${tspans}</text>`;
    } else {
      textContent = `<text x="${textX}" y="${textY}" text-anchor="${textAnchor}">${escapeHTML(displayText)}</text>`;
    }
  } else if (useMultiline) {
    const tspans = lines.map((line, i) => {
      return `<tspan x="${textX}" ${i === 0 ? `y="${textY}"` : `dy="${Math.ceil(lineHeight)}"`}>${escapeHTML(line)}</tspan>`;
    }).join('');
    textContent = `<text text-anchor="${textAnchor}">${tspans}</text>`;
  } else {
    textContent = `<text x="${textX}" y="${textY}" text-anchor="${textAnchor}">${escapeHTML(displayText)}</text>`;
  }

  let decorationElements = '';
  if (state.underline.enabled || state.overline.enabled) {
    const charWidth = state.fontSize * 0.6;

    function buildWavyPathPreview(width, y, amp, wl) {
      const numSegments = Math.ceil((width * 2) / wl) + 2;
      let path = `M 0 ${y} q ${wl/4} ${-amp} ${wl/2} 0`;
      for (let i = 1; i < numSegments; i++) {
        path += ` t ${wl/2} 0`;
      }
      return path;
    }

    function generateLineDecorPreview(lineText, baseY, xOffset) {
      let decor = '';
      const lineWidth = lineText.length * charWidth + state.letterSpacing * Math.max(0, lineText.length - 1);
      const ulY = baseY + state.fontSize * 0.15;
      const olY = baseY - state.fontSize * 0.85;

      if (state.underline.enabled) {
        const ulColor = state.underline.color;
        const ulThickness = state.underline.thickness;
        if (state.underline.style === 'wavy') {
          const amp = ulThickness * 1.5, wl = ulThickness * 4;
          decor += `<path d="${buildWavyPathPreview(lineWidth, ulY, amp, wl)}" fill="none" stroke="${ulColor}" stroke-width="${ulThickness}" transform="translate(${xOffset},0)"/>`;
        } else {
          const dash = state.underline.style === 'dashed' ? ` stroke-dasharray="${ulThickness * 3} ${ulThickness * 2}"` : '';
          decor += `<line x1="${xOffset}" y1="${ulY}" x2="${xOffset + lineWidth}" y2="${ulY}" stroke="${ulColor}" stroke-width="${ulThickness}"${dash}/>`;
        }
      }
      if (state.overline.enabled) {
        const olColor = state.overline.color;
        const olThickness = state.overline.thickness;
        if (state.overline.style === 'wavy') {
          const amp = olThickness * 1.5, wl = olThickness * 4;
          decor += `<path d="${buildWavyPathPreview(lineWidth, olY, amp, wl)}" fill="none" stroke="${olColor}" stroke-width="${olThickness}" transform="translate(${xOffset},0)"/>`;
        } else {
          const dash = state.overline.style === 'dashed' ? ` stroke-dasharray="${olThickness * 3} ${olThickness * 2}"` : '';
          decor += `<line x1="${xOffset}" y1="${olY}" x2="${xOffset + lineWidth}" y2="${olY}" stroke="${olColor}" stroke-width="${olThickness}"${dash}/>`;
        }
      }
      return decor;
    }

    if (useMultiline) {
      lines.forEach((line, i) => {
        const lineY = textY + i * Math.ceil(lineHeight);
        const lineWidth = line.length * charWidth + state.letterSpacing * Math.max(0, line.length - 1);
        const alignStyle = state.textAlign === 'center' ? `calc(50% - ${lineWidth/2}px)` :
                           state.textAlign === 'right' ? `calc(100% - ${lineWidth}px)` : '0';
        decorationElements += `<g style="transform:translateX(${alignStyle})">${generateLineDecorPreview(line, lineY, 0)}</g>`;
      });
    } else {
      const singleText = displayText.replace(/\n/g, ' ');
      const textWidth = singleText.length * charWidth + state.letterSpacing * Math.max(0, singleText.length - 1);
      decorationElements = generateLineDecorPreview(singleText, textY, 0);
      let decorStyle = '';
      if (state.textAlign === 'center') {
        decorStyle = ` style="transform:translateX(calc(50% - ${textWidth/2}px))"`;
      } else if (state.textAlign === 'right') {
        decorStyle = ` style="transform:translateX(calc(100% - ${textWidth}px))"`;
      }
      decorationElements = `<g${decorStyle}>${decorationElements}</g>`;
    }
  }

  let content = `${textContent}${decorationElements}`;
  const transformAnimations = ['bounce', 'float', 'wiggle', 'zoom'];
  const hasTransformAnim = groupAnimationCSS && transformAnimations.includes(state.animation);
  const hasUserTransforms = groupTransforms.length > 0;

  if (hasUserTransforms && hasTransformAnim) {
    content = `<g style="${groupAnimationCSS}">${content}</g>`;
    content = `<g style="transform:${groupTransforms.join(' ')};transform-origin:center center;transform-box:fill-box">${content}</g>`;
  } else {
    const wrapperParts = [];
    if (hasUserTransforms) {
      wrapperParts.push(`transform:${groupTransforms.join(' ')}`);
      wrapperParts.push('transform-origin:center center');
      wrapperParts.push('transform-box:fill-box');
    }
    if (groupAnimationCSS) {
      wrapperParts.push(groupAnimationCSS);
    }
    if (wrapperParts.length > 0) {
      content = `<g style="${wrapperParts.join(';')}">${content}</g>`;
    }
  }

  allExtraStyles = extraStyles + groupKeyframes;
  const previewSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="${Math.max(totalHeight, 80)}">${defs}<style>text{${styles.join(';')}}${allExtraStyles}</style>${content}</svg>`;

  document.getElementById('previewContent').innerHTML = previewSVG;
}

function escapeHTML(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

document.addEventListener('DOMContentLoaded', () => {
  initFontGrid();
  initEventListeners();
  updatePreview();
});
