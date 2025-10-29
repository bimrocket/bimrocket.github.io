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

En la configuració per defecte, **Bimrocket** crea automàticament bases de dades incrustades d’**OrientDB** en la ruta `${BIMROCKET_DATA_PATH}/db`.
Pots canviar les URL de les bases de dades al fitxer `bimrocket-server.yaml` per crear-les en un servidor remot d’OrientDB.

La contrasenya per defecte de l’usuari `admin` és `bimrocket`.
Aquesta es pot canviar mitjançant la propietat `services.security.adminPassword` del fitxer `bimrocket-server.yaml`.

### Paràmetres de configuració dels serveis

A continuació es descriuen els paràmetres de configuració que accepta cada servei.  
Aquests paràmetres es poden modificar directament al fitxer `bimrocket-server.yaml` o bé mitjançant qualsevol altre mecanisme previst per la 
llibreria *smallrye config* (propietats d’entorn, variables de la JVM, etc.).  
En molts casos, és necessari reiniciar els serveis perquè els canvis de configuració tinguin efecte.

#### SecurityService 
Servei que gestiona la informació dels usuaris i els rols d’accés.<br>
Ruta base: `services.security`

- `.adminPassword` {String}: Contrasenya de l’usuari `admin`. Aquest usuari té privilegis totals sobre tots els serveis. 
- `.passwordPattern` {String}: Expressió regular de Java que determina el format acceptat de les contrasenyes dels usuaris.
- `.authorizationCacheTimeout` {Long}: Temps de refresc (en segons) de la memòria cau d’autorització. 
- `.userCacheTimeout` {Long}: Temps de refresc (en segons) de la memòria cau d’usuaris.
- `.roleCacheTimeout` {Long}: Temps de refresc (en segons) de la memòria cau de rols.
- `.ldap.enabled` {Boolean}: Paràmetre que indica si les contrasenyes dels usuaris es validen contra un servidor LDAP.  
   Quan aquest paràmetre està activat, no és necessari que els usuaris es creïn a la base de dades.
- `.ldap.url` {String}: URL del servidor LDAP.
- `.ldap.domain` {String}: Domini del servidor LDAP.
- `.ldap.searchBase` {String}: Ruta base del directori LDAP on es busquen els usuaris.
- `.ldap.adminUsername` {String}: Usuari per accedir al servidor LDAP.
- `.ldap.adminPassword` {String}: Contrasenya per accedir al servidor LDAP.
- `.store.class` {Class}: Classe que implementa l’emmagatzematge dels usuaris i rols:
  - Per a l’emmagatzematge a OrientDB: `org.bimrocket.service.security.store.orient.SecurityOrientDaoStore`
  - Per a l’emmagatzematge a MongoDB: `org.bimrocket.service.security.store.mongo.SecurityMongoDaoStore`
- `.store.orient.database` {String}: Àlies de la base de dades OrientDB que es defineix a la secció `databases`.
- `.store.mongo.database` {String}: Àlies de la base de dades MongoDB que es defineix a la secció `databases`.

#### FileService 
Servei que gestiona l’emmagatzematge de fitxers i carpetes.<br>
Ruta base: `services.file`

- `.folders` {List&lt;String&gt;}: Llista de carpetes a crear al directori base del servei.
- `.store` {Class}: Classe que implementa l’emmagatzematge de carpetes i fitxers:
  - Per a l’emmagatzematge al sistema de fitxers: `org.bimrocket.service.file.store.filesystem.FileSystemFileStore`
- `.store.filesystem.directory` {String}: Directori base on s’emmagatzemen les carpetes i els fitxers.

#### BcfService 
Servei que gestiona l’emmagatzematge d’incidències BCF.<br>
Ruta base: `services.bcf`

- `.projectTemplate` {String}: Nom del projecte que es pren com a plantilla.  
  En crear un nou projecte BCF, aquest heretarà les extensions (*BcfExtensions*) del projecte plantilla. 
- `.store` {Class}: Classe que implementa l’emmagatzematge de les incidències BCF:
  - Per a l’emmagatzematge a OrientDB: `org.bimrocket.service.bcf.store.orient.BcfOrientDaoStore`
  - Per a l’emmagatzematge a MongoDB: `org.bimrocket.service.bcf.store.mongo.BcfMongoDaoStore`
- `.store.orient.database`: Àlies de la base de dades OrientDB que es defineix a la secció `databases`.
- `.store.mongo.database`: Àlies de la base de dades MongoDB que es defineix a la secció `databases`.
- `.mail.createTopic.subject` {String}: Patró que determina l’assumpte del missatge que s’enviarà als participants 
  de la incidència en el moment de la seva creació. El patró pot incloure expressions `#{<property>}` on `property` és qualsevol propietat del *Topic* (incidència).
- `.mail.createTopic.body` {String}: Patró que determina el cos del missatge que s’enviarà als 
  participants de la incidència en el moment de la seva creació. El patró pot incloure expressions `#{<property>}` on `property` és qualsevol propietat del *Topic* (incidència).

#### IfcdbService
Servei que gestiona l’emmagatzematge d’objectes d’un model IFC en una base de dades.<br>
Ruta base: `services.ifcdb`

- `.schemas` {List&lt;String&gt;}: Llista d’esquemes IFC suportats (IFC2X3, IFC4 o IFC4X3_ADD2).  
Per a cada esquema es crearà una base de dades diferent.  
L’`àlies` de la base de dades utilitzada coincidirà amb el nom de l’esquema IFC.
- `.maxFileSizeMb` {Integer}: Mida màxima en MB dels models IFC que es poden emmagatzemar a la base de dades.
- `.store` {Class}: Classe que determina la implementació de l’emmagatzematge dels models: 
  - Per a l’emmagatzematge a OrientDB: `org.bimrocket.service.ifcdb.store.orient.OrientIfcStore`
  - Per a l’emmagatzematge a MongoDB: `org.bimrocket.service.ifcdb.store.mongo.MongoIfcStore`

#### TaskService 
Servei que gestiona l’execució de tasques al servidor.<br>
Ruta base: `services.task`

- `.taskCacheSize` {Integer}: Nombre de tasques que es desen en memòria cau amb una estructura LRU. 
- `.store.class` {Class}: Classe que determina la implementació de l’emmagatzematge de les dades de les tasques:
  - Per a l’emmagatzematge a OrientDB: `org.bimrocket.service.task.store.orient.TaskOrientDaoStore`
  - Per a l’emmagatzematge a MongoDB: `org.bimrocket.service.task.store.mongo.TaskMongoDaoStore`
- `.store.orient.database` {String}: Àlies de la base de dades OrientDB que es defineix a la secció `databases`.
- `.store.mongo.database` {String}: Àlies de la base de dades MongoDB que es defineix a la secció `databases`.

#### ProxyService 
Servei per accedir a URL externes.<br>
Ruta base: `services.proxy`

- `.validUrls` {List&lt;String&gt;}: Llista de les URLs acceptades pel servidor *proxy*.
- `.aliases.<alias>` {Object}: Definició d’una connexió externa associada a `alias`.  
- `.aliases.<alias>.url` {String}: URL externa a la qual es vol accedir.
- `.aliases.<alias>.ipFilter` {String}: Expressió regular de Java que determina quines adreces IP poden accedir a la URL.
- `.aliases.<alias>.authorization` {String}: Capçalera HTTP *Authorization* que s’enviarà en accedir a la URL (Bearer o Basic).  

#### MailService 
Servei per enviar correus electrònics.<br>
Ruta base: `services.mail`

- `.enabled` {Boolean}: Paràmetre que controla l’activació del servei.
- `.host` {String}: Nom del servidor de correu SMTP.
- `.port` {Integer}: Port d’escolta del servidor de correu.
- `.startTls` {Boolean}: Paràmetre que controla l’ús del protocol TLS.
- `.auth` {Boolean}: Paràmetre que indica si la connexió s’estableix passant credencials.
- `.username` {String}: Nom de l’usuari que s’autentica al servidor.
- `.password` {String}: Contrasenya de l’usuari que s’autentica al servidor.
- `.from` {String}: Adreça de correu del remitent per defecte.
- `.contentType` {String}: *Content-Type* del cos del missatge.

#### PrintService
Servei per generar fitxers PDF amb geometries vectorials.<br>
Ruta base: `services.print`

- `.directory` {String}: Directori on s’emmagatzemen els fitxers PDF generats.
- `.title` {String}: Títol que es mostrarà al document PDF.
- `.creator` {String}: Propietat `creator` que s’incorporarà al document PDF.
