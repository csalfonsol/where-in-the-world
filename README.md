<h1 align="center">Paises del mundo a través de API REST countries</h1>
<div align="center">
<a href="https://csalfonsol.github.io/where-in-the-world">
      Ver aplicación
</a>
</div>
<br>
<br>

## El reto

El reto consiste en integrarse con la api https://restcountries.com/#rest-countries para extraer datos del país y mostrarlos como se propone en los diseños adjuntos y teniendo las siguientes consideraciones:

- Debe usar los diseños, assets y guías de estilo propuestos
- Debes usar como framework base Next.Js.
- La librería que desees utilizar para el consumo de peticiones HTTP es de tu elección.
- El buscador y los filtros deben ser funcionales.
- Al dar click sobre una bandera se debe abrir una nueva vista con la información del país y mostrar la información detallada como se muestra en el diseño.
- Deseable implementar el darkmode.
- Deseable incluir pruebas unitarias.

<br>
<br>


## Solución

Para este reto, se utilizo el framework de React Next.js, el framework de CSS Tailwind y el gestor de módulos de node npm. Para el diseño de la aplicación, me centré en una **arquitectura basada en componentes** en donde se diferencian y abstraen las diferentes partes de la aplicación y se manejan los siguientes conceptos:

- **Pages:** Son las páginas principales de la aplicación que representan páginas enteras con las que interactua el usuario. Por ejemplo: Home, Login, About. Se construyen a partir de elementos propios y de otros componentes
<br><br>
Para este reto tenemos dos páginas:

  1. Index que equivale al Home, es la página principal donde se mostrarán todos los paises, el buscador, el filtro y el switch del modo oscuro
  2. [id] que es la página de detalle donde se puede ver toda la información de un país
<br>
<br>

- **Components:** Son piezas que poseen una única responsabilidad y que por si solas no representan una funcionalidad para el usuario, pero combinándolas entre sí en páginas, conforman las funcionalidades que el usuario necesita. Ejemplos de componentes son: Botones, Imagenes, Selectores, Navegación, etc.
<br><br>
Para este reto tenemos dos componentes:

  1. CountryCard que representa la tarjeta de un país ubicado en la cuadrícula, también posee una redirección a la página de detalle.
  2. Layout que representa el Header o encabezado de la aplicación, este componente se utiliza en ambas páginas. Para mostrar en un banner superior, el título principal de la aplicación "Where in the world?" y el switch de tema oscuro / claro. 
<br>
<br>

- **Interfaces:** Son entidades abstractas que No tienen una representación visual, pero si representan una entidad que puede provenir de un servicio externo o una base de datos. Ejemplos de interfaces son: Pais, Usuario, Empresa, Region, Cliente etc.
<br><br>
Para este reto tenemos 3 interfaces:

  1. Country que representa un país y su información básica 
  2. CountryDetails que representa los detalles de un país
  3. BorderCountries que representa los nombres y los códigos de los paises que son vecinos a un pais dado
