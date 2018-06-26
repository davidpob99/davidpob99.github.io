---
title: "Instalar ArchLinux"
layout: post
published: true
date: 2017-08-14
headerImage: true
tag:
- linux
- tutorial
category: blog
author: davidpblcrd
description: Instalar ArchLinux con LXDE
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



### ¿Qué es Arch?

Como en su propia página indica, Arch es:
> Arch Linux, a lightweight and flexible Linux® distribution that tries to Keep It Simple.

,lo que literalmente significa:
> Arch Linux, una flexible y ligera distribución Linux® que intenta "Hacerlo Sencillo".

Básicamente, en términos generales, es una distribución Linux que actualmente sólo soporta ordenadores de 64 bits e instala la mínima instalación posible, es decir, solo instala el núcleo y los paquetes esenciales para correr GNU/Linux.

### Preinstalación

#### Descargar

Tan solo hay que ir a la página principal de [Arch](http://archlinux.org) e ir al apartado *Downloads* y descargar la última ISO disponible vía Torrent, puedes abrirlo con programas como `Transmission` o `ctorrent`.

#### Creación del medio

Para descomprimir la imagen ISO es necesario un USB de al menos 500Mb, tamaño que al menos tienen todos los USB en la actualidad. Suponiendo que la imagen se ha descargado en un sistema Linux, tan solo hay que montarla en el USB con el comando `dd`. Si se usa Windows, el programa **Rufus** es de gran utilidad. 

Para obtener una lista de los discos conectados al equipo, ejecutar: `$ sudo fdisk -l`

Para descomprirmir la ISO en el USB con `dd` ejecutar: `$ sudo dd if=nombre-arch.iso of=/dev/sdX` , donde *nombre-arch.iso* es el nombre del archivo descargado y */dev/sdX* es el USB donde se va a crear el medio. **TODOS LOS DATOS SERÁN ELIMINADOS**.

Reiniciar el ordenador con el USB insertado e iniciar con él cuando el odenador se reinicie.

### Instalación

Ejecutar la primera opción ("Boot Arch Linux")

<figure>
	<a href="{{ site.url }}/assets/images/2017-08-14/1.png"><img src="{{ site.url }}/assets/images/2017-08-14/1.png"></a>	
</figure>

Cargamos el teclado en español: `loadkeys es`

#### Particionado de discos

En este aspecto hay varias posibilidades, como separar las carpetas /home /var /tmp /boot o dejarlas todas juntas... En este caso haremos las siguientes particiones:
* /boot: Datos de inicio del sistema, de 200 a 500Mb 
* /: Directorio raiz del sistema, mínimo 15Gb
* /home: Carpeta personal
* swap: Área de intercambio, si la RAM es menor de 1Gb, la swap será del mismo tamaño, si es superior, de la mitad del tamaño de la RAM, (Ejemplo: RAM=2Gb, swap=1Gb). No es recomendable crear una swap de más de 2Gb.

Buscamos el disco duro dónde instalar con el comando `fdisk -l`

<figure>
	<a href="{{ site.url }}/assets/images/2017-08-14/2.png"><img src="{{ site.url }}/assets/images/2017-08-14/2.png"></a>	
</figure>

En mi caso el disco a instalar es /dev/sda.

Para hacer el particionado usamos la herramienta `cfdisk`, segiuida del disco que dónde queramos instalar Arch: `cfdisk /dev/sda`. A continuación seleccionamos el tipo `dos` y creamos las particiones anteriormente dichas, teniendo en cuenta:

* / , /boot y /home tienen un sistema de archivos *Linux*.
* swap tiene un sistema de archivos Linux swap / Solaris.

#### Formateo de discos

Hechas ya las particiones, ahora hay que darles formato:

* /boot , ejecutar `mkfs -t ext2 /dev/sda1`
* / , ejecutar `mkfs -t ext4 /dev/sda2`
* /home , ejecutar `mkfs -t ext4 /dev/sda3`
* swap, ejecutar `mkswap /dev/sda4`

Para iniciar la swap: `swapon /dev/sda4`.

#### Montar las particiones

Para acceder a los datos de las particiones, hay que montarlas. Esto se suele hacer en la carpeta /mnt:

1. Primero se monta el directorio raiz / : `mount /dev/sda2 /mnt`.
2. Ahora se crean los directorios boot y home dentro de /mnt para después montar las demás particiones en dichas carpetas: `mkdir boot && mkdir home`.
3. A continuación se montan /boot y /home : `mount /dev/sda1 /mnt/boot && mount /dev/sda3 /mnt/home`.



#### Instalar el sistema

Para ello necesitamos tener conexión a Internet, podemos comprobarlo ejecutando: `ping -c 3 archlinux.org`

Si nos devuelve resultados, entonces tenemos conexión a Internet y podemos ejecutar el sistema base. Para ello: `pacstrap /mnt base base-devel`. Esperamos un rato que depende de la velocidad de Internet.

Hecho esto, instalamos el gestor de arranque GRUB y el soporte a la red: `pacstrap /mnt grub-bios netctl wpa_supplicant dialog networkmanager`

Si tenemos un portátil, hay que instalar el soporte para el *touchpad*: `pacstrap /mnt xf86-input-synaptics`.

#### Configurar el sistema

Primero generamos un archivo **fstab**: `genfstab -p /mnt >> /mnt/etc/fstab`
Para entrar al nuevo sistema, cambiamos el directorio de trabajo con: `arch-chroot /mnt`

Damos un nombre al sistema, al *host*: `echo 'NOMBRE_DEL_HOST' >> /etc/hostname`. Donde NOMBRE_DEL_HOST puede ser cualquier palabra que queramos, aunque comunmente se usa `arch` o `localhost`.

Para configurar la zona horaria, creamos un enlace simbólico según la región donde vivas: `ln -sf /usr/share/zoneinfo/Europe/Madrid /etc/localtime`. Como puedes observar donde pone Europe se refiere al continente y donde pone Madrid a la capital del país de la zona deseada.

Para configurar el idioma escribimos `nano /etc/locale.gen` y descomentamos (quitar #) en el idioma que deseemos, en la opción UTF-8, en el caso del castellano descomentar `es_ES.UTF-8`:

<figure>
	<a href="{{ site.url }}/assets/images/2017-08-14/3.png"><img src="{{ site.url }}/assets/images/2017-08-14/3.png"></a>	
</figure>

Además, hay que editar el archivo **locale.conf** y añadir el idioma seleccionado, para ello: `echo 'LANG=es_ES.UTF-8' >> /etc/locale.conf`

Con los últimos dos pasos hechos, ya es posible generar el idioma con: `locale-gen`

#### Configurar GRUB

El gestor de arranque es una de las partes más importantes de esta guía, puesto que si se sale del instalador sin configurarlo correctamente el ordenador queda inutilizado y no se puede acceder a ningún sistema operativo. 

Paso previo para ordenadores con **UEFI**: `grub-install --target=x86_64-efi --efi-directory=$esp --bootloader-id=grub_uefi --recheck`

Ahora configuramos el GRUB: `grub-install /dev/sda`, en este caso se opta por instalarlo en el MBR, el registro principal de arranque.

Para crear la configuración de nuestro GRUB: `grub-mkconfig -o /boot/grub/grub.cfg`

Hecho esto ya estaría configurado el gestor de arranque, ahora hay que crear la RAM inicial (opcional pero recomendado):`mkinitcpio -p linux`

#### Configurar usuarios

Configurando la contraseña de superusuario (root): `passwd` , esto no fija las contraseñas para los demás usuarios ni crea un usuario nuevo. Para crear un usuario nuevo, que no sea superusuario, hay que ejecutar: `useradd -m -g users -G audio,lp,optical,storage,video,wheel,games,power,scanner -s /bin/bash USUARIO` , donde *USUARIO* es el nombre del nuevo usuario y consta de una sola palabra, por ejemplo: *pedro*.

Para ajustar la contraseña del nuevo usuario hay que ejecutar `passwd USUARIO`, donde *USUARIO* es el nombre de usuario que hemos insertado antes.

#### Reiniciar

Hecho ya todo esto, salimos del entorno *chroot* con `exit` y desmontamos los volúmenes montados: `umount /mnt/{boot,home,}`.**MUY IMPORTANTE**, ya que si no podemos estropear el disco. Por último ya podemos reiniciar el sistema: `reboot`.



### Postinstalación

Retiramos el USB para que este no se inicie automáticamente. Si no nos hemos dado cuenta, podemos seleccionar la opción *Boot existing OS* que aparece en el propio USB.

Entraremos con la cuenta de root, ya que todavía quedan hacer configuraciones importntes de administrador.

Actualizamos los repositorios e iniciamos una primera actualización: `pacman -Syu`. Si da un problema con la red, ejecutar `systemctl enable dhcpcd.service && systemctl start dhcpcd.service` . 

#### Instalar controladores de pantalla y procesador

##### Pantalla

* NVIDIA: `pacman -S xf86-video-nouveau`
* ATI: `pacman -S xf86-video-ati`
* INTEL: `pacman -S xf86-video-intel`

##### Procesador

* INTEL: `pacman -S intel-ucode`
* AMD: ` pacman -S linux-firmware`

#### Instalar el entorno gráfico

Primero hay que instalar el entorno X11, antes de instalar el entorno de escritorio (en este caso LXDE): `pacman -S xorg` , junto al soporte 3D: `pacman -S mesa mesa-demos`

Ahora ya es posible instalar LXDE: `pacman -S lxde`. Cuando haya terminado, conviene instalar LightDM, un gestor de pantalla ligero que nos permite acceder a LXDE: `pacman -S lightdm`. Aparte de esto es necesario instalar un Greeter para LightDM, el que es conveniente por defeto es lightdm-gtk-greeter: `pacman -S lightdm-gtk-greeter`.

En Arch no se ejecuta ninguna aplicación que instalemos por defecto, para ello hay que especificárselo. Como queremos que al iniciarse el ordenador aparezca LightDM: `systemctl enable lightdm.servic && systemctl start lightdm.service` .Aparecerá una pantalla de inicio de sesión, en la cual iniciaremos otra vez con la cuenta root.

#### Instalar linux-lts

El núcleo es la parte principal de un sistema operativo Linux. El núcleo que viene instalado por defecto en Arch es el último liberado, no el de soporte alargado (LTS). Por ello conviene cambiarlo por el LTS, para ello: `pacman -S linux-lts linux-lts-headers`. 

Volvemos a generar la configuración de GRUB: `grub-mkconfig -o /boot/grub/grub.cfg` y crear el disco de arranque: `mkinitcpio -p linux-lts`, en el próximo inicio del ordenador ya se puede desinstalar el otro núcleo con `pacman -Rs linux`.
