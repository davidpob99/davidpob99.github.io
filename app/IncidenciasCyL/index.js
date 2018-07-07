var map;
var incidenciasJson;
var pk;
var markers;

var infoIcon = L.icon({
    iconUrl: 'img/twotone_not_listed_location_black_18dp.png',
    iconSize: [41, 41],
    popupAnchor: [1, -34]
});

var blueIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var orangeIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var yellowIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var violetIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var blackIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


function onLoad() {
    initMap();
    loadIncidencias();
    loadPK();
    console.log(incidenciasJson.titulo);
    console.log(incidenciasJson.fecha);
    loadMarkers(function() {
        map.panTo(new L.LatLng(42.76021010427416, -3.6149748288166803));
        document.getElementById("load").style.display = "none";
    });
}

function initMap() {
    /*map = new google.maps.Map(document.getElementById('mapa'),  {
    	center: {lat:42.76021010427416, lng:-3.6149748288166803}, 
    	zoom:9, 
    	streetViewControl:false
    }); */
    map = new L.Map('mapa');

    var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors | Fuente de los datos: <a href="https://datosabiertos.jcyl.es" title="Datos Abiertos de Castilla y León">Junta de Castilla y León</a> | Aplicación: Copyright &copy; 2018 <a href=https://davidpob99.github.io>David Población</a>';
    var osm = new L.TileLayer(osmUrl, {
        minZoom: 0,
        maxZoom: 18,
        attribution: osmAttrib
    });

    map.setView(new L.LatLng(42.76021010427416, -3.6149748288166803), 13);
    map.addLayer(osm);

    var leyend = L.control({
        position: 'bottomright'
    });
    leyend.onAdd = function(map) {

        var div = L.DomUtil.create('div', 'ley');

        div.innerHTML = '<center><h2>LEYENDA</h2></center>' + 'Cadenas: <div class="color-box" style="background-color: blue;"></div>' +
            '<br>Cerrada: <div class="color-box" style="background-color: red;"></div>' +
            '<br>Circulación alternativa: <div class="color-box" style="background-color: green;"></div>' +
            '<br>Cortada: <div class="color-box" style="background-color: orange;"></div>' +
            '<br>Precaución: <div class="color-box" style="background-color: yellow;"></div>' +
            '<br>Solucionada: <div class="color-box" style="background-color: violet;"></div>' +
            '<br>Otras: <div class="color-box" style="background-color: black;"></div>' +
            '<p> </p>' +
            '<br> ';
        return div;
    };
    leyend.addTo(map);
}

function loadIncidencias() {
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", "https://cors-anywhere.herokuapp.com/http://servicios.jcyl.es/InviPublica/OpenData?formato=json", false);
    xhReq.send(null);
    incidenciasJson = JSON.parse(xhReq.responseText);
}

function loadPK() {
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", "pk.json", false);
    xhReq.send(null);
    pk = JSON.parse(xhReq.responseText);
}

function utmToLatLng(zone, easting, northing, northernHemisphere) {
    if (!northernHemisphere) {
        northing = 10000000 - northing;
    }

    var a = 6378137;
    var e = 0.081819191;
    var e1sq = 0.006739497;
    var k0 = 0.9996;

    var arc = northing / k0;
    var mu = arc / (a * (1 - Math.pow(e, 2) / 4.0 - 3 * Math.pow(e, 4) / 64.0 - 5 * Math.pow(e, 6) / 256.0));

    var ei = (1 - Math.pow((1 - e * e), (1 / 2.0))) / (1 + Math.pow((1 - e * e), (1 / 2.0)));

    var ca = 3 * ei / 2 - 27 * Math.pow(ei, 3) / 32.0;

    var cb = 21 * Math.pow(ei, 2) / 16 - 55 * Math.pow(ei, 4) / 32;
    var cc = 151 * Math.pow(ei, 3) / 96;
    var cd = 1097 * Math.pow(ei, 4) / 512;
    var phi1 = mu + ca * Math.sin(2 * mu) + cb * Math.sin(4 * mu) + cc * Math.sin(6 * mu) + cd * Math.sin(8 * mu);

    var n0 = a / Math.pow((1 - Math.pow((e * Math.sin(phi1)), 2)), (1 / 2.0));

    var r0 = a * (1 - e * e) / Math.pow((1 - Math.pow((e * Math.sin(phi1)), 2)), (3 / 2.0));
    var fact1 = n0 * Math.tan(phi1) / r0;

    var _a1 = 500000 - easting;
    var dd0 = _a1 / (n0 * k0);
    var fact2 = dd0 * dd0 / 2;

    var t0 = Math.pow(Math.tan(phi1), 2);
    var Q0 = e1sq * Math.pow(Math.cos(phi1), 2);
    var fact3 = (5 + 3 * t0 + 10 * Q0 - 4 * Q0 * Q0 - 9 * e1sq) * Math.pow(dd0, 4) / 24;

    var fact4 = (61 + 90 * t0 + 298 * Q0 + 45 * t0 * t0 - 252 * e1sq - 3 * Q0 * Q0) * Math.pow(dd0, 6) / 720;

    var lof1 = _a1 / (n0 * k0);
    var lof2 = (1 + 2 * t0 + Q0) * Math.pow(dd0, 3) / 6.0;
    var lof3 = (5 - 2 * Q0 + 28 * t0 - 3 * Math.pow(Q0, 2) + 8 * e1sq + 24 * Math.pow(t0, 2)) * Math.pow(dd0, 5) / 120;
    var _a2 = (lof1 - lof2 + lof3) / Math.cos(phi1);
    var _a3 = _a2 * 180 / Math.PI;

    var latitude = 180 * (phi1 - fact1 * (fact2 + fact3 + fact4)) / Math.PI;

    if (!northernHemisphere) {
        latitude = -latitude;
    }

    var longitude = ((zone > 0) && (6 * zone - 183.0) || 3.0) - _a3;

    var obj = {
        latitude: latitude,
        longitude: longitude
    };


    return obj;
}

function loadMarkers(callback) {
    markers = [];
    for (var i in incidenciasJson.incidencias) {
        var tmpinic;
        for (var j in pk.features) {
            if (pk.features[j].properties.MATRICULA == incidenciasJson.incidencias[i].Via && pk.features[j].properties.VALORKM == Math.round(incidenciasJson.incidencias[i].PKInicio)) {
                // console.log(pk.features[j].geometry.coordinates);
                // console.warn(pk.features[j].properties.MATRICULA);
                tmpinic = pk.features[j].geometry.coordinates
                break;
            }
        }

        for (var j in pk.features) {
            if (pk.features[j].properties.MATRICULA == incidenciasJson.incidencias[i].Via && pk.features[j].properties.VALORKM == Math.round(incidenciasJson.incidencias[i].PKFin)) {
                // console.log(pk.features[j].geometry.coordinates);
                // console.warn(pk.features[j].properties.MATRICULA);
                markers.push(new Pin(tmpinic, pk.features[j].geometry.coordinates, i))
                break;
            }
        }
    }

    // console.log(markers);

    for (var i in markers) {
        delete content;
        var coordinicio = utmToLatLng(30, markers[i].cinicio[0], markers[i].cinicio[1], true);
        var coordfin = utmToLatLng(30, markers[i].cfin[0], markers[i].cfin[1], true);
        /*var marker = new google.maps.Marker( {			
				position:new google.maps.LatLng(coordinicio.latitude, coordinicio.longitude), 
				title:incidenciasJson.incidencias[markers[i].pos].Via
			}); 
			marker.setMap(map); */
        var tmpicon;
        switch (incidenciasJson.incidencias[markers[i].pos].Tipo) {
            case "Cadenas":
                tmpicon = blueIcon;
                break;
            case "Cerrada":
                tmpicon = redIcon;
                break;
            case "Circulación alternativa":
                tmpicon = greenIcon;
                break;
            case "Cortada":
                tmpicon = orangeIcon;
                break;
            case "Precaución":
                tmpicon = yellowIcon;
                break;
            case "Solucionada":
                tmpicon = violetIcon;
                break;
            case "Otros":
                tmpicon = blackIcon;
                break;
        }
        var marker = L.marker([coordinicio.latitude, coordinicio.longitude], {
            icon: tmpicon
        }).addTo(map);
        marker.bindPopup("<a href=" + incidenciasJson.incidencias[markers[i].pos].MasInfo + "><h2> " + incidenciasJson.incidencias[markers[i].pos].Via + '</h2></a>' + "<h4> " + incidenciasJson.incidencias[markers[i].pos].Tramo + '</h4>' + "<p>Población: " + incidenciasJson.incidencias[markers[i].pos].Provincia + "</p>" + "<p>Tipo: " + incidenciasJson.incidencias[markers[i].pos].Tipo + "</p>" + "<p>Causa: " + incidenciasJson.incidencias[markers[i].pos].Causa + "</p>" + "<p>Sentido: " + incidenciasJson.incidencias[markers[i].pos].Calzada + "</p>" + "<p>Del km " +
            incidenciasJson.incidencias[markers[i].pos].PKInicio + " al km " + incidenciasJson.incidencias[markers[i].pos].PKFin + "</p>" + "<p>Observaciones: " + incidenciasJson.incidencias[markers[i].pos].Observaciones + "<br>Ruta alternativa" + incidenciasJson.incidencias[markers[i].pos].RutaAlt + "<br>Fecha y hora de inicio: " + incidenciasJson.incidencias[markers[i].pos].FechaAlta + "</p>");
        if (coordinicio.latitude != coordfin.latitude || coordinicio.longitude != coordfin.longitude) {
            var marker = L.marker([coordfin.latitude, coordfin.longitude], {
                icon: tmpicon
            }).addTo(map);
            marker.bindPopup("<a href=" + incidenciasJson.incidencias[markers[i].pos].MasInfo + "><h2> " + incidenciasJson.incidencias[markers[i].pos].Via + '</h2></a>' + "<h4> " + incidenciasJson.incidencias[markers[i].pos].Tramo + '</h4>' + "<p>Población: " + incidenciasJson.incidencias[markers[i].pos].Provincia + "</p>" + "<p>Tipo: " + incidenciasJson.incidencias[markers[i].pos].Tipo + "</p>" + "<p>Causa: " + incidenciasJson.incidencias[markers[i].pos].Causa + "</p>" + "<p>Sentido: " + incidenciasJson.incidencias[markers[i].pos].Calzada + "</p>" + "<p>Del km " +
                incidenciasJson.incidencias[markers[i].pos].PKInicio + " al km " + incidenciasJson.incidencias[markers[i].pos].PKFin + "</p>" + "<p>Observaciones: " + incidenciasJson.incidencias[markers[i].pos].Observaciones + "<br>Ruta alternativa" + incidenciasJson.incidencias[markers[i].pos].RutaAlt + "<br>Fecha y hora de inicio: " + incidenciasJson.incidencias[markers[i].pos].FechaAlta + "</p>");
            var tmpcolor;
            switch (incidenciasJson.incidencias[markers[i].pos].Tipo) {
                case "Cadenas":
                    tmpcolor = "blue";
                    break;
                case "Cerrada":
                    tmpcolor = "red";
                    break;
                case "Circulación alternativa":
                    tmpcolor = "green";
                    break;
                case "Cortada":
                    tmpcolor = "orange";
                    break;
                case "Precaución":
                    tmpcolor = "yellow";
                    break;
                case "Solucionada":
                    tmpcolor = "violet";
                    break;
                case "Otros":
                    tmpcolor = "black";
                    break;
            }
            var control = L.Routing.control({
                waypoints: [
                    L.latLng(coordinicio.latitude, coordinicio.longitude),
                    L.latLng(coordfin.latitude, coordfin.longitude)
                ],
                waypointMode: 'snap',
                addWaypoints: false,
                createMarker: function() {
                    return null
                },
                lineOptions: {
                    styles: [{
                        color: tmpcolor,
                        opacity: 1,
                        weight: 2
                    }]
                },
                router: L.Routing.mapbox('pk.eyJ1IjoicHVjZWxhbmljbyIsImEiOiJjamo5c3pwMjUydnQ1M3BtbmFocWR6bTRrIn0._npLO-2fdrcEpVbuBAC7YQ'),
            }).addTo(map);
            control.hide();

        }

        callback();
        // var infowindow = new google.maps.InfoWindow(); 		


        /*google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
            return function () {
            	infowindow.setContent(content); 
                infowindow.open(map, marker); 
            }; 
        })(marker, content, infowindow)); */
    }
}


class Pin {
    constructor(cinicio, cfin, pos) {
        this.cinicio = cinicio;
        this.cfin = cfin;
        this.pos = pos;
    }
}