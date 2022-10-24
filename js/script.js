const Displaybox = document.getElementById("mid");
const Gobtn = document.getElementById("go");
const Rebtn = document.getElementById("reset");
const Lyrics = document.getElementById("lyrics");

var Array = [];
var Metrix = [];

// go button
Gobtn.addEventListener("click",()=>{
    reset();
    getLyrics();
    main();
    showoldnote();
})

// reset button
Rebtn.addEventListener("click",()=>{
    reset();
    for (let i = 0; i < sessionStorage.Alllenght; i++) {
        sessionStorage.removeItem(i);
    }
    sessionStorage.removeItem("Alllenght");
})

// for run all
main = ()=>{
    if(sessionStorage.lyrics){   
        Displaybox.className = "middle";
        Array = sessionStorage.lyrics.split(/\r?\n/);
        setArraytoSession(Array.length);
        createNotebox();
        eventon();
    }else{
        alert("ใส่เนื้อเพลงด้วยจ้า");
    }
}

// get lyrics from textarea
getLyrics = () => {
    sessionStorage.lyrics = Lyrics.value.trim();
}

// create 2Dimentional array
setArraytoSession = (l)=>{
    for (let i = 0; i < l; i++) {
        Metrix[i] = Array[i].trim().split(" ");
    }
}

// create notepad for input note and show lyrics
createNotebox = () =>{
    let count = 0;
    let child = 0;
    for (let i = 0; i < Metrix.length; i++) {
        Displaybox.innerHTML += "<div class='bigbox'></div>";
        Displaybox.innerHTML += "<div class='bigbox'></div>";
        for (let i = 0; i < Metrix[count].length; i++) {
            Displaybox.children[child].innerHTML += "<input type='text' class='notebox' required>";
        }
        for (let i = 0; i < Metrix[count].length; i++) {
            Displaybox.children[child+1].innerHTML += "<div class ='box'>"+ Metrix[count][i] +"</div>";
        }
        count++;
        child = child+2;
    }
}

// reset method
reset = ()=>{
    Displaybox.innerHTML = "";
    Metrix = [];
    Displaybox.className = "middle wait";
    sessionStorage.removeItem("lyrics");
}


// create eventlistenner for each input
eventon = ()=>{
    const Allinput = document.getElementsByClassName("notebox");
    sessionStorage.Alllenght = Allinput.length;
    sessionStorage.Alllenghtmax = Allinput.length;
    for (let i = 0; i < Allinput.length; i++) {
        Allinput[i].addEventListener("focusout",()=>{
            sessionStorage[i] = Allinput[i].value;
        })
    }
    
}


// shownote on inputbox
showoldnote = () =>{
    // console.log("run")
    if(sessionStorage.Alllenght){
        const Allinput = document.getElementsByClassName("notebox");
            if(Allinput.length > sessionStorage.Alllenghtmax){
                sessionStorage.Alllenghtmax = Allinput.length
            }
            for (let i = 0; i < sessionStorage.Alllenghtmax; i++) {
                if(sessionStorage[i]){
                Allinput[i].value = sessionStorage[i];
                console.log(sessionStorage[i]);
                }
            }
        }
}

// use session to show old data if screen refresh
if (sessionStorage.lyrics){
    Lyrics.value = sessionStorage.lyrics;
    main();
    showoldnote();
} else{
    Displaybox.className = "middle wait";
}