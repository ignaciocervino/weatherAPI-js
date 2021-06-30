const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load',()=>{
    formulario.addEventListener('submit',buscarClima);
});

function buscarClima(e){
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad===''||pais==='') {
        mostrarError('Ambos campos son obligatorios');
        return;
    }
    //Consultariamos la API
    consultarAPI(ciudad,pais);
}

function mostrarError(mensaje){
    const alerta = document.querySelector('bg-red-100');
    if (!alerta) {
        //Crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center');

        alerta.innerHTML = `
            <strong class="font-bold"> Error! </strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(()=>{
            alerta.remove();
        },5000);
    }
    
}

function consultarAPI(ciudad,pais){
    const appId = '4dd4fa9973c3b37b2d5f24b241e700f2';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    fetch(url)
        .then(respuesta=>respuesta.json())
        .then(datos => {
            limpiarHTML();//Limpiar el HTML previo
            if (datos.cod === "404") {
                mostrarError('Ciudad no encontrada');
                return;
            }
            //Imprime la respuesta en el HTML
            mostrarClima(datos);
        })

}

function mostrarClima(datos){
    const {main: { temp,temp_max,temp_min }} = datos;
    const celciusTemp =kelvinAcentrigrados(temp);
    const celciusMin= kelvinAcentrigrados(temp_min);
    const celciusMax= kelvinAcentrigrados(temp_max);

    const actual = document.createElement('p');
    actual.innerHTML=`${celciusTemp} &#8451`;
    actual.classList.add('font-bold','text-6xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');
    resultadoDiv.appendChild(actual);

    resultado.appendChild(resultadoDiv);

}

const kelvinAcentrigrados = grados => parseInt(grados-273.15);


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}