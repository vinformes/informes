# Guía del Sistema de Diseño y Estilos para Informes Epidemiológicos

Este documento contiene la extracción completa de los estilos y elementos visuales utilizados en [Analisis_UC_IRAG_HINEP_2025.html](file:///c:/Users/axelc/projects/informes/Analisis_UC_IRAG_HINEP_2025.html), incluyendo la barra de navegación institucional (<portal-navbar>), con el objetivo de permitir replicar la misma identidad visual en futuros informes técnicos (HTML directo, Quarto o R Markdown).

---

## 1. Componentes Clave y Agregados

Para que un informe comparta la identidad del portal, debe incluir dos partes fundamentales:

1. **La Barra de Navegación Institucional (`<portal-navbar>`):**
   * Ubicada en la parte superior del cuerpo del documento (`<body>`).
   * Provee navegación saliente hacia el Portal Oficial de Catamarca y menú desplegable para moverse entre los distintos informes.
2. **La Hoja de Estilos del Informe:**
   * Reglas CSS que homogeneizan la tipografía, títulos, índice de contenidos (TOC), tablas y visualizaciones de gráficos interactivos (Highcharts).

---

## 2. Hoja de Estilos CSS Completa

Puedes copiar el siguiente bloque CSS dentro de una etiqueta `<style type="text/css">` en el `<head>` del HTML o guardarlo en un archivo externo como `report-styles.css`:

```css
:root {
  /* Escala de azules institucional (coincide con index.html) */
  --blue-950: #082f49;
  --blue-900: #0c4a6e;
  --blue-800: #075985;
  --blue-700: #0369a1;
  --blue-600: #0284c7;
  --blue-500: #0ea5e9;
  --blue-100: #e0f2fe;
  --blue-50: #f0f9ff;

  /* Neutros y superficies */
  --bg-color: #f4f7fb;
  --surface-color: #ffffff;
  --border-color: #e2e8f0;
  --border-color-hover: #cbd5e1;
  --text-main: #0f172a;
  --text-muted: #475569;
  --text-light: #64748b;

  /* Sombras y radios de bordes */
  --shadow-sm: 0 1px 3px rgba(15, 23, 42, 0.05);
  --shadow-md: 0 4px 14px rgba(7, 89, 133, 0.08);
  --shadow-hover: 0 10px 25px -5px rgba(7, 89, 133, 0.15);
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;

  /* Variables heredadas para compatibilidad con librerías auxiliares */
  --color-black: var(--text-main);
  --color-white: var(--surface-color);
  --color-primary-1: var(--blue-950);
  --color-primary-2: var(--blue-700);
  --color-primary-3: var(--blue-600);
  --color-secondary-1: #cbd03e;
  --color-secondary-2: #0284c7;
  --color-secondary-3: #0369a1;
  --color-secondary-4: #075985;
  --color-secondary-5: #0c4a6e;
  --primary-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --secondary-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

/* Base de página y fondo */
body,
body.quarto-light {
  background-color: var(--bg-color) !important;
  font-family: var(--secondary-font) !important;
  color: var(--text-main) !important;
  margin: 0;
  padding: 0;
  line-height: 1.65;
}

/* Tarjeta del contenedor principal del informe */
main#quarto-document-content {
  background-color: var(--surface-color);
  padding: 2.5rem 3rem !important;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  margin-top: 1.5rem;
  margin-bottom: 3rem;
}

@media (max-width: 768px) {
  main#quarto-document-content {
    padding: 1.25rem 1rem !important;
    margin-top: 0.5rem;
    border-radius: var(--radius-sm);
  }
}

/* Banner de encabezado del título */
#title-block-header {
  background: linear-gradient(135deg, var(--blue-950) 0%, var(--blue-900) 100%) !important;
  color: #ffffff !important;
  padding: 2.25rem 2rem !important;
  border-radius: var(--radius-md) !important;
  border-bottom: 4px solid var(--blue-600) !important;
  margin-bottom: 2.5rem !important;
  box-shadow: var(--shadow-md) !important;
  text-align: center;
}

#title-block-header .quarto-title h1.title {
  color: #ffffff !important;
  font-size: 1.75rem !important;
  font-weight: 700 !important;
  line-height: 1.35 !important;
  margin: 0 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Jerarquía de encabezados */
h1 {
  color: var(--blue-950) !important;
  font-weight: 700;
  font-size: 1.85rem;
  letter-spacing: -0.02em;
}

h2,
h2.anchored {
  color: var(--blue-900) !important;
  font-size: 1.4rem !important;
  font-weight: 700 !important;
  text-align: left;
  border-bottom: 2px solid var(--blue-100);
  padding-bottom: 0.45rem !important;
  margin-top: 2.5rem !important;
  margin-bottom: 1.2rem !important;
  letter-spacing: -0.01em;
}

h3,
h3.anchored {
  color: var(--blue-800) !important;
  font-size: 1.2rem !important;
  font-weight: 600 !important;
  text-align: left;
  padding-bottom: 0.35rem !important;
  margin-top: 1.75rem !important;
  margin-bottom: 0.85rem !important;
}

h4,
h4.anchored {
  color: var(--blue-700) !important;
  font-size: 1.05rem !important;
  font-weight: 600 !important;
  margin-top: 1.25rem !important;
  margin-bottom: 0.5rem !important;
}

h5,
h6 {
  color: var(--blue-900) !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
}

h6 {
  margin-top: 0.75rem !important;
  margin-bottom: 1rem !important;
}

h6 em {
  color: var(--text-muted) !important;
  font-style: normal;
  font-weight: 600;
}

/* Párrafos y tipografía general */
p {
  color: var(--text-main) !important;
  font-size: 1rem !important;
  line-height: 1.7 !important;
  text-align: justify !important;
  margin-bottom: 1.2rem !important;
}

/* Enlaces */
a {
  color: var(--blue-700) !important;
  text-decoration: none !important;
  transition: color 0.15s ease, text-decoration 0.15s ease;
}

a:hover {
  color: var(--blue-900) !important;
  text-decoration: underline !important;
}

/* Índice de contenidos lateral (TOC de Quarto / Bootstrap) */
.sidebar nav#TOC {
  position: sticky;
  top: 60px;
  background-color: var(--surface-color) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: var(--radius-md) !important;
  padding: 1.25rem 1rem !important;
  box-shadow: var(--shadow-sm) !important;
}

.sidebar nav#TOC #toc-title,
.sidebar nav#TOC .toc-title {
  color: var(--blue-950) !important;
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid var(--blue-100);
  padding-bottom: 0.5rem !important;
  margin-bottom: 0.75rem !important;
}

.sidebar nav#TOC ul {
  padding-left: 0.75rem !important;
  list-style: none !important;
}

.sidebar nav#TOC a {
  color: var(--text-muted) !important;
  font-size: 0.85rem !important;
  line-height: 1.4 !important;
  padding: 0.25rem 0.4rem !important;
  border-radius: var(--radius-sm);
  display: block;
  transition: all 0.15s ease;
}

.sidebar nav#TOC a:hover {
  color: var(--blue-700) !important;
  background-color: var(--blue-50) !important;
  text-decoration: none !important;
  transform: translateX(2px);
}

.sidebar nav#TOC a.active {
  color: var(--blue-800) !important;
  font-weight: 600 !important;
  background-color: var(--blue-100) !important;
}

/* Tablas estándar y tablas de paquete gt (R) */
.table,
.gt_table {
  border-collapse: separate !important;
  border-spacing: 0;
  border: 1px solid var(--border-color) !important;
  border-radius: var(--radius-md) !important;
  overflow: hidden !important;
  box-shadow: var(--shadow-sm) !important;
  margin-top: 1.25rem !important;
  margin-bottom: 1.5rem !important;
}

.table thead th,
.gt_col_heading {
  background-color: var(--blue-50) !important;
  color: var(--blue-900) !important;
  font-weight: 600 !important;
  border-bottom: 2px solid var(--border-color) !important;
}

.gt_heading {
  background-color: var(--blue-50) !important;
  border-bottom: 1px solid var(--border-color) !important;
}

.gt_title {
  color: var(--blue-950) !important;
  font-weight: 700 !important;
}

.table-striped>tbody>tr:nth-of-type(odd)>* {
  background-color: #f8fafc !important;
}

.table-striped>tbody>tr:hover>* {
  background-color: var(--blue-50) !important;
}

/* Contenedores de gráficos Highcharts / htmlwidgets */
.html-widget,
.highcharts-container {
  max-width: 100% !important;
  margin: 1.25rem auto !important;
  border-radius: var(--radius-md);
}

/* Referencias y notas al pie */
.footnote-ref,
.footnote-back {
  color: var(--blue-600) !important;
  font-weight: 600;
}
```

---

## 3. Guía de Replicación en Nuevos Informes

### Opción A: En un documento HTML independiente
1. En la sección `<head>` incluye el script del Web Component y la hoja de estilos:
   ```html
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Título del Nuevo Informe</title>
     
     <!-- Script del componente de navegación -->
     <script src="public/js/portal-navbar.js" defer></script>
     
     <!-- Hoja de estilos extraída (enlace externo o bloque <style>) -->
     <link rel="stylesheet" href="public/css/report-styles.css">
   </head>
   ```
2. Justo al inicio de `<body>`, añade la barra de navegación:
   ```html
   <body class="quarto-light">
     <portal-navbar></portal-navbar>

     <main id="quarto-document-content">
       <header id="title-block-header">
         <div class="quarto-title">
           <h1 class="title">Título del Nuevo Informe</h1>
         </div>
       </header>

       <!-- Contenido del informe: h2, h3, párrafos, tablas, etc. -->
     </main>
   </body>
   ```

---

### Opción B: En proyectos Quarto (`.qmd`)

Para que los informes compilados con Quarto tomen automáticamente este diseño:

1. Guarda el CSS anterior como `estilos_informe.css`.
2. En la cabecera YAML del documento `.qmd`:
   ```yaml
   ---
   title: "Nombre del Informe Epidemiológico"
   format:
     html:
       theme: none
       css: estilos_informe.css
       include-in-header:
         text: |
           <script src="public/js/portal-navbar.js" defer></script>
       include-before-body:
         text: |
           <portal-navbar></portal-navbar>
       toc: true
       toc-title: "Índice de Contenidos"
       toc-location: left
   ---
   ```

---

### Opción C: Configuración Dinámica de Informes en `<portal-navbar>`

Si el nuevo informe necesita listar informes específicos en el desplegable, puede pasarse el atributo `reports`:

```html
<portal-navbar
  reports='[
    {"title": "Análisis UC IRAG HINEP 2025", "url": "Analisis_UC_IRAG_HINEP_2025.html"},
    {"title": "Vigilancia de Arbovirus 2025", "url": "Analisis_Arbovirus_2025.html"}
  ]'
></portal-navbar>
```

O dinámicamente mediante JavaScript:
```javascript
const navbar = document.querySelector('portal-navbar');
navbar.addReport('Nuevo Informe 2026', 'nuevo_informe_2026.html');
```
