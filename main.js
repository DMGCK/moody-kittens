let kittens = []
let kittyKey = 'kittenArray'
const possibleMoods = ['Angry', 'Hungry', 'Lonely', 'Playful', 'Cautious', 'Sleepy', 'Rambunctious', 'Lazy', 'Content']
const moodMultiplier = [-5, -2, 2, 5, 1, 2, 3, 5, 10]
let petCount = 0;

//#region user input

function addKitten(event) { // handles user form input
  event.preventDefault();
  let kittenName = event.target.kName.value;

  if (kittenName) {
    if (validateName(kittenName) == true) {
      console.log('kName validated!');

      kittens.push({id: generateId().toString(), name: kittenName, mood: 'Cautious', affection: 50});

      document.getElementById('name-form').reset();
      saveItem(kittyKey, kittens); // only one array of kittens possible with implementation
      drawKittens();
    }
    else {
      console.log('name not validated');
    }
  }
}

function validateName(newName) { // checks if name has been used already
  const nameMap = kittens.map(x => x.name);
  console.log('Running Validation');
  console.log(nameMap); //success in mapping the names to a NORMAL array

  if (nameMap.includes(newName)) { // if name is in array, DON'T validate
    console.log('validate true');
    return false;
  }
  else {
    console.log('validate false')
    return true;
  }
}

function pet(event) { //user presses button 'pet'
  let idx = parseInt(event.target.id, 10); // removes extraneous text
  let idDiv = document.getElementById(idx.toString() + 'div');
  
  for (const obj of kittens) {

    if (obj.id === idx.toString()) {
      obj.affection += 1 * correlateMood(obj.mood); // multiplier implementation TODO
      saveItem(kittyKey, kittens);

      petCount++;
      console.log(petCount);

      drawKittens();

      break;
    }
  }
}

function treat(event) { //user presses 'treat'
  let idx = parseInt(event.target.id, 10); // removes extraneous text
  
  for (const obj of kittens) {

    if (obj.id === idx.toString()) {
      obj.mood = possibleMoods[getRandomIntInclusive(0, possibleMoods.length)]; 

      saveItem(kittyKey, kittens);
      drawKittens()
      break;
    }
  }
}
//#endregion

//#region Drawing 

function drawKittens() { //handles a bunch of drawing
  let template = '';
  
  kittens.forEach(cat => { //I know you aren't supposed to give different things the same ID but I'm trying it. W3S be damned
    template += 
    `<span id="instance-template">
    <div id='${cat.id}div' class="card individual">${cat.name}
    <span onclick='removeKitten(findID(event))' id='${cat.id}' class="close-button">[X]</span>
      <div>
        <img class="cat-image" src="" alt="">
      </div>
      
      <div class="controls-container">
        <table class="cat-info">
        <tr class="justify-center">
            <td id='${cat.id}petx'>Affection: ${cat.affection}</td>
            <td id='${cat.id}treatx'>Mood: ${cat.mood}</td>
          </tr>
          <tr class="justify-center">
          <td><button onclick='pet(event)' id='${cat.id}pet'>Pet Cat</button></td>
            <td><button onclick='treat(event)' id='${cat.id}treat'>Give Treat</button></td>
          </tr>
        </table>
      </div>
      </div>
      </span>`;
    });
    
    document.getElementById('kitty-display').innerHTML = template;
    moodStyler();
    
    if (kittens.length == 0) { // show / hide the card if something is in it
      document.getElementById('kitty-display').classList.add('hidden');
      console.log('hidden kitty card');
    }
    else {
      document.getElementById('kitty-display').classList.remove('hidden');
      console.log('show kitty card');
    }
  }

  function moodStyler() { // draws css animation after html inject
    let temp;
  
    for (const obj of kittens){
      temp = document.getElementById(obj.id.toString() + 'div');
  
      if (obj.affection > 80) {
        temp.classList.add("positive");
        temp.classList.remove("negative");
        console.log(obj.name + ' is positive')
    }
    else {
      temp.classList.remove("positive");
        temp.classList.add("negative");
        console.log(obj.name + ' is negative');
    }
      
    }
  }

  //#endregion 

//#region localstorage manipulation
  
  function saveItem(key, value) { 
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  
  function loadItem(key) {
    let localData = JSON.parse(window.localStorage.getItem(key));
    if(localData) {
    kittens = localData;
    console.log('loaded key ' + key);
    console.log(kittens);
  }
  else {
    console.log("nothing to find??");
  }
}

function removeKitten(inx) { 
  
  kittens.splice(inx, 1); // finds ID, goes to ID and removes that ID from the array
  console.log('removed a kitten');
  
  saveItem(kittyKey, kittens);
  drawKittens();
}

//#endregion

//#region utility

function findID(event) { // finds ID's of iteratively generated DOM elements and matches them to their index in an array 

  // only used once in template for close button, might be a candidate for changes

  let kID = event.target.id;
  const arrayMap = kittens.map(x => x.id); 
  return arrayMap.indexOf(kID);
}

function correlateMood(mood) { // correlates mood to value from another array
  // this could be avoided by using an array of mood objects and their properties. 
  const currentM = mood;
  const index = possibleMoods.findIndex(fruit => fruit === mood);
  return moodMultiplier[index];
}


function generateId() {
  return Math.floor(Math.random() * 10000000) + Math.floor(Math.random() * 10000000)
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) -1 ;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//#endregion

  loadItem(kittyKey); 
  drawKittens();