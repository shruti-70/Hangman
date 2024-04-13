let letters; 
let wordLoaded = false; // Variable to track if the word is already loaded
// edge case , the letters can be repeated 

$(document).ready(function(){
    getWord();
   
    $(".button").click(function(){
        var value = $(this).val();
        console.log(value);
        fill(letters,value);
        
    $(this).prop("disabled", true);
$(this).addClass("disable");
    });
});

function getWord() {
    if (!wordLoaded) {
        return fetch('https://random-word-api.herokuapp.com/word', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const Word = data[0];
            console.log('Random word:', Word);
            letters = Word.split('');
            console.log(letters);
            wordLoaded = true; 
            dashes(letters);
         
            return letters; 
        })
        .catch(error => console.error('Error fetching random word:', error));
    } else {
        console.log('Word already loaded:', letters); // If word is already loaded, log it
        return Promise.resolve(letters); 
    }
}
function dashes(letters){

    let dashedword =''
    for (let i =0;i<letters.length;i++){
        dashedword += "<span class='dash'>-</span>";
    }
    document.getElementById("container").innerText = dashedword;
}
function fill(letters, value) {
    value = value.toLowerCase();
    let dashedWord = document.getElementById("container").innerText.toLowerCase();
    let newDashedWord = '';

    for (let i = 0; i < letters.length; i++) {
        if (letters[i].toLowerCase() === value) {
            newDashedWord += "<span class='dash'>" + value +"</span>";
        } else {
            newDashedWord +="<span class='dash'>-</span>";
        }
    }
    document.getElementById("container").innerText = newDashedWord;
}



// function hang(){
// }