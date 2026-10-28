# Spec Delta

## Purpose

Proveer un componente web reutilizable y dinámico de barra de navegación institucional para facilitar la navegación entre informes epidemiológicos y el portal oficial de Catamarca.

## ADDED Requirements

### Requirement: Registro de componente Web Custom Element
El sistema SHALL proveer y registrar un Custom Element HTML5 nativo bajo la etiqueta `<portal-navbar>`, ejecutable en cualquier documento HTML sin dependencias de bibliotecas externas.

#### Scenario: Inicialización en documento HTML
- **WHEN** el archivo JavaScript del componente se carga en un documento HTML con la etiqueta `<portal-navbar>`
- **THEN** el elemento se inicializa automáticamente y renderiza la barra de navegación institucional.

### Requirement: Enlace destacado de retorno al portal de Catamarca
El componente SHALL contener un enlace persistente y destacado visualmente hacia la Dirección Provincial de Epidemiología (`https://portal.catamarca.gob.ar/organismos/direccion-provincial-de-epidemiologia`).

#### Scenario: Navegación al portal oficial
- **WHEN** el usuario hace clic en el enlace institucional
- **THEN** se abre la URL oficial del portal de Epidemiología de Catamarca.

#### Scenario: Diferenciación visual de enlace externo
- **WHEN** el componente se renderiza en pantalla
- **THEN** el enlace al portal oficial presenta estilos diferenciados (icono de salida/externo y contraste adecuado) que indican claramente que es una navegación saliente.

### Requirement: Menú desplegable interactivo de informes
El componente SHALL proveer un menú desplegable con el título "Informes" que contenga enlaces a los distintos documentos HTML de informes técnicos disponibles.

#### Scenario: Despliegue interactivo de informes
- **WHEN** el usuario hace clic o interactúa con el botón "Informes"
- **THEN** se despliega la lista con los enlaces a los informes disponibles.

#### Scenario: Cierre del menú al interactuar fuera
- **WHEN** el menú de informes está abierto y el usuario hace clic fuera de él o presiona la tecla Escape
- **THEN** el menú desplegable se cierra inmediatamente.

### Requirement: Crecimiento dinámico de enlaces
El componente SHALL permitir definir y actualizar la lista de informes disponibles dinámicamente mediante atributos HTML, propiedades JavaScript o elementos secundarios.

#### Scenario: Inyección de colección de informes
- **WHEN** se suministra una lista de informes con título y ruta URL al componente
- **THEN** el menú "Informes" genera y muestra exactamente los enlaces configurados sin requerir recargar ni modificar el componente.

### Requirement: Adaptabilidad responsiva y coherencia de estilos
El componente SHALL respetar la paleta de colores corporativos del portal, tipografía del sistema y ajustarse a pantallas de escritorio y dispositivos móviles.

#### Scenario: Visualización en pantallas móviles
- **WHEN** el dispositivo cuenta con un ancho de pantalla menor a 640px
- **THEN** los elementos de la barra se reacomodan de forma accesible y compacta garantizando facilidad de pulsación.
