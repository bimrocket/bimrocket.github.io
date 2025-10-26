---
title: menu.install
layout: layouts/base.njk
icon: install_desktop
language: ca
---

Bimrocket es pot instal·lar utilitzant qualsevol dels següents mètodes:

### 1. paquet zip
Aquest és el mètode més senzill per instal·lar Bimrocket.

1. Baixa el paquet zip de la darrera versió: [https://github.com/bimrocket/bimrocket/releases](https://github.com/bimrocket/bimrocket/releases).
   Hi ha disponibles dues versions:
   - Una específica per a Windows x64 (`bimrocket-tomcat-{version}-windows-x64.zip`) (el JDK està inclòs en aquest paquet).
   - Una genèrica (`bimrocket-tomcat-{version}-generic.zip`) per a altres sistemes operatius (s’ha d’instal·lar JDK-17 per separat).
2. Descomprimeix el paquet zip.
3. Executa el fitxer `<BIMROCKET_TOMCAT>/bin/startup(.bat|sh)` per iniciar el servidor tomcat.
4. Un cop iniciat, accedeix a l’aplicació obrint aquesta URL: [http://localhost:8080](http://localhost:8080)
5. Per aturar el servidor tomcat, executa el fitxer `<BIMROCKET_TOMCAT>/bin/shutdown(.bat|sh)`.

### 2. fitxers war
Aquest mètode permet instal·lar Bimrocket en un contenidor de servlets Java com Apache Tomcat.

1. Instal·la JDK 17:
   - Linux: La majoria de distribucions inclouen el JDK al seu sistema de paquets:
     - Debian/Ubuntu: `sudo apt install openjdk-17-jdk`
     - Fedora: `sudo dnf install java-17-openjdk`
     - RedHat: `sudo yum install java-17-openjdk`
     - Arch Linux: `sudo pacman -S jre17-openjdk`
   - Altres sistemes operatius (Windows, MacOS, ...): Instal·la el paquet JDK-17 des de [https://adoptium.net/temurin/releases/](https://adoptium.net/temurin/releases/)
2. Instal·la Apache Tomcat 10.1.x des de [https://tomcat.apache.org/download-10.cgi](https://tomcat.apache.org/download-10.cgi).
3. Descarrega els fitxers war de Bimrocket de l’última versió: [https://github.com/bimrocket/bimrocket/releases](https://github.com/bimrocket/bimrocket/releases)
4. Copia `bimrocket.war` dins de la carpeta `<TOMCAT_HOME>/webapps`.
5. Copia `bimrocket-server.war` dins de la carpeta `<TOMCAT_HOME>/webapps`.
6. Inicia el servidor tomcat (`<TOMCAT_HOME>/bin/startup(.bat|sh)`)
7. Un cop iniciat, accedeix a l’aplicació obrint aquesta URL: [http://localhost:8080/bimrocket](http://localhost:8080/bimrocket)
8. Per aturar el servidor tomcat, executa el fitxer `<TOMCAT_HOME>/bin/shutdown(.bat|sh)`.

### 3. contenidors docker
Aquesta secció descriu el procediment per instal·lar Bimrocket utilitzant contenidors docker.

Hi ha dues imatges docker, una per al frontend i una altra per al backend. Les instruccions per desplegar aquests contenidors es descriuen a continuació:

 - [Instruccions del contenidor docker del frontend](https://github.com/bimrocket/bimrocket/tree/master/bimrocket-webapp/docker)
 - [Instruccions del contenidor docker del backend](https://github.com/bimrocket/bimrocket/tree/master/bimrocket-server/docker)

### Credencials per defecte
Alguns serveis de Bimrocket (com BCF i cloudfs) poden requerir autenticació. Aquestes són les credencials per defecte:
 - Usuari: `admin`
 - Contrasenya: `bimrocket`

La contrasenya `admin` es pot canviar a través del fitxer de configuració del servidor Bimrocket. Més detalls sobre la configuració del servidor es poden trobar aquí:

[Configuració del servidor](/{{ language }}/configuration)