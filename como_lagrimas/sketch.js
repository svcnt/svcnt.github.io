var ancho = 1280;
var alto = 528;
var numImg = 128;
var pic = [];
var img = [];
var mover;
var imgPos = [];
var imgOffset = [];
var isDragged = false;

function preload(){
  for(let i = 0; i < numImg; i++){
    pic[i] = "data/"+nf(i+1,4)+".jpg";
  }
  for(let i = 0; i < numImg; i++){
    img[i] = loadImage(pic[i]);
  }
  print("pic.length = " + pic.length);
}

function setup() {
  var canvas = createCanvas(ancho, alto);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
  canvas.parent('sketch-holder');
  background(0);



  mover = createVector(0, 0, 0);

  imgPos[0] = createVector(-ancho, 0);
  imgPos[1] = createVector(0, 0);
  imgPos[2] = createVector(ancho, 0);

  imgOffset[0] = 4;
  imgOffset[1] = 5;
  imgOffset[2] = 6;
}

function draw() {
  autoScroll();
}

function autoScroll(){
  for(let i = 0; i < 3; i++){
    // Muestra cada grupo de tres imágenes en la posición correcta
    image(img[imgOffset[i]], imgPos[i].x, imgPos[i].y);
    fill(255);
    // Velocidad (si no hay scroll manual)
    if(!isDragged){
      imgPos[i].x-=2;
    }
    // Si una imagen supera el límite izquierdo
    if(imgPos[i].x < -ancho){
      // Mueve la imagen a la dcha.
      var ds = imgPos[i].x;
      imgPos[i].x = ds+ancho*3;
      // Muestra la imagen siguiente
      var nextFrame = imgOffset[i];
      imgOffset[i] = nextFrame+=3;
      // Si no hay más imágenes, reinicia
      if(imgOffset[i] >= pic.length){
        imgOffset[0] = 5;
        imgOffset[1] = 6;
        imgOffset[2] = 7;
      }
    }
    // Si una imagen supera el límite derecho
    if(imgPos[i].x > ancho*2){
      // Mueve la imagen a la izq.
      var ds = imgPos[i].x;
      imgPos[i].x = ds-ancho*3;
      // Muestra la imagen anterior
      var nextFrame = imgOffset[i];
      imgOffset[i] = nextFrame-=3;
      // Si no hay más imágenes, reinicia
      if(imgOffset[i] <= 0){
        imgOffset[0] = 5;
        imgOffset[1] = 6;
        imgOffset[2] = 7;
      }
    }
  }
}

// Mouse
// Scroll manual
function mouseDragged(){
  isDragged = true;
  mover.x = mouseX - pmouseX;
  mover.mult(3);
  for(let i = 0; i < 3; i++){
    imgPos[i].add(mover);
  }
}
// Activa scroll automático
function mouseReleased(){
  isDragged = false;
}

// Touchscreen
// Scroll manual
function touchMoved(){
  isDragged = true;
  mover.x = mouseX - pmouseX;
  mover.mult(3);
  for(let i = 0; i < 3; i++){
    imgPos[i].add(mover);
  }
}
// Activa scroll automático
function touchEnded(){
  isDragged = false;
}
