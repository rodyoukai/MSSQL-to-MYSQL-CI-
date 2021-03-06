/**
 * Stroop Task Script
 * Copyright (c) 2009, Manas Tungare.
 * Licensed under the Creative Commons Attribution Non-commercial Share-Alike license 3.0
 * You retain the freedom to examine and modify this script, subject to the condition
 * that you must attribute it to the original author, and all modifications must be
 * shared under the same license.
 *
 * Thanks to the jQuery developers for sharing their library for public use!
 * 
 * 
 * Este script esta basado en el script de Manas Tungare. Se le han hecho sustanciales modificaciones para su uso como herramienta de medición para invetigación en psicologia.
 * 
 * Script modificado por Rodrigo Cuellar Hidalgo.
 */
 
// All colors in this list should be HTML colors.
// http://en.wikipedia.org/wiki/Web_colors



///////////////////////////////////////////////////AREA PARA MODIFICAR LISTAS Y ORDEN DE LOS BLOQUES//////////////////////////////////////



//los colores de la "tinta" (respetar formato)

var COLORS = new Array(
  "red",
  "blue",
  "green",
  "yellow",
  "#FE2EF7",//rosa mexicano
  "white"
);

//arreglos de botones

var BUTTONS = new Array();

BUTTONS[0] = ["ROJO", "AZUL", "AMARILLO", "VERDE", "BLANCO", "ROSA MEX"]
BUTTONS[1] = ["VERDE", "BLANCO", "ROSA MEX", "ROJO", "AZUL", "AMARILLO"]
BUTTONS[2] = ["ROSA MEX", "ROJO", "AZUL", "AMARILLO", "VERDE", "BLANCO"]
BUTTONS[3] = ["AMARILLO", "VERDE", "BLANCO", "ROSA MEX", "ROJO", "AZUL"]
BUTTONS[4] = ["BLANCO", "AMARILLO", "VERDE", "AZUL", "ROSA MEX", "ROJO"]
BUTTONS[5] = ["AZUL", "ROSA MEX", "ROJO", "BLANCO", "AMARILLO", "VERDE"]
BUTTONS[6] = ["ROJO", "VERDE", "ROSA MEX", "AMARILLO", "AZUL", "BLANCO"]
BUTTONS[7] = ["AMARILLO", "AZUL", "BLANCO", "ROJO", "VERDE", "ROSA MEX"]
BUTTONS[8] = ["ROSA MEX", "AMARILLO", "AZUL", "BLANCO", "ROJO", "VERDE"]
BUTTONS[9] = ["BLANCO", "ROJO", "VERDE", "ROSA MEX", "AMARILLO", "AZUL"]
BUTTONS[10] = ["AZUL", "BLANCO", "ROJO", "VERDE", "ROSA MEX", "AMARILLO"]
BUTTONS[11] = ["VERDE", "ROSA MEX", "AMARILLO", "AZUL", "BLANCO", "ROJO"]
BUTTONS[12] = ["ROJO", "VERDE", "AZUL", "ROSA MEX", "BLANCO", "AMARILLO"]
BUTTONS[13] = ["ROSA MEX", "BLANCO", "AMARILLO", "ROJO", "VERDE", "AZUL"]
BUTTONS[14] = ["AZUL", "ROSA MEX", "BLANCO", "AMARILLO", "ROJO", "VERDE"]
BUTTONS[15] = ["AMARILLO", "ROJO", "VERDE", "AZUL", "ROSA MEX", "BLANCO"]
BUTTONS[16] = ["BLANCO", "AZUL", "ROJO", "VERDE", "AMARILLO", "ROSA MEX"]
BUTTONS[17] = ["VERDE", "AMARILLO", "ROSA MEX", "BLANCO", "AZUL", "ROJO"]
BUTTONS[18] = ["ROJO", "VERDE", "ROSA MEX", "BLANCO", "AMARILLO", "AZUL"]
BUTTONS[19] = ["BLANCO", "AMARILLO", "AZUL", "ROJO", "VERDE", "ROSA MEX"]
BUTTONS[20] = ["ROSA MEX", "BLANCO", "AMARILLO", "AZUL", "ROJO", "VERDE"]
BUTTONS[21] = ["AZUL", "ROJO", "VERDE", "ROSA MEX", "BLANCO", "AMARILLO"]
BUTTONS[22] = ["AMARILLO", "AZUL", "ROJO", "VERDE", "ROSA MEX", "BLANCO"]
BUTTONS[23] = ["VERDE", "ROSA MEX", "BLANCO", "AMARILLO", "AZUL", "ROJO"]
BUTTONS[24] = ["ROJO", "VERDE", "AMARILLO", "AZUL", "ROSA MEX", "BLANCO"]
BUTTONS[25] = ["AZUL", "ROSA MEX", "BLANCO", "ROJO", "VERDE", "AMARILLO"]
BUTTONS[26] = ["BLANCO", "AZUL", "ROSA MEX", "AMARILLO", "ROJO", "VERDE"]
BUTTONS[27] = ["AMARILLO", "ROJO", "VERDE", "BLANCO", "AZUL", "ROSA MEX"]
BUTTONS[28] = ["ROSA MEX", "AMARILLO", "ROJO", "VERDE", "BLANCO", "AZUL"]
BUTTONS[29] = ["VERDE", "BLANCO", "AZUL", "ROSA MEX", "AMARILLO", "ROJO"]


 
var i = 0;

var times = new Array();

var errors = new Array();

var success = new Array();

var total_success = 0;

var total_errors = 0;

var neutros = new Array();

var positivos = new Array();

var negativos = new Array();

var indice_interferencia = new Array();

var indice_positivos = 0;

var indice_negativos = 0;

var latencia_positivos = 0;

var latencia_negativos = 0;

var latencia_media = 0; 


//////////////////////////////////////////////////Funciones diversas////////////////////////////////////////////////////////////////////

$.sum = function(arr){
    var r = 0;
    $.each(arr,function(i,v){
        r += v;
    });
    return r;
}



Array.prototype.shuffle = function() {
    for ( var i = this.length-1; i > 0; i-- ) {
        var j = Math.floor( i * Math.random() );
        var tmp = this[ j ];
        this[ j ] = this[ i ];
        this[ i ] = tmp;
    }
    return this;
}

var timer = {
   time: 0,
   now: function(){ return (new Date()).getTime(); },
   start: function(){ this.time = this.now(); },
   since: function(){ return this.now()-this.time; }
}

$translate_color_array = function(color){

//Traducción de los colores requerida para la validar error o acierto al presionar los botones...
	
switch(color)
{
case "ROJO":
var  c = "red";
  break;
case "AZUL":
var c = "blue"
  break;
case "VERDE":
var  c = "green";
  break;
case "AMARILLO":
 var c = "yellow";
  break;
case "ROSA MEX":
 var c = "#FE2EF7";
  break;
case "BLANCO":
 var c = "white";
  break; 
  
  
}
	return c;

}

$translate_color_button = function(color){

//Traducción de los colores requerida para la validar error o acierto al presionar los botones...
	
switch(color)
{
case "red":
var  c = "ROJO";
  break;
case "blue":
var c = "AZUL"
  break;
case "green":
var  c = "VERDE";
  break;
case "yellow":
 var c = "AMARILLO";
  break;
case "#FE2EF7":
 var c = "ROSA MEX";
  break;
case "white":
 var c = "BLANCO";
  break; 
  
  
}

return c;
		
}

var ensayo = 0 ;

//////////////////////////////////////////////////Fin de Funciones diversas////////////////////////////////////////////////////////////////////



$(document).ready(function(){
// $('#back').hide(); 
//  $('#start').click(prestart);
  $('#content').show();
  $('#buttons').show(); 
  $('#b1').click(go);
  $('#b2').click(go); 
  $('#b3').click(go); 
  $('#b4').click(go); 
  $('#b5').click(go); 
  $('#b6').click(go); 
// $('#reset').click(reset);
// $('#save').click(guardar);  
  $('#content').css('padding', '1in');
     next(); 
  });




function next() {
  $('#content').css('color', $translate_color_array(arrayJS[ensayo][7]));
  $('#content').css('font-size', '500%');
  $('#content').html(arrayJS[ensayo][3]+"<br>"+errors.length+"<br>"+success.length);	
  arreglo = (arrayJS[ensayo][5])-1;
  $('#b1').val(BUTTONS[arreglo][0]);    
  $('#b2').val(BUTTONS[arreglo][1]);  
  $('#b3').val(BUTTONS[arreglo][2]);  
  $('#b4').val(BUTTONS[arreglo][3]);
  $('#b5').val(BUTTONS[arreglo][4]);  
  $('#b6').val(BUTTONS[arreglo][5]);      
 timer.start();
  
}
 
function end() {

for (i=0;i<20;i++) {
	
	neutros[i] = times[i];
	
	
}

for (i=20;i<40;i++) {
	
	negativos[i-20] = times[i];
	
	
}

for (i=40;i<60;i++) {
	
	positivos[i-40] = times[i];
	
}

	
  total_success = $.sum(success)/success.length;
  total_errors = $.sum(errors)/errors.length;
  
  latencia_negativos = $.sum(negativos)/negativos.length;
  latencia_positivos = $.sum(positivos)/positivos.length;
	  
	for (i=0;i<20;i++) {
		
		indice_interferencia[i] = positivos[i] - neutros[i];
		
	}  
  
 
  indice_positivos = $.sum(indice_interferencia)/indice_interferencia.length;
  
  
  for (i=0;i<20;i++) {
		
		indice_interferencia[i] = negativos[i] - neutros[i];
		
	} 
  
  
 indice_negativos =  $.sum(indice_interferencia)/indice_interferencia.length;
 latencia_media =  $.sum(times)/times.length;
  

  
 /*
  $('#content').css('font-size','300%');
  $('#content').css('color', 'white');
  $('#content').css('padding', '0in');
  $('#content').html(
  
	"Tiempo total: "+$.sum(times).toFixed(2)+
	"<br>Latencia Media:"+$.sum(times)/times.length+ 
   "<br>Aciertos: "+success.length+
   "<br>Errores: "+errors.length+
   "<br>Indice de Interferencia Positiva: "+indice_positivos.toFixed(2)+
   "<br>Indice de Interferencia Negativa: "+indice_negativos.toFixed(2)+
   "<br>Latencia Positiva: "+latencia_positivos.toFixed(2)+
   "<br>Latencia Negativa: "+latencia_negativos.toFixed(2)+
   "<br>Latencia Media: "+latencia_media.toFixed(3)+
   "<br><br>"+positivos+"<br><br>"+negativos+"<br><br>"+neutros+
   
 */ 
  //codigo del formulario que mandara los datos recabados a php para su ingreso en la base de datos (mysql)
 
  $.post(base+"test/guardar_stroop/"+tipo+"/"+tematica+"/"+usuario,
       {codigo: codigo,
       
        tiempo_total: $.sum(times).toFixed(2),

        latencia_media: latencia_media,

        aciertos: success.length,

        errores: errors.length,

        interferencia_positiva: indice_positivos.toFixed(2),

        interferencia_negativa: indice_negativos.toFixed(2),

        latencia_positiva: latencia_positivos.toFixed(2),

        latencia_negativa: latencia_negativos.toFixed(2)
      },function(respuesta){
      	 $('#content').css('font-size','150%');
      	 $('#content').css('color', 'white');	
          $("#content").html(respuesta);
       }

  )

 /*  
"<br><form id='guardar_participante' action='"+base+"test/guardar_stroop/"+tipo+"/"+tematica+"/"+usuario+"' method='post'><p>Codigo del Participante :"+
  "<input  type='hidden' name='codigo' id='codigo' value='"+codigo+"'/>"+
    
  "<input type='hidden' name='tiempo_total' value='"+$.sum(times).toFixed(2)+"'/>"+
  
  "<input type='hidden' name='latencia_media' value='"+latencia_media+"'/>"+
  
  "<input type='hidden' name='aciertos' value='"+success.length+"'/>"+
  
  "<input type='hidden' name='errores' value='"+errors.length+"'/>"+
  
  "<input type='hidden' name='interferencia_positiva' value='"+indice_positivos.toFixed(2)+"'/>"+
  
  "<input type='hidden' name='interferencia_negativa' value='"+indice_negativos.toFixed(2)+"'/>"+
  
  "<input type='hidden' name='latencia_positiva' value='"+latencia_positivos.toFixed(2)+"'/>"+
  
  "<input type='hidden' name='latencia_negativa' value='"+latencia_negativos.toFixed(2)+"'/>"+
  
  "</form>"
  */
  
 
	   
 /* 
  $('#guardar_participante').submit(); */
  $('#buttons').hide();
  $('#back').show();
 
}
 
 
function end2() {

$('#content').css('font-size','500%');
$('#content').css('color', 'red');
$('#content').html('Por favor vuelva a intentarlo');
$('#buttons').hide();
$('#back').show();	
	
} 

function end3() {
$('#content').css('font-size','500%');
$('#content').css('color', 'white');
$('#content').html('Por favor vuelva a intentarlo sin cometer errores'+"<br>"+errors.length);
$('#buttons').hide();
$('#back').show(); 
}


function guardar() {


	$('#guardar_participante').submit();

} 


function go(evt) {
	
 if (ensayo == 5) {
 errors = new Array();
 success = new Array();
 times = new Array();
 	
 }	
	
	
var click = $(evt.target).val();	
milis = timer.since()/1000;
times.push(milis);

if (click == arrayJS[ensayo][7])  {
	success.push(milis);
}
if (click != arrayJS[ensayo][7])  {
	errors.push(milis);
}
 ensayo++;

if (ensayo == 65) {
	if (errors.length > 8) {
 		//end3();
 		end();	
	}else{
   	end();
   }      
  }else{ 
		if (ensayo <5) {	
			if (errors.length == 1) {
				end2();
			}else{
				next();
			} 
		}else{
			next();		
		}
  }
}