function updateHex(input) {
  const hex = input.value.toUpperCase();
  input.parentElement.querySelector('.color-hex').textContent = hex;
  updateGradientBar();
  generate();
}

function getColors() {
  const inputs = document.querySelectorAll('#colorStops input[type="color"]');
  return Array.from(inputs).map(input => input.value.toUpperCase());
}

function updateGradientBar() {
  const colors = getColors();
  const bar = document.getElementById('gradientBar');
  bar.style.background = `linear-gradient(to right, ${colors.join(', ')})`;
}

function addColor() {
  const container = document.getElementById('colorStops');
  const addBtn = container.querySelector('.add-color-btn');
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
  const newStop = document.createElement('div');
  newStop.className = 'color-stop';
  newStop.innerHTML = `
    <input type="color" value="${randomColor}" onchange="updateHex(this)">
    <span class="color-hex">${randomColor}</span>
    <button class="remove-btn" onclick="removeColor(this)">×</button>
  `;
  container.insertBefore(newStop, addBtn);
  updateGradientBar();
  generate();
}

function removeColor(btn) {
  const stops = document.querySelectorAll('.color-stop');
  if (stops.length <= 2) {
    alert('You need at least 2 colors for a gradient!');
    return;
  }
  btn.parentElement.remove();
  updateGradientBar();
  generate();
}

function importColors(raw) {
  const str = raw.trim();
  const btn = document.getElementById('importBtn');
  function feedback(msg) {
    if (!btn) return;
    btn.textContent = msg;
    setTimeout(() => { btn.textContent = 'Import'; }, 1500);
  }

  if (!str) { feedback('Empty'); return; }

  // coolors.co URL
  const coolorsMatch = str.match(/coolors\.co\/([a-fA-F0-9\-]+)/);
  if (coolorsMatch) {
    const cols = coolorsMatch[1]
      .split('-')
      .filter(s => /^[a-fA-F0-9]{6}$/.test(s))
      .map(s => '#' + s.toUpperCase());
    if (cols.length >= 1) {
      addColors(cols);
      document.getElementById('importInput').value = '';
      feedback('Imported!');
      return;
    }
  }

  // hex codes (with or without #)
  const cols = [...new Set(
    str.split(/[^a-fA-F0-9]+/)
      .filter(s => /^[a-fA-F0-9]{6}$/.test(s))
      .map(s => '#' + s.toUpperCase())
  )];

  if (cols.length < 1) { feedback('No colors found'); return; }
  addColors(cols);
  document.getElementById('importInput').value = '';
  feedback('Imported!');
}

function addColors(colors) {
  const container = document.getElementById('colorStops');
  const addBtn = container.querySelector('.add-color-btn');
  colors.forEach(color => {
    const hex = color.toUpperCase();
    const newStop = document.createElement('div');
    newStop.className = 'color-stop';
    newStop.innerHTML = `
      <input type="color" value="${hex}" onchange="updateHex(this)">
      <span class="color-hex">${hex}</span>
      <button class="remove-btn" onclick="removeColor(this)">×</button>
    `;
    container.insertBefore(newStop, addBtn);
  });
  updateGradientBar();
  generate();
}

function applyPreset(colors) {
  const container = document.getElementById('colorStops');
  const addBtn = container.querySelector('.add-color-btn');
  container.querySelectorAll('.color-stop').forEach(stop => stop.remove());
  colors.forEach(color => {
    const hex = color.toUpperCase();
    const newStop = document.createElement('div');
    newStop.className = 'color-stop';
    newStop.innerHTML = `
      <input type="color" value="${hex}" onchange="updateHex(this)">
      <span class="color-hex">${hex}</span>
      <button class="remove-btn" onclick="removeColor(this)">×</button>
    `;
    container.insertBefore(newStop, addBtn);
  });
  updateGradientBar();
  generate();
}

function lerpColor(a, b, amount) {
  const ah = parseInt(a.replace(/#/g, ''), 16);
  const ar = ah >> 16, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
  const bh = parseInt(b.replace(/#/g, ''), 16);
  const br = bh >> 16, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
  const rr = Math.round(ar + amount * (br - ar));
  const rg = Math.round(ag + amount * (bg - ag));
  const rb = Math.round(ab + amount * (bb - ab));
  return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb).toString(16).slice(1).toUpperCase();
}

function getGradientColor(colors, position) {
  if (colors.length === 1) return colors[0];
  if (position <= 0) return colors[0];
  if (position >= 1) return colors[colors.length - 1];
  const segments = colors.length - 1;
  const scaledPos = position * segments;
  const segmentIndex = Math.floor(scaledPos);
  const segmentProgress = scaledPos - segmentIndex;
  const startIndex = Math.min(segmentIndex, colors.length - 2);
  const endIndex = startIndex + 1;
  return lerpColor(colors[startIndex], colors[endIndex], segmentProgress);
}

function generate() {
  const text = document.getElementById('textInput').value;
  const colors = getColors();
  let output = '';
  let previewHtml = '';

  if (text.length === 0) {
    document.getElementById('output').textContent = '';
    document.getElementById('preview').innerHTML = '<span style="color: var(--text-subtle)">Enter some text above</span>';
    return;
  }

  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    const position = text.length === 1 ? 0 : i / (text.length - 1);
    const color = getGradientColor(colors, position);
    if (char === ' ') {
      output += ' ';
      previewHtml += `<span style="color:${color}">&nbsp;</span>`;
    } else {
      output += '%' + color + '%' + char + '%%';
      previewHtml += `<span style="color:${color}">${escapeHtml(char)}</span>`;
    }
  }

  document.getElementById('output').textContent = output;
  document.getElementById('preview').innerHTML = previewHtml;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function copyOutput() {
  const output = document.getElementById('output');
  navigator.clipboard.writeText(output.textContent);
  const btn = document.getElementById('copyBtn');
  const originalText = btn.textContent;
  btn.textContent = 'Copied!';
  btn.classList.add('copied');
  setTimeout(() => {
    btn.textContent = originalText;
    btn.classList.remove('copied');
  }, 2000);
}

document.getElementById('textInput').addEventListener('input', generate);

updateGradientBar();
generate();
