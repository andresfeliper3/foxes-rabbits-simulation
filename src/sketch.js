import { Fox } from "./Fox.js";
import { Rabbit } from "./Rabbit.js";

const boxesPerRow = 5;
let globalLocations = [];
let allAnimals = [];
let foxesAmount = 10;
let rabbitsAmount = 10;
let boxWidth;
let boxHeight;

window.setup = setup;
window.draw = draw;
window.mouseClicked = mouseClicked;


function setup() {
  createCanvas(500, 500);
  initializeLocations();
  generateFoxes();
  generateRabbits();
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
    let newFox = new Fox(copyObject(initialFoxesLocation), `fox${fox}`);
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
  background(220);


  drawGrid();

  drawAnimals();

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
      text(`Foxes: ${amountFoxes}`, position.x + 30, position.y + 40);
      text(`Rabbits: ${amountRabbits}`, position.x + 30, position.y + 60);
    }
  }
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
/**
 * Events
 */

function mouseClicked() {
  moveEveryAnimal();
  updateAnimalsGlobalLocations();
}

function moveEveryAnimal() {
  allAnimals.forEach(animal => {
    animal.move();
  });
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

function copyObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}


