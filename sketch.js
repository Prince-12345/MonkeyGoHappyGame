//Defining Variables

var monkey , monkey_running , banana , bananaImage , obstacle , obstacleImage,ground,jungle , jungle_image;

//Defining groups
var foodGroup , obstacleGroup;

//assigning score
var score = 0;
var points = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
//Loading external files

  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");

  jungle_image=loadImage("jungle.png");
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
 
}




function setup() {
createCanvas(600,400);

  //creating the ground
  ground =createSprite(300,380,1000,10);
  
  
  
  jungle=createSprite(420,190,1000,1000)
  jungle.addImage(jungle_image);
  jungle.scale=1.4;
  jungle.velocityX=-(4+score/2);
  
  
  //creating the monkey
  monkey=createSprite(80,380,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.14;
  
  
  //Creating groups
  obstacleGroup = createGroup();
  foodGroup = createGroup();

}




function draw() {
  //set background colour
  background("lightgrey");
   
  
 if(jungle.x<170){
     jungle.x=jungle.width/2
    }
   monkey.collide(ground);
  if(gameState===PLAY){
  
  //Make the monkey jump
  if(keyDown("space") && monkey.y>300 ){
     monkey.velocityY=-16;
  }
  
  //Add gravity 
  monkey.velocityY = monkey.velocityY+0.8;    
 
 
  if(monkey.isTouching(foodGroup)){
    points = points + 1;
    foodGroup.destroyEach();
  }
    
  if(monkey.isTouching(obstacleGroup)){
     gameState=END;
     }
    
createbanana();
createobstacle();
}
  
   if(gameState===END){
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    jungle.velocityX=0;
    monkey.velocityY=0;
    score=0;
  }
drawSprites();
  
  //scoring system
  stroke("white");
  textSize(20);
  fill("white");
  score=score+ Math.round(getFrameRate()/60);
  text("survival Time:"+score,250,20)
  text("Your score : "+ points,255,50)
}





function createbanana(){
  if(frameCount%90==0){
  banana=createSprite(660,Math.round(random(120,200)),10,10);
  banana.addImage(bananaImage);
  banana.scale=0.12;
  banana.velocityX=-(6+score/100);
  banana.lifetime=112;
  foodGroup.add(banana);
 }
}




function createobstacle(){
  if(frameCount%210==0){
  obstacle=createSprite(660,355,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
  obstacle.velocityX=-(6+score/120);
  obstacle.lifetime=112;
  obstacle.rotation=5;
  //obstacle.debug=true;
  //obstacle.setCollider("circle",50,50,300)
  obstacleGroup.add(obstacle);
 }
}


