---
title: menu.console
layout: layouts/base.njk
icon: terminal
language: en
---

The bimrocket platform currently offers the following applications:
- A **web application** for the visualization, management, and analysis of IFC models,
which can be deployed on a [Jakarta](https://jakarta.ee/) web server or run independently
on a [Quarkus](https://quarkus.io/) execution environment.
This application has two parts: a frontend that implements the user interface and a backend that
implements the data management and persistence services.

- A **console application** for advanced manipulation of IFC files.

### Uses

The console application (bimrocket-console) is especially suitable for the following use cases:
- Introspection of IFC files (for example, searching for elements that meet a certain condition).
- Extraction of a subset of elements from an IFC file.
- Purging unreferenced objects from an IFC file.
- Renaming and changing the value of properties within the IfcPropertySet elements of an IFC file.

### Installation

To install the console application, simply follow these steps:
- Download the latest version of the bimrocket-console-*.zip file
from [https://github.com/bimrocket/bimrocket/releases](https://github.com/bimrocket/bimrocket/releases).
- Decompress the downloaded ZIP file into a local directory.
- Open a system terminal in that directory and run the script: `./bimrocket-console.sh` (Unix) or `.\bimrocket-console.cmd` (Windows).
- After a few seconds, the application will be ready for use:

<img src="/assets/img/screenshots/console-1.png" style="max-width: 100%; height: auto;" alt="console" />

### Operation

The console offers two operating modes:
- **Interactive mode**: allows you to execute commands step-by-step and see the
result immediately. This is the default operating mode.
- **Batch mode**: allows you to execute a sequence of commands stored in a file all at once.
This mode is activated if you pass the name of the file to be executed as an argument when invoking the application from the terminal: `.\bimrocket-console.cmd script.js`.

Most of the commands offered by the console are written in the Javascript programming language
and follow the format `command(arg1, arg2, ...)`. However, there are two special commands that do not follow this pattern:
- `:help` shows the help documentation for all supported commands.
- `:quit` terminates the application and returns to the operating system terminal.

In **interactive** mode, you can execute a command using a simplified syntax where
it is not necessary to type parentheses, commas, or quotation marks.
For example, the following command: `addPsetRule("ASF_Geometria", "ASF_Volum", "CAT_Volum")`
could be launched like this: `addPsetRule ASF_Geometria ASF_Volum CAT_Volum`.
When using the simplified syntax, it is not possible to reference variables or functions.

The console also supports any valid Javascript expression.

### Examples

This would be the sequence of commands to extract walls (IfcWall) from an IFC file:

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

To change the names of the properties in an IfcPropertySet, we could use these commands:

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