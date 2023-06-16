
function MayusculasContador(caracter) {
    let mayusculas = false
    for (let i = 0; i < caracter.length; i++) {
        let CaracterActual = caracter.charCodeAt(i)
        if (CaracterActual >= 65 && CaracterActual <= 90) {
            mayusculas = true;
        }
    }
    return mayusculas
}
function MinusculaContador(caracter) {
    let minuscula = false
    for (let i = 0; i < caracter.length; i++) {
        let CaracterActual = caracter.charCodeAt(i)
        if (CaracterActual >= 97 && CaracterActual <= 122) {
            minuscula = true;
        }
    }
    return minuscula;
}
function saberSiTieneNum(contrasena) {
    let respuesta = false
    for (let i = 0; i < contrasena.length; i++) {
        let CaracterActual = contrasena[i]
        if (CaracterActual === "0" || CaracterActual === "1" || CaracterActual === "2" || CaracterActual === "3" || CaracterActual === "4" || CaracterActual === "5" || CaracterActual === "6" || CaracterActual === "7" || CaracterActual === "8" || CaracterActual === "9") {
            respuesta = true
        }
    }
    return respuesta
}
function nombreVacio(nombre) {
    let resp = false;
    nombre = nombre.trim();
    if (nombre === "") {
        resp = true;
    }
    return resp;
}
function apellidoVacio(apellido) {
    let resp = false;
    apellido = apellido.trim();
    if (apellido === "") {
        resp = true;
    }
    return resp;
}
function rangoEdad(edad) {
    edad = parseInt(edad);
    let resp = false;
    if (edad >= 0 && edad <= 130) {
        resp = true
    }
    return resp;
}
function limpiarCi(cedula){
    cedula = cedula.trim();
    cedula = cedula.replaceAll(".", "");
    cedula = cedula.replaceAll("-", "");
    cedula=cedula.replaceAll("!","")
    return cedula;
}

function validarCedula(cedula) {
    cedula=limpiarCi(cedula)
    let cedulaValida = true
    let factores = [2, 9, 8, 7, 6, 3, 4];
    let cedulaAct = cedula
    //600.222.6
    if (cedulaAct.length === 7) {
        cedulaAct = "0" + cedulaAct
    }
    let suma = 0;
    for (let i = 0; i < factores.length; i++) {
        suma += parseInt(cedulaAct[i]) * factores[i];
    }
    //console.log(suma)
    let digitoVerificadorCalculado = 10 - (suma % 10);
    digitoVerificadorCalculado=parseInt(digitoVerificadorCalculado)
    //console.log(digitoVerificadorCalculado)
    let digitoVerificadorIngresado = parseInt(cedulaAct.charAt(7));
    cedulaAct=parseInt(cedulaAct)
    //console.log(digitoVerificadorIngresado)
    if (digitoVerificadorCalculado === digitoVerificadorIngresado||digitoVerificadorCalculado===10&&digitoVerificadorIngresado===0) {
        cedulaValida = true;
    } else {
        cedulaValida = false;
    }
    return cedulaValida
}
function cargarDeparEstadisticasInvi(){
    let depar=sistema.obtenerDepar();
    let texto=""
    for(let i=0;i<depar.length;i++){
        let depActual=depar[i]
        if(depActual!=="Seleccione...")
        texto+= `<tr><td>${depActual}</td></tr>`
    }
    document.querySelector("#deparEstadistica").innerHTML=texto
}

function cargarEstudianEstadisticasInvi(){
    let estudian=0
    let censos=sistema.censos;
    for (let i = 0; i < censos.length; i++){
        let censActu = censos[i]
      if (censActu.departamento==="Canelones"&& censActu.ocupacion==="No trabaja"){
            estudian++;
        }
    }
    return console.log(estudian);
}


function cargarDepar() {
    let depar = sistema.obtenerDepar()
    let texto = "";
    for (let i = 0; i < depar.length; i++) {
        let depActual = depar[i];
        texto += `<option value="${depActual}">${depActual}</option>`
    }
    document.querySelector("#selectDepartamento").innerHTML = texto;
    document.querySelector("#selectDepartamentoCens").innerHTML = texto;
}
function cargarPendientesEnTabla(){
    let listaDePendientes=sistema.obtenerMisCensos();
    document.querySelector("#divreasignar").style.display = "block"
    let texto = ""
    for (let i = 0; i < listaDePendientes.length; i++) {
        let CensoActu = listaDePendientes[i]
        texto += `<tr><td>${CensoActu.cedula}</td></tr>
        `
    }
    document.querySelector("#tablapendientes").innerHTML = texto
}
function CargarPendientesDeValidar() {
    let listaDePendientes=sistema.obtenerMisCensos();
    document.querySelector("#divreasignar").style.display = "block"
    let texto = ""
    for (let i = 0; i < listaDePendientes.length; i++) {
        let CensoActu = listaDePendientes[i]
        texto += `<option>${CensoActu.cedula}</option>
        `
    }
    document.querySelector("#misPendientes").innerHTML = texto
}
function cargarCensistas(){
    let listaCensistas=sistema.obtenerCensistasSinLogueado();
    let texto=""
    for(let i=0;i<listaCensistas.length;i++){
        let censoActu=listaCensistas[i]
        texto+=`<option value="${censoActu.idCensista}">Nombre: ${censoActu.nombre} Usuario: ${censoActu.usuario}</option>`
    }
    document.querySelector("#ReasignaraunCensista").innerHTML=texto;
}
function reset(){
    document.querySelector("#iNombre").value=""
    document.querySelector("#iCedula").disabled=false;
    document.querySelector("#iCedula").value=""
    document.querySelector("#iApellido").value=""
    document.querySelector("#iEdad").value=""
    document.querySelector("#selectDepartamento").value="Seleccione..."
    document.querySelector("#selectOcupacion").value="Seleccione..."

}