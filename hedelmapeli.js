let rullat = [];
let lukitutRullat = [0,0,0,0];
let rahanMaara = 100;
let saaLukita = false;
const minimipanos = 1;
let panos = 0;
const voittoTaulukko = {
    "hedelma1": 6,
    "hedelma2": 4,
    "hedelma3": 3,
    "hedelma4": 5,
};

function lisaaRahaa(maara) {
    panos += maara;
    if (panos > rahanMaara) {
        panos = rahanMaara;
    }
    paivitaRaha();
}

function paivitaRaha() {
    const rahaElementti = document.getElementById('raha');
    rahaElementti.innerText = `${rahanMaara}`;
    const panosElementti = document.getElementById('panos');
    panosElementti.innerText = ` ${panos}`;
}

function tarkistaMinimipanos() {
    if (panos < minimipanos) {
        alert("Panoksesi on alle minimin. Aseta vähintään 1 euron panos.");
    }
}

function alustaRullat() {
    for (let i = 0; i < 4; i++) {
        rullat.push(arpomaaKuvio());
    }
}

function arpomaaKuvio() {
    const kuvio = ["hedelma1", "hedelma2", "hedelma3", "hedelma4"];
    return kuvio[Math.floor(Math.random() * kuvio.length)];
}

function asetaKuvat() {
    for (let i = 0; i < rullat.length; i++) {
        const reel = document.getElementById(`reel${i+1}`);
        reel.style.backgroundImage = `url('${rullat[i]}.jpg')`;
    }
}

function paivitaKuvat() {
    for (let i = 0; i < rullat.length; i++) {
        if (lukitutRullat[i] === 0) {
            rullat[i] = arpomaaKuvio();
        }
    }
    asetaKuvat();
}

function lukitseRulla(rulla) {
    if (!saaLukita) {
        alert("Et voi lukita rullaa nyt.");
        return;
    }
    const lukkoButton = document.getElementById(`reel${rulla+8}`); 
    if (lukitutRullat[rulla] === 0) {
        lukitutRullat[rulla] = 1;
        lukkoButton.innerHTML = '<img src="lukittulukko.png" alt="lukko">'; 
    } else {
        lukitutRullat[rulla] = 0;
        lukkoButton.innerHTML = '<img src="avoinlukko.avif" alt="lukko">'; 
    }
}


function tarkistaVoitto() {
    let voitto = false;
    if (rullat.every(kuvio => kuvio === rullat[0])) {
        voitto = true;
    }
    return voitto;
}
function tarkistaRahat() {
    if (rahanMaara <= 0) {
        alert("Rahasi ovat loppu. Peli päättyy.");
        paivitaRaha();
        pelaaButton.disabled = true;
    }
}
function voitto() {
    if (tarkistaVoitto()) {
        const voittoMaara = panos * voittoTaulukko[rullat[0]];
        alert(`Voitit ${voittoMaara} euroa!`); 
        rahanMaara += voittoMaara;
        paivitaRaha();
        
        for (let i = 0; i < lukitutRullat.length; i++) {
            if (lukitutRullat[i] === 1) {
                const lukkoButton = document.getElementById(`reel${i+8}`);
                lukkoButton.innerHTML = '<img src="avoinlukko.avif" alt="lukko">'; 
            }
        }
        
        nollaaLukitutRullat();
        return true;
        
    }
    return false;
}
function nollaaLukitutRullat() {
    for (let i = 0; i < lukitutRullat.length; i++) {
        lukitutRullat[i] = 0; 
        
    }
}
function tarkistaRahanLoppuminen() {
    if (rahanMaara <= 0) {
        alert("Rahasi ovat loppu! Peli päättyy.");
        pelaaButton.disabled = true; 
    }
}

const pelaaButton = document.getElementById("spin-button");

pelaaButton.addEventListener("click", function() {
    if (!saaLukita) {
        saaLukita = true;
    }

    if (rahanMaara <= 0) {
        alert("Rahasi ovat loppu! Peli päättyy.");
        pelaaButton.disabled = true; 
        return; 
    }
    
    if (panos > 0) {
        rahanMaara -= panos;
        paivitaRaha();
        paivitaKuvat();
        if (voitto()){
            saaLukita = false;
        }
        tarkistaRahanLoppuminen();
        
    } else {
        alert("Aseta panos ennen kuin pelaat!");
    }
});

alustaRullat();
asetaKuvat();