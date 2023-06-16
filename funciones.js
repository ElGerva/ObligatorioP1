window.addEventListener("load", inicio);
let sistema = new Sistema();
sistema.precargaDeDatos();
function inicio() {
    cargarDepar();
    //censista
    document.querySelector("#btnRegistro").addEventListener("click", RegistroCensistas);
    document.querySelector("#btnIngresar").addEventListener("click", InicioSesion);
    document.querySelector("#censosPendientes").addEventListener("click", mostrarCensosPendientes);
    document.querySelector("#modificarDatosCensista").addEventListener("click", ModificarDatosCensista);
    document.querySelector("#miscensospendientes").addEventListener("click",cargarTabla)
    document.querySelector("#ReasignarCensista").addEventListener("click",ReasignarCensista)
    //buscar cedula desde el lado censista
    document.querySelector("#btnbuscarCiCens").addEventListener("click", BuscarCiCensista);
    document.querySelector("#btnCargarDatosCens").addEventListener("click", CargarDesdeCensista);
    //document.querySelector("#verEstadisticasCensistas").addEventListener("click",estadisticasCensistas);
    document.querySelector("#btnSalir").addEventListener("click", realizarLogout);
    /////// //invitado
    document.querySelector("#modificarDatosInvitado").addEventListener("click", ModificarDatosInvitado);
    document.querySelector("#btnCargarDatos").addEventListener("click", cargarDatosInvitado);
    document.querySelector("#eliminarDatos").addEventListener("click", eliminarDatos);
    //buscarCedula
    document.querySelector("#btnbuscarCiInvitado").addEventListener("click", BuscarCiInvi);
    document.querySelector("#MostrarEstadisticaInvitado").addEventListener("click",estadisticasInvitado);
    //////menu
    document.querySelector("#MostrarInvitado").addEventListener("click", MostrarBuscadorInvi);
    document.querySelector("#MostrarCensista").addEventListener("click", mostrarCensista);
    OcultarDivs();
}
function MostrarBuscadorInvi() {
    OcultarDivs();
    mostrarbuscadorCi();
    document.querySelector("#iCedula").disabled = false;
    document.querySelector("#iCedula").value = "";
}
function realizarLogout() {
    sistema.realizarLogout();
    OcultarDivs();
    document.querySelector("#iCedulaCens").disabled = false;
    document.querySelector("#iCedulaCens").value = "";
    alert("Sesion cerrada correctamente")

}
function RegistroCensistas() {
    let nombreCens = document.querySelector("#iNombreCensista").value.trim();
    let userName = document.querySelector("#iUserCensista").value.trim().toLowerCase();
    userName=userName.toLowerCase()
    let contrasenaCens = document.querySelector("#iContraCensista").value.trim();
    if (contrasenaCens.length < 5) {
        alert("La contrasena debe tener al menos 5 caracteres")
    } else if (MayusculasContador(contrasenaCens) === false) {
        alert("Su contrasena debe tener una mayuscula")
    } else if (MinusculaContador(contrasenaCens) === false) {
        alert("Su contrasena debe tener al menos una minuscula")
    } else if (saberSiTieneNum(contrasenaCens) === false) {
        alert("Su contrasena debe contener al menos un numero")
    } else if (sistema.existeUser(userName)) {
        alert("Ya existe ese nombre de usuario por favor ingrese otro")
    } else if (userName === "" || nombreCens === "" || contrasenaCens === "") {
        alert("No puede dejar campos vacios")
    }
    else {
        let censis = new Censista(nombreCens, userName, contrasenaCens)
        sistema.agregarCensista(censis)
        document.querySelector("#registroCens").reset();
        alert("Censista creado perfectamente")
    }
}
function InicioSesion() {
    let userName = document.querySelector("#iUsuarioLogin").value.trim();
    let pass = document.querySelector("#iContraLogin").value.trim();
    if (sistema.loginValido(userName, pass) === true) {
        alert("Sesion iniciada correctamente")
        document.querySelector("#BuscadorCensista").style.display = "block";
        document.querySelector("#inicioCens").reset();
        document.querySelector("#DivCensitaInicioSesion").style.display = "none"
    } else {
        alert("Datos Incorrectos")
    }
}
function CargarDesdeCensista() {
    let nombre = document.querySelector("#iNombreCens").value.trim();
    let apellido = document.querySelector("#iApellidoCens").value.trim();
    let edad = document.querySelector("#iEdadCens").value.trim();
    let cedula = document.querySelector("#iCedulaCens").value.trim();
    let datos=sistema.obtenerDatos(cedula)
    let Undepartamento = document.querySelector("#selectDepartamentoCens").value.trim();
    let ocupacion = document.querySelector("#selectOcupacionCens").value.trim();
    if (nombre === "" || apellido === "" || edad === "" || cedula === "" || Undepartamento === "" || ocupacion === "") {
        alert("Todos los campos son obligatorios, por favor complete correctamente")
    }
    else if (edad > 130 || edad < 0) {
        alert("La edad ingresada no es valida, utilice un rango de 0 a 130")
    } else if (Undepartamento === "Seleccione...") {
        alert("El departamento elegido no es correcto, por favor seleccione un departamento valido.")
    }
    else if (ocupacion === "Seleccione...") {
        alert("La ocupacion elegida no es correcta, por favor seleccione una opcion valida.")

    } else if(sistema.existeCedulaEnCensos(cedula)){
        alert("Estado modificado con exito.")
        datos.estado=true;
    }
    else {
        let censoNuev = new Censo(nombre, apellido, edad, cedula, Undepartamento, ocupacion);
        sistema.agregarCensoCens(censoNuev)
        alert("Datos cargados correctamente")
        sistema.obtenerCedula(cedula).censista=sistema.censistaLogueado;
        document.querySelector("#formularioCensista").reset();
        document.querySelector("#iCedulaCens").disabled = false;
        document.querySelector("#CampoCensista").style.display="none"
        document.querySelector("#modificarDatosCensista").disabled=false;

    }
}
function cargarDatosInvitado() {
    let nombre = document.querySelector("#iNombre").value.trim();
    let apellido = document.querySelector("#iApellido").value.trim();
    let edad = document.querySelector("#iEdad").value.trim();
    let cedula = document.querySelector("#iCedula").value.trim();
    cedula=limpiarCi(cedula)
    let Undepartamento = document.querySelector("#selectDepartamento").value;
    let ocupacion = document.querySelector("#selectOcupacion").value;
    
    if (nombre === "" || apellido === "" || edad === "" || cedula === "" || Undepartamento === "" || ocupacion === "") {
        alert("Todos los campos son obligatorios, por favor complete correctamente")
    }
    else if (edad > 130 || edad < 0) {
        alert("La edad ingresada no es valida, utilice un rango de 0 a 130")
    } else if (Undepartamento === "Seleccione...") {
        alert("El departamento elegido no es correcto, por favor seleccione un departamento valido.")
    }
    else if (ocupacion === "Seleccione...") {
        alert("La ocupacion elegida no es correcta, por favor seleccione una opcion valida.")

    } else if(sistema.existeCedulaEnCensos(cedula)){
        alert("Ya existe censo para esa cedula")
    }
    else {
        let censoNuev = new Censo(nombre, apellido, edad, cedula, Undepartamento, ocupacion);
        sistema.agregarCensoInvi(censoNuev)
        document.querySelector("#formularioInvitado").reset();
        document.querySelector("#iCedula").disabled=false;
        sistema.obtenerDatos(cedula).censista=sistema.randomCensista();
        let censistaAsignado= sistema.obtenerDatos(cedula)
        censistaAsignado=censistaAsignado.censista;
        alert("Datos cargados correctamente")
        console.log(censistaAsignado)
    
    let realizadoconexito=true;
    if(realizadoconexito===true){
        alert("A su casa ira el censista"+" "+censistaAsignado.nombre)
    }}
}
function BuscarCiInvi() {
    let cedula = document.querySelector("#iCedula").value.trim();
    cedula=limpiarCi(cedula)
    let datos=sistema.obtenerDatos(cedula)
    if (!validarCedula(cedula)||cedula.length<6||cedula.length>8) {
        alert("Cedula incorrecta") 
        document.querySelector("#iCedula").value=""
    }else if(sistema.existeCedulaEnCensos(cedula)===true&&!sistema.obtenerCedula(cedula)){
        alert("ya existe censo para esa cedula, y no se puede editar ya que ya fue validada ")
        document.querySelector("#iCedula").value=""
    }else if(sistema.existeCedulaEnCensos(cedula)===true&&sistema.obtenerCedula(cedula)){
        alert("Existe censo para esa cedula, aun no fue validada.Puede modificar datos")
        document.querySelector("#btnCargarDatos").disabled=true;
        mostrarCamposDatos();
        sistema.CensoActual=datos;
        document.querySelector("#iCedula").disabled = true;
        document.querySelector("#iNombre").value=datos.nombre;
        document.querySelector("#iApellido").value=datos.apellido;
        document.querySelector("#iEdad").value=datos.edad;
        document.querySelector("#selectDepartamento").value=datos.departamento;
        document.querySelector("#selectOcupacion").value=datos.ocupacion;
    }else if(!sistema.existeCedulaEnCensos(cedula)){
        alert("No existe censo, por favor complete los datos")
        mostrarCamposDatos();
        document.querySelector("#iCedula").disabled = true;
        document.querySelector("#btnCargarDatos").disabled=false;
        document.querySelector("#modificarDatosInvitado").disabled=true;
        
    }
}
function BuscarCiCensista() {
    let cedula = document.querySelector("#iCedulaCens").value.trim();
    let datos=sistema.obtenerDatos(cedula)
    cedula=limpiarCi(cedula)
    if (validarCedula(cedula) === false||cedula.length<6||cedula.length>8) {
        alert("Cedula incorrecta") 
        document.querySelector("#iCedulaCens").value=""
    }else if(!sistema.existeCedulaEnCensos(cedula)){
        alert("No existe censo, por favor complete los datos")
        document.querySelector("#modificarDatosCensista").disabled=true;
        mostrarCamposCens();
        document.querySelector("#iCedulaCens").disabled = true; }
    else if(datos.censista!==sistema.censistaLogueado){
        alert("Este censo no le pertenece a ud.")
        document.querySelector("#iCedulaCens").value=""
    }else if(sistema.existeCedulaEnCensos(cedula)===true&&!sistema.obtenerCedula(cedula)){
        alert("ya existe censo para esa cedula, y no se puede editar ya que ya fue validada ")
        document.querySelector("#iCedulaCens").value=""
    }
    else if(sistema.existeCedulaEnCensos(cedula)===true&&sistema.obtenerCedula(cedula)&&datos.censista===sistema.censistaLogueado){
        alert("Existe censo para esa cedula, aun no fue validada.Puede modificar datos")
        sistema.CensoActual=datos;
        document.querySelector("#iCedulaCens").disabled = true;
        document.querySelector("#iNombreCens").value=datos.nombre;
        document.querySelector("#iApellidoCens").value=datos.apellido;
        document.querySelector("#iEdadCens").value=datos.edad;
        document.querySelector("#selectDepartamentoCens").value=datos.departamento;
        document.querySelector("#selectOcupacionCens").value=datos.ocupacion;
        mostrarCamposCens();
        document.querySelector("#btnCargarDatosCens").disabled=true;
        document.querySelector("#divpendientes").style.display="none"
        document.querySelector("#divreasignar").style.display="none"

    }   
}
function mostrarCensosPendientes() {
    CargarPendientesDeValidar();
    cargarCensistas();
    document.querySelector("#divreasignar").style.display="block"
}
function ModificarDatosInvitado(){
    let cedula = document.querySelector("#iCedula").value.trim();
    let datos= sistema.obtenerCedula(cedula)
    let nombre = document.querySelector("#iNombre").value.trim();
    let apellido = document.querySelector("#iApellido").value.trim();
    let edad = document.querySelector("#iEdad").value.trim();
    let Undepartamento = document.querySelector("#selectDepartamento").value;
    let ocupacion = document.querySelector("#selectOcupacion").value;
    if (nombre === "" || apellido === "" || edad === "" || cedula === "" || Undepartamento === "" || ocupacion === "") {
        alert("Todos los campos son obligatorios, por favor complete correctamente")
    }
    else if (edad > 130 || edad < 0) {
        alert("La edad ingresada no es valida, utilice un rango de 0 a 130")
    } else if (Undepartamento === "Seleccione...") {
        alert("El departamento elegido no es correcto, por favor seleccione un departamento valido.")
    }
    else if (ocupacion === "Seleccione...") {
        alert("La ocupacion elegida no es correcta, por favor seleccione una opcion valida.")

    } else{
        sistema.modificarCenso(nombre, apellido, edad, Undepartamento, ocupacion)
        alert("Modificado con exito")
        reset();
        document.querySelector("#btnCargarDatos").disabled=false;
    }
    
}
function ModificarDatosCensista(){
    let cedula = document.querySelector("#iCedulaCens").value.trim();
    let datos= sistema.obtenerCedula(cedula)
    cedula=limpiarCi(cedula);
    let nombre = document.querySelector("#iNombreCens").value.trim();
    let apellido = document.querySelector("#iApellidoCens").value.trim();
    let edad = document.querySelector("#iEdadCens").value.trim();
    let Undepartamento = document.querySelector("#selectDepartamentoCens").value;
    let ocupacion = document.querySelector("#selectOcupacionCens").value;
    if (nombre === "" || apellido === "" || edad === "" || cedula === "" || Undepartamento === "" || ocupacion === "") {
        alert("Todos los campos son obligatorios, por favor complete correctamente")
    }
    else if (edad > 130 || edad < 0) {
        alert("La edad ingresada no es valida, utilice un rango de 0 a 130")
    } else if (Undepartamento === "Seleccione...") {
        alert("El departamento elegido no es correcto, por favor seleccione un departamento valido.")
    }
    else if (ocupacion === "Seleccione...") {
        alert("La ocupacion elegida no es correcta, por favor seleccione una opcion valida.")
    } else{
        sistema.modificarCenso(nombre, apellido, edad, Undepartamento, ocupacion)
        alert("Modificado con exito")
        sistema.CensoActual.estado=true;
        document.querySelector("#CampoCensista").style.display="none"
        document.querySelector("#iCedulaCens").disabled=false;
        document.querySelector("#iCedulaCens").value="";
        CargarPendientesDeValidar();
        cargarPendientesEnTabla();
        document.querySelector("#divreasignar").style.display="none"

    }
}
function eliminarDatos(){
    let cedula= document.querySelector("#iCedula").value;
    let dato=sistema.obtenerDatos(cedula)
    sistema.eliminarCenso(dato)
    alert("Datos eliminados con exito")
    console.log(dato.cedula)
    reset();
    document.querySelector("#CampoInvitado").style.display="none"
}
function cargarTabla(){
    document.querySelector("#divpendientes").style.display="block"
    cargarPendientesEnTabla();
}
function ReasignarCensista(){
    let cedulaRecibida= document.querySelector("#misPendientes").value;
    let censistaRecibido=document.querySelector("#ReasignaraunCensista").value;
    censistaRecibido=parseInt(censistaRecibido)
    let datos= sistema.obtenerDatos(cedulaRecibida)//obtener censo con esa cedula
    let censistaNuevo=sistema.obtenerCensista(censistaRecibido)
    if(cedulaRecibida===""){
        alert("Error, no tiene censos pendientes.")
        document.querySelector("#tablapendientes").innerHTML=`<td>Sin Datos</td>`
    }
    else{
    document.querySelector("#CampoCensista").style.display="none"
    document.querySelector("#iCedulaCens").disabled=false;
    document.querySelector("#iCedulaCens").value=""
    datos.censista=censistaNuevo;
    alert("Reasignado con exito.")
    CargarPendientesDeValidar();
    cargarPendientesEnTabla();
}
}
function estadisticasInvitado(){
    document.querySelector("#divEstadisticasInvitado").style.display="block"
    cargarDeparEstadisticasInvi()
    cargarEstudianEstadisticasInvi()
}