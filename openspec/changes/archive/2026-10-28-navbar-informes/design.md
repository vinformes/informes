# Design

## Context

El proyecto contiene el portal principal ([index.html](file:///c:/Users/axelc/projects/informes/index.html)) y reportes HTML técnicos generados automáticamente (como [Analisis_UC_IRAG_HINEP_2025.html](file:///c:/Users/axelc/projects/informes/Analisis_UC_IRAG_HINEP_2025.html), generado con Quarto). Cada reporte HTML incluye sus propias hojas de estilo (por ejemplo, Bootstrap y CSS embebido de Quarto), mientras que [index.html](file:///c:/Users/axelc/projects/informes/index.html) utiliza variables CSS personalizadas (`--blue-950`, `--blue-900`, etc.). 

Para permitir que la barra de navegación pueda incluirse en cualquier página sin romper ni verse afectada por estilos externos, se requiere encapsulación estricta y arquitectura desacoplada. Ver motivación en [proposal.md](file:///c:/Users/axelc/projects/informes/openspec/changes/navbar-informes/proposal.md).

## Goals / Non-Goals

**Goals:**
- Implementar un Web Component nativo `<portal-navbar>` que funcione en cualquier archivo HTML moderno.
- Proteger el diseño de la barra frente a interferencias de CSS externo (especialmente los estilos de Quarto/Bootstrap en los informes).
- Ofrecer un enlace saliente destacado y seguro hacia el portal oficial de la Dirección Provincial de Epidemiología de Catamarca.
- Proveer un menú desplegable accesible para alternar entre informes técnicos.
- Permitir la configuración dinámica de los informes listados mediante atributos HTML o propiedades JavaScript, con valores predeterminados listos para usar.
- Crear un archivo `.gitignore` completo adaptado al entorno de desarrollo.

**Non-Goals:**
- Re-generar o modificar el contenido epidemiológico interno de [Analisis_UC_IRAG_HINEP_2025.html](file:///c:/Users/axelc/projects/informes/Analisis_UC_IRAG_HINEP_2025.html).
- Incorporar dependencias o empaquetadores externos (Webpack, Vite, npm runtime, etc.); el código será JavaScript ES6 nativo.

## Decisions

### 1. Encapsulación con Shadow DOM (`mode: 'open'`)
- **Decisión**: El componente `<portal-navbar>` creará un Shadow Root abierto para aislar completamente su CSS interno y su estructura DOM.
- **Justificación**: Los informes generados por Quarto cargan clases globales como `.navbar`, `.dropdown`, `a`, etc. Con Shadow DOM, los estilos de la barra no interfieren con el reporte ni sufren alteraciones por el CSS de Quarto.
- **Alternativas consideradas**: Light DOM con prefijos BEM. Descartado por riesgo de colisiones con las reglas genéricas de Bootstrap en Quarto.

### 2. Estructura visual y tokens de diseño
- **Decisión**: Replicar e integrar los tokens visuales del portal:
  - Fondo primario: degradado corporativo (`#082f49` a `#0c4a6e`).
  - Acentos y enlaces: azul cielo (`#e0f2fe`) y blanco.
  - Tipografía: pila de fuentes del sistema (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`).
- **Enlace de salida**: Se presentará como una píldora/botón de advertencia/salida con icono SVG de enlace externo (`rel="noopener noreferrer"`, `target="_blank"`), diferenciándose claramente de los enlaces internos.
- **Menú "Informes"**: Botón desplegable con indicador visual de flecha (`chevron`), manejador de clic y cierre automático al perder el foco (`blur` / `click-outside`) o al presionar `Escape`.

### 3. Crecimiento dinámico de enlaces
- **Decisión**: El componente aceptará la lista de informes por tres vías:
  1. **Configuración por defecto**: Si no se pasan atributos, carga automáticamente [index.html](file:///c:/Users/axelc/projects/informes/index.html) ("Inicio") y los informes detectados en el proyecto (ej. `Analisis_UC_IRAG_HINEP_2025.html`).
  2. **Atributo `reports`**: String JSON parseado en `attributeChangedCallback` (ej. `reports='[{"title":"UC IRAG 2025","url":"Analisis_UC_IRAG_HINEP_2025.html"}]'`).
  3. **Propiedad JS `setReports(array)`**: Permite a scripts externos poblar o actualizar la lista en tiempo de ejecución.

### 4. Configuración del repositorio (`.gitignore`)
- **Decisión**: Configurar un `.gitignore` estándar que excluya archivos del sistema operativo (`.DS_Store`, `Thumbs.db`), archivos de configuración de IDEs opcionales (`.vscode/`, `.idea/`), logs temporales, manteniendo explícitamente rastreados `.agents/` y `openspec/` requeridos por el flujo de desarrollo.

## Risks / Trade-offs

- **[Riesgo]** Enlaces relativos si los informes se ubican en subcarpetas futuras.
  - *Mitigación*: Se incluirá un atributo opcional `base-path` en `<portal-navbar>` para prefijar URLs si un informe reside en un subdirectorio.
- **[Riesgo]** Accesibilidad del menú desplegable.
  - *Mitigación*: Se utilizarán atributos ARIA estándar (`aria-expanded`, `aria-haspopup`, `role="menu"`, `role="menuitem"`) y navegación por teclado básica.
