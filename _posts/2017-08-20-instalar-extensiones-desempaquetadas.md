---
title: "Instalar extensiones desempaquetadas"
layout: post
published: true
date: 2017-08-20
image: 
headerImage: true
tag:
- WebExtensions
- web
category: blog
author: davidpblcrd
description: Instalar extensiones desempaquetadas en los navegadores web
---

Las extensiones de los navegadores web han ido evolucionando a lo largo de los últimos años. Pronto algunas van a desaparecer como las de Mozilla Firefox basadas en XUL y XPCOM, a favor de las WebExtensions, las que en realidad son extensiones de Google Chrome. Estas pueden ser instaladas sin firmar en prácticamente cualquier explorador, y no tienen por qué ser descargadas desde una *Store* concreta.

<section id="table-of-contents" class="toc">
  <header>
    <h3 >Contenidos</h3>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section><!-- /#table-of-contents -->



Para instalar una extensión desde su código fuente (el cual necesitaremos tener, hay muchos en [GitHub](https://github.com)), hay que seguir los siguientes pasos dependiendo del navegador:

### Mozilla Firefox

1.En la barra de dirección, escribir `about:debugging`, mostrará esta ventana:

<img src="{{ site.url }}/assets/images/2017-08-20/mozilla.png" width="100%"/>

2.Pinchar en *Cargar complemento temporal*, buscar el archivo `manifest.json` del complemento y este ya se cargará automáticamente. 

Este navegador tiene el problema de que si cerramos el mismo, los complementos se eliminarán y tendremos que repetir el proceso. Por ello, siempre es recomendable buscar si el complemento existe en: [Complementos para Firefox](https://addons.mozilla.org/es/firefox/).

### Google Chrome - Chromium

1.En la barra de dirección, escribir `chrome://extensions/` o ir al menu lateral > Más herramientas > Extensiones, se mostrará la siguiente ventana:

<img src="{{ site.url }}/assets/images/2017-08-20/chrome.png" width="100%"/>

2.Marcar la casilla *Modo de desarrollador*. Se desplegará una barra nueva.
3.Seleccionar *Cargar extensión descomprimida...* y seleccionar la carpeta donde se encuentra la extensión.

### Opera

El proceso es prácticamente similar a Chrome:

1.En la barra de dirección, escribir `opera://startpage/extensions`: 

<img src="{{ site.url }}/assets/images/2017-08-20/opera.png" width="100%"/>

2.Marcar la casilla *Modo de autor*. Se desplegará una barra nueva.
3.Seleccionar *Cargar extensión descomprimida...* y seleccionar la carpeta donde se encuentra la extensión.



### Microsoft Edge

1.En la barra de dirección, escribir `about:flags`: 

<img src="{{ site.url }}/assets/images/2017-08-20/edge1.png" width="100%"/>

2.Marcar la casilla *Habilitar características de desarrollador de extensiones*.
3.Reiniciar el navegador.
4.Desplegar el Menú lateral > Extensiones > Cargar extensión.

<img src="{{ site.url }}/assets/images/2017-08-20/edge2.png" width="100%"/>

### Extensiones de ejemplo

En mi [página de GitHub](https://github.con/davidpob99/webextensions) tengo una colección de WebExtensiones que se pueden usar siguiendo los métodos descritos, y todas ellas están publicadas en [Complementos para Firefox](https://addons.mozilla.org/es/firefox/).
