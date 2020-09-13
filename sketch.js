// Matter.js objects
const World = Matter.World;
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;
var world;


// base objects
var base1, base2;

// width and height of the box
const  boxW = 30
const boxH = 50;

// maximum number of boxes for a two in each box
var MaxB1 = 7;
var MaxB2 = 5;

// position and height of two bases
var base1X = 370;
var base1Y = 340;
var base2X = 640;
var base2Y = 250;
var bHeight = 5;


// Calculated width of two based based upon width of the boxes and max number of boxes 
var bWidth = (MaxB1+1)*boxW;
var b2Width = (MaxB2+1)*boxW


// Lists holding boxes for each base
var B1=[];
var B2 = [];


// variable holding total number of boxes made for each base
var totalBoxCount1 = 0;
var totalBoxCount2 = 0;

//ground object
var ground;

//stone object
var stone;

var connector;

var gameState = "onSling";
/*
  Setups the base and initalizes the boxes on them
*/
function setup() {
  createCanvas(800,400);

  rectMode(CENTER);

  engine = Engine.create();
  world = engine.world;

  base1 = new Rect(base1X, base1Y, bWidth, bHeight);
  base2 = new Rect(base2X, base2Y, b2Width, bHeight);

  totalBoxCount1 = DrawBox(4,base1X, base1Y, B1, bWidth);
  totalBoxCount2 = DrawBox(3,base2X, base2Y, B2, b2Width);

  ground = new Rect(400, 390, 800, 20);

  stone = new Hex(100,200,50);


  connector = new SlingShot(stone.body, {x:100,y:200});

  Engine.run(engine)
}

/*
  displays bases and each object on top of it
*/
function draw() {
  background(0);  

  Engine.update(engine);

  stroke(rgb(0,250,200));
  fill(rgb(0,250,200));
  ground.display();

  base1.display();
  base2.display();

  for(var d = 0; d < totalBoxCount1; d=d+1){
    strokeWeight(1);
    stroke("black");
    B1[d].display();
  }

  for(var d = 0; d < totalBoxCount2; d=d+1){
    strokeWeight(1);
    stroke("black");
    B2[d].display();
  }

  stone.display();

  connector.display();

  drawSprites();
}



/*
  Draws the boxes based upon base's position, expected number of rows, list holding the boxes and the width of the boxes
*/
function DrawBox(rows, baseX, baseY, L, baseWidth){
  var totalBoxCount = 0;
  for(var j = 0; j < rows; j = j+1){
    countBox = rows*2 - 2*j - 1;
    for(var i = 0; i < countBox; i=i+1){
      L.push(new Box(
      (baseX - baseWidth/2) + (j+1)*boxW  + i*boxW,
      (baseY-bHeight/2) - boxH/2 - j*boxH, 
      boxW, 
      boxH));
    }
    totalBoxCount = totalBoxCount + countBox;
  }
  return totalBoxCount;
}

/*
Mouse Drag and Mouse Release
*/
function mouseDragged(){
  if(gameState !== "Launched"){
  Matter.Body.setPosition(stone.body, {x: mouseX , y: mouseY});
  }
}


function mouseReleased(){
  connector.fly();
  gameState = "Launched";
}