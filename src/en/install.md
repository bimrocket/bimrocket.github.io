---
title: menu.install
layout: layouts/base.njk
icon: install_desktop
language: en
---

Bimrocket can be installed using any of the following methods:

### 1. zip package
This is the simplest method to install Bimrocket.

1. Download the zip package from the latest release: [https://github.com/bimrocket/bimrocket/releases](https://github.com/bimrocket/bimrocket/releases).
   There are two versions available:
   - One specific for Windows x64 (`bimrocket-tomcat-{version}-windows-x64.zip`) (the JDK is included in this package).
   - A generic one (`bimrocket-tomcat-{version}-generic.zip`) for other operating systems (JDK-17 must be installed separately).
2. Uncompress the zip package.
3. Execute the file `<BIMROCKET_TOMCAT>/bin/startup(.bat|sh)` to start the tomcat server.
4. Once started, enter the application by opening this URL: [http://localhost:8080](http://localhost:8080)
5. To stop the tomcat server execute the file `<BIMROCKET_TOMCAT>/bin/shutdown(.bat|sh)`.

### 2. war files
This method allows you to install Bimrocket in a Java servlet container such as Apache Tomcat.

1. Install JDK 17:
   - Linux: Most distributions include the JDK in their packaging system:
     - Debian/Ubuntu: `sudo apt install openjdk-17-jdk`
     - Fedora: `sudo dnf install java-17-openjdk`
     - RedHat: `sudo yum install java-17-openjdk`
     - Arch linux: `sudo pacman -S jre17-openjdk`
   - Other operting systems (Windows, MacOS, ...): Install the jdk-17 installation package from [https://adoptium.net/temurin/releases/](https://adoptium.net/temurin/releases/)
2. Install Apache Tomcat 10.1.x from [https://tomcat.apache.org/download-10.cgi](https://tomcat.apache.org/download-10.cgi).
3. Download the Bimrocket war files from the latest release: [https://github.com/bimrocket/bimrocket/releases](https://github.com/bimrocket/bimrocket/releases)
4. Copy `bimrocket.war` inside `<TOMCAT_HOME>/webapps` folder.
5. Copy `bimrocket-server.war` inside `<TOMCAT_HOME>/webapps` folder.
6. Start the tomcat server (`<TOMCAT_HOME>/bin/startup(.bat|sh)`)
7. Once started, enter the application by opening this URL: [http://localhost:8080/bimrocket](http://localhost:8080/bimrocket)
8. To stop the tomcat server execute the file `<TOMCAT_HOME>/bin/shutdown(.bat|sh)`.

### 3. docker containers
This section describes the procedure to install Bimrocket using docker containers.

There are two docker images, one for the frontend and another one for the backend. Instructions for deploying these containers are described below:

 - [Frontend docker container instructions](https://github.com/bimrocket/bimrocket/tree/master/bimrocket-webapp/docker)
 - [Backend docker container instructions](https://github.com/bimrocket/bimrocket/tree/master/bimrocket-server/docker)


### Default credentials
Some Bimrocket services (like BCF and cloudfs) may require authentication. These are the default credentials:
 - Username: `admin`
 - Password: `bimrocket`

The `admin` password can be changed via the Bimrocket server configuration file. More details about server configuration can be found here:

[Server configuration](/{{ language }}/configuration)
