var map;
var incidencias = [];
function initMap() {	
	map = new google.maps.Map(document.getElementById('mapa'), {
		center: {lat: 42.986003, lng: -2.3498325},
		zoom: 9,
		streetViewControl: false
	});

	document.getElementById('legend').innerHTML = '<center><h2>LEYENDA</h2></center>'+'Meteorológica: <div class="color-box" style="background-color: #00e5ff;"></div>'+
	'<br>Accidente: <div class="color-box" style="background-color: #ff0000;"></div>'+
	'<br>Retención: <div class="color-box" style="background-color: #d400ff;"></div>'+
	'<br>Seguridad vial: <div class="color-box" style="background-color: #ffa100;"></div>'+
	'<br>Puertos de montaña: <div class="color-box" style="background-color: #72510e;"></div>'+
	'<br>Vialidad invernal tramos: <div class="color-box" style="background-color: #ffffff;"></div>'+
	'<br>Pruebas deportivas: <div class="color-box" style="background-color: #00ff55;"></div>'+
	'<br>Obras: <div class="color-box" style="background-color: #fff600;"></div>'+
	'<br>Otras incidencias: <div class="color-box" style="background-color: #000000;"></div>';
	map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
      document.getElementById('legend'));

	document.getElementById('copy').innerHTML = 'Fuente de los datos: <img height="16px" src="http://opendata.euskadi.eus/images/w79-logo_opendata.gif"/>'+ 
	'<br> De la Web: Copyright &copy; 2017 David Población';
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
      document.getElementById('copy'));

	var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://www.trafikoa.eus/servicios/IncidenciasTDT/IncidenciasTrafikoTDTGeo");
    xhr.addEventListener("load",function(){        
        var data = xhr.responseXML; 
        var datos = xml2json(data);  
        datos = datos.replace('undefined', '');
        var json = JSON.parse(datos);
        //console.log(json);                  
        console.log("Completado sin errores");
        for(var i in json.raiz.incidenciaGeolocalizada) {         	
        	incidencias.push([json.raiz.incidenciaGeolocalizada[i].carretera, json.raiz.incidenciaGeolocalizada[i].poblacion, json.raiz.incidenciaGeolocalizada[i].tipo, json.raiz.incidenciaGeolocalizada[i].causa, json.raiz.incidenciaGeolocalizada[i].sentido, json.raiz.incidenciaGeolocalizada[i].nivel, json.raiz.incidenciaGeolocalizada[i].pk_inicial, json.raiz.incidenciaGeolocalizada[i].pk_final, json.raiz.incidenciaGeolocalizada[i].fechahora_ini, json.raiz.incidenciaGeolocalizada[i].latitud, json.raiz.incidenciaGeolocalizada[i].longitud]);
        }   
        setMarkers(map, incidencias);
    });
    xhr.send();
    	
}
function setMarkers(map, incidencias){
	var marker;
    // console.log(incidencias);
	for (var i=0; i < incidencias.length; i++){ 
		var carretera = incidencias[i][0];
		var poblacion = incidencias[i][1];
		var tipo = incidencias[i][2];
		var causa =  incidencias[i][3];
		var sentido =  incidencias[i][4];
		var nivel =  incidencias[i][5];
		var pk_inicial =  incidencias[i][6];
		var pk_final =  incidencias[i][7];
		var fechahora_ini =  incidencias[i][8];
		var lat =  incidencias[i][9];
		var lon =  incidencias[i][10];

		var pinColor;

		switch(incidencias[i][2]){
			case "Meteorológica":
				pinColor = "00e5ff"
				break;
			case "Accidente":
				pinColor = "ff0000"
				break;
			case "Retención":
				pinColor = "d400ff"
				break;
			case "Seguridad vial":
				pinColor = "ffa100"
				break;
			case "Otras incidencias":
				pinColor = "000000"
				break;
			case "Puertos de montaña":
				pinColor = "72510e"
				break;
			case "Vialidad invernal tramos":
				pinColor = "ffffff"
				break;
			case "Pruebas deportivas":
				pinColor = "00ff55"
				break;
			case "Obras":
				pinColor = "fff600"
				break;
		}

		var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
			new google.maps.Size(21, 34),
			new google.maps.Point(0,0),
			new google.maps.Point(10, 34));
		var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
			new google.maps.Size(40, 37),
			new google.maps.Point(0, 0),
			new google.maps.Point(12, 35));


		var latlngset = new google.maps.LatLng(Number(lat), Number(lon));

		var marker = new google.maps.Marker({  
		    map: map, 
		    title: carretera , 
		    position: latlngset,
		    icon: pinImage,
			shadow: pinShadow
		  });
		map.setCenter(marker.getPosition());

		var content = "<h2> " + carretera +  '</h2>' + "<p>Población: " + poblacion+ "</p>" + "<p>Tipo: " + tipo+ "</p>"
		+ "<p>Causa: " + causa+ "</p>" + "<p>Sentido: " + sentido+ "</p>" + "<p>Nivel: " + nivel+ "</p>" + "<p>Del km: " + 
		pk_inicial + " al km " + pk_final + "</p>" + "<p>Fecha y hora de inicio: " + fechahora_ini+ "</p>";     

		var infowindow = new google.maps.InfoWindow();		


		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
		    return function() {
		    	infowindow.setContent(content);
		        infowindow.open(map,marker);
		    };
		})(marker,content,infowindow)); 
	}    
}