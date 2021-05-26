const key="c41894cccfbdf501bd389fef3f8d8dcf";
const d=document;
const $btn =d.getElementById('btn');
const $estado=d.getElementById('estado');
const $tarjeta =d.getElementById('tarjeta');
const descripciones={
    "clear sky":"cielo despejado",
    "few clouds":"pocas nuves",
    "scattered clouds":"nuves dispersas",
    "overcast clouds":"nublado",
    "broken clouds":"nuves rotas",
    "shower rain":"aguacero",
    "rain":"lluevioso",
    "thunderstorm":"tormenta",
    "snow":"nevado",
    "mist":"con neblina"
}
//add eventlistener to the button
$btn.addEventListener('click',()=>{
    //request fetch using promises
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${$estado.value}&appid=${key}`)
    .then((res)=>res.ok?res.json():Promise.reject(res))
    .then((json)=>{
        //handle response
        $tarjeta.innerHTML='';
        let fragmento=d.createDocumentFragment();
        let h1=d.createElement('h1');
        let temperatura=kelvin(json.main.temp);
        let primerh4=d.createElement('h4');
        let segundoh4=d.createElement('h4');
        let img=d.createElement('img');
        h1.textContent=`${json.name}-${json.sys.country}`;
        primerh4.textContent=temperatura;

        for (let el in descripciones){
            json.weather[0].description===el?segundoh4.textContent=descripciones[el]:console.log("no encontrado");
        }
        img.setAttribute('src',`./img/${json.weather[0].icon}.png`);
        fragmento.appendChild(h1);
        fragmento.appendChild(img)
        fragmento.appendChild(primerh4);
        fragmento.appendChild(segundoh4);
        $tarjeta.appendChild(fragmento)
    })
    .catch((err)=>{
        //handle errors
        $tarjeta.innerHTML='';
        let fragmento=d.createDocumentFragment();
        let h1=d.createElement('h1');
        let h4=d.createElement('h4');
        let img=d.createElement('img');
        h1.classList.add("text-center")
        h1.textContent="No se pudo realizar la busqueda";
        img.setAttribute('src','./img/noencontrado.png');
        h4.textContent="revise la busqueda e intentelo de nuevo"
        fragmento.appendChild(h1);
        fragmento.appendChild(img);
        fragmento.appendChild(h4);
        $tarjeta.appendChild(fragmento);
    })
    $estado.value=""
});
//function to convert kelvib to celsius
function kelvin(kelvin){
    let celsius=kelvin-273.15;
return(celsius.toFixed(2)+"°C");
}




