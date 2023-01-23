import { Fox } from "./Fox.js";
import { Rabbit } from "./Rabbit.js";

const boxesPerRow = 5;
let globalLocations = [];
let foxesAmount = 10;
let rabbitsAmount = 10;
let boxWidth;
let boxHeight;



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
    const newFox = new Fox(initialFoxesLocation);
    globalLocations[initialFoxesLocation.y][initialFoxesLocation.x].foxes.push(newFox);
  }
}

function generateRabbits() {
  const initialRabbitsLocation = { x: 0, y: 4 };
  for (let rabbit = 0; rabbit < rabbitsAmount; rabbit++) {
    const newRabbit = new Rabbit(initialRabbitsLocation);
    globalLocations[initialRabbitsLocation.y][initialRabbitsLocation.x].rabbits.push(newRabbit);
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
  let column = 0;
  let row = 0;
  for (let x = 0; x < width; x += width / boxesPerRow) {
    for (let y = 0; y < height; y += height / boxesPerRow) {
      stroke(0);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
      column++;
    }
    row++;
  }
}





function drawAnimals() {
  const fontsize = 10;
  textSize(fontsize);
  textAlign(CENTER);
  fill(0);
  for (let y = 0; y < boxesPerRow; y++) {
    for (let x = 0; x < boxesPerRow; x++) {
      const amountFoxes = globalLocations[y][x].foxes.length;
      const amountRabbits = globalLocations[y][x].rabbits.length;
      const location = { y: y, x: x };
      const position = getPositionFromLocation(location);
      text(`Foxes: ${amountFoxes}`, position.x + 30, position.y + 30);
      text(`Rabbits: ${amountRabbits}`, position.x + 30, position.y + 50);
    }
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


window.setup = setup;
window.draw = draw;
