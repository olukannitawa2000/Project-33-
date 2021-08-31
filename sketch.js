const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var rope1;
var rope2;
var food;
var bubble;
var ground;
var bunny;
var blink,eat;
var button1,button2;
var drop1,drop2;

function preload() {
backgroundImage = loadImage("background.png");
bubbleImage = loadImage("bubble.png");
food = loadImage("melon.png")
rabbit = loadImage("Rabbit-01.png");
blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
button = loadImage("cut_btn.png");

blink.playing = true;
eat.playing = true;
eat.looping = false; 
}

function setup() {
  createCanvas(800,700);
  //createSprite(400, 200, 50, 50);

  engine = Engine.create();
  world = engine.world;
  
  rope1 = new Rope(4,{x: 100, y: 350})
  rope2 = new Rope(5,{x:200,y:300});

  bubble = createSprite(300,400);
  bubble.addImage(bubbleImage);
  bubble.scale=0.07;

  ground = new Ground(400,236,60,10);
  
  bunny = createSprite(400,160,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.changeAnimation('blinking');

  button = createImg('cut_btn.png');
  button.position(190,300);
  button.size(50,50);
  button.mouseClicked(drop1);

  button2 = createImg('cut_btn.png');
  button2.position(60,340);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope1.body,fruit);

  fruit_con = new Link(rope1,fruit);
  fruit_con_2 = new Link(rope2,fruit);
}

function draw() {
  background(255,255,255);
  image(backgroundImage, 0, 0,600,690);
  drawSprites();
 imageMode(CENTER);

 if(fruit!=null){
  image(food,fruit.position.x,fruit.position.y,70,70);
}

function drop1()
{
  rope1.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null; 
}

  rope1.show();
  rope2.show();
  ground.show();
  Engine.update(engine);
}