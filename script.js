
$(document).ready(function(){
    $(".button").click(function(){
var value =$(this).val();
console.log(value);
$(this).prop("disabled",true);
$(this).addClass("disable");
                
});

});
getWord();
function getWord() {
    fetch('https://random-word-api.herokuapp.com/word', {
    method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
    const Word = data[0];
    console.log('Random word:', Word);
    const letters = Word.split('')
    // console.log('Letters :',letters);
    })
    .catch(error => console.error('Error fetching random word:', error));
}

