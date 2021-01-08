var sword,swordImage,gameOverImage;
var fruit,fruit1,fruit2,fruit3,fruit4;
var fruitGroup;
var monster,monsterImage;
var enemyGroup;
var score;
var chances;
var PLAY=1;
var END=0;
var gameState=PLAY;
var sound
var gameOverSound; 


function preload(){
  // load images
  swordImage=loadImage("sword.png");
  fruit1Image=loadImage("fruit1.png");
  fruit2Image=loadImage("fruit2.png");
  fruit3Image=loadImage("fruit3.png");
  fruit4Image=loadImage("fruit4.png");
  gameOverImage=loadImage("gameover.png");
  monsterImage=loadAnimation("alien1.png","alien2.png");
  
  sound = loadSound("knifeSwooshSound.mp3");
  gameOverSound= loadSound("gameover.mp3");
  sound = loadSound("knifeSwooshSound.mp3");
  gameOverSound= loadSound("gameover.mp3");
}

function setup(){
  createCanvas(400,400);
  //make sword 
  sword=createSprite(200,200,10,10);
  sword.addImage(swordImage);
  sword.scale=0.5;
  // make groups
  fruitGroup=new Group();
  enemyGroup=new Group();
  // make score
  score=0;
}  
function draw(){
  background("lightBlue");
  
  //make game states
  if(gameState===PLAY){
    //set sword X and Y
   sword.y=World.mouseY;
   sword.x=World.mouseX;
  
   fruits();
   enemy();
  
  if(fruitGroup.isTouching(sword)){ 
    fruitGroup.destroyEach();
    sound.play();
    
     score=score+1;
 }
   if(sword.isTouching(enemyGroup)){
     gameOverSound.play();
    gameState = END;
  }
  }
  else if(gameState===END){
  
    fruitGroup.setVelocityEach(0);
    enemyGroup.setVelocityEach(0);
    
    enemyGroup.destroyEach();
   fruitGroup.destroyEach();
    sword.addImage(gameOverImage);
      sword.x=200;
      sword.y=200;
  
}
   //make text
  fill("black");
  textSize(15);
  text("Score: "+score,325,30);
  
   drawSprites();  
  }
   //make function fruit
function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2))
  
    fruit = createSprite(400,200,20,20); 
    
    console.log(position)
    if(position==1){
      fruit.x = 400;
      fruit.velocityX=-(7+score/4);
       
       }
    else {
      if(position==2){
      fruit.x = 0;
      fruit.velocityX=(7+score/4); 
    }
            
            }
  fruit.scale = 0.2
  rand=Math.round(random(1,4));
  if(rand===1){
    fruit.addImage(fruit1Image); 
  } else if (rand===2){
    fruit.addImage(fruit2Image);
  }else if(rand===3){
    fruit.addImage(fruit3Image);
  }else{
    fruit.addImage(fruit4Image);
  }     
     
 
  fruit.y=Math.round(random(50,340));
  fruit.setLifetime=100;
  fruitGroup.add(fruit);
  
  } 
 
}   
  // make function enemy 
function enemy(){
  if(World.frameCount%150===0){
  monster=createSprite(400,200,10,10);
  monster.y=Math.round(random(100,350));
  monster.addAnimation("moving",monsterImage);
  monster.velocityX=-(8+(score/10));
  monster.setLifetime=125;
  enemyGroup.add(monster);
  }
}
   
