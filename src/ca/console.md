---
title: menu.console
layout: layouts/base.njk
icon: terminal
language: ca
---


La plataforma bimrocket ofereix actualment les següents aplicacions:
- Una **aplicació web** per a la visualització, gestió i anàlisi de models IFC,
que pot desplegar-se en un servidor web [Jakarta](https://jakarta.ee/) o executar-se de
manera aïllada sobre un entorn d'execució [Quarkus](https://quarkus.io/).
Aquesta aplicació té dues parts: un frontend que implementa la interfície d'usuari i un
backend que implementa els serveis de gestió i persistència de dades.

- Una **aplicació de consola** per a la manipulació avançada de fitxers IFC.

### Usos

L'aplicació de consola (bimrocket-console) està especialment indicada per a aquests casos d'ús:
- Introspecció de fitxers IFC (per exemple, cerca d'elements que compleixin una determinada condició).
- Extracció d'un subconjunt d'elements d'un fitxer IFC.
- Purgat d'objectes no referenciats d'un fitxer IFC.
- Canvi de nom i de valor de les propietats dels elements IfcPropertySet d'un fitxer IFC.

### Instal·lació

Per a instal·lar l'aplicació de consola només cal seguir els següents passos:
- Descarregar l'última versió del fitxer bimrocket-console-*.zip des de
[https://github.com/bimrocket/bimrocket/releases](https://github.com/bimrocket/bimrocket/releases).
- Descomprimir l'arxiu ZIP anterior en un directori local.
- Obrir un terminal del sistema operatiu en aquest directori i executar l'script: `./bimrocket-console.sh` (Unix) o `.\bimrocket-console.cmd` (Windows).
- Al cap d'uns segons, l'aplicació s'iniciarà i estarà preparada per executar comandes:

<img src="/assets/img/screenshots/console-1.png" style="max-width: 100%; height: auto;" alt="console" />

### Operació

La consola ofereix dos modes de funcionament:
- **Mode interactiu**: permet executar comanda a comanda i veure el resultat a cada pas.
És el mode de funcionament per defecte.
- **Mode per lots**: permet executar de cop un conjunt de comandes emmagatzemades en un fitxer.
Aquest mode s'activa si, en invocar l'aplicació des del terminal, es passa com a argument el nom del fitxer a executar: `.\bimrocket-console.cmd script.js`.

La majoria de les comandes que ofereix la consola s'expressen en el llenguatge de programació Javascript i
són de la forma `comanda(arg1, arg2, ...)`, tot i que existeixen dues comandes especials que no segueixen aquest patró:
- `:help` mostra l'ajuda de totes les comandes suportades.
- `:quit` finalitza l'aplicació i torna al terminal del sistema operatiu.

En mode **interactiu**, es pot executar una comanda utilitzant la sintaxi simplificada on no és necessari
escriure parèntesis, comes ni cometes. Per exemple, aquesta comanda: `addPsetRule("ASF_Geometria", "ASF_Volum", "CAT_Volum")`
es podria llançar així: `addPsetRule ASF_Geometria ASF_Volum CAT_Volum`.
Quan s'utilitza la sintaxi simplificada no és possible referenciar variables ni funcions.

La consola també admet qualsevol expressió vàlida del llenguatge Javascript.

### Exemples

Aquesta seria la seqüència de comandes per a extreure les parets (IfcWall) d'un fitxer IFC:

```text
> loadIFC("/users/realor/model.ifc")
Loading from /home/realor/model.ifc (2,45 MB)...
Load completed in 1.001 seconds.
> find(e => e.is("IfcWall"))
Matches found: 13
Current branch is output
> exportIFC("/users/realor/walls.ifc")
Exporting to /home/realor/walls.ifc...
Export completed in 0.033 seconds.
```

Per canviar el nom de les propietats d'un IfcPropertySet podríem fer servir aquestes comandes:

```text
> loadIFC("/users/realor/model.ifc")
Loading from /home/realor/model.ifc (2,45 MB)...
Load completed in 1.001 seconds.
> addPsetRule("ASF_Geometria", "ASF_Volum", "CAT_Volum")
> addPsetRule("ASF_Geometria", "ASF_Perimetre", "CAT_Perimetre")
> addPsetRule("ASF_Geometria", "ASF_Alçada", "CAT_Alçada")
> transformPsets()
...
> exportIFC("/users/realor/model_cat.ifc")
Exporting to /home/realor/model_cat.ifc...
Export completed in 0.824 seconds.