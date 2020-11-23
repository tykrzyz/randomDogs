let numOfDogs = 0;
let dogPics = [];

function main(){
  render();
  handleNumberSelect();
}

function render(){
  $('#form').html(generateFormPage());
  if(numOfDogs > 0 && numOfDogs < 51){
    $('#pics').html(generateDogPage());
  }
}

function generateFormPage(){
  return `<form id='number-of-dogs'>
            <label>How many doggos would you like to see? (1-50)</label>
            <input id='number' type='text' value='3' required='required'>
          </form>`;
}

function generateDogPage(){
  let html = '<div class="group">';
  for(let i = 0; i < numOfDogs; i++){
    console.log(dogPics[i]);
    html += `<div class="item"><img src='${dogPics[i]}' alt='random dog'></div>`;
  }
  html += '</div>';
  dogPics = [];
  return html;
}

function handleNumberSelect(){
  $('main').on('submit', '#number-of-dogs', e => {
    e.preventDefault();
    numOfDogs = $('#number').val();
    getDogImages(numOfDogs);
  });
}

function getDogImages(numOfDogs){
  fetch(`https://dog.ceo/api/breeds/image/random/${numOfDogs}`).then(response => response.json()).then(responseJson => handleResponse(responseJson)).catch(error => alert('Something went wrong. Try again later.'));
}

function handleResponse(response){
  console.log(response);
  for(let i = 0; i < response.message.length; i++){
    dogPics.push(response.message[i]);
  }
  console.log(dogPics);
  render();
}

$(main);