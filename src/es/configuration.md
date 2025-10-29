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
### Configuración inicial

Durante el arranque del servidor, se crea un archivo de configuración YAML (si no existe) en esta ruta: `${BIMROCKET_DATA_PATH}/bimrocket-server.yaml`
donde `${BIMROCKET_DATA_PATH}` apunta por defecto a `${user.home}/bimrocket`.
Edita este archivo YAML para cambiar los parámetros que necesites y reinicia el servidor Bimrocket para que los cambios tengan efecto.

El valor de `BIMROCKET_DATA_PATH` se puede cambiar mediante una variable de entorno o una propiedad de la JVM:
  - **Variable de entorno**: `BIMROCKET_DATA_PATH=<mi_ubicación>`
  - **Propiedad de la JVM**: En instalaciones de Tomcat, edita `<TOMCAT_HOME>/conf/catalina.properties` y añade esta línea: `BIMROCKET_DATA_PATH=<mi_ubicación>`

En la configuración por defecto, **Bimrocket** crea automáticamente bases de datos embebidas de **OrientDB** en la ruta `${BIMROCKET_DATA_PATH}/db`.
Puedes cambiar las URLs de las bases de datos en el archivo `bimrocket-server.yaml` para crearlas en un servidor OrientDB remoto.

La contraseña por defecto del usuario `admin` es `bimrocket`.
Se puede cambiar mediante la propiedad `services.security.adminPassword` del archivo `bimrocket-server.yaml`.

### Parámetros de configuración de los servicios

A continuación se describen los parámetros de configuración que acepta cada servicio. 
Estos parámetros pueden modificarse directamente en el fichero `bimrocket-server.yaml` o bien mediante cualquier
otro mecanismo previsto por la libreria *smallrye config* (propiedades de entorno, variables de la JVM, etc...).
En muchos casos, es necesario reiniciar los servicios para que los cambios de la configuración tengan efecto.

#### SecurityService 
Servicio que gestiona la información de los usuarios y los roles de acceso.<br>
Ruta base: `services.security`

- `.adminPassword` {String}: Contraseña del usuario `admin`. Este usuario tiene privilegios totales sobre todos los servicios. 
- `.passwordPattern` {String}: Expresión regular de Java que determina el formato aceptado de las contraseñas de los usuarios.
- `.authorizationCacheTimeout` {Long}: Tiempo de refresco (en segundos) de la cache de autorización. 
- `.userCacheTimeout` {Long}: Tiempo de refresco (en segundos) de la cache de usuarios.
- `.roleCacheTimeout` {Long}: Tiempo de refresco (en segundos) de la cache de roles.
- `.ldap.enabled` {Boolean}: Parámetro que indica si las contraseñas de los usuarios se validan contra un servidor LDAP. 
   Cuando este parámetro está activado, no es necesario que los usuarios se creen en la base de datos.
- `.ldap.url` {String}: URL del servidor LDAP.
- `.ldap.domain` {String}: Dominio del servidor LDAP.
- `.ldap.searchBase` {String}: Ruta base del directorio LDAP donde buscar los usuarios.
- `.ldap.adminUsername` {String}: Usuario para acceder al servidor LDAP.
- `.ldap.adminPassword` {String}: Contraseña para acceder al servidor LDAP.
- `.store.class` {Class}: Clase que implementa el almacenamiento de los usuarios y roles:
  - Para el almacenamiento en OrientDB: `org.bimrocket.service.security.store.orient.SecurityOrientDaoStore`
  - Para el almacenamiento en MongoDB: `org.bimrocket.service.security.store.mongo.SecurityMongoDaoStore`
- `.store.orient.database` {String}: Alias de la base de datos OrientDB que se define en la sección `databases`.
- `.store.mongo.database` {String}: Alias de la base de datos MongoDB que se define en la sección `databases`.

#### FileService 
Servicio que gestiona el almacenamiento de ficheros y carpetas.<br>
Ruta base: `services.file`

- `.folders` {List&lt;String&gt;}: Lista de carpetas a crear en el directorio base del servicio.
- `.store` {Class}: Clase que implementa el almacenamiento de carpetas y ficheros:
  - Para el almacenamiento en el sistema de ficheros: `org.bimrocket.service.file.store.filesystem.FileSystemFileStore`
- `.store.filesystem.directory` {String}: Directorio base donde se almacenan las carpetas y los ficheros.

#### BcfService 
Servicio que gestiona el almacenamiento de incidencias BCF.<br>
Ruta base: `services.bcf`

- `.projectTemplate` {String}: Nombre del proyecto que se toma como plantilla. 
  Al crear un nuevo proyecto BCF, éste heredará las extensiones (BcfExtensions) del proyecto plantilla. 
- `.store` {Class}: Clase que implementa el almacenamiento de las incidencias BCF:
  - Para el almacenamiento en OrientDB: `org.bimrocket.service.bcf.store.orient.BcfOrientDaoStore`
  - Para el almacenamiento en MongoDB: `org.bimrocket.service.bcf.store.mongo.BcfMongoDaoStore`
- `.store.orient.database`: Alias de la base de datos OrientDB que se define en la sección `databases`.
- `.store.mongo.database`: Alias de la base de datos MongoDB que se define en la sección `databases`.
- `.mail.createTopic.subject` {String}: Patrón que determina el asunto del mensaje que se enviará a los participantes 
  de la incidencia en el momento de su creación. El patrón puede incluir expresiones `#{<property>}`donde `property` es cualquier propiedad del Topic (incidencia).
- `.mail.createTopic.body` {String}: Patrón que determina el cuerpo del mensaje que se enviará a los 
  participantes de la incidencia en el momento de su creación. El patrón puede incluir expresiones `#{<property>}` donde `property` es cualquier propiedad del Topic (incidencia).

#### IfcdbService
Servicio que gestiona el almacenamiento de objetos de un modelo IFC en una base de datos.<br>
Ruta base: `services.ifcdb`

- `.schemas` {List&lt;String&gt;}: Lista de esquemas IFC soportados (IFC2X3, IFC4 o IFC4X3_ADD2). 
Para cada esquema se creará una base de datos diferente. 
El `alias` de la base de datos utilitzada coincidirá con el nombre del esquema IFC.
- `.maxFileSizeMb` {Integer}: Tamaño máximo en Mb de los modelos IFC que se podrán almacenar en la base de datos.
- `.store` {Class}: Clase que determina la implementación del almacenamiento de los modelos: 
  - Para el almacenamiento en OrientDB: `org.bimrocket.service.ifcdb.store.orient.OrientIfcStore`
  - Para el almacenamiento en MongoDB: `org.bimrocket.service.ifcdb.store.mongo.MongoIfcStore`

#### TaskService 
Servicio que gestiona la ejecución de tareas en el servidor.<br>
Ruta base: `services.task`

- `.taskCacheSize` {Integer}: Número de tareas que se cachean en una estructura LRU. 
- `.store.class` {Class}: Classe que determina la implementación del almacenamiento de los datos de las tareas:
  - Para el almacenamiento en OrientDB: `org.bimrocket.service.task.store.orient.TaskOrientDaoStore`
  - Para el almacenamiento en MongoDB: `org.bimrocket.service.task.store.mongo.TaskMongoDaoStore`
- `.store.orient.database` {String}: Alias de la base de datos OrientDB que se define en la sección `databases`.
- `.store.mongo.database` {String}: Alias de la base de datos MongoDB que se define en la sección `databases`.

#### ProxyService 
Servicio para acceder a URL externas.<br>
Ruta base: `services.proxy`

- `.validUrls` {List&lt;String&gt;}: Lista de URLs acceptadas por el proxy.
- `.aliases.<alias>` {Object}: Definición de una conexión externa asociada a `alias`.  
- `.aliases.<alias>.url` {String}: URL externa a la que se quiere acceder.
- `.aliases.<alias>.ipFilter` {String}: Expression regular de Java que determina qué direcciones IP pueden acceder a la URL.
- `.aliases.<alias>.authorization` {String}: Cabecera HTTP *Authorization* que se enviará al acceder a la URL (Bearer o Basic).  

#### MailService 
Servicio para enviar correos electrónicos.<br>
Ruta base: `services.mail`

- `.enabled` {Boolean}: Parámetro que controla la activación del servicio.
- `.host` {String}: Nombre del servidor de correo SMTP.
- `.port` {Integer}: Puerto de escucha del servidor de correo.
- `.startTls` {Boolean}: Parámetro que controla el uso del protocolo TLS.
- `.auth` {Boolean}: Parámetro que indica si la conexión se establece pasando credenciales.
- `.username` {String}: Nombre del usuario que se autentica en el servidor.
- `.password` {String}: Contraseña del usuario que se autentica en el servidor.
- `.from` {String}: Dirección de correo del remitente por defecto.
- `.contentType` {String}: Content-Type del cuerpo del mensaje.

#### PrintService
Servicio para generar ficheros PDF con geometrias vectoriales.<br>
Ruta base: `services.print`

- `.directory` {String}: Directorio donde se almacenan los ficheros PDF generados.
- `.title` {String}: Titulo que se mostrará en el documento PDF.
- `.creator` {String}: Propiedad `creator` que se incorporará al documento PDF.


