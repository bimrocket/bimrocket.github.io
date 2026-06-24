---
title: menu.console
layout: layouts/base.njk
icon: terminal
language: es
---

La plataforma bimrocket ofrece actualmente las siguientes aplicaciones:
- Una **aplicación web** para la visualización, gestión y análisis de modelos IFC,
que puede desplegarse en un servidor web [Jakarta](https://jakarta.ee/) o
ejecutarse de forma aislada sobre un entorno de ejecución [Quarkus](https://quarkus.io/).
Esta aplicación tiene dos partes, un frontend que implementa la interfaz de usuario y
un backend que implementa los servicios de gestión y persistencia de datos.

- Una **aplicación de consola** para la manipulación avanzada de ficheros IFC.

### Usos

La aplicación de consola (bimrocket-console) está especialmente indicada para estos casos de uso:
- Introspección de ficheros IFC (por ejemplo, búsqueda de elementos que cumplan cierta condición).
- Extracción de un subconjunto de elementos de un fichero IFC.
- Purgado de objetos no referenciados de un fichero IFC.
- Cambio de nombre y de valor de las propiedades de los elementos IfcPropertySet de un fichero IFC.

### Instalación

Para instalar la aplicación de consola basta con seguir los siguientes pasos:
- Descargar la última versión fichero bimrocket-console-*.zip de [https://github.com/bimrocket/bimrocket/releases](https://github.com/bimrocket/bimrocket/releases).
- Descomprimir el archivo zip anterior en un directorio local.
- Abrir un terminal del sistema operativo en ese directorio y ejecutar el script: `./bimrocket-console.sh` (unix) o `.\bimrocket-console.cmd` (windows)
- Al cabo de unos segundos, la aplicación arrancará y estará preparada para ejecutar comandos:

<img src="/assets/img/screenshots/console-1.png" style="max-width: 100%; height: auto;" alt="console" />

### Operación

La consola ofrece dos modos de funcionamiento:
- **Modo interactivo**: permite ejecutar comando a comando y ver el resultado en cada paso.
  Es el modo de funcionamiento por defecto.
- **Modo por lotes**: permite ejecutar de golpe un conjunto de comandos almacenados en un fichero.
  Este modo se activa si al invocar la aplicación desde el terminal se pasa como argumento el nombre del fichero a ejecutar: `.\bimrocket-console.cmd script.js`.

La mayoria de comandos que ofrece la consola se expresan en el lenguage de programación
Javascript y son de la forma `comando(arg1, arg2, ...)`, si bien, existen dos comandos especiales que no siguen este patrón:
- `:help` muestra la ayuda de todos los comandos soportados.
- `:quit` finaliza la aplicación y vuelve al terminal del sistema operativo.

En modo **interactivo**, se puede ejecutar un comando usando la sintaxis simplificada donde no es necesario
escribir paréntesis, comas ni comillas. Por ejemplo, este comando: `addPsetRule("ASF_Geometria", "ASF_Volum", "CAT_Volum")`
se podria lanzar así: `addPsetRule ASF_Geometria ASF_Volum CAT_Volum`.
Cuando se usa la sintaxis simplificada no es posible referenciar variables ni funciones.

La consola también admite cualquier expressión válida del lenguaje Javascript.

### Ejemplos

Esta seria la secuencia de comandos para extraer la paredes (IfcWall) de fichero IFC:

```text
> loadIFC("/users/realor/model.ifc")
Loading from /home/realor/model.ifc (2,45 MB)...
Load completed in 1.001 seconds.
> find(e => e.is("IfcWall"))
Matches found: 13
Current branch is output
> exportIFC("/users/realor/walls.ifc")
Exporting to /home/realor/walls.ifc...
Export completed in 0.033 seconds.
```

Para cambiar el nombre de las propiedades de un IfcPropertySet podríamos usar estos comandos:
```text
> loadIFC("/users/realor/model.ifc")
Loading from /home/realor/model.ifc (2,45 MB)...
Load completed in 1.001 seconds.
> addPsetRule("ASF_Geometria", "ASF_Volum", "CAT_Volum")
> addPsetRule("ASF_Geometria", "ASF_Perimetre", "CAT_Perimetre")
> addPsetRule("ASF_Geometria", "ASF_Alçada", "CAT_Alçada")
> transformPsets()
...
> exportIFC("/users/realor/model_cat.ifc")
Exporting to /home/realor/model_cat.ifc...
Export completed in 0.824 seconds.
```
