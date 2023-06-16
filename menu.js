function mostrarCensista(){
    OcultarDivs();
    document.querySelector("#DivCensitaInicioSesion").style.display="block";
    document.querySelector("#CampoInvitado").style.display="none"
    document.querySelector("#iCedulaCens").disabled = false;
    document.querySelector("#iCedulaCens").value=""
}
function mostrarCamposDatos(){
    document.querySelector("#CampoInvitado").style.display="block";
    document.querySelector("#modificarDatosCensista").disabled=true;

}
function mostrarCamposCens(){
    document.querySelector("#CampoCensista").style.display="block";
}
function mostrarbuscadorCi(){
    document.querySelector("#MostrarBuscadorInvitado").style.display="block";
}
function OcultarDivs(){
    document.querySelector("#divpendientes").style.display="none";
    document.querySelector("#MostrarBuscadorInvitado").style.display="none";
    document.querySelector("#DivCensitaInicioSesion").style.display="none";
    document.querySelector("#borrarDatos").style.display="none";
    document.querySelector("#ListaCensados").style.display="none";
    document.querySelector("#BuscadorCensista").style.display="none";
    document.querySelector("#CampoInvitado").style.display="none";
    document.querySelector("#CampoCensista").style.display="none";
    document.querySelector("#divreasignar").style.display="none"
    document.querySelector("#divEstadisticasInvitado").style.display="none"
}