// code used and referenced from https://www.youtube.com/watch?v=uqgCF3JIHkA&t=1676s&ab_channel=CodingNepal

const synonyms = document.querySelector(".synonyms .list")
let input = document.querySelector('#input')
let search = document.querySelector('#search')
let notFound = document.querySelector('.not__found')
let content = document.querySelector('.content')
let details = document.querySelector('.details')

function data(result, word) {
    if(result.title) {
        notFound.style.display = "block" // if word isn't found, display text.
        content.style.display = "none"
        details.style.display = "none"

    } else {
        details.style.display = "block"
        content.style.display = "block"
        console.log(result);
        let definitions = result[0].meanings[0].definitions[0];
        notFound.style.display = "none";
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;

        if (result[0].meanings[0].synonyms[0] == undefined) {
            synonyms.parentElement.style.display = "none";
        } else {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < 3; i++) {
                let tag = `<span>${result[0].meanings[0].synonyms[i]}, </span>`;
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        
        }
    }
}

function fetchApi(word) {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}` // utilised API.
    fetch(url).then(res => res.json()).then(result => data(result, word)); // fetching data from API 
}

// search API when user clicks enter
["click", "keyup"].forEach(ev => {
    input.addEventListener(ev, function(e){
        if(e.key == "Enter" && e.target.value) {
            fetchApi(e.target.value);
       }
    });
  });