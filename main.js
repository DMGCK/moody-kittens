let kittens = []
let kittyKey = 'kittenArray'
const possibleMoods = ['Angry', 'Lonely', 'Playful', 'Neutral', 'Sleepy', 'Rambunctious', 'Lazy', 'Content']

function addKitten(event) {
  event.preventDefault();
  let kittenName = event.target.kName.value;

  if (kittenName) {
    if (validateName = true) {
      kittens.push({id: generateId().toString(), name: kittenName, mood: 'Cautious', affection: 50});
      document.getElementById('name-form').reset();
      saveItem(kittyKey, kittens); // only one array of kittens possible with implementation
      drawKittens();
    }
  }
}

function validateName(newName) {
  let i = 0;
  kittens.forEach(cat => {
    if (cat.name == newName) {
      i += 1
    };
  });
  if (i) {
    return true;
  };
}

function drawKittens() {
  let template = '';

  kittens.forEach(cat => { //MUST USE LAMBDA DESCRIPTOR NOT NAME OF ACTUAL ARRAY/OBJECT IN QUESTION ${player.name}
    template += 
    `<span id="instance-template">
    <div class="card individual">Name: ${cat.name}
     <span onclick='removeKitten(event) id='${cat.id}' class="close-button">[X]</span>
      <div>
        <img class="cat-image" src="" alt="">
      </div>
      
      <div class="controls-container">
        <table class="cat-info">
          <tr class="justify-center">
            <td>Mood: ${cat.mood}</td>
            <td>Affection: ${cat.affection}</td>
          </tr>
          <tr class="justify-center">
            <td id='${cat.id}pet'><button>Pet Cat</button></td>
            <td id= '${cat.id}treat'><button>Give Treat</button></td>
          </tr>
        </table>
      </div>
    </div>
  </span>`;
  console.log(cat.name);
  });

  document.getElementById('kitty-display').innerHTML = template
}

function saveItem(key, value) { 
	window.localStorage.setItem(key, JSON.stringify(value));
  console.log("saved to key " + key);
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

function removeKitten(event) { // needs the ID of each individual cat to be the database id + some tag
  let arrayIndex = event.target.id;
  console.log(arrayIndex)
  kittens.splice(kittens.findIndex(arrayIndex), 1); // finds ID, goes to ID and removes that ID from the array
  console.log('removed a kitten');

  saveItem(kittyKey, kittens);
  drawKittens();
}

loadItem(kittyKey); 
drawKittens();


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
 function generateId() {
  return Math.floor(Math.random() * 10000000) + Math.floor(Math.random() * 10000000)
}