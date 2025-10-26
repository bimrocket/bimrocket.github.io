---
title: menu.install
layout: layouts/base.njk
icon: install_desktop
language: es
---

Bimrocket se puede instalar utilizando cualquiera de los siguientes métodos:

### 1. paquete zip
Este es el método más sencillo para instalar Bimrocket.

1. Descarga el paquete zip de la última versión: [https://github.com/bimrocket/bimrocket/releases](https://github.com/bimrocket/bimrocket/releases).
   Hay disponibles dos versiones:
   - Una específica para Windows x64 (`bimrocket-tomcat-{version}-windows-x64.zip`) (el JDK está incluido en este paquete).
   - Una genérica (`bimrocket-tomcat-{version}-generic.zip`) para otros sistemas operativos (se debe instalar JDK-17 por separado).
2. Descomprime el paquete zip.
3. Ejecuta el archivo `<BIMROCKET_TOMCAT>/bin/startup(.bat|sh)` para iniciar el servidor Tomcat.
4. Una vez iniciado, accede a la aplicación abriendo esta URL: [http://localhost:8080](http://localhost:8080)
5. Para detener el servidor Tomcat, ejecuta el archivo `<BIMROCKET_TOMCAT>/bin/shutdown(.bat|sh)`.

### 2. archivos war
Este método permite instalar Bimrocket en un contenedor de servlets Java como Apache Tomcat.

1. Instala JDK 17:
   - Linux: La mayoría de distribuciones incluyen el JDK en su sistema de paquetes:
     - Debian/Ubuntu: `sudo apt install openjdk-17-jdk`
     - Fedora: `sudo dnf install java-17-openjdk`
     - RedHat: `sudo yum install java-17-openjdk`
     - Arch Linux: `sudo pacman -S jre17-openjdk`
   - Otros sistemas operativos (Windows, MacOS, ...): Instala el paquete JDK-17 desde [https://adoptium.net/temurin/releases/](https://adoptium.net/temurin/releases/)
2. Instala Apache Tomcat 10.1.x desde [https://tomcat.apache.org/download-10.cgi](https://tomcat.apache.org/download-10.cgi).
3. Descarga los archivos war de Bimrocket de la última versión: [https://github.com/bimrocket/bimrocket/releases](https://github.com/bimrocket/bimrocket/releases)
4. Copia `bimrocket.war` dentro de la carpeta `<TOMCAT_HOME>/webapps`.
5. Copia `bimrocket-server.war` dentro de la carpeta `<TOMCAT_HOME>/webapps`.
6. Inicia el servidor Tomcat (`<TOMCAT_HOME>/bin/startup(.bat|sh)`)
7. Una vez iniciado, accede a la aplicación abriendo esta URL: [http://localhost:8080/bimrocket](http://localhost:8080/bimrocket)
8. Para detener el servidor Tomcat, ejecuta el archivo `<TOMCAT_HOME>/bin/shutdown(.bat|sh)`.

### 3. contenedores docker
Esta sección describe el procedimiento para instalar Bimrocket utilizando contenedores Docker.

Hay dos imágenes Docker, una para el frontend y otra para el backend. Las instrucciones para desplegar estos contenedores se describen a continuación:

 - [Instrucciones del contenedor Docker del frontend](https://github.com/bimrocket/bimrocket/tree/master/bimrocket-webapp/docker)
 - [Instrucciones del contenedor Docker del backend](https://github.com/bimrocket/bimrocket/tree/master/bimrocket-server/docker)

### Credenciales por defecto
Algunos servicios de Bimrocket (como BCF y cloudfs) pueden requerir autenticación. Estas son las credenciales por defecto:
 - Usuario: `admin`
 - Contraseña: `bimrocket`

La contraseña `admin` se puede cambiar a través del archivo de configuración del servidor Bimrocket. Más detalles sobre la configuración del servidor se pueden encontrar aquí:

[Configuración del servidor](/{{ language }}/configuration)