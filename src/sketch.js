import { Fox } from "./Fox.js";
import { Rabbit } from "./Rabbit.js";
import { copyObject } from "./Functions.js";

let running = false;
const boxesPerRow = 5;
let globalLocations = [];
let allAnimals = [];
let foxesAmount = 10;
let rabbitsAmount = 10;
let boxWidth;
let boxHeight;
let foxImage;
let rabbitImage;

let FOX_REPRODUCTION_PROBABILITY;
let RABBIT_REPRODUCTION_PROBABILITY;
let HUNGER_LIMIT;

window.setup = setup;
window.preload = preload;
window.draw = draw;


const canvasDiv = document.getElementById('canvasDiv');
const startBtn = document.getElementById('startBtn');
const refreshBtn = document.getElementById('refreshBtn');

const initialFoxes = document.getElementById('initialFoxes');
const initialRabbits = document.getElementById('initialRabbits');
const probFoxes = document.getElementById('probFoxes');
const probRabbits = document.getElementById('probRabbits');
const survivingFoxBoxes = document.getElementById('survivingFoxBoxes');

const foxesAmountP = document.createElement('p');
const rabbitsAmountP = document.createElement('p');
foxesAmountP.classList.add('text');
rabbitsAmountP.classList.add('text');
foxesAmountP.innerHTML = `Zorros: ${foxesAmount}`;
rabbitsAmountP.innerHTML = `Conejos: ${rabbitsAmount}`
canvasDiv.append(foxesAmountP);
canvasDiv.append(rabbitsAmountP);


/**
 * Refresh event
 */
refreshBtn.addEventListener('click', () => {
  location.reload();
});



function preload() {
  foxImage = loadImage("./img/fox.png");
  rabbitImage = loadImage("./img/rabbit1.png");
}


function setup() {
  const myCanvas = createCanvas(500, 500);
  myCanvas.parent('canvasDiv');

  /**
 * CLick event
 */
  startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    rabbitsAmount = parseInt(initialRabbits.value) || 10;
    foxesAmount = parseInt(initialFoxes.value) || 10;
    FOX_REPRODUCTION_PROBABILITY = parseFloat(probFoxes.value) || 0.3;
    RABBIT_REPRODUCTION_PROBABILITY = parseFloat(probRabbits.value) || 0.6;
    HUNGER_LIMIT = parseInt(survivingFoxBoxes.value) || 6;
    initializeLocations();
    generateFoxes();
    generateRabbits();

    running = true;

    const checkedElement = document.querySelector('input[name="mode"]:checked');
    if (checkedElement.value == "automatic") {
      setInterval(() => {
        moveEveryAnimal();
        updateAnimalsGlobalLocations();
        checkAnimalsState();
      }, 1500);
    }
    else {
      myCanvas.mouseClicked(mouseClicked);
    }
  });


}

function initializeLocations() {
  for (let y = 0; y < boxesPerRow; y++) {
    globalLocations.push([]);
    for (let x = 0; x < boxesPerRow; x++) {
      globalLocations[y][x] = { foxes: [], rabbits: [] };
    }
  }
}

function generateFoxes() {
  const initialFoxesLocation = { x: 4, y: 0 };
  for (let fox = 0; fox < foxesAmount; fox++) {
    let newFox = new Fox(copyObject(initialFoxesLocation), `fox${fox}`, HUNGER_LIMIT);
    globalLocations[initialFoxesLocation.y][initialFoxesLocation.x].foxes.push(newFox);
    allAnimals.push(newFox);
  }
}

function generateRabbits() {
  const initialRabbitsLocation = { x: 0, y: 4 };
  for (let rabbit = 0; rabbit < rabbitsAmount; rabbit++) {
    let newRabbit = new Rabbit(copyObject(initialRabbitsLocation), `rabbit${rabbit}`);
    globalLocations[initialRabbitsLocation.y][initialRabbitsLocation.x].rabbits.push(newRabbit);
    allAnimals.push(newRabbit);
  }
}
function draw() {
  boxWidth = width / boxesPerRow;
  boxHeight = height / boxesPerRow;
  background(90, 220, 90);

  if (running) {
    updateAnimalsCountHTML();

    drawGrid();

    drawAnimals();
  }
}

function updateAnimalsCountHTML() {
  foxesAmountP.innerHTML = `Foxes: ${foxesAmount}`;
  rabbitsAmountP.innerHTML = `Rabbits: ${rabbitsAmount}`
}

function drawGrid() {
  for (let x = 0; x <= width; x += width / boxesPerRow) {
    for (let y = 0; y <= height; y += height / boxesPerRow) {
      stroke(0);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }
}


function drawAnimals() {
  const fontsize = 10;
  textSize(fontsize);
  textAlign(LEFT);

  fill(0);
  for (let y = 0; y < boxesPerRow; y++) {
    for (let x = 0; x < boxesPerRow; x++) {
      const amountFoxes = globalLocations[y][x].foxes.length;
      const amountRabbits = globalLocations[y][x].rabbits.length;
      const location = { y: y, x: x };
      const position = getPositionFromLocation(location);
      // text(`Foxes: ${amountFoxes}`, position.x + 30, position.y + 40);
      // text(`Rabbits: ${amountRabbits}`, position.x + 30, position.y + 60);
      drawAnimalImagesInBox(position, amountFoxes, amountRabbits);
    }
  }
}

function drawAnimalImagesInBox(position, amountFoxes, amountRabbits) {
  let accum_x = 0;
  let accum_y = 0.05 * boxHeight;

  for (let fox = 0; fox < amountFoxes + amountRabbits; fox++) {

    //stop drawing images if animals do not fit the box
    if (accum_y > boxHeight) {
      break;
    }
    if (fox < amountFoxes) {
      image(foxImage, position.x + accum_x, position.y + accum_y, 20, 20);
    }
    else {
      image(rabbitImage, position.x + accum_x, position.y + accum_y);
    }
    //line break
    accum_x += 0.2 * boxWidth;
    if (accum_x >= 0.9 * boxWidth) {
      accum_x = 0;
      accum_y += 0.2 * boxHeight;
    }
  }
}
/**
 * Events
 */

function mouseClicked() {
  moveEveryAnimal();
  updateAnimalsGlobalLocations();
  checkAnimalsState();
}


function moveEveryAnimal() {
  allAnimals.forEach(animal => {
    animal.move();
    if (animal instanceof Fox) {
      animal.increaseHunger();
    }
  });
}

function updateAnimalsGlobalLocations() {
  clearGlobalLocations();
  let index = 0;
  allAnimals.forEach(animal => {
    const location = animal.getLocation();
    if (animal instanceof Fox) {
      globalLocations[location.y][location.x].foxes.push(animal);
    }
    else if (animal instanceof Rabbit) {
      globalLocations[location.y][location.x].rabbits.push(animal);
    }
    index++;
  });
}

function clearGlobalLocations() {
  globalLocations = [];
  initializeLocations();
}

function checkAnimalsState() {
  setTimeout(() => {
    for (let y = 0; y < globalLocations.length; y++) {
      for (let x = 0; x < globalLocations[y].length; x++) {
        const foxes = globalLocations[y][x].foxes;
        const rabbits = globalLocations[y][x].rabbits;
        checkIfAnimalsCanReproduce(foxes);
        checkIfAnimalsCanReproduce(rabbits);
        foxes.forEach((fox, index, foxesArr) => {
          checkIfFoxCanEatRabbit(fox, rabbits);
          checkIfFoxStarvesToDeath(fox, index, foxesArr);
        });
      }
    }

  }, 500);
}

function checkIfFoxCanEatRabbit(fox, rabbits) {
  const amountOfRabbitsInThisLocation = rabbits.length;
  if (amountOfRabbitsInThisLocation > 0) {
    fox.eatRabbit();
    const eatenRabbit = rabbits.pop(); //the rabbit is deleted from the list
    animalDies(eatenRabbit);
  }
}

function animalDies(animal) {
  const animalIndex = allAnimals.indexOf(animal);
  allAnimals.splice(animalIndex, 1);
  if (animal instanceof Rabbit) {
    rabbitsAmount--;
  }
  else if (animal instanceof Fox) {
    foxesAmount--;
  }

}
function checkIfAnimalsCanReproduce(animals) {
  let offspring = [];
  let typeOfAnimals;
  let reproductionProbability;

  if (animals.length >= 2) {

    if (animals[0] instanceof Fox) {
      typeOfAnimals = "Fox";
      reproductionProbability = FOX_REPRODUCTION_PROBABILITY;
    }
    else if (animals[0] instanceof Rabbit) {
      typeOfAnimals = "Rabbit";
      reproductionProbability = RABBIT_REPRODUCTION_PROBABILITY;
    }

    const amountOfCouplesThatWillReproduce = animals.length % 2 == 0 ? animals.length : foxesAmount.length - 1;
    for (let i = 0; i < amountOfCouplesThatWillReproduce; i += 2) {
      const randomNumber = Math.random();
      if (randomNumber <= reproductionProbability) {
        const newFox = animals[i].reproduce(animals[i + 1]);
        offspring.push(newFox);
      }
    }
  }
  animals.push(...offspring);
  allAnimals.push(...offspring);
  if (typeOfAnimals == "Fox") {
    foxesAmount += offspring.length;
  }
  else if (typeOfAnimals == "Rabbit") {
    rabbitsAmount += offspring.length;
  }

}

function checkIfFoxStarvesToDeath(fox, index, foxesArr) {
  if (fox.isHungerDead()) {
    foxesArr.splice(index, 1);
    animalDies(fox);
  }
}

/**
 * Utils
 */

function getPositionFromLocation(location) {
  return { x: location.x * boxWidth, y: location.y * boxHeight };
}

function getLocationFromClickedBox() {
  const position = { x: mouseX, y: mouseY };
  return getLocationFromPosition(position);
}

function getLocationFromPosition(position) {
  let boxx = Math.floor(position.x / boxWidth);
  let boxy = Math.floor(position.y / boxHeight);
  return { x: boxx, y: boxy };

}




