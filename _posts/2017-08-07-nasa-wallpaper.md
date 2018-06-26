---
title: "nasa-wallpaper"
layout: post
published: true
date: 2017-08-07
image: /assets/images/cover20170807.jpg
headerImage: true
tag:
- NASA
- linux
- apariencia
category: blog
author: davidpblcrd
description: Cambiar el fondo de escritorio con una imagen de la NASA
---

<section id="table-of-contents" class="toc">
  <header>
    <h3 >Contenidos</h3>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section><!-- /#table-of-contents -->

### ¿Qué es nasa-wallpaper?

Es una aplicación de terminal que permite cambiar el fondo de pantalla de un sistema Linux obteniendo la imagen desde los servidores de la NASA. Esta se nutre de los Datos Abiertos que distribuye la propia NASA.

![](https://camo.githubusercontent.com/f363f679f5532e6d4cf501dd9ce2cf75821c3974/68747470733a2f2f696d616765732d6173736574732e6e6173612e676f762f696d6167652f697373303430653030383234342f69737330343065303038323434253745736d616c6c2e6a7067)

Este programa tiene dos opciones de descarga principalmente:

*   Descargar la APOD (Astronomy Picture of the Day), esta es una imagen que publica diariamente la NASA de nuestro universo.
*   Buscar la imagen en la _NASA Image Library,_ donde se albergan miles de documentos.

Además la salida del programa siempre escribe datos sobre lo que significa o representa la imagen, para contribuir a la divulgación astronómica (en inglés).

Los entornos de escritorio soportados son GNOME, Cinnamon, MATE, LXDE y XFCE; por el momento.

### Instalación

#### Debian y derivados

Descarga el archivo .deb desde [https://github.com/davidpob99/nasa-wallpaper/releases](https://github.com/davidpob99/nasa-wallpaper/releases) , en el momento de edición de este blog el programa está en su versión 1.0, por lo que el nombre del archivo es `nasa-wallpaper_1.0_all.deb`

Entra en la carpeta donde has descargado el archivo y ejecuta `$ sudo dpkg -i nasa-wallpaper_1.0_all.deb`

#### Arch Linux

El programa se encuentra albergado en el AUR, por lo que basta con ejecutar `$ yaourt -S nasa-wallpaper`

#### Compilando desde el código

Clonar el repositorio: `$ git clone https://github.com/davidpob99/nasa-wallpaper`  
Entrar en el directorio: `$ cd nasa-wallpaper`  
Dar permisos de ejecución al archivo: `$ chmod -x ./nasa-wallpaper`  
Ejecutar el archivo: `$ ./nasa-wallpaper`

Con este último método el programa sólo es accesible ejecutándolo desde la carpeta en el que está descargado
{: .notice}


### Funcionamiento

La sintaxis básica es: `$ nasa-wallpaper < opciones secundarias > [-T entorno de escritorio] [opciones principales]`

**-T:** puede obtener los valores `gnome`, `cinnamon`, `mate`, `lxde` y `xfce`.

Todos los ejemplos siguientes van a suponer un entorno de escritorio GNOME.
{: .notice}

Como he dicho antes, se puede elegir desde dónde descargar el fondo (APOD y NASA Library), por lo que hay dos opciones principales:

#### APOD

Sintaxis básica: `$ nasa-wallpaper -T gnome -a` Descarga la imagen del día del propio día (lógicamente).  
Elegir la APOD de un día en concreto, por ejemplo el 27 de marzo de 1999: `$ nasa-wallpaper -d 1999-03-27 -T gnome -a`

#### NASA Image Library

Sintaxis básica: `$ nasa-wallpaper -T gnome -n` Descarga una imagen al azar desde el repositorio de la NASA.  
Descarga una imagen aleatoria con la palabra clave _earth_: `$ nasa-wallpaper -w earth -T gnome -n`.  
Descarga una imagen aleatoria con la palabra clave _mars_ y busca del año 2016 en adelante: `$ nasa-wallpaper -w mars -y 2016 -T gnome -n`.  
Descarga una imagen aleatoria con la palabra clave _galaxy_ , busca del año 2015 en adelante y que esté tomada desde California: `$ nasa-wallpaper -w galaxy -y 2015 -l california -T gnome -n`.



### Opciones avanzadas

Es posible definir parámetros avanzados como cambiar la clave del API o buscar en diversos campos como el fotógrafo que hizo la foto. Para saber todos las opciones posibles escribir `$ man nasa-wallpaper` o `$ nasa-wallpaper -h`. También se puede consultar la referencia online: [https://github.com/davidpob99/nasa-wallpaper/wiki/Reference](https://github.com/davidpob99/nasa-wallpaper/wiki/Reference)

#### Ejecutar al inicio

Abre el archivo /etc/rc.local con nano: `$ sudo nano /etc/rc.local`  
Edítalo añadiendo el comando deseado antes de `exit 0`, por ejemplo para descargar la APOD añade `nasa-wallpaper -T gnome -a ||exit 1`.  
Reinicia.

### Licencia

Otro punto positivo de esta aplicación es su carácter abierto. Su código se puede consultar en [GitHub](https://github.com/davidpob99/nasa-wallpaper/) y usar respetando la licencia Apache 2.0

### Contribuir

Si crees que puedes ayudar al desarrollo del programa, puedes hacerlo entrando en [GitHub](https://github.com/davidpob99/nasa-wallpaper/)