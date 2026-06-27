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
Aquesta aplicació té dues parts: un _frontend_ que implementa la interfície d'usuari i un
_backend_ que implementa els serveis de gestió i persistència de dades.

- Una **aplicació de consola** per a la manipulació avançada de fitxers IFC.

Aquesta secció descriu els usos i el funcionament de l'aplicació de consola.

### Usos

L'aplicació de consola (bimrocket-console) està especialment indicada per a aquests casos d'ús:
- Introspecció de fitxers IFC (per exemple, cerca d'elements que compleixin una determinada condició).
- Extracció d'un subconjunt d'elements d'un fitxer IFC.
- Purgat d'objectes no referenciats d'un fitxer IFC.
- Canvi de nom i de valor de les propietats dels elements IfcPropertySet d'un fitxer IFC.

### Instal·lació

Per a instal·lar l'aplicació de consola cal seguir els següents passos:
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
- **Mode per lots**: permet executar de cop una seqüència de comandes emmagatzemades en un fitxer.
Aquest mode s'activa si, en invocar l'aplicació des del terminal, es passa com a argument el nom del fitxer a executar: `.\bimrocket-console.cmd script.js`.

La majoria de les comandes que ofereix la consola s'expressen en el llenguatge de programació Javascript i
segueixen el format `comanda(arg1, arg2, ...)`, si bé hi ha dues comandes especials que tenen una sintaxi diferent:
- `:help` mostra l'ajuda de totes les comandes suportades.
- `:quit` finalitza l'aplicació i torna al terminal del sistema operatiu.

En mode **interactiu**, es pot executar una comanda utilitzant la sintaxi simplificada on no és necessari
escriure parèntesis, comes ni cometes. Per exemple, la comanda: `addPsetRule("ASF_Geometria", "ASF_Volum", "CAT_Volum")`
es podria llançar així: `addPsetRule ASF_Geometria ASF_Volum CAT_Volum`.
Quan s'utilitza la sintaxi simplificada no és possible referenciar variables ni funcions.

La consola també admet qualsevol expressió vàlida del llenguatge Javascript.

### Branques d'un model

La càrrega d'un model IFC es fa invocant la comanda `loadIFC`:
```text
> loadIFC("/home/realor/model.ifc")
Loading from /home/realor/model.ifc (2,45 MB)...
Load completed in 1.001 seconds.
```

Aquesta comanda carrega tots els objectes del fitxer IFC a la branca "main",
on una branca (branch) es pot veure com una llista d'objectes IFC.

Per a un mateix model, podem crear diferents branques, on cadascuna d'elles pot contenir
una selecció diferent d'objectes del model.

Mentre hi hagi un model carregat, sempre existirà:
- Una branca actual (current).
- Un cursor apuntant a un objecte de la branca actual.

La majoria de comandes de bimrocket-console actuen sobre la branca o el cursor actual.

Es pot saber quina és la branca actual invocant la comanda `branches`:

```text
> branches
branches()
main
walls (current)
roots
```
Aquesta comanda ens mostra totes les branques existents i quina d'elles és l'actual.

Podem veure quin és l'objecte apuntat pel cursor actual mitjançant la comanda `list`:
```text
> list
list()
  #13410 IfcWallStandardCase:
  [0] GlobalId: 3rPX_Juz59peXXY6wDJl18
  [1] OwnerHistory: IfcOwnerHistory[...]
  [2] Name: Wand-Ext-ERDG-1
  [3] Description: null
  [4] ObjectType: null
  [5] ObjectPlacement: IfcLocalPlacement[...]
  [6] Representation: IfcProductDefinitionShape[...]
  [7] Tag: BEF1E630-DE4B-41C5-AD-66-B87F1A8D67A1
  [8] PredefinedType: null
...
```
Si el cursor apunta a una entitat ens mostrarà els seus atributs i si apunta a una col·lecció, els elements que aquesta contingui.
Podem moure el cursor a un dels objectes interiors mitjançant la comanda `enter(<index>)` o `enter(<attribute>)`:
```text
> enter 5
> list
list()
#13386 IfcLocalPlacement:
  [0] PlacementRelTo: IfcLocalPlacement[...]
  [1] RelativePlacement: IfcAxis2Placement3D[...]
```

Per moure el cursor a l'objecte pare cal fer servir la comanda `exit()`.

Podem fer una cerca d'objectes que compleixin una certa condició mitjançant la comanda `find`:
```text
> find(e => e.isWall("IfcWindow") && e.get("OverallWidth") > 2, "walls")
Matches found: 4
Current branch is walls
```
Aquesta comanda afegeix a la branca indicada, `walls`, tots els objectes de la branca actual que compleixin la condició especificada
(parets de més de 2 metres d'amplada).
Si la branca no existeix, la crea i la fa actual.

Podem canviar de branca mitjançant la comanda `branch`:
```text
> branch main
branch("main")
current branch is main
```
Aquesta comanda posiciona el cursor sobre la llista superior de la branca indicada.

És possible saber quants objectes hi ha de cada tipus, a partir del cursor actual, mitjançant la comanda `histogram`:

```text
> histogram
histogram()
Entities found: 44249
IfcAnnotation: 14
IfcApplication: 1
IfcArbitraryClosedProfileDef: 22
IfcAxis2Placement2D: 94
IfcAxis2Placement3D: 364
...
```

### Exemples

Aquesta seria la seqüència de comandes per a extreure les parets (IfcWall) d'un fitxer IFC:

```text
> loadIFC("/home/realor/model.ifc")
Loading from /home/realor/model.ifc (2,45 MB)...
Load completed in 1.001 seconds.
> find(e => e.is("IfcWall"))
Matches found: 13
Current branch is output
> exportIFC("/home/realor/walls.ifc")
Exporting to /home/realor/walls.ifc...
Export completed in 0.033 seconds.
```

Per canviar el nom de les propietats d'un IfcPropertySet podríem fer servir aquestes comandes:

```text
> loadIFC("/home/realor/model.ifc")
Loading from /home/realor/model.ifc (2,45 MB)...
Load completed in 1.001 seconds.
> addPsetRule("ASF_Geometria", "ASF_Volum", "CAT_Volum")
> addPsetRule("ASF_Geometria", "ASF_Perimetre", "CAT_Perimetre")
> addPsetRule("ASF_Geometria", "ASF_Alçada", "CAT_Alçada")
> transformPsets()
...
> exportIFC("/home/realor/model_cat.ifc")
Exporting to /home/realor/model_cat.ifc...
Export completed in 0.824 seconds.
```

El següent programa Javascript es pot executar en mode per lots per transformar
les propietats dels IfcPropertySet de tots arxius IFC continguts
en un determinat directori:

```javascript
const inputDir = "/home/realor/Descargas/";
const outputDir = "/home/realor/output_ifc/";

addPsetRule("ASF_Geometria", "ASF_Volum", "CAT_Volum");
addPsetRule("ASF_Geometria", "ASF_Perimetre", "CAT_Perimetre");
addPsetRule("ASF_Geometria", "ASF_Alçada", "CAT_Alçada");

const files = paths(inputDir, "*.ifc");
for (let file of files)
{
  console.info("---------------------");
  try
  {
    loadIFC(inputDir + file);
    transformPsets();
    exportIFC(outputDir + file);
  }
  catch (ex)
  {
    console.error(ex);
  }
}

```