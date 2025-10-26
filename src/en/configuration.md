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

By default, **OrientDB** embedded databases are created automaticaly in `${BIMROCKET_DATA_PATH}/db`.\
You can change the database urls in `bimrocket-server.yaml` file to create the databases in a remote OrientDB server.

The default password of the `admin` user is `bimrocket`.
It can be changed through the `services.security.adminPassword` property of the `bimrocket-server.yaml` file.
