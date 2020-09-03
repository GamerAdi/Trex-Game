var trex, ground, invisible_ground, ObstaclesGroup, CloudsGroup, Cactus, Clouds, gameOver, restart;
var trexrun, trexcollide, groundpng, gameoverimg, restartimg, cloudimg;
var cac1, cac2, cac3, cac4, cac5, cac6;
var score;
var PLAY=1;
var END=0;
var gamestate=1;
var sound1, sound, sound100;
function preload(){
  sound1=loadSound("die.mp3");
  sound=loadSound("jump.mp3");
  sound100=loadSound("checkPoint.mp3")
  trexrun=loadAnimation("trex1.png","trex3.png","trex4.png");
  trexcollide=loadImage("trex_collided.png");
  groundpng=loadImage("ground2.png");
  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
  cloudimg=loadImage("cloud.png");
  cac1=loadImage("obstacle1.png");
  cac2=loadImage("obstacle2.png");
  cac3=loadImage("obstacle3.png");
  cac4=loadImage("obstacle4.png");
  cac5=loadImage("obstacle5.png");
  cac6=loadImage("obstacle6.png");
}
function setup() {
  createCanvas(800, 200);
  CloudsGroup=new Group();
  CactusGroup=new Group();
  
  score=0;
  trex=createSprite(50, 160);
  trex.addAnimation("run" , trexrun);
  trex.scale=0.6;
  
  gameOver=createSprite(400, 50);
  gameOver.addImage("gameoverimg", gameoverimg);
  gameOver.visible=false;
  
  restart=createSprite(400, 100);
  restart.addImage("restart", restartimg);
  restart.visible=false;
  
  ground=createSprite(400, 180);
  ground.addAnimation("non_useful_ground", groundpng);
  
  invisible_ground=createSprite(400, 190, 800, 5);
  invisible_ground.visible=false;
}

function draw() {
  background("White"); 
  
  console.log(trex.y)
  if(gamestate==1){
      ground.velocityX=-(6+3*score/100) ;
  if(keyDown("space") && trex.y > 159){
    sound.play();
     trex.velocityY=-15 ;  
     } 
  
  
  //Gravity
  trex.velocityY=trex.velocityY+0.8;
    
  if(ground.x<=0){
    ground.x=ground.width/2;    
  } 
    
    spawnCactus();
    spawnClouds();
    
    if(trex.isTouching(CactusGroup)){
     gamestate=0; 
    }
  }
  
  if(gamestate==0){
    sound1.play();
   ground.velocityX=0;
    trex.velocityY=2;
    CactusGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("collided", trexcollide);
    gameOver.visible=true;
    restart.visible=true;
    CactusGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
  }
  
  if(mousePressedOver(restart)){
   reset(); 
  }
  
  trex.collide(invisible_ground);
  
  drawSprites();
}
function reset(){
  gamestate=1;
  CactusGroup.destroyEach();
  CloudsGroup.destroyEach();
  score=0;
  trex.changeAnimation("run", trexrun);
   gameOver.visible=false;
   restart.visible=false;
}
function spawnCactus(){
  if(frameCount%80===0){
     var cac =createSprite(800, 155, 10, 10);
    cac.velocityX=-(6+3*score/100);
    cac.lifetime=800/6;
    cac.scale=0.7;
    var anicac=Math.round(random(1, 6));
    switch(anicac){
      case 1:cac.addImage(cac1);
      break;
      case 2:cac.addImage(cac2);
      break;
      case 3:cac.addImage(cac3);
      break;
      case 4:cac.addImage(cac4);
      break;
      case 5:cac.addImage(cac5);
      break;
      case 6:cac.addImage(cac6);
      break;
      default:
        break;
    }
    CactusGroup.add(cac);
    
  }
}
function spawnClouds(){
   if(frameCount%100===0){
     var clo=createSprite(800, random(80, 130));
     clo.addImage("cloud", cloudimg);
     clo.velocityX=-4;
     clo.scale=0.7;
     clo.lifetime=800/4;   
     clo.depth=trex.depth;
     trex.depth=trex.depth+1;
     CloudsGroup.add(clo);
   }
}