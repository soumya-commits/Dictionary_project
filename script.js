const url="https://api.dictionaryapi.dev/api/v2/entries/en/"
const info=document.getElementById("definition");
const sound =document.getElementById("sound");

const btn=document.getElementById("search-btn");


btn.addEventListener("click", () =>{

    let searchword =document.getElementById("search-inp").value;
    info.innerHTML="";
    fetch(`${url}${searchword}`).then( (response) => response.json()).then((data) => {
        console.log(data);
        info.innerHTML=`
         <div id="in-word">
            <h2>${searchword}</h2>
            <button onclick="playAudio()">
                <i class="fas fa-volume-high"></i>
            </button>
            
          </div>
          <div id="details">
            <p style="font-size: 15px; color: grey" id="pos">${data[0].meanings[0].partOfSpeech}</p>
            <p style="font-size: 15px; color: grey" id="phonetics">${data[0].phonetic || ""}</p>
          </div>
          <div id="meaning">
            <p>
              ${data[0].meanings[0].definitions[0].definition}
            </p>
            <br>
            <p>
              ${data[1].meanings[0].definitions[0].definition || ""}
            </p>
          </div>
          <div id="sentence">
            <p>
              ${data[0].meanings[0].definitions[0].example || ""}
            </p>
          </div>
          `;
          let audioURL = data[0]?.phonetics.find((p) => p.audio)?.audio;
          if (audioURL) {
            sound.setAttribute("src", audioURL);
            console.log(audioURL);
          }
    } )
         .catch( () => {

            info.innerHTML=`<h3 id="error"> Couldn't find the word</h3>`;
         })

}); 

function playAudio(){

    sound.play();
}