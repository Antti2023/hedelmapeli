let rullat = [];
let lukitutRullat = [];
let rahanMaara = 100;
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
        rullat[i] = arpomaaKuvio();
    }
    asetaKuvat();
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
        if (!voitto.saatu) {
            rahanMaara += voittoMaara;
            voitto.saatu = true; 
            paivitaRaha();
            return true;
        }
    }
    return false;
}

function tarkistaRahanLoppuminen() {
    if (rahanMaara <= 0) {
        alert("Rahasi ovat loppu! Peli päättyy.");
        pelaaButton.disabled = true; 
    }
}

const pelaaButton = document.getElementById("spin-button");
pelaaButton.addEventListener("click", function() {
    if (rahanMaara <= 0) {
        alert("Rahasi ovat loppu! Peli päättyy.");
        pelaaButton.disabled = true; 
        return; 
    }
    
    if (panos > 0) {
        rahanMaara -= panos;
        paivitaRaha();
        paivitaKuvat();

        setTimeout(function() {
            if (voitto()) {
                alert(`Voitit ${panos*6}$!`);
            }
            tarkistaMaksimiarvo();
            tarkistaRahanLoppuminen();
        }, 1000);
    } else {
        alert("Aseta panos ennen kuin pelaat!");
    }
});

alustaRullat();
asetaKuvat();