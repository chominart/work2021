let data
let data2;
let img;

var angleX = 1.4;
var angleY = 0;

var cols, rows;
var cols2, rows2;
var scl = 20;
var w = 1500;
var h = 800;

var flying = 0;
var flying2 = 0;

var terrain;
var terrain2;

var cameraX = 0;
var cameraY = 0;
var cameraZ = 0;
var zoom = 0;

var m;
var seconds;
var duration;

var divW;

const Y_AXIS = 1;
const X_AXIS = 2;



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  divW = 1430/windowWidth;
  cameraZ = (height / 2.0) / tan(PI * 30.0 / 180.0);

  img = loadImage("photoEditv3.jpg");

  cols = w / scl;
  rows = h / scl;

  cols2 = w / scl;
  rows2 = h / scl;


  terrain = [];
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
  }
  terrain2 = [];
  for (var x2 = 0; x2 < cols2; x2++) {
    terrain2[x2] = [];
  }


  data = new Array(cols);
  for (var i = 0; i < data.length; i++) {
    data[i] = 0;
  }
  data2 = new Array(cols2);
  for (var i2 = 0; i2 < data2.length; i2++) {
    data2[i2] = 0;
  }


  m = millis();
  seconds = duration = 0;

}


function draw() {
  if (mouseIsPressed) {
    seconds = (millis() - m) / 1000;
    if (seconds > 100) {
      seconds = 0;
    }
  } else {
    m = millis();
    seconds = duration;
  }


  camera(cameraX, cameraY, cameraZ, 0, 0, 0, 0, 1, 0);
  var rectline = map(mouseX, 0, width, 10, 50);
  background(0+(mouseX/30),48,60+(mouseY/30));
  //background(0);
 

  push();
  rotate(-0.06);
  fill(10,200,230,50);
  strokeWeight(0);
  rect(-1900, 40, 3700, 1800); //middle-line
  pop();

  stroke(255, 204, 204, rectline);
  //rect(11, 330, 2, 2); //centerPoint
  fill(255, 204, 204, rectline); //pinkRectangular
  strokeWeight(0.5);
  rect(-80, -60, 150, 150);

  wave(); //waveFunctionActivate
  wave2();//dotsActivate

  rotateX((-PI / 2.2) - (cameraY / 700)); // -angleX
  rotateY((cameraX / 1700));



}

function wave() {

  var px = int(map(mouseX, 0, width, 0, cols));
  var dy = 1 * (pmouseY - mouseY);

  if (px > 0 && px < data.length) {
    data[px] += dy;
  }
  for (var i = 0; i < data.length - 1; i++) {
    data[i] *= 0.9985;
  }
  data[data.length - 1] *= 0.999;



  var xoff = (map(mouseX, 0, width, 0, cols) / 30);
  for (var x = cols - 1; x >= 0; x--) {

    if (mouseIsPressed) {
      flying += 0.0003; 
    } else {
      flying += 0.00007;
    }

    var yoff = flying;
    for (var y = rows - 1; y >= 0; y--) {
      if (y > 0) {
        terrain[x][y] = terrain[constrain(x, 0, cols - 1)][y - 1];
      } else {
        terrain[x][y] = data[x] + map(noise(xoff, yoff), 0, 1, -(seconds * 20) - 1, (seconds * 20) + 200);
      }
      yoff += 0.1;
    }
    xoff += 0.1;
  }

  translate((width / 2) - (width / 2), (height / 2) - (height / 2.5));
  rotateX(PI /2.2);
  rotateY(0);
  scale(0.6 + zoom);
  translate(-w / 2, -h / 2);

  for (var y = 0; y < rows - 1; y++) {
    texture(img);
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols - 1; x++) {
      vertex((x) * scl, y * scl, terrain[x][y], map(x, 0, cols, 0, 1), map(y, 0, rows, 0, 1));
      //vertex((x) * scl, (y + 1) * scl, terrain[x][y + 1], map(x, 0, cols, 0, 1), map(y + 1, 0, rows, 0, 1));
      //vertex((x + 1) * scl, (y + 1) * scl, terrain[x + 1][y + 1], map(x + 1, 0, cols, 0, 1), map(y + 1, 0, rows, 0, 1));
      vertex((x + 1) * scl, (y) * scl, terrain[x + 1][y], map(x + 1, 0, cols, 0, 1), map(y, 0, rows, 0, 1));
      vertex((x) * scl, (y) * scl, terrain[x][y], map(x, 0, cols, 0, 1), map(y, 0, rows, 0, 1));
    }
    endShape();
  }


}

function wave2() {

  flying2 += 0.005;
  var yoff2 = flying2;
  for (var y2 = 0; y2 < rows2; y2++) {
    var xoff2 = 0;
    for (var x2 = 0; x2 < cols2; x2++) {
      terrain2[x2][y2] = map(noise(xoff2, yoff2), 0, 1, -200, 300);
      xoff2 += 0.1;
    } 
    yoff2 += 0.1;
  }
  

  translate( (width / 2),((height/2)) );
  rotateX(-50);
  //rotateX(PI-10);
  //rotateY(30);
  //scale(1);
  translate(-w / 2, -h /3);
  //translate(0, -h/2 );

  stroke(255,255,255);
  strokeWeight(2.5);
  noFill(); 

  for (var y2 = 0; y2 < rows - 1; y2++) {
    beginShape(POINTS);
    for (var x2 = 0; x2 < cols - 1; x2++) {
      //vertex((x2) * scl, y2 * scl, terrain2[x2][y2]);
      //vertex((x2) * scl, (y2 + 1) * scl, terrain2[x2][y2 + 1]);
      //vertex((x2 + 1) * scl, (y2 + 1) * scl, terrain2[x2 + 1][y2 + 1]);
      //vertex((x2 + 1) * scl, (y2) * scl, terrain2[x2 + 1][y2]);
      vertex((x2) * scl, (y2) * scl, terrain2[x2][y2]);
    }
    endShape();
  }
 

   if (key === '_') {
    vertex.save('GreeneryFlow_2021_CHO', 'png');
  }
  if (key === 'p') {
    pg.reset();
  }

}

function keyTyped() {
  if (key === '+') {
    saveCanvas('GreeneryFlow_2021_CHO', 'png');
  }
}



function keyPressed() {
  if (keyCode === UP_ARROW & cameraY > -300) {
    cameraY -= 40;
    zoom -= 0.01;
  } else if (keyCode === DOWN_ARROW & cameraY < 80) {
    cameraY += 40;
    zoom += 0.01;
  }
  if (keyCode === LEFT_ARROW & cameraX > -200) {
    cameraX -= 40;
    zoom += 0.1;
  } else if (keyCode === RIGHT_ARROW & cameraX < 80) {
    cameraX += 40;
    zoom -= 0.1;
  }
}
