---
title: menu.configuration
layout: layouts/base.njk
icon: settings
language: ca
---

La configuració del servidor **Bimrocket** es gestiona amb la llibreria [smallrye-config](https://smallrye.io/smallrye-config), que segueix l’especificació [microprofile-config](https://microprofile.io/specifications/microprofile-config-2/). Aquesta llibreria pot obtenir paràmetres de configuració de múltiples fonts al mateix temps (variables d'entorn, propietats de la JVM, fitxers externs, etc.).
Per defecte, Bimrocket defineix aquests paràmetres en un fitxer YAML com aquest:

```yaml
{% include "fragments/bimrocket-server.yaml" %}
```

Durant l’inici del servidor, es crea (si no existeix) un fitxer de configuració YAML en aquesta ruta: `${BIMROCKET_DATA_PATH}/bimrocket-server.yaml`, on `${BIMROCKET_DATA_PATH}` apunta per defecte a `${user.home}/bimrocket`.
Edita aquest fitxer YAML per canviar els paràmetres que necessitis i reinicia el servidor Bimrocket perquè els canvis tinguin efecte.

El valor de `BIMROCKET_DATA_PATH` es pot modificar mitjançant una variable d'entorn o una propietat de la JVM:
- **Variable d'entorn:** `BIMROCKET_DATA_PATH=<la_meva_ubicació>`
- **Propietat JVM:** en instal·lacions de Tomcat, edita `<TOMCAT_HOME>/conf/catalina.properties` i afegeix aquesta línia: `BIMROCKET_DATA_PATH=<la_meva_ubicació>`

Per defecte, les bases de dades incrustades d’**OrientDB** es creen automàticament a `${BIMROCKET_DATA_PATH}/db`.
Pots canviar les URL de les bases de dades al fitxer `bimrocket-server.yaml` per crear-les en un servidor remot d’OrientDB.

La contrasenya per defecte de l’usuari `admin` és `bimrocket`.
Aquesta es pot canviar mitjançant la propietat `services.security.adminPassword` del fitxer `bimrocket-server.yaml`.
