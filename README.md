# Zara Web Challenge

Este proyecto ha sido creado como parte de una propuesta para participar en una oferta laboral. El objetivo es implementar una aplicación frontend que consta de dos vistas principales. La primera muestra una lista de personajes con un buscador para filtrar los resultados. La segunda vista presenta el detalle del personaje seleccionado.

## Tecnologías y Herramientas Utilizadas

- **React**: Como framework base para la creación de las interfaces y componentes reutilizables.
- **TypeScript**: Para añadir tipado estático, lo que mejora la seguridad, la autocompletación y la legibilidad del código.
- **Vite**: Como herramienta de construcción y bundling.
- **i18next**: Para la internacionalización de la aplicación.
- **Wouter**: Para gestionar el enrutamiento de la aplicación.
- **Jest**: Para las pruebas unitarias.
- **ESLint**: Para garantizar que el código siga unas convenciones definidas y el uso correcto de los hooks en React.
- **Prettier**: Para garantizar que todo el código esté formateado de manera consistente.

## Arquitectura y Patrones

- **Componente Funcional con Hooks**: Se implementó para la gestión del estado global de la aplicación.
- **Desacoplamiento de la Lógica y Presentación**: La lógica de negocio está desacoplada de los componentes de presentación, asegurando que cada componente tenga una única responsabilidad y sea fácilmente testeable (API, componentes, contexto, caché, etc.).
- **Internacionalización**: La internacionalización permite agregar soporte para varios idiomas sin complicar la lógica de la aplicación, creando ficheros JSON con el idioma deseado.

## Decisiones de Diseño

- **Uso de TypeScript**: Para prevenir errores comunes de tipos y mejorar la mantenibilidad a largo plazo.
- **Vite como Bundler**: Para aprovechar las características más modernas de los navegadores (como ES Modules), lo que permite una experiencia de desarrollo más fluida.
- **Testing**: Para la verificación del correcto comportamiento de los componentes.
- **Internacionalización (i18next)**: Para la gestión de idiomas, ya que esto facilita la extensión futura de la aplicación para incluir más idiomas si es necesario.

## Scripts

A continuación se presentan los scripts disponibles en el proyecto:

- **`dev`**: Inicia el servidor de desarrollo.

  ```bash
  npm run dev
  ```

- **`build`**: Realiza la construcción del proyecto utilizando.

  ```bash
  npm run build
  ```

- **`lint`**: Ejecuta ESLint para revisar el código y encontrar posibles errores y advertencias de estilo.

  ```bash
  npm run lint
  ```

- **`preview`**: Muestra una vista previa de la aplicación construida.

  ```bash
  npm run preview
  ```

- **`test`**: Ejecuta las pruebas utilizando Jest.

  ```test
  npm run test
  ```
