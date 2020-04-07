/**
 * @fileoverview 
 * @author Julian peñuela id:607452
 * @version 0.1
 * fecha:24/03/2020
 */

/**
 * Este documento de java script permite 
 * 
 * 
 * @returns {integer} el codigo de retorno 0
 */

var seleccion = false;
var c = "inc";
var posicion = "";
var codigo_posi = "";

var rompecabezas = {
    arregloPos: new Array(),
    arregloPos2: new Array(),

    cargar: function () {
        rompecabezas.arregloPos.length = 0;
        var piezas = rompecabezas._get("piezas").value;
        var tablero = document.createElement('table');
        var temp = document.createElement('div');
        var dividir = Math.sqrt(piezas);
        var temp2 = 0;
        var tam_img = 300;
        var pos_img = tam_img / dividir;
        tablero.border = 1;
        tablero.align = 'center';
        tablero.cellPadding = 0;
        tablero.cellSpacing = 0;
        temp.id = 'posiciones';
        temp.className = 'posic';

        for (var fil = 1; fil <= dividir; fil++) {
            var tr = document.createElement('tr');
            for (var cel = 1; cel <= dividir; cel++) {
                temp2++;
                var td = document.createElement('td');
                td.className = 'pieza';
                td.id = 'pos_' + temp2;
                td.style.width = pos_img + 'px';
                td.style.height = pos_img + 'px';
                var dbp = document.createElement('div');
                dbp.id = 'val_bp_' + temp2;
                var p = Math.round(((pos_img * cel) - pos_img) * -1) + 'px ' + Math.round(((fil * pos_img) - pos_img) * -1) + 'px';
                td.style.backgroundPosition = p;
                rompecabezas.arregloPos.push(p);
                dbp.innerHTML = p;
                temp.appendChild(dbp);
                td.onclick = function () {
                    rompecabezas._cambiaBGP(this.id);
                    rompecabezas._compruebaFin();
                }
                tr.appendChild(td);
            }
            tablero.appendChild(tr);
        }
        if (!rompecabezas._get("div_content")) {
            var cont = document.createElement('div');
            cont.id = 'div_content';
            cont.appendChild(tablero);
            cont.appendChild(temp);
            document.body.appendChild(cont);
        } else {
            rompecabezas._get("div_content").innerHTML = '';
            rompecabezas._get("div_content").appendChild(tablero);
            rompecabezas._get("div_content").appendChild(temp);
            rompecabezas._get("posiciones").removeClass('posic');
            rompecabezas._get("posiciones").innerHTML = '';
            rompecabezas._get("posiciones").className = 'posic';
        }
    },

    _barajar: function () {
        var num_alt = null;
        var arr = new Array();
        var resp = "no";
        var i = -1;
        var repite = "no";
        var pie = parseInt(rompecabezas._get("piezas").value);
        var pie1 = pie + 1;
        while (arr.length < pie) {
            repite = "no";
            num_alt = Math.floor(Math.random() * pie1);
            if (num_alt != 0) {
                if (arr.length == 0) {
                    i++;
                    arr[i] = num_alt;
                } else {
                    for (j = 0; j <= arr.length - 1; j++) {
                        if (arr[j] == num_alt) {
                            repite = "si";
                        }
                    }
                    if (repite != "si") {
                        i++;
                        arr[i] = num_alt;
                    }
                }
            }
        }

        var id = 0;
        for (k = 0; k <= arr.length - 1; k++) {
            id = k - (-1);
            rompecabezas._get("pos_" + id).style.backgroundPosition = rompecabezas._get("val_bp_" + arr[k]).innerHTML;
        }
    },

    _cambiaBGP: function (id) {
        if (seleccion == false) {
            posicion = rompecabezas._get(id).style.backgroundPosition;
            codigo_posi = id;
            seleccion = true;
            rompecabezas._get(codigo_posi).style.boxShadow = '1px 1px 14px #FFF,-1px -1px 14px #FFF, 1px -1px 14px #FFF,-1px 1px 14px #FFF';
        } else {
            var pos_n = rompecabezas._get(id).style.backgroundPosition;
            var id_n = id;
            temp2 = "com";
            seleccion = false;
        }

        if (temp2 == "com") {
            rompecabezas._get(id_n).style.backgroundPosition = posicion;
            rompecabezas._get(codigo_posi).style.backgroundPosition = pos_n;
            temp2 = "inc";
            rompecabezas._get(codigo_posi).style.boxShadow = '';
        }
    },

    _compruebaFin: function () {
        var pie = parseInt(rompecabezas._get("piezas").value);
        var fin = false;
        rompecabezas.arregloPos2.length = 0;
        for (var i = 1; i <= pie; i++) {
            rompecabezas.arregloPos2.push(rompecabezas._get("pos_" + i).style.backgroundPosition);
        }
        for (var j = 0; j < rompecabezas.arregloPos.length; j++) {
            if (rompecabezas.arregloPos[j] != rompecabezas.arregloPos2[j]) {
                fin = false;
                break;
            } else {
                fin = true;
            }
        }

        setTimeout(function () {
            if (fin) {


            }
        }, 600);
    },

    _get: function (id) {
        return document.getElementById(id);
    }
};


window.onload = function () {

    rompecabezas.cargar();
    rompecabezas._barajar();
    rompecabezas._get("piezas").onchange = function () {
        rompecabezas.cargar();

    }
    rompecabezas._get("barajar").onclick = function () {
        rompecabezas._barajar();
    }
}


