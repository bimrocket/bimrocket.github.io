---
title: menu.configuration
layout: layouts/base.njk
icon: settings
language: en
---

**Bimrocket** server configuration is managed with the [smallrye-config](https://smallrye.io/smallrye-config) library that follows the [microprofile-config](https://microprofile.io/specifications/microprofile-config-2/) specification. This library can obtain configuration parameters from multiple sources at the same time (environment variables, JVM properties, external files, etc.).
By default, bimrocket defines these parameters in a yaml file like this:

```yaml
{% include "fragments/bimrocket-server.yaml" %}
```

During server startup, a yaml configuration file is created (if not exists) in this path: `${BIMROCKET_DATA_PATH}/bimrocket-server.yaml`
where `${BIMROCKET_DATA_PATH}` points to `${user.home}/bimrocket` by default.
Edit this yaml file to change the parameters you need and restart the bimrocket server for the parameters to take effect.

The value of `BIMROCKET_DATA_PATH` can be changed via an environment variable or a JVM property:
  - **Environment variable**: `BIMROCKET_DATA_PATH=<my_location>`
  - **JVM property**: In tomcat installations, edit `<TOMCAT_HOME>/conf/catalina.properties` and add this line: `BIMROCKET_DATA_PATH=<my_location>`

In the default configuration, **OrientDB** embedded databases are created automaticaly in `${BIMROCKET_DATA_PATH}/db`.\
You can change the database urls in `bimrocket-server.yaml` file to create the databases in a remote OrientDB server.

The default password of the `admin` user is `bimrocket`.
It can be changed through the `services.security.adminPassword` property of the `bimrocket-server.yaml` file.

### Service configuration parameters

The following section describes the configuration parameters accepted by each service.  
These parameters can be modified directly in the `bimrocket-server.yaml` file or through any other mechanism provided by the *smallrye config* library (environment properties, JVM variables, etc.).  
In many cases, it is necessary to restart the services for configuration changes to take effect.

#### SecurityService 
Service that manages user information and access roles.<br>
Base path: `services.security`

- `.adminPassword` {String}: Password of the `admin` user. This user has full privileges over all services. 
- `.passwordPattern` {String}: Java regular expression that defines the accepted format for user passwords.
- `.authorizationCacheTimeout` {Long}: Refresh time (in seconds) of the authorization cache. 
- `.userCacheTimeout` {Long}: Refresh time (in seconds) of the user cache.
- `.roleCacheTimeout` {Long}: Refresh time (in seconds) of the role cache.
- `.ldap.enabled` {Boolean}: Parameter that indicates whether user passwords are validated against an LDAP server.  
   When this parameter is enabled, users do not need to be created in the database.
- `.ldap.url` {String}: URL of the LDAP server.
- `.ldap.domain` {String}: Domain of the LDAP server.
- `.ldap.searchBase` {String}: Base path in the LDAP directory where users are searched.
- `.ldap.adminUsername` {String}: User for accessing the LDAP server.
- `.ldap.adminPassword` {String}: Password for accessing the LDAP server.
- `.store.class` {Class}: Class that implements user and role storage:
  - For storage in OrientDB: `org.bimrocket.service.security.store.orient.SecurityOrientDaoStore`
  - For storage in MongoDB: `org.bimrocket.service.security.store.mongo.SecurityMongoDaoStore`
- `.store.orient.database` {String}: Alias of the OrientDB database defined in the `databases` section.
- `.store.mongo.database` {String}: Alias of the MongoDB database defined in the `databases` section.

#### FileService 
Service that manages the storage of files and folders.<br>
Base path: `services.file`

- `.folders` {List&lt;String&gt;}: List of folders to be created in the base directory of the service.
- `.store` {Class}: Class that implements the storage of folders and files:
  - For file system storage: `org.bimrocket.service.file.store.filesystem.FileSystemFileStore`
- `.store.filesystem.directory` {String}: Base directory where folders and files are stored.

#### BcfService 
Service that manages the storage of BCF issues.<br>
Base path: `services.bcf`

- `.projectTemplate` {String}: Name of the project used as a template.  
  When a new BCF project is created, it inherits the extensions (*BcfExtensions*) of the template project. 
- `.store` {Class}: Class that implements the storage of BCF issues:
  - For storage in OrientDB: `org.bimrocket.service.bcf.store.orient.BcfOrientDaoStore`
  - For storage in MongoDB: `org.bimrocket.service.bcf.store.mongo.BcfMongoDaoStore`
- `.store.orient.database`: Alias of the OrientDB database defined in the `databases` section.
- `.store.mongo.database`: Alias of the MongoDB database defined in the `databases` section.
- `.mail.createTopic.subject` {String}: Pattern that defines the subject of the message sent to participants 
  when the issue is created. The pattern can include expressions `#{<property>}` where `property` is any property of the *Topic* (issue).
- `.mail.createTopic.body` {String}: Pattern that defines the body of the message sent to participants 
  when the issue is created. The pattern can include expressions `#{<property>}` where `property` is any property of the *Topic* (issue).

#### IfcdbService
Service that manages the storage of IFC model objects in a database.<br>
Base path: `services.ifcdb`

- `.schemas` {List&lt;String&gt;}: List of supported IFC schemas (IFC2X3, IFC4, or IFC4X3_ADD2).  
A separate database will be created for each schema.  
The `alias` of the database used will match the name of the IFC schema.
- `.maxFileSizeMb` {Integer}: Maximum size in MB of IFC models that can be stored in the database.
- `.store` {Class}: Class that defines the implementation of model storage: 
  - For storage in OrientDB: `org.bimrocket.service.ifcdb.store.orient.OrientIfcStore`
  - For storage in MongoDB: `org.bimrocket.service.ifcdb.store.mongo.MongoIfcStore`

#### TaskService 
Service that manages task execution on the server.<br>
Base path: `services.task`

- `.taskCacheSize` {Integer}: Number of tasks cached in an LRU structure. 
- `.store.class` {Class}: Class that defines the implementation of task data storage:
  - For storage in OrientDB: `org.bimrocket.service.task.store.orient.TaskOrientDaoStore`
  - For storage in MongoDB: `org.bimrocket.service.task.store.mongo.TaskMongoDaoStore`
- `.store.orient.database` {String}: Alias of the OrientDB database defined in the `databases` section.
- `.store.mongo.database` {String}: Alias of the MongoDB database defined in the `databases` section.

#### ProxyService 
Service for accessing external URLs.<br>
Base path: `services.proxy`

- `.validUrls` {List&lt;String&gt;}: List of URLs accepted by the proxy.
- `.aliases.<alias>` {Object}: Definition of an external connection associated with `alias`.  
- `.aliases.<alias>.url` {String}: External URL to access.
- `.aliases.<alias>.ipFilter` {String}: Java regular expression that defines which IP addresses are allowed to access the URL.
- `.aliases.<alias>.authorization` {String}: *Authorization* header sent when accessing the URL (Bearer or Basic).  

#### MailService 
Service for sending email messages.<br>
Base path: `services.mail`

- `.enabled` {Boolean}: Parameter that controls the activation of the service.
- `.host` {String}: Name of the SMTP mail server.
- `.port` {Integer}: Listening port of the mail server.
- `.startTls` {Boolean}: Parameter that controls the use of the TLS protocol.
- `.auth` {Boolean}: Parameter that indicates whether the connection requires authentication.
- `.username` {String}: Username used to authenticate with the server.
- `.password` {String}: Password used to authenticate with the server.
- `.from` {String}: Default sender email address.
- `.contentType` {String}: *Content-Type* of the message body.

#### PrintService
Service for generating PDF files with vector geometries.<br>
Base path: `services.print`

- `.directory` {String}: Directory where generated PDF files are stored.
- `.title` {String}: Title displayed in the PDF document.
- `.creator` {String}: `creator` property included in the PDF document.
