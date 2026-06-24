---
title: menu.install
layout: layouts/base.njk
icon: install_desktop
language: es
---

Bimrocket se puede instalar utilizando cualquiera de los siguientes métodos:

### 1. paquete zip quarkus
Este es el método de instalación de Bimrocket más sencillo.

1. Descarga la última versión del paquete zip quarkus de: [https://github.com/bimrocket/bimrocket/releases](https://github.com/bimrocket/bimrocket/releases).
2. Descomprime el paquete zip.
3. Ejecuta el archivo `<bimrocket-quarkus-*>/startup(.sh|.cmd)` para iniciar el servidor.
4. Una vez iniciado, accede a la aplicación abriendo esta URL: [http://localhost:8080](http://localhost:8080)
5. Para detener el servidor, ejecuta el archivo `<bimrocket-quarkus-*>/shutdown(.sh|.cmd)`.

### 2. archivos war
Este método permite instalar Bimrocket en un contenedor de servlets Java como Apache Tomcat.

1. Instala JDK 21:
   - Linux: La mayoría de distribuciones incluyen el JDK en su sistema de paquetes:
     - Debian/Ubuntu: `sudo apt install openjdk-21-jdk`
     - Fedora: `sudo dnf install java-21-openjdk`
     - RedHat: `sudo yum install java-21-openjdk`
     - Arch Linux: `sudo pacman -S jre21-openjdk`
     - OpenSuse: `sudo zypper install java-21-openjdk`
   - Otros sistemas operativos (Windows, MacOS, ...): Instala el paquete JDK-21 desde [https://adoptium.net/temurin/releases/](https://adoptium.net/temurin/releases/)
2. Instala Apache Tomcat 10.1.x desde [https://tomcat.apache.org/download-10.cgi](https://tomcat.apache.org/download-10.cgi).
3. Descarga los archivos war de Bimrocket de la última versión: [https://github.com/bimrocket/bimrocket/releases](https://github.com/bimrocket/bimrocket/releases)
4. Copia `bimrocket.war` dentro de la carpeta `<TOMCAT_HOME>/webapps`.
5. Copia `bimrocket-server.war` dentro de la carpeta `<TOMCAT_HOME>/webapps`.
6. Inicia el servidor Tomcat (`<TOMCAT_HOME>/bin/startup(.sh|.bat)`).
7. Una vez iniciado, accede a la aplicación abriendo esta URL: [http://localhost:8080/bimrocket](http://localhost:8080/bimrocket)
8. Para detener el servidor Tomcat, ejecuta el archivo `<TOMCAT_HOME>/bin/shutdown(.sh|.bat)`.

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