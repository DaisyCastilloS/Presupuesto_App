//1-crear una variable que nos guarde el total de los gastos, generar una id del gasto ingresado para poder eliminarlo despues o editarlo



//2- los gastos ingresads son objetos del array de totalgastos 
//los gastos inresdos tienen una id, gasto y valor como atributos
//este objeto gasto lo guardamos en un array de objeto gastos
//necesitamos generar una id y un array de gastos 

let totalGastos = 0;
let id = 0; //esto meterlo en un objeto gasto
let arrayGastos = [];
let presupuestoTotal = 0;


function calcularSaldo() {
    document.getElementById("saldoTotal").innerHTML = presupuestoTotal - totalGastos;
}



//3¿como obtener el id??, cada objeto gasto tenga un id unico

const getId = () => {
    id++;
    return id;
}


//4 necesitamos crear un objeto gasto cunado hagamos click en añadir gasto
//lo mas facul es hacer uan fx que reciba parametros y se los agregue, ese objeto gasto se gaurdara en newGasto
//pero, cantidad es int , pero en form es string, entonces,hay que pasar de string a int la cantidad con el paseint

const getGastoObj = (nombre, cantidad) => {
    const NewGasto = {
        id: getId(),
        nombre: nombre,
        cantidad: parseInt(cantidad)
    };
    return JSON.parse(JSON.stringify(NewGasto));
};

/*//3- crear un bjeto de gastos, esto lo ingresamo en getgastobj

const gasto = {
	id: getId(),
	nombre: "arriendo"
	cantidad: 300
}*/


//5 ir agregando objetos en la tabla cuando se apreta el boton , es decir, con el evento onclick
// funcion 2 aca va a llegar un obj gasto en vez de iterar con for, usamos el documnt paar insertar directo
const addGastoTabla = (Gasto) => {
    const tbody = document.getElementById("tcontenido1");
    tbody.innerHTML += `<tr id="elemento${Gasto.id}">
      <td id="despliegaTotal">${Gasto.id}</td>
      <td>${Gasto.nombre}</td>
      <td>${Gasto.cantidad}</td>
      <td><a href="#" onclick="borrarGasto(${Gasto.id})">Borrar</td>
    </tr>
    <tr>`;
}


const inputGasto = () => {
    let gastoNombre = document.getElementById("nombreInput").value;
    let gastoCantidad = document.getElementById("cantidadInput").value;

    let Gasto = getGastoObj(gastoNombre,gastoCantidad);
    console.log(Gasto);

    totalGastos += Gasto.cantidad;
    console.log(totalGastos);

    arrayGastos.push(Gasto);
    document.getElementById("gastoTotal").innerHTML = totalGastos //el dom
    addGastoTabla(Gasto);
    calcularSaldo();
}


// hacer la funcion borrar gasto... que le debemos pasar?? la id,el nombregasto y cantidad

const borrarGasto = (id,nombre,cantidad)=>{
    //eliminar el gasto del dom, del totalgastos y del array
    console.log(arrayGastos);
    console.log(id);
    // se selecciona el arraygastos, se filtra el gasto a eliminar, se comprueba si el gasto.id es = id
    // que lo borre, pero para borarlo debo seleccionarlo en el dom, gracias a la fx add gasto, hay un id elemento
    // y atraves de ese id, se elimina
    arrayGastos= arrayGastos.filter((gasto) =>{
        if(gasto.id == id){
            let filaABorrar= document.getElementById("elemento" + gasto.id) //el dom 
            //aca , lo eliminamos
            filaABorrar.remove();
            return false;
        }
        return true;
        
    }),
    totalGastos = arrayGastos.reduce((total,valor) => total + valor.cantidad,0 );
    //ahora, actualizar el dom con el gastototal
    document.getElementById("gastoTotal").innerHTML = totalGastos;
    calcularSaldo()
    
};
   
const addPresupuestoform = document.getElementById("addPresupuestoform");
    addPresupuestoform.addEventListener("click", function(e){
        e.preventDefault();
        const presupuesto = document.getElementById("presupuestoInput").value;
        //este valor de presupuesto,hay que agregarlo al presupuestoTotal
        presupuestoTotal += Number(presupuesto);
        document.getElementById("presupuestoTotal").innerHTML = presupuestoTotal;
        calcularSaldo();

});




