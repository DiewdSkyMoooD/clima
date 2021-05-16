
const key="c41894cccfbdf501bd389fef3f8d8dcf";
const d=document;
const $btn =d.getElementById('btn');
const $pais=d.getElementById('pais');
const $estado=d.getElementById('estado');
const $tarjeta =d.getElementById('tarjeta');

$btn.addEventListener('click',()=>{

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${$estado.value},${$pais.value}&appid=${key}`)
    .then((res)=>res.ok?res.json():Promise.reject(res))
    .then((json)=>{
        console.log(json)
        $tarjeta.innerHTML='';
        let fragmento=d.createDocumentFragment();
        let h1=d.createElement('h1');
        h1.classList.add("text-center");
        let temperatura=kelvin(json.main.temp);
        let primerh4=d.createElement('h4');
        let segundoh4=d.createElement('h4');
        h1.textContent=`Clima en ${json.name}-${json.sys.country}`;
        primerh4.textContent=temperatura;
        segundoh4.textContent=json.weather[0].description;
        fragmento.appendChild(h1);
        fragmento.appendChild(primerh4);
        fragmento.appendChild(segundoh4);
        $tarjeta.appendChild(fragmento)
    })
    .catch((err)=>{
        console.log(err)
        $tarjeta.innerHTML='';
        let h1=d.createElement('h1');
        h1.classList.add("text-center")
        h1.textContent="No se pudo realizar la busqueda";
        $tarjeta.appendChild(h1);
    })
});

function kelvin(kelvin){
    let celsius=kelvin-273.15;
return(celsius.toFixed(2)+"°C");
}




