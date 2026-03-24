(function () {
  var t = localStorage.getItem('rentried-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
})();

var _NAV = [
  { key: 'svg-generator',  href: '../svg-generator/',                   label: 'SVG Generator'  },
  { key: 'gradient-text',  href: '../gradient-text/gradient-text.html', label: 'Gradient Text'  },
  { key: 'dividers',       href: '../dividers/dividers.html',           label: 'Dividers'        },
  { key: 'spotify-widget', href: '../spotify-widget/',                  label: 'Spotify Widget'  },
  { key: 'circle-widget',  href: '../circle-widget/',                   label: 'Circle Widget'   },
  { key: 'experimental',   href: '../experimental/',                    label: 'Experimental'    },
];

function toggleTheme() {
  var html = document.documentElement;
  var t = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', t);
  localStorage.setItem('rentried-theme', t);
  var btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = t === 'dark' ? '◑' : '◐';
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const activePage = this.getAttribute('active-page') || '';
    const theme = localStorage.getItem('rentried-theme') || 'dark';
    const themeIcon = theme === 'dark' ? '◑' : '◐';

    const desktopLinks = _NAV.map((item, i) => {
      const active = item.key === activePage ? ' active' : '';
      const sep = i > 0 ? '<span class="nav-sep">·</span>' : '';
      return `${sep}<a href="${item.href}" class="nav-link${active}">${item.label}</a>`;
    }).join('');

    const dropdownItems = _NAV.map(item => {
      const active = item.key === activePage ? ' active' : '';
      return `<li><a class="nav-dropdown-item${active}" href="${item.href}">${item.label}</a></li>`;
    }).join('');

    const activeItem = _NAV.find(item => item.key === activePage);
    const activeLabel = activeItem ? activeItem.label : 'Menu';

    this.innerHTML = `
      <header class="site-header">
        <a href="../" class="site-logo">Rentried</a>
        <span class="nav-sep d-none d-md-inline">·</span>
        <nav class="site-nav d-none d-md-flex">${desktopLinks}</nav>
        <div class="dropdown d-md-none ms-2">
          <button class="nav-dropdown-btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">${activeLabel}</button>
          <ul class="nav-dropdown-menu dropdown-menu">${dropdownItems}</ul>
        </div>
        <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme">${themeIcon}</button>
      </header>`;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="page">
          Not affiliated with Rentry.co · Made by <a href="https://github.com/trailblase" target="_blank">trailblase</a> · <a href="https://orion.atabook.org/" target="_blank">Contact / Issues</a>
        </div>
      </footer>`;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);

function _restoreInputs(toolName) {
  var raw = localStorage.getItem('rentried-settings-' + toolName);
  if (!raw) return;
  var data;
  try { data = JSON.parse(raw); } catch (e) { return; }

  Object.keys(data).forEach(function (id) {
    var el = document.getElementById(id);
    if (!el || el.type === 'file') return;
    if (el.type === 'checkbox') {
      el.checked = !!data[id];
      el.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      el.value = data[id];
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
}

function _initPersistence(toolName) {
  var key = 'rentried-settings-' + toolName;

  function save(e) {
    var el = e.target;
    if (!el.id || el.type === 'file') return;
    var raw = localStorage.getItem(key);
    var data = {};
    try { if (raw) data = JSON.parse(raw); } catch (e) {}
    data[el.id] = el.type === 'checkbox' ? el.checked : el.value;
    localStorage.setItem(key, JSON.stringify(data));
  }

  document.addEventListener('input', save);
  document.addEventListener('change', save);
}

function _copyFromOutput() {
  var el = document.getElementById('codeOutput') || document.getElementById('output');
  if (!el) return;
  navigator.clipboard.writeText(el.textContent).then(function () {
    var btn = document.getElementById('copyBtn');
    if (!btn) return;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(function () { btn.textContent = 'Copy Code'; btn.classList.remove('copied'); }, 2000);
  });
}
var copyCode = _copyFromOutput;
var copyOutput = _copyFromOutput;

document.addEventListener('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    var btn = document.getElementById('copyBtn');
    if (btn) { e.preventDefault(); btn.click(); }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var page = document.body.dataset.page;
  if (!page) return;
  _restoreInputs(page);
  _initPersistence(page);
});
