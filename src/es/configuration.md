---
title: menu.configuration
layout: layouts/base.njk
icon: settings
language: es
---


La configuración del servidor **Bimrocket** se gestiona con la librería [smallrye-config](https://smallrye.io/smallrye-config) que sigue la especificación [microprofile-config](https://microprofile.io/specifications/microprofile-config-2/). Esta librería puede obtener parámetros de configuración desde múltiples fuentes al mismo tiempo (variables de entorno, propiedades de la JVM, ficheros externos, etc.).
Por defecto, Bimrocket define estos parámetros en un archivo YAML como este:

```yaml
{% include "fragments/bimrocket-server.yaml" %}
```

Durante el arranque del servidor, se crea un archivo de configuración YAML (si no existe) en esta ruta: `${BIMROCKET_DATA_PATH}/bimrocket-server.yaml`
donde `${BIMROCKET_DATA_PATH}` apunta por defecto a `${user.home}/bimrocket`.
Edita este archivo YAML para cambiar los parámetros que necesites y reinicia el servidor Bimrocket para que los cambios tengan efecto.

El valor de `BIMROCKET_DATA_PATH` se puede cambiar mediante una variable de entorno o una propiedad de la JVM:
  - **Variable de entorno**: `BIMROCKET_DATA_PATH=<mi_ubicación>`
  - **Propiedad de la JVM**: En instalaciones de Tomcat, edita `<TOMCAT_HOME>/conf/catalina.properties` y añade esta línea: `BIMROCKET_DATA_PATH=<mi_ubicación>`

Por defecto, las bases de datos **OrientDB** embebidas se crean automáticamente en `${BIMROCKET_DATA_PATH}/db`.
Puedes cambiar las URLs de las bases de datos en el archivo `bimrocket-server.yaml` para crearlas en un servidor OrientDB remoto.

La contraseña por defecto del usuario `admin` es `bimrocket`.
Se puede cambiar mediante la propiedad `services.security.adminPassword` del archivo `bimrocket-server.yaml`.






