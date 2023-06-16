class Sistema {
    constructor() {
        this.censistas = [];
        this.censos= [];
        this.departamento=[
        "Seleccione...",
        "Artigas",
        "Canelones ",
        "Cerro Largo",
        "Colonia",
        "Durazno",
        "Flores",
        "Florida",
        "Lavalleja",
        "Maldonado",
        "Montevideo",
        "Paysandú",
        "Rio Negro",
        "Rivera",
        "Rocha",
        "Salto",
        "San Jose",
        "Soriano",
        "Tacuarembo",
        "Treinta y Tres"];
        this.censistaLogueado=null;
        this.CensoActual=null;
    }
    eliminarCenso(Censo){
    let pos=-1
    for(let i=0;i< this.censos.length;i++){
        let censoActu= this.censos[i];
        if(censoActu.cedula===Censo.cedula){
            pos=i;
        }
    }
    this.censos.splice(pos,1)
    }
    obtenerCensista(id){
        for(let i=0;i<this.censistas.length;i++){
            let censActu=this.censistas[i]
            if(censActu.idCensista===id)
            return censActu;
        }
    }
    randomCensista() {
        let largoCensistas = this.censistas.length;
        let randomIndice = Math.floor(Math.random() * largoCensistas);
        let censistaAleatorio = this.censistas[randomIndice];
        return censistaAleatorio;
      }
      obtenerCensistasSinLogueado(){
        let lista=[]
        for(let i=0;i<this.censistas.length;i++){
            let censoAux=this.censistas[i]
            if(censoAux.idCensista!==this.censistaLogueado.idCensista){
                lista.push(censoAux)
            }
        }
        return lista;
      }
    obtenerMisCensos(){
        let lista=[];
        for(let i=0;i<this.censos.length;i++){
            let censoActu=this.censos[i];
            if(censoActu.censista.idCensista===this.censistaLogueado.idCensista&&censoActu.estado===false){
                lista.push(censoActu);
            }
        }
        return lista;
    }
    existeCedulaEnCensos(cedula) {
        let existe = false;
        for (let i = 0; i < this.censos.length; i++) {
            let userActu = this.censos[i]
            if (userActu.cedula === cedula) {
                existe = true;
            }
        }
        return existe;
    }
    modificarCenso(Nuevonombre, Nuevoapellido, Nuevoedad, Nuevodepartamento, Nuevoocupacion){
        this.CensoActual.nombre=Nuevonombre;
        this.CensoActual.apellido=Nuevoapellido;
        this.CensoActual.edad=Nuevoedad;
        this.CensoActual.departamento=Nuevodepartamento;
        this.CensoActual.ocupacion=Nuevoocupacion;
    }
    realizarLogin(userName, pass) {
        let usuario = this.buscarUsuario(userName);
        let valido = false;
        if (usuario != null && usuario.pass === pass) {
            valido = true;
            this.usuarioLogueado = usuario;
        }
        return valido;
    }
    agregarCensista(unCensista) {
        this.censistas.push(unCensista)
    }
    //obtener 
    obtenerDepar(){
        return this.departamento;
    }
    obtenerCensistas() {
        return this.censistas;
    }
    obtenerCedula(UnaCedula){
        let devolver=false;
        for(let i=0;i<this.censos.length;i++){
            let CensoActu=this.censos[i]
            if(CensoActu.cedula===UnaCedula&&CensoActu.estado===false){
                devolver=true;
            }
        }
        return devolver;
    }
    obtenerDatos(cedula){
        for(let i=0;i<this.censos.length;i++){
            let CensoActu= this.censos[i]
            if(CensoActu.cedula===cedula){
                return CensoActu
            }
        }
    }
    agregarCensoCens(unCensado) {
        this.censos.push(unCensado)
        unCensado.censista= this.censistaLogueado
        unCensado.estado=true;
    }
    agregarCensoInvi(unCensado){
        this.censos.push(unCensado)
        unCensado.estado=false;
    }
    realizarLogout() {
        this.censistaLogueado = null;
    }    
    existeUser(userName) {
        let existe = false;
        for (let i = 0; i < this.censistas.length && !existe; i++) {
            let userActu = this.censistas[i]
            if (userActu.usuario.toLowerCase() === userName.toLowerCase()) {
                existe = true;
            }
        }
        return existe;
    }
    loginValido(usuario, pass) {
        let valido = false;
        for (let i = 0; i < this.censistas.length && !valido; i++) {
            let usuarioActual = this.censistas[i];
            if (usuarioActual.usuario.toLowerCase() === usuario.toLowerCase() &&
                usuarioActual.pass === pass) {
                valido = true;
            }if(usuarioActual!==null){
                this.censistaLogueado=usuarioActual
            }
        }
        return valido;
    }
    precargaDeDatos(){
        //cargar censistas
        let censista1=new Censista("Gustavo", "gustavoCens", "Gustavo123")
        this.agregarCensista(censista1);
        let censista2=new Censista("Maria", "mariaCens", "Maria123")
        this.agregarCensista(censista2);
        let censista3=new Censista("Lucero", "LuceroCens", "Lucero123")
        this.agregarCensista(censista3);
        //cargar censos
        //invitados pendientes validar
        let censo1=new Censo("Karla","Almeida","42","38223571","Artigas","Independiente")
        this.agregarCensoInvi(censo1);
        censo1.censista=censista1
        let censo2=new Censo("Ignacio","Cabrera","12","52200404","San Jose","Estudiante")
        this.agregarCensoInvi(censo2);
        censo2.censista=censista2
        let censo3=new Censo("Fernando","Mederos","39","54404923","Flores","No trabaja")
        this.agregarCensoInvi(censo3);
        censo3.censista=censista3
        let censo4=new Censo("Analia","Rodriguez","9","52672003","Colonia","Estudiante")
        this.agregarCensoInvi(censo4);
        censo4.censista=censista1;
        let censo5=new Censo("Carlos","Rodriguez","19","44975748","Tacuarembo","Estudiante")
        this.agregarCensoInvi(censo5)
        censo5.censista=censista1
        let censo6=new Censo("Francisco","Hernandez","29","35789724","Durazno","Independiente")
        this.agregarCensoInvi(censo6)
        censo6.censista=censista2
        let censo7=new Censo("Pilar","Silva","87","28705973","Rivera","No trabaja")
        this.agregarCensoInvi(censo7)
        censo7.censista=censista3
        let censo8=new Censo("Marcos","Almada","2","47751262","Canelones","No trabaja")
        this.agregarCensoInvi(censo8)
        censo8.censista=censista1
        let censo9=new Censo("Miguel","Berruti","21","29828811","Soriano","Dependiente")
        this.agregarCensoInvi(censo9)
        censo9.censista=censista2
        let censo10=new Censo("Juan","Garcia","31","45101376","Salto","Independiente")
        this.agregarCensoInvi(censo10)
        censo10.censista=censista3
        let censo11=new Censo("Billy","Prado","21","39092672","Cerro Largo","No trabaja")
        this.agregarCensoInvi(censo11)
        censo11.censista=censista3
        let censo12=new Censo("Martin","Cardozo","21","20102062","Treinta y Tres","Dependiente")
        this.agregarCensoInvi(censo12)
        censo12.censista=censista2;
        let censo13=new Censo("Eduardo","Vazquez","17","41571315","Rocha","Estudiante")
        this.agregarCensoInvi(censo13)
        censo13.censista=censista2;
        let censo14=new Censo("Martin","Sainz","19","48136754","Colonia","Estudiante")
        this.agregarCensoInvi(censo14)
        censo14.censista=censista3;
        let censo15=new Censo("Maria","Villalba","72","48116554","Maldonado","No trabaja")
        this.agregarCensoInvi(censo15)
        censo15.censista=censista1;
        //censos ya validados
        let censo16=new Censo("Juan","Rodriguez","23","52202656","Canelones","Dependiente")
        this.agregarCensoCens(censo16);
        censo16.censista=censista1;
        let censo17=new Censo("Luis","Velazco","78","38934516","Florida","No trabaja");
        this.agregarCensoCens(censo17);
        censo17.censista=censista2;
        let censo18=new Censo("Julia","Perez","16","48183268","Maldonado","Estudiante")
        this.agregarCensoCens(censo18);
        censo18.censista=censista3;
        let censo19=new Censo("Maria","Ramirez","91","13098652","Rio Negro","No trabaja")
        this.agregarCensoCens(censo19);
        censo19.censista=censista2;
        let censo20=new Censo("Luciano","Martinez","45","26012166","Montevideo","Independiente")
        this.agregarCensoCens(censo20);
        censo20.censista=censista1;
        let censo21=new Censo("Martina","Aguiar","22","50130738","Cerro Largo","Estudiante")
        this.agregarCensoCens(censo21);
        censo21.censista=censista2;
        let censo22=new Censo("Abril","Batista","52","39367209","Montevideo","Dependiente")
        this.agregarCensoCens(censo22)
        censo22.censista=censista2;
        let censo23=new Censo("Julieta","Trindade","82","52711003","Canelones","No trabaja")
        this.agregarCensoCens(censo23);
        censo23.censista=censista1;
        let censo24=new Censo("Francisco","De Souza","12","40141828","Montevideo","Independiente")
        this.agregarCensoCens(censo24)
        censo24.censista=censista2;
        let censo25=new Censo("Manuel","Mendez","22","55660538","Florida","Estudiante")
        this.agregarCensoCens(censo25)
        censo25.censista=censista2;
        let censo26=new Censo("Andres","Mila","39","52602444","Rocha","Estudiante")
        this.agregarCensoCens(censo26)
        censo26.censista=censista3;
        let censo27=new Censo("Maria","Ramirez","31","31670252","Maldonado","Dependiente")
        this.agregarCensoCens(censo27)
        censo27.censista=censista2
        let censo28=new Censo("Delfina","Solari","37","51624986","Montevideo","Independiente")
        this.agregarCensoCens(censo28)
        censo28.censista=censista2
        let censo29=new Censo("Adrian","Tejera","22","47059862","Flores","Dependiente")
        this.agregarCensoCens(censo29)
        censo29.censista=censista2
        let censo30=new Censo("Hernan","Suarez","18","50102511","Artigas","Estudiante")
        this.agregarCensoCens(censo30)
        censo30.censista=censista1;
    }
}
let idCensista=1;
class Censista {
    constructor(nombre, usuario, pass) {
        this.idCensista= idCensista++;
        this.nombre = nombre;
        this.usuario = usuario;
        this.pass = pass;
    }
}
class Censo {
    constructor(nombre, apellido, edad, cedula, departamento, ocupacion) {
        this.estado= false;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.cedula = cedula;
        this.departamento = departamento;
        this.ocupacion = ocupacion;
        this.censista = null;//random censista
    }
}
class Estadistica{
    constructor(departamento,edad,ocupacion){
        this.departamento=departamento;
        this.edad=edad;
        this.ocupacion=ocupacion;
    }

}