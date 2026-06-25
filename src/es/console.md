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

Para instalar la aplicación de consola, sigue los siguientes pasos:
- Descargar la última versión fichero bimrocket-console-*.zip de [https://github.com/bimrocket/bimrocket/releases](https://github.com/bimrocket/bimrocket/releases).
- Descomprimir el archivo zip anterior en un directorio local.
- Abrir un terminal del sistema operativo en ese directorio y ejecutar el script: `./bimrocket-console.sh` (unix) o `.\bimrocket-console.cmd` (windows)
- Al cabo de unos segundos, la aplicación arrancará y estará preparada para ejecutar comandos:

<img src="/assets/img/screenshots/console-1.png" style="max-width: 100%; height: auto;" alt="console" />

### Operación

La consola ofrece dos modos de funcionamiento:
- **Modo interactivo**: permite ejecutar comando a comando y ver el resultado en cada paso.
  Es el modo de funcionamiento por defecto.
- **Modo por lotes**: permite ejecutar de golpe una secuencia de comandos almacenados en un fichero.
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

### Ramas de un modelo

La carga de un modelo IFC se hace invocando el comando `loadIFC`:
```text
> loadIFC("/home/realor/model.ifc")
Loading from /home/realor/model.ifc (2,45 MB)...
Load completed in 1.001 seconds.
```

Este comando carga todos los objetos del fichero IFC en la rama "main",
donde una rama (branch) se puede ver como una lista de objetos IFC.

Para un mismo modelo, podemos crear diferentes ramas, donde cada una de ellas puede contener
una selección distinta de los objetos del modelo.

Mientras haya un modelo cargado, siempre existirá:
- Una rama actual (current).
- Un cursor apuntando a un objecto de la rama actual.

La mayoria de comandos de bimrocket-console actuan sobre sobre rama o el cursor actual.

Se puede saber cual es la rama actual invocando el comando `branches`:

```text
> branches
branches()
main
walls (current)
roots
```
Este comando nos muestra todas las ramas existentes y cual de ellas es la actual.

Podemos ver cual es el objecto apuntado por el cursor actual mediante el comando `list`:
```text
> list
list()
  #13410 IfcWallStandardCase:
  [0] GlobalId: 3rPX_Juz59peXXY6wDJl18
  [1] OwnerHistory: IfcOwnerHistory[...]
  [2] Name: Wand-Ext-ERDG-1
  [3] Description: null
  [4] ObjectType: null
  [5] ObjectPlacement: IfcLocalPlacement[...]
  [6] Representation: IfcProductDefinitionShape[...]
  [7] Tag: BEF1E630-DE4B-41C5-AD-66-B87F1A8D67A1
  [8] PredefinedType: null
...
```
Si el cursor apunta a una entidad nos mostrará sus atributos y si apunta a una colección, los elementos que ésta contenga.
Podemos mover el cursor a uno de los objetos interiores mediante el comando `enter(<index>)` o `enter(<attribute>)`:
```text
> enter 5
> list
list()
#13386 IfcLocalPlacement:
  [0] PlacementRelTo: IfcLocalPlacement[...]
  [1] RelativePlacement: IfcAxis2Placement3D[...]
```

Para mover el cursor al objeto padre hay que usar el comando `exit()`.

Podemos hacer una búsqueda de objetos que cumplan cierta condición mediante el comando `find`:
```text
> find(e => e.isWall("IfcWindow") && e.get("OverallWidth") > 2, "walls")
Matches found: 4
Current branch is walls
```
Este comando añade a la rama indicada, `walls`, todos los objetos de la rama actual que cumplan la condición especificada
(paredes de más de 2 metros de anchura).
Si la rama no existe, la crea y la hace actual.

Podemos cambiar de rama, mediante el comando `branch`:
```text
> branch main
branch("main")
current branch is main
```
Este comando posiciona el cursor sobre la lista superior de la rama indicada.

Es posible saber cuando objetos hay de cada tipo, a partir del cursor actual, mediante el comando `histogram`:
```text
> histogram
histogram()
Entities found: 44249
IfcAnnotation: 14
IfcApplication: 1
IfcArbitraryClosedProfileDef: 22
IfcAxis2Placement2D: 94
IfcAxis2Placement3D: 364
...
```

### Ejemplos

Esta seria la secuencia de comandos para extraer la paredes (IfcWall) de un fichero IFC:

```text
> loadIFC("/home/realor/model.ifc")
Loading from /home/realor/model.ifc (2,45 MB)...
Load completed in 1.001 seconds.
> find(e => e.is("IfcWall"))
Matches found: 13
Current branch is output
> exportIFC("/home/realor/walls.ifc")
Exporting to /home/realor/walls.ifc...
Export completed in 0.033 seconds.
```

Para cambiar el nombre de las propiedades de un IfcPropertySet podríamos usar estos comandos:
```text
> loadIFC("/home/realor/model.ifc")
Loading from /home/realor/model.ifc (2,45 MB)...
Load completed in 1.001 seconds.
> addPsetRule("ASF_Geometria", "ASF_Volum", "CAT_Volum")
> addPsetRule("ASF_Geometria", "ASF_Perimetre", "CAT_Perimetre")
> addPsetRule("ASF_Geometria", "ASF_Alçada", "CAT_Alçada")
> transformPsets()
...
> exportIFC("/home/realor/model_cat.ifc")
Exporting to /home/realor/model_cat.ifc...
Export completed in 0.824 seconds.
```

Para transformar las propiedades de los IfcPropertySet de los archivos IFC de un directorio, podríamos usar un script como éste:
```javascript
const inputDir = "/home/realor/Descargas/";
const outputDir = "/home/realor/output_ifc/";

addPsetRule("ASF_Geometria", "ASF_Volum", "CAT_Volum");
addPsetRule("ASF_Geometria", "ASF_Perimetre", "CAT_Perimetre");
addPsetRule("ASF_Geometria", "ASF_Alçada", "CAT_Alçada");

const files = paths(inputDir, "*.ifc");
for (let file of files)
{
  console.info("---------------------");
  try
  {
    loadIFC(inputDir + file);
    transformPsets();
    exportIFC(outputDir + file);
  }
  catch (ex)
  {
    console.error(ex);
  }
}

```