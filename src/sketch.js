function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);
  const boxesPerRow = 5;
  drawGrid(boxesPerRow);
  drawAnimal("Zorro");
}

function drawGrid(boxesPerRow) {
  for (let x = 0; x < width; x += width / boxesPerRow) {
    for (let y = 0; y < height; y += height / boxesPerRow) {
      stroke(0);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }
}

function drawAnimal(animalText) {
  const fontsize = 10;
  textSize(fontsize);
  textAlign(CENTER);
  fill(0);
  text(animalText, 50, 80);

}