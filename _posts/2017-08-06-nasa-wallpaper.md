---
title: "nasa-wallpaper"
layout: post
date: 2017-08-06
tag: 
- terminal
image: 
headerImage: false
projects: true
hidden: true # don't count this post in blog pagination
description: 
category: project
author: davidpblcrd
externalLink: false
---

[![contribute](https://img.shields.io/badge/GitHub-contribute-red.svg)](https://github.com/davidpob99/nasa-wallpaper/)

Change your desktop background with a NASA image. You can set an image from both the APOD (Astronomical Picture of the Day) and the 
NASA Image Library.



![iss040e008244](https://images-assets.nasa.gov/image/iss040e008244/iss040e008244~small.jpg)

## Installation
### Debian and derivatives: 
See [releases](https://github.com/davidpob99/nasa-wallpaper/releases) and download the `nasa-wallpaper_1.1_all.deb` file

`$ sudo dpkg -i nasa-wallpaper_1.1_all.deb`

### Arch Linux
<a href='https://aur.archlinux.org/packages/nasa-wallpaper/'><img width='300px' alt='Disponible en AUR' src='https://www.archlinux.org/static/logos/archlinux-logo-dark-1200dpi.b42bd35d5916.png'/></a>
### With the code
`git clone https://github.com/davidpob99/nasa-wallpaper`

`cd nasa-wallpaper`

`chmod -x ./nasa-wallpaper`

`./nasa-wallpaper`



## Getting started
Set the APOD image as wallpaper (GNOME): `nasa-wallpaper -T gnome -a`

Set the APOD image of the 27th March 1999 (MATE): `nasa-wallpaper -d 1999-03-27 -T mate -a`

Set a random image from the NASA Image Library (LXDE): `nasa-wallpaper -T lxde -n`

Set a random image with the `earth` keyword (GNOME): `nasa-wallpaper -w earth -T gnome -n`

Read the manual: `man nasa-wallpaper` or `nasa-wallpaper -h`

**You can read the all reference on the [Wiki](https://github.com/davidpob99/nasa-wallpaper/wiki/Reference) section**

## License

Code available under the Apache 2.0 License.
