---
title: "Qué son las WebExtensions y creación de manifest.json"
layout: post
published: false
date: 2017-08-31
image: 
headerImage: true
tag:
- WebExtensions
- web
- programacion
category: blog
author: davidpblcrd
description: 
---
Los complementos de los navegadores web añaden funcionalidades extra a estos, ampliando enormemente las capacidades y productividad de los navegadores. 

En este artículo nos vamos a centrar en el navegador Firefox, ya que su política abierta además de que es posible publicar complementos para este gratuitamente, lo hacen la mejor opción frente a los demás navegadores (por ejemplo en Chrome hay que pagar por publicar complementos).

Desde el comienzo de Firefox existían los llamados _legacy add-ons_, que usaban las tecnologías XUL/XPCOM, desarrolladas por Mozilla. A partir de Firefox 57, los unicos complementos que van a funcionar son las _WebExtensions_, y los anteriores serán descontinuados. Esta decisión por parte de Mozilla está orientada a mejorar la velocidad y seguridad del navegador, como se puede leer [en este enlace](https://blog.mozilla.org/addons/2016/03/14/webextensons-whats-in-it-for-developers/).

Las _WebExtensions_ son un tipo de complementos que se desarrollan para Mozilla Firefox y siguen en gran medida la API de las extensiones de Google Chrome y Opera.

Estos complementos se escriben generalmente con tecnologías web: JavaScript (JS), HTML y CSS:
- JS es usado para la lógica del complemento.
- HTML se usa para organizar los contenidos en la extensión.
- CSS sirve para modificar el estilo y _hacerlo bonito_

Para empezar, es recomendable tener conocimientos básicos de programación web, tales como: variables, funciones, bucles, estilo y etiquetas HTML.

### Tipos de _WebExtensions_

- Popup: constan de un botón que se añade en la barra del navegador y cuando es pulsado abre una ventana que, por ejemplo, muestra datos.
- Background: son extensiones que realizan su acción en segundo plano, y se ejecutan en el inicio o en un momento determinado pero el usuario _no los ve_.
- Content scripts: es similar al popup, pero en vez de saltar una ventana, ejecuta una acción.

### manifest.json

Es el archivo encargado de albergar la información acerca de nuestro complemento. Es esencial dado que si intentamos crear un complemento sin este archivo, simplemente no funcionará.

A continuación se muestra el contenido de un `manifest.json` que pertenece a un complemento que se muestra en segundo plano:

`	{
  "manifest_version": 2, // Este número siempre tiene que ser 2, si no no funciona
  "name": "Google Analytics Blocker", // Nombre del complemento
  "version": "1.0.1", // Version
  "description": "Block Google Analytics from any website you visit.", // Detalles del complemento
  "homepage_url": "https://github.com/davidpob99/webextensions", // Página web
  "permissions": [  // Permisos que requiere el complemento
    "management",
    "webRequest",
    "webRequestBlocking",
    "<all_urls>"
  ], // Permisos que requiere el complemento
  "icons": {
      "128": "icon.svg"
  }, // Iconos
  "background": {
    "scripts": ["background.js"]
  } // Script en segundo plano
}    `

Si el complemento fuera del tipo popup, la propiedad background sería sustituída por:

`"browser_action" : {
    "default_title" : "IncidenciasCyL", // Título del popup
    "default_icon" : "icons/icon-64.png", // Icono del popup
    "default_popup" : "popup/index.html" // HTML del popup
}`

Además, si queremos añadir content scripts:

` "content_scripts": [
  {
    "matches": ["*://*.mozilla.org/*"],
    "js": ["borderify.js"],
    "css" : ["style.css"],
    "all_frames" : false,
    "run_at" : "document_end"
  }
]`






