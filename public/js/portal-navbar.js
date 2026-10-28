/**
 * Web Component: <portal-navbar>
 * Barra de navegación unificada para el Portal de Informes Epidemiológicos
 * de la Dirección Provincial de Epidemiología de Catamarca.
 */
class PortalNavbar extends HTMLElement {
  static get observedAttributes() {
    return ['reports', 'portal-url', 'home-url', 'brand-title'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Valores por defecto
    this._portalUrl = 'https://portal.catamarca.gob.ar/organismos/direccion-provincial-de-epidemiologia';
    this._homeUrl = 'index.html';
    this._brandTitle = 'Portal de Informes';
    this._reports = [
      {
        title: 'Análisis UC IRAG HINEP 2025',
        url: 'Analisis_UC_IRAG_HINEP_2025.html'
      }
    ];

    this._isOpen = false;
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  connectedCallback() {
    this._updateFromAttributes();
    this.render();
    document.addEventListener('click', this._handleDocumentClick);
    document.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._handleDocumentClick);
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._updateFromAttributes();
      if (this.shadowRoot.innerHTML !== '') {
        this.render();
      }
    }
  }

  _updateFromAttributes() {
    if (this.hasAttribute('portal-url')) {
      this._portalUrl = this.getAttribute('portal-url');
    }
    if (this.hasAttribute('home-url')) {
      this._homeUrl = this.getAttribute('home-url');
    }
    if (this.hasAttribute('brand-title')) {
      this._brandTitle = this.getAttribute('brand-title');
    }
    if (this.hasAttribute('reports')) {
      try {
        const parsed = JSON.parse(this.getAttribute('reports'));
        if (Array.isArray(parsed)) {
          this._reports = parsed;
        }
      } catch (err) {
        console.warn('portal-navbar: Error al parsear atributo "reports" JSON.', err);
      }
    }
  }

  get reports() {
    return this._reports;
  }

  set reports(val) {
    if (Array.isArray(val)) {
      this._reports = val;
      this.render();
    }
  }

  /**
   * Permite añadir un nuevo informe en tiempo de ejecución.
   * @param {string} title
   * @param {string} url
   */
  addReport(title, url) {
    this._reports.push({ title, url });
    this.render();
  }

  /**
   * Reemplaza la lista completa de informes.
   * @param {Array<{title: string, url: string}>} list
   */
  setReports(list) {
    this.reports = list;
  }

  _toggleDropdown(e) {
    if (e) e.stopPropagation();
    this._isOpen = !this._isOpen;
    const menu = this.shadowRoot.getElementById('reports-menu');
    const btn = this.shadowRoot.getElementById('dropdown-btn');
    if (menu && btn) {
      menu.classList.toggle('open', this._isOpen);
      btn.setAttribute('aria-expanded', String(this._isOpen));
    }
  }

  _closeDropdown() {
    if (this._isOpen) {
      this._isOpen = false;
      const menu = this.shadowRoot.getElementById('reports-menu');
      const btn = this.shadowRoot.getElementById('dropdown-btn');
      if (menu && btn) {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    }
  }

  _handleDocumentClick(e) {
    if (this._isOpen) {
      const isClickInside = e.composedPath().includes(this);
      if (!isClickInside) {
        this._closeDropdown();
      }
    }
  }

  _handleKeyDown(e) {
    if (e.key === 'Escape' && this._isOpen) {
      this._closeDropdown();
      const btn = this.shadowRoot.getElementById('dropdown-btn');
      if (btn) btn.focus();
    }
  }

  render() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const reportsHtml = this._reports.length > 0
      ? this._reports.map(report => {
          const isActive = currentPath === report.url;
          return `
            <li>
              <a href="${report.url}" class="dropdown-item ${isActive ? 'active' : ''}" role="menuitem">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span>${report.title}</span>
              </a>
            </li>
          `;
        }).join('')
      : `<li class="dropdown-empty">No hay otros informes registrados</li>`;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          background: linear-gradient(135deg, #082f49 0%, #0c4a6e 100%);
          border-bottom: 3px solid #0284c7;
          box-shadow: 0 4px 12px rgba(8, 47, 73, 0.25);
        }

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.65rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .brand-link {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          color: #ffffff;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: -0.01em;
          transition: opacity 0.2s ease;
        }

        .brand-link:hover {
          opacity: 0.9;
        }

        .brand-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background-color: rgba(224, 242, 254, 0.15);
          color: #38bdf8;
          border: 1px solid rgba(224, 242, 254, 0.25);
        }

        /* Menú desplegable */
        .dropdown {
          position: relative;
          display: inline-block;
        }

        .dropdown-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(224, 242, 254, 0.2);
          color: #e0f2fe;
          padding: 0.45rem 0.85rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dropdown-btn:hover,
        .dropdown-btn[aria-expanded="true"] {
          background: rgba(255, 255, 255, 0.18);
          color: #ffffff;
          border-color: rgba(224, 242, 254, 0.4);
        }

        .chevron {
          transition: transform 0.2s ease;
        }

        .dropdown-btn[aria-expanded="true"] .chevron {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          display: none;
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          min-width: 290px;
          max-width: 360px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          box-shadow: 0 10px 25px -5px rgba(7, 89, 133, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          padding: 0.5rem 0;
          list-style: none;
          z-index: 1010;
        }

        .dropdown-menu.open {
          display: block;
          animation: dropdownFadeIn 0.18s ease-out;
        }

        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-header {
          padding: 0.4rem 1rem 0.3rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          border-bottom: 1px solid #f1f5f9;
          margin-bottom: 0.3rem;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.6rem 1rem;
          color: #1e293b;
          text-decoration: none;
          font-size: 0.88rem;
          line-height: 1.35;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .dropdown-item:hover {
          background-color: #f0f9ff;
          color: #0369a1;
        }

        .dropdown-item.active {
          font-weight: 600;
          background-color: #e0f2fe;
          color: #0369a1;
          border-left: 3px solid #0284c7;
        }

        .dropdown-divider {
          height: 1px;
          background-color: #e2e8f0;
          margin: 0.4rem 0;
        }

        .dropdown-empty {
          padding: 0.75rem 1rem;
          font-size: 0.85rem;
          color: #94a3b8;
          font-style: italic;
        }

        /* Enlace saliente destacado hacia el portal provincial */
        .portal-exit-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(224, 242, 254, 0.12);
          border: 1px solid rgba(224, 242, 254, 0.35);
          color: #ffffff;
          padding: 0.45rem 1rem;
          border-radius: 9999px;
          font-size: 0.86rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.22s ease-in-out;
          white-space: nowrap;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .portal-exit-btn:hover {
          background: #0284c7;
          border-color: #38bdf8;
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);
        }

        .exit-tag {
          background-color: rgba(255, 255, 255, 0.2);
          font-size: 0.7rem;
          padding: 0.1rem 0.45rem;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        /* Responsividad móvil */
        @media (max-width: 640px) {
          .navbar-container {
            padding: 0.55rem 0.9rem;
            gap: 0.5rem;
          }

          .navbar-left {
            gap: 0.75rem;
          }

          .brand-text {
            display: none;
          }

          .portal-exit-text {
            display: none;
          }

          .portal-exit-btn {
            padding: 0.45rem 0.65rem;
          }

          .dropdown-menu {
            position: fixed;
            top: 56px;
            left: 0.75rem;
            right: 0.75rem;
            max-width: none;
            min-width: auto;
          }
        }
      </style>

      <nav class="navbar-container" aria-label="Navegación principal del portal de informes">
        <div class="navbar-left">
          <a href="${this._homeUrl}" class="brand-link" title="Volver al inicio del Portal de Informes">
            <div class="brand-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <span class="brand-text">${this._brandTitle}</span>
          </a>

          <div class="dropdown">
            <button
              id="dropdown-btn"
              class="dropdown-btn"
              type="button"
              aria-haspopup="true"
              aria-expanded="${this._isOpen}"
              aria-controls="reports-menu"
            >
              <span>Informes</span>
              <svg class="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <ul id="reports-menu" class="dropdown-menu ${this._isOpen ? 'open' : ''}" role="menu" aria-labelledby="dropdown-btn">
              <li class="dropdown-header">Documentos disponibles</li>
              <li>
                <a href="${this._homeUrl}" class="dropdown-item ${currentPath === this._homeUrl || currentPath === '' ? 'active' : ''}" role="menuitem">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span>Todos los informes (Inicio)</span>
                </a>
              </li>
              <li class="dropdown-divider"></li>
              ${reportsHtml}
            </ul>
          </div>
        </div>

        <div class="navbar-right">
          <a
            href="${this._portalUrl}"
            class="portal-exit-btn"
            target="_blank"
            rel="noopener noreferrer"
            title="Ir al portal oficial de la Dirección Provincial de Epidemiología de Catamarca (abre en pestaña nueva)"
          >
            <span class="exit-tag">Catamarca</span>
            <span class="portal-exit-text">Portal Oficial</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </nav>
    `;

    const dropdownBtn = this.shadowRoot.getElementById('dropdown-btn');
    if (dropdownBtn) {
      dropdownBtn.addEventListener('click', (e) => this._toggleDropdown(e));
    }
  }
}

// Registro global del componente web
if (!customElements.get('portal-navbar')) {
  customElements.define('portal-navbar', PortalNavbar);
}
