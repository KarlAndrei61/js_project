let navbar = document.querySelector('#navbar');
let wrappercarta = document.querySelector('#wrappercarta');
let wrappercategoriaradio = document.querySelector('#wrappercategoriaradio');
let prezzoinput = document.querySelector('#prezzoinput') //va a catturare l'id per creare cosa?
let prezzovalore = document.querySelector('#prezzovalore')
let cercainput = document.querySelector('#cercainput')
let cercabottone = document.querySelector('#cercabottone')
window.addEventListener('scroll', ()=>{
    if(window.scrollY > 0){
        navbar.classList.add('scrollingnavbar')
    }else{
        navbar.classList.remove('scrollingnavbar')
    }
})

fetch('./acquista.json').then((risposta)=>risposta.json()).then((data)=>{
    function truncato(name){
        if(name.length > 8){
            return name.split(' ')[0] + '...';
        }else{
            return name;
        }
    }
    function mostracarte(data){
        wrappercarta.innerHTML = ''; 
        data.forEach((annuncio)=>{
            let carta = document.createElement('div');
            carta.classList.add('annunciocarta', 'col-3');
            carta.innerHTML = `
            <h4   class="titolocarta" title="${annuncio.name}">${truncato(annuncio.name)}</h4>
            <p class="categoriacartta">${annuncio.category}</p>
            <p class="prezzocarta">${annuncio.price}€</p>
            <img src="macchinina.webp" alt="">
            `
            wrappercarta.appendChild(carta)
        })
    }
    //filtra per categoria
    function generaradios(){
        //ho capito poco come si fa a togliere la dupplicazione
        // crea un array nel quale le categorie non si ripetono
        let categorie = data.map((annuncio)=> annuncio.category);
        let categorieuniche = []; //vuoto 
        categorie.forEach((category)=>{
            //ho capito poco riguardo al ! categorie uniche
            if(!categorieuniche.includes(category)){
                categorieuniche.push(category)
            }
        })
        //genero il bottone per categoria
        categorieuniche.forEach((category)=>{
            //è stata messa una classe radiocategory per non mettere la classe form che input e non andare in palla
            let radio = document.createElement('div');
            radio.classList.add('form-check');
            radio.innerHTML = ` 
            <input class="form-check-input radiocategoria" type="radio" name="categoriaradio" id="${category}" >
            <label class="form-check-label" for="${category}">
                ${category}
            </label>
            `;
            wrappercategoriaradio.appendChild(radio)
        })

    }
    function filtrapercategoria(array){
        let categoria = Array.from(radiobottone).find((button)=> button.checked).id;
         if(categoria == 'All'){
         return array
        }else{
        let filtrato = array.filter((annuncio)=> annuncio.category == categoria)
        return filtrato
         // per ogni cosa ha il suo elemento
        }
    }

    //filtra per categoria
    //filtra per prezzo
    function Impostaprezzoinput(){ //+annuncio.price diventa un numero e non più una stringa
        let prezzi = data.map((annuncio)=> +annuncio.price); // per ogni annuncio mi va a prendere annuncio.prezzo
        prezzi.sort((a,b)=> a - b);

        //cos'è math.ceil
        let massimoprezzo = Math.ceil(prezzi.pop());
        prezzoinput.max = massimoprezzo
        prezzoinput.value = massimoprezzo;
        let minimoprezzo = Math.floor(prezzi.shift())
        prezzoinput.min = minimoprezzo;
        prezzovalore.innerHTML = `${massimoprezzo}€`
    } 
    //.sort = ordine crescente
    function filtraperprezzo(array){
    let filtrato = array.filter((annuncio)=> Number(annuncio.price) <= Number(prezzoinput.value))
    // console.log(filtrato);
    prezzovalore.innerHTML = `${prezzoinput.value}€`
    return filtrato
    }
    prezzoinput.addEventListener('input', ()=>{
    filtroglobale();
    })
    //filtra per prezzo

    //filtra per parola
function filtraperparola(array){
    let filtrato = array.filter((annuncio)=> annuncio.name.toLowerCase().includes(cercainput.value.toLowerCase()));
    return filtrato;
}


    function filtroglobale(){
        let filtratopercategoria = filtrapercategoria(data);
        let filtrapercategoriaeprezzo = filtraperprezzo(filtratopercategoria);
        let filtrapercategoriaeprezzoeparola = filtraperparola(filtrapercategoriaeprezzo);
        mostracarte(filtrapercategoriaeprezzoeparola);

    }

    mostracarte(data);
    generaradios();
    cercabottone.addEventListener('click', ()=>{
        filtroglobale();
        //cerca attraverso l'input!!
    })
                //cattura tutti i bottoni generati
                let radiobottone = document.querySelectorAll('.radiocategoria');
                //attacco un evento ai bottoni generati
                radiobottone.forEach((button)=>{
                    button.addEventListener('click', ()=>{
                        filtroglobale();
                    })
                })
    Impostaprezzoinput();

})

//<div class="form-check">

//</div>