let titulo;
let fondo;
let filas = [];
let numFilas = 20;
let numCol = 15;
let espacio;
let tam;
let c;

function preload(){
  titulo = loadImage('titulo.png');
  fondo = loadImage('dibujo.svg');
}

function setup() {
  createCanvas(windowWidth, windowWidth*0.75);
  imageMode(CENTER);
}

function draw() {
  background(220);
  espacio = width/numCol;
  c = color(noise(frameCount*0.06)*255, 125, 125);
  
  let ratio = titulo.width / titulo.height;
  
  for(let i = 0; i <= numFilas; i++){
    filas[i] = [];
    for(let ii = 0; ii <= numCol; ii++){
      noFill();
      tam = noise(i, ii, frameCount*0.01)*espacio;
      stroke(255);
      filas[i][ii] = new Mod(i*espacio,ii*espacio, tam);
      filas[i][ii].display();
      tam = noise(i, ii, frameCount*0.007)*espacio;
      stroke(c, 100);
      filas[i][ii] = new Mod(i*espacio,ii*espacio, tam);
      filas[i][ii].display();
    }
  }
  
  image(
    fondo,
    width/2, height/2,
    width*0.65, height*0.65);

  image(
    titulo, 
    width/2, height/2, 
    width*0.6, height/ratio*0.75);
}

class Mod {
  constructor(_x, _y, _t){
    this.x = _x;
    this.y = _y;
    this.t = constrain(
      dist(this.x, this.y, mouseX, mouseY)/4,
      0, _t );
  }
  
  display(){
    ellipse(this.x, this.y, this.t);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowWidth*0.75);
}