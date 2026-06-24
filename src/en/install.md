---
title: menu.install
layout: layouts/base.njk
icon: install_desktop
language: en
---

Bimrocket can be installed using any of the following methods:

### 1. quarkus zip package
This is the simplest method to install Bimrocket.

1. Download the latest release of the quarkus zip package from: [https://github.com/bimrocket/bimrocket/releases](https://github.com/bimrocket/bimrocket/releases).
2. Uncompress the zip package.
3. Execute the file `<bimrocket-quarkus-*>/startup(.sh|.cmd)` to start the server.
4. Once started, enter the application by opening this URL: [http://localhost:8080](http://localhost:8080)
5. To stop the server execute the file `<bimrocket-quarkus-*>/shutdown(.sh|.cmd)`.

### 2. war files
This method allows you to install Bimrocket in a Java servlet container such as Apache Tomcat.

1. Install JDK 21:
   - Linux: Most distributions include the JDK in their packaging system:
     - Debian/Ubuntu: `sudo apt install openjdk-21-jdk`
     - Fedora: `sudo dnf install java-21-openjdk`
     - RedHat: `sudo yum install java-21-openjdk`
     - Arch linux: `sudo pacman -S jre21-openjdk`
     - OpenSuse: `sudo zypper install java-21-openjdk`
   - Other operting systems (Windows, MacOS, ...): Install the jdk-21 installation package from [https://adoptium.net/temurin/releases/](https://adoptium.net/temurin/releases/)
2. Install Apache Tomcat 10.1.x from [https://tomcat.apache.org/download-10.cgi](https://tomcat.apache.org/download-10.cgi).
3. Download the Bimrocket war files from the latest release: [https://github.com/bimrocket/bimrocket/releases](https://github.com/bimrocket/bimrocket/releases)
4. Copy `bimrocket.war` inside `<TOMCAT_HOME>/webapps` folder.
5. Copy `bimrocket-server.war` inside `<TOMCAT_HOME>/webapps` folder.
6. Start the tomcat server (`<TOMCAT_HOME>/bin/startup(.sh|.bat)`).
7. Once started, enter the application by opening this URL: [http://localhost:8080/bimrocket](http://localhost:8080/bimrocket)
8. To stop the tomcat server execute the file `<TOMCAT_HOME>/bin/shutdown(.sh|.bat)`.

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
