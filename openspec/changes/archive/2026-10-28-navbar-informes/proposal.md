# Proposal

## Why

Actualmente, el portal de informes epidemiológicos ([index.html](file:///c:/Users/axelc/projects/informes/index.html)) y los informes individuales en formato HTML (como [Analisis_UC_IRAG_HINEP_2025.html](file:///c:/Users/axelc/projects/informes/Analisis_UC_IRAG_HINEP_2025.html)) carecen de una barra de navegación unificada y coherente. Los usuarios no disponen de una forma rápida y persistente de regresar al portal institucional oficial de la Dirección Provincial de Epidemiología de Catamarca, ni de transicionar entre distintos informes sin regresar manualmente al inicio. Además, el repositorio carece de un archivo `.gitignore`, lo que expone el proyecto a commits accidentales de archivos temporales o del sistema.

## What Changes

- Creación y configuración de `.gitignore` para omitir archivos de sistema, dependencias locales y temporales de edición.
- Creación de un Web Component nativo (`<portal-navbar>`) reutilizable y desacoplado, compatible tanto con [index.html](file:///c:/Users/axelc/projects/informes/index.html) como con los documentos HTML generados de informes.
- Implementación de un enlace destacado de retorno al portal oficial de Catamarca (`https://portal.catamarca.gob.ar/organismos/direccion-provincial-de-epidemiologia`), diferenciado visualmente por tratarse de navegación saliente.
- Implementación de un menú desplegable interactivo ("Informes") capaz de crecer dinámicamente según la configuración de enlaces provista (vía atributos, JSON o slots).
- Integración armoniosa con el sistema de estilos de [index.html](file:///c:/Users/axelc/projects/informes/index.html) (paleta de colores azul corporativo, tipografía del sistema, bordes y sombras).
- Inclusión del componente en [index.html](file:///c:/Users/axelc/projects/informes/index.html) y preparación para su adopción en informes existentes y futuros.

## Capabilities

### New Capabilities
- `navigation-bar`: Define el comportamiento, la interactividad, la accesibilidad y la configuración dinámica del Web Component de la barra de navegación institucional con enlace saliente y menú de informes.

### Modified Capabilities
<!-- Sin capacidades modificadas en esta versión inicial -->

## Impact

- **Nuevos archivos**: 
  - Archivo de script del Web Component (ej. `public/js/portal-navbar.js`).
  - `.gitignore` en la raíz del repositorio.
- **Archivos afectados**:
  - [index.html](file:///c:/Users/axelc/projects/informes/index.html): Inclusión del script y etiqueta del componente.
  - Informes HTML (como [Analisis_UC_IRAG_HINEP_2025.html](file:///c:/Users/axelc/projects/informes/Analisis_UC_IRAG_HINEP_2025.html)): compatibilidad de inclusión del componente.
- **Dependencias**:
  - Cero dependencias externas; uso exclusivo de APIs nativas del navegador (HTML5 Custom Elements, Vanilla JS, CSS nativo).
