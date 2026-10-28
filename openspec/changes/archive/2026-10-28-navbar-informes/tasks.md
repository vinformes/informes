# Tasks

## 1. Configuración del Repositorio

- [x] 1.1 Crear el archivo `.gitignore` en la raíz con reglas para archivos de sistema, editores y temporales, verificando con `git status` que se preserven las carpetas `.agents/` y `openspec/`.

## 2. Implementación del Web Component `<portal-navbar>`

- [x] 2.1 Crear el módulo JavaScript `public/js/portal-navbar.js` definiendo la clase del Web Component con Shadow DOM abierto (`attachShadow({ mode: 'open' })`) y registrarlo con `customElements.define('portal-navbar', PortalNavbar)`.
- [x] 2.2 Implementar los estilos base del componente dentro del Shadow DOM replicando los colores corporativos (`--blue-950` a `--blue-50`), fuentes del sistema y maquetación de barra superior fija/adhesiva.
- [x] 2.3 Implementar el enlace de retorno al portal oficial de Catamarca con icono de enlace externo, atributos de seguridad (`rel="noopener noreferrer"`) y apariencia destacada.
- [x] 2.4 Implementar el menú desplegable "Informes" con accesibilidad ARIA, control de apertura/cierre, cierre al pulsar `Escape` o hacer clic fuera del menú.
- [x] 2.5 Añadir la lógica de enlaces dinámicos: permitir inicialización con informes por defecto e inyección dinámica mediante el atributo HTML `reports` o la propiedad JavaScript `reports`.
- [x] 2.6 Aplicar reglas responsivas (@media queries) para pantallas menores a 640px para asegurar usabilidad en dispositivos móviles.

## 3. Integración y Verificación

- [x] 3.1 Importar el script `public/js/portal-navbar.js` e insertar `<portal-navbar>` en [index.html](file:///c:/Users/axelc/projects/informes/index.html), verificando su correcto renderizado.
- [x] 3.2 Verificar la compatibilidad en [Analisis_UC_IRAG_HINEP_2025.html](file:///c:/Users/axelc/projects/informes/Analisis_UC_IRAG_HINEP_2025.html) validando que el Shadow DOM aísle los estilos frente a las reglas de Quarto/Bootstrap.
- [x] 3.3 Validar la navegación de todos los enlaces (regreso al portal, navegación hacia los informes y hacia el inicio).

## Workflow follow-up

- Archivar el cambio con `/opsx-archive` cuando la implementación y pruebas estén completadas.
