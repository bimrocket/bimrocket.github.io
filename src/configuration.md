---
title: Configuration
layout: base.njk
icon: settings
---

Bimrocket server configuration is managed with the [smallrye-config](https://smallrye.io/smallrye-config) library that follows the [microprofile-config](https://microprofile.io/specifications/microprofile-config-2/) specification. This library can obtain configuration parameters from multiple sources at the same time (environment variables, JVM properties, external files, etc.).
By default, bimrocket defines these parameters in a yaml file like this:

```yaml
# bimrocket-server config

# service config
services:

  # security service
  security:
    adminPassword: bimrocket
    passwordPattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_\-\.])(?=\S+$).{8,}$'
    authorizationCacheTimeout: 300
    userCacheTimeout: 300
    roleCacheTimeout: 300
    ldap:
      enabled: false
      url: ldap://dc1.santfeliu.local
      domain: santfeliu.local
      searchBase: DC=santfeliu,DC=local
      adminUsername: admin
      adminPassword: changeit
    store:
      class: org.bimrocket.service.security.store.SecurityOrientDaoStore
      orient:
        database: bimdb

  # file service
  file:
    store:
      class: org.bimrocket.service.file.store.filesystem.FileSystemFileStore
      filesystem:
        directory: ${BIMROCKET_DATA_PATH}/cloudfs
    folders:
      - models
      - scripts
      - reports
      - ifc_snapshots

  # bcf service
  bcf:
    projectTemplate:
    store:
      class: org.bimrocket.service.bcf.store.BcfOrientDaoStore
      orient:
        database: bimdb
    mail:
      createTopic:
        subject: '#{project.name}##{index}: #{title} [#{priority}]'
        body: '#{description}'

  # ifcdb service
  ifcdb:
    schemas:
      - IFC2X3
      - IFC4
    maxFileSizeMb: 200
    store:
      class: org.bimrocket.service.ifcdb.store.orient.OrientIfcStore

  # task service
  task:
    taskCacheSize: 10
    store:
      class: org.bimrocket.service.task.store.orient.TaskOrientDaoStore
      orient:
        database: bimdb

  # print service
  print:
    directory: ${BIMROCKET_DATA_PATH}/printsvc
    title: 'Bimrocket print'
    creator: 'Bimrocket PrintService'

  # mail service
  mail:
    enabled: false
    host: helios
    port: 25
    startTls: false
    auth: false
    username: none
    password: none
    from: 'admin@bimrocket.org'
    contentType: 'text/plain;charset=ISO-8859-1'

  # proxy service
  proxy:
    validUrls:
      - https://api.openai.com/
      - https://api.bsdd.buildingsmart.org/
    aliases:
      chatgpt:
        url: https://api.openai.com/v1/chat/completions
        ipFilter: ''
        authorization: changeit

# database config
databases:
  bimdb:
    url: embedded:${BIMROCKET_DATA_PATH}/db/bimdb
    username: root
    password: orientdb
  IFC2X3:
    url: embedded:${BIMROCKET_DATA_PATH}/db/IFC2X3
    username: root
    password: orientdb
  IFC4:
    url: embedded:${BIMROCKET_DATA_PATH}/db/IFC4
    username: root
    password: orientdb
```
During server startup, a yaml configuration file is created (if not exists) in this path: `${BIMROCKET_DATA_PATH}/bimrocket-server.yaml`
where `${BIMROCKET_DATA_PATH}` points to `${user.home}/bimrocket` by default.
Edit this yaml file to change the parameters you need and restart the bimrocket server for the parameters to take effect.

The value of `BIMROCKET_DATA_PATH` can be changed via an environment variable or a JVM property:
  - Environment variable: `BIMROCKET_DATA_PATH=<my_location>`
  - JVM property: In tomcat installations, edit `<TOMCAT_HOME>/conf/catalina.properties` and add this line: `BIMROCKET_DATA_PATH=<my_location>`

By default, OrientDB embedded databases are created automaticaly in `${BIMROCKET_DATA_PATH}/db`.\
You can change the database urls in `bimrocket-server.yaml` file to create the databases in a remote OrientDB server.

The default password of the `admin` user is `bimrocket`.
It can be changed through the `services.security.adminPassword` property of the `bimrocket-server.yaml` file.
