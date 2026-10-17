const casete=document.querySelectorAll('.casete'); //modificarea proprietatilor unui grup de elemente
const caseta=document.getElementsByClassName('text-box')[0];
casete.forEach(p=>{
    p.style.fontSize='1.1em';
    p.style.letterSpacing='1.1px';
    p.style.lineHeight='1';
    p.style.wordSpacing='0.1em';
    p.style.textAlign='left';
    
});

document.addEventListener('keydown',function(e){ //folosire  si modificare element generat de tastatura
    if(e.key==='p')
    {const popUp=document.createElement('div'); //creare element
    popUp.textContent='Welcome to my page!';
    popUp.setAttribute('role','alert'); //mesaj important citit automat
    popUp.setAttribute('aria-live','assertive'); //mesaj citit chiar daca se citeste altceva
    popUp.setAttribute('tabindex','-1'); //focusul se muta pe pop-up
    popUp.style.cssText='position:fixed;top:50%;left:50%;background:white;padding:20px;border:2px solid black;font-family:"Work Sans", sans-serif;font-size:30px;min-width:400px;min-height:50px;transform: translate(-50%, -50%);text-align:center;margin-top:20px';
    document.body.appendChild(popUp);
    popUp.focus();
    //accesibilitate : prin mutarea focusului pe elementul popup, mesajul este anuntat imediat utilizatorilor care folosesc tastatura sau cititoare de ecran.
    setTimeout(() => popUp.remove(), 2000); //stergere element+ setTimeout
    }
});
let isActive=false;
if(caseta){
caseta.addEventListener('click', function(e){ //folosire  si modificare element generat de mouse
    isActive=!isActive; 
    if(isActive) //cand apasam prima oara se modifica 
    {this.style.opacity='1';
    this.style.transform = 'scale(1.05)';
    this.style.transition='all 1s ease';}
    else //cand apasam iar revine la normal si tot asa
         {this.style.opacity='';
   this.style.transform = '';
}
localStorage.setItem('state', isActive ? 'active':'normal'); // salvam starea in localstorage pt refresh
});
}
document.addEventListener('DOMContentLoaded',function(){ //atunci cand dam refresh sa nu pierdem starea si sa putem continua procesul
    const caseta=document.getElementsByClassName('text-box')[0]; //selectare dupa clasa
    const stare=localStorage.getItem('state');
    if (stare==='active'&&caseta)
    {isActive=true;
    caseta.style.opacity='1';
    caseta.style.transform = 'scale(1.05)';
     caseta.style.transition='all 1s ease';

    }
});
setInterval(()=> { //folosire setInterval 
    const footer=document.getElementsByTagName('footer')[0]; //selectare dupa tag
    const r=Math.floor(Math.random()*256); //metode din clasa Math
    const g=Math.floor(Math.random()*256);
    const b=Math.floor(Math.random()*256);
    footer.style.backgroundColor=`rgb(${r}, ${g}, ${b})`; //schimba aleatoriu culoarea footerului la 5 sec
},5000);
document.addEventListener('click',function(e) 
{
    if(e.target.classList.contains('caseta1')||e.target.classList.contains('caseta3')) //folosire classList+target
        {console.log('Elementul are una din clasele impare');
        e.target.style.border = '3px solid white';
            setTimeout(() => {
                e.target.style.border = '';
            }, 1000);}
});
document.addEventListener('DOMContentLoaded', function() {
    const paragrafe = document.querySelectorAll('.casete p'); //selector CSS
    paragrafe.forEach((p, index) => {

        const stiluri = window.getComputedStyle(p); //luam stilul fiecarui paragraf
        if (stiluri.fontFamily.includes('Work Sans'))
            p.textContent=p.textContent.toUpperCase(); //metoda si clasa string + modificare de proprietate
        p.style.fontSize='0.8em';
            })
    });
//folosirea localStorage
const visitHistory = JSON.parse(localStorage.getItem('visitHistory')) || []; //ajax: sesiune
visitHistory.push({
    date: new Date().toLocaleString('ro-RO'),
    page: document.title,
    url: window.location.href,
    timestamp: Date.now()
});

console.log("Vizită adăugată:", visitHistory[visitHistory.length - 1]); //adaugam fiecare vizita a paginii cu datele aferente
localStorage.setItem('visitHistory', JSON.stringify(visitHistory));
console.log(` Total vizite: ${visitHistory.length}`); //afisam nr de vizite al paginii

document.addEventListener('DOMContentLoaded', function() {
    function toggleForm() {//functie pentru afisarea formularului
        const form = document.getElementById('form-container'); //selectare prin id
        if(form)
            if (form.style.display === 'none' ) //daca nu e afisat apare, altfel dispare
            form.style.display = 'block';
        else 
            form.style.display = 'none';
    }

    document.addEventListener('keydown', function(e) { //formularul apare/dispare la apasarea tastelor f/F
        if (e.key === 'f' || e.key === 'F') {
            toggleForm();
            e.preventDefault();
            
        }
    });
    const ratingSlider = document.getElementById('rating-slider');
    const ratingValue = document.getElementById('rating-value');
    if(ratingValue)
        ratingValue.defaultValue = '5'; //modificare proprietate
    const mentions = document.getElementById('alte-detalii');
    if(mentions)
        mentions.required=false;    //modificare proprietate

    if (ratingSlider && ratingValue) {
        ratingSlider.addEventListener('input', function() {
            ratingValue.textContent = this.value;
        });
    }
});
const formular=document.getElementById('movie-form');
if(formular){
formular.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const tel = document.getElementById('telefon').value;
    const email = document.getElementById('email').value;
    const nume = document.getElementById('nume').value;
    
    if (!/^[0-9]{10}$/.test(tel)) return alert('Telefon: 10 cifre'); //validare telefon
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Email invalid'); //validare email
    if (nume.length < 3 || nume.length > 30) return alert('Nume: 3-30 caractere'); //validare nume
    try {
        const raspuns = await fetch('feedback.json'); //cerere ajax cu preluare date din fisier json
        const feedbackuriExistente = await raspuns.json();
        console.log('Date preluate din JSON:', feedbackuriExistente);
        const ratingPersonal = document.getElementById('rating-slider').value;
        const ratingMediu = feedbackuriExistente.reduce((sum, f) => sum + f.rating, 0) / feedbackuriExistente.length;
        if (ratingPersonal > ratingMediu) {
        console.log('Ratingul e mai mare decât media!');
        let feedbackurileMele = JSON.parse(localStorage.getItem('feedbackurileMele')) || [];

const feedbackNou = {
    nume: document.getElementById('nume').value,
    rating: document.getElementById('rating-slider').value,
    comentariu: document.getElementById('alte-detalii').value,
};

feedbackuriExistente.push(feedbackNou); //adaugam feedbackurile in json
localStorage.setItem('feedbackuriExistente', JSON.stringify(feedbackuriExistente));

    }} catch (error) {
        console.log(' Nu pot încărca JSON');
    }
    console.log(" Formular valid");
    this.style.display = 'none';
    document.getElementById('success-message').style.display = 'block';
});

if (formular) {
    formular.addEventListener('keydown', function(e) {
        if (e.key === 'f' || e.key === 'F' || e.key === 'p' || e.key === 'P') {
            e.stopPropagation(); //putem tasta f si p in interiorul formularului fara a se activa functiile
        }
    });
}
}
