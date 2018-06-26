---
title: "Instalar git en Android"
layout: post
published: true
date: 2017-08-31
image: 
headerImage: true
tag:
- Android
- terminal
category: blog
author: davidpblcrd
description: Instalar git en Android
---

<section id="table-of-contents" class="toc">
  <header>
    <h3>Contenidos</h3>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section><!-- /#table-of-contents -->



Git es uno de los más conocidos administradores de versiones, usado principalmente para albergar proyectos de código abierto.
Muchos de los programas del mundo *open-source* se han desarrollado bajo este método, como puede ser el propio [nucleo Linux](https://git.kernel.org).

![git](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Git-logo.svg/220px-Git-logo.svg.png)

## Android

![android](https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Android_robot_2014.svg/124px-Android_robot_2014.svg.png)

Android, propiedad de Google y sistema operativo móvil (que seguramente todos conocéis), es el sistema para móviles más usado en el mundo, con aproximadamente el 87.5% de cuota de mercado (según datos de 2016) y además basado en Linux. 

![cuota de mercado android](https://i.blogs.es/aaedf3/gsmarena_001/1366_2000.png)

Esto es importante dado que como el núcleo de este sistema es Linux, podemos usar diversos comandos propios. En el momento de esta publicación,  la versión estable de Android es la 7.1.1 (Nougat) y usa un núcleo Linux 3.18.14.



## Termux

Es un potentísimo emulador de terminal Linux disponible para Android en [Play Store](https://play.google.com/store/apps/details?id=com.termux).
Hay muchas aplicaciones similares, pero esta es una de las más completas y personabizables, además de gratis y código abierto.

Ya instalado, actualizamos los paquetes :`$ apt update && apt upgrade`

Para acceder al almacenamiento del dispositivo y que las demás apps puedan acceder al almacenamiemto  de Termux, ejecutamos:`$ termux-setup-storage`

Ya es posible instalar git, con el mismo comando que en Debian: `$ apt install git` , y ya podremos disfrutar de todas las funcionalidades del comando `git`.

<img src="{{ site.url }}/assets/images/2017-08-31/1.png" width="500">
