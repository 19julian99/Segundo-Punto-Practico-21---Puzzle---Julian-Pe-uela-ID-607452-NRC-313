/**
 * @fileoverview 
 * @author Julian peñuela id:607452
 * @version 0.1
 * fecha:24/03/2020
 */

/**
 * Este documento de java script permite tener un cronometro funcional con 3
 * botones con funcion de empezar, detener y reiniciar.
 * 
 * 
 * @returns {integer} el codigo de retorno 0
 */
var inicio = 0;//variable que llevara el contador al inicio 
var reestablecer = 0;//variable para reiniciar el cronometro

/**
 * La funcion Empezar tiene como parametro un elemento que se encuentra establecido en 
 * el index  general de cada rompecabezas,  lo que sucede es que si el contador se encuentra en 0 
 * en  horas minutos y segundo el lo inicia llevando un contador cargando esto a la pagina cada segundo.
 * @param  {id} elemento
 * @return  {int}inicio
 */
function Empezar(elemento)
{
    if (reestablecer == 0)
    {

        // Obtenemos el valor actual
        inicio = vuelta = new Date().getTime();

        // iniciamos el proceso
        RecargarFunci();
    }
}
/**
 * La funcion Detener tiene como parametro un elemento que se encuentra establecido en 
 * el index  general de cada rompecabezas,  lo que sucede es que si el contador se encuentra diferente  en 0 
 * en  horas minutos y segundo el lo detendra con los valores actuales que tiene .
 * @param  {id} elemento
 * Esta funcion vuelve la variable reestablecer en 0
 */
function Detener(elemento)
{
    if (reestablecer != 0)
    {
        // detemer el cronometro
        clearTimeout(reestablecer);
        reestablecer = 0;
    }
}
/**
 * La funcion Reiniciar tiene como parametro un elemento que se encuentra establecido en 
 * el index  general de cada rompecabezas, usando la logica del primer boton de empezar  el
 *  renicia el contador desde 0 de nuevo
 */
function Reiniciar(elemento)
{
    if (reestablecer == 0)
    {
        clearTimeout(reestablecer);
        reestablecer = 0;
        inicio = vuelta = new Date().getTime();

        // iniciamos el proceso
        RecargarFunci();
    }
}

/**
 * La funcion RecargarFuncion  es la que realizara toda la parte logica del cronometro
 * vamos  a hacer uso de los objetos nativos de javascript primero para obtener la fecha 
 * actual y se le restara lo que a pasado de diferencia con respecto a la hora que comenzo
 * por ello restaremos la fecha actual con la de inicio.
 * @param  {id} elemento
 * @return  {int}inicio
 */
function RecargarFunci()
{
    // obteneos la fecha actual
    var actual = new Date().getTime();

    // obtenemos la diferencia entre la fecha actual y la de inicio
    var resta = new Date(actual - inicio);

    // mostramos la diferencia entre la fecha actual y la inicial
    var result = AñadriCero(resta.getUTCHours()) + ":" + AñadriCero(resta.getUTCMinutes()) + ":" + AñadriCero(resta.getUTCSeconds());
    document.getElementById('crono').innerHTML = result;

    // Indicamos que se ejecute esta función nuevamente dentro de 1 segundo
    reestablecer = setTimeout("RecargarFunci()", 1000);
}

/* Funcion que pone un 0 delante de un valor si es necesario a la hora
 * de cambiar el paso del tiempo del cronometro para los valores de 01 hasta 09
 *  */
function AñadriCero(Time) {
    return (Time < 10) ? "0" + Time : +Time;
}
