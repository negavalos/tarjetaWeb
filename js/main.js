const tarjeta = document.querySelector('#tarjeta'),
      btnAbrirFormulario = document.querySelector('#btn-abrir-formulario')
      formulario = document.querySelector('#formulario-tarjeta'),
      numeroTarjeta = document.querySelector('#tarjeta .numero'),
      nombreDeltitular = document.querySelector('#tarjeta .nombre'),
      logoMarca = document.querySelector('#logo-marca'),
      firma = document.querySelector('#tarjeta .firma p'),
      mesExpiracion = document.querySelector('#tarjeta #expiracion .mes'),
      yearExpiracion = document.querySelector('#tarjeta #expiracion .year'),
      ccv = document.querySelector('#tarjeta #ccv .ccv')
      ;

//volteamos para el frente
const mostraFrente = () => {
    if(tarjeta.classList.contains('active')){
        tarjeta.classList.remove('active');
    }
}
// rotacion 
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});

//abrir formulario

btnAbrirFormulario.addEventListener('click', () => {
    btnAbrirFormulario.classList.toggle('active');
    formulario.classList.toggle('active');
});
//rellenar select del mes dinamico
for(let i = 1; i <= 12; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}

//rellenar select del año dinamico
const yearActual = new Date().getFullYear();
for(let i = yearActual; i <= yearActual + 8; i++ ){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}

// input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) =>{
    let valorInput = e.target.value;

    formulario.inputNumero.value = valorInput
    //eliminar esoacios en blanco
    .replace(/\s/g, '')
    // eliminar Letras
    .replace(/\D/g, '')
    //poner cada 4 numeros
    .replace(/([0-9]{4})/g, '$1 ')
    //eliminar el ultimo espaciado
    .trim();

    numeroTarjeta.textContent = valorInput;

    if (valorInput == ''){
        numeroTarjeta.textContent = '#### #### #### ####';

        logoMarca.innerHTML = '';
    }
    if(valorInput[0] == 4){
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/visa.png';
        logoMarca.appendChild(imagen);
    } else if(valorInput[0] == 5) {
        logoMarca.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/logos/mastercard.png';
        logoMarca.appendChild(imagen);
    } else if (valorInput[0] != 4 && valorInput[0] != 5){
        logoMarca.innerHTML = '';
    }
    // voltear tarjeta frente
    mostraFrente();
    
});

//input nombre del titular de la tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nombreDeltitular.textContent = valorInput;
    firma.textContent = valorInput;

    if(valorInput == ''){
        nombreDeltitular.textContent = 'Jhon Doe'
    }

    mostraFrente();
});
// select mes
formulario.selectMes.addEventListener('change', (e) =>{
    mesExpiracion.textContent = e.target.value;
    mostraFrente();
});
// select año
formulario.selectYear.addEventListener('change', (e) =>{
    yearExpiracion.textContent = e.target.value.slice(2);
    mostraFrente();
});

//codigo seguridad

formulario.inputCCV.addEventListener('keyup', (e) =>{
    if (!tarjeta.classList.contains('active')) {
        tarjeta.classList.toggle('active');
    }
    formulario.inputCCV.value = formulario.inputCCV.value
    //eliminar esoacios en blanco
    .replace(/\s/g, '')
    // eliminar Letras
    .replace(/\D/g, '');
    ccv.textContent = formulario.inputCCV.value;
})
