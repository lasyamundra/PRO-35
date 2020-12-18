var dog, dogHappyImg, dogImg;
var foodS, foodStock;
var database;

function preload()
{
  dogImg = loadImage ("images/dogImg.png");
  dogHappyImg = loadImage ("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  
  createCanvas(500,500);
  
  dog = createSprite (250,250,10,10);
  dog.addImage (dogImg);
  dog.scale = 0.1;
  
  foodStock=database.ref('Food');
  foodStock.on ("value",readStock,showError);
}


function draw() {  
  background (247,189,204);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage (dogHappyImg);
  }

  drawSprites();

  fill(255,255,255)
  textSize (12)
  text ("Note: Press UP_ARROW Key To Feed Drago Milk",125,10,300,20);

  fill (0)
  textSize (10)
  text("Food remaining : "+foodS,200,200);

  //text ()
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x<=0){
    x=20
  }
  else {
    x=x-1
  }
  
  database.ref('/').update({
    Food:x
  })
}

function showError(){
  console.log("error in writing to the database");
}
