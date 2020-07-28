
var dog, dogImg, happyDog, database, foodS, foodStock, lastFed, foodObj, feed, addFood, lastFed;
var dogInput, enterName, dogName = 'not yet decided';
var gameState, readState, bedroom, garden, washroom, currentTime;

function preload()
{
  dogImg = loadImage('images/dogImg.png')
  dogHappy = loadImage('images/dogImg1.png')
  bedroom = loadImage('images/VPS/Bed Room.png')
  garden = loadImage('images/VPS/Garden.png')
  washroom = loadImage('images/VPS/Wash Room.png')

}

function setup() {
  createCanvas(1000, 1000);

  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on('value', readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on('value', function(data){
    lastFed = data.val();
  });

  readState = database.ref('GameState');
  readState.on('value', function(data){
    gameState = data.val();
  })

  dog = createSprite(400, 250, 5, 5);
  dog.addImage(dogImg);
  
  feed = createButton('Feed the dog')
  feed.position(700, 95)
  feed.mousePressed(feedDog);

  addFood = createButton('Add Food')
  addFood.position(800, 95)
  addFood.mousePressed(addFoods);

  enterName = createButton('Enter Dog Name')
  enterName.position(1050, 350);
  enterName.mousePressed(enterDogName);

  dogInput = createInput('Dog Name');
  dogInput.position(1050, 300)

}

function draw(){ 

  currentTime = hour();
  if(currentTime === (lastFed + 1)){
    update('Playing')
    foodObj.garden();
  } else if(currentTime === (lastFed + 2)){
    update('Sleeping')
    foodObj.bedroom();
  } else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)){
    update('Bathing')
    foodObj.washroom()
  } else {
    update('Hungry')
    foodObj.display()
  }

  if(gameState != 'Hungry'){
    feed.hide()
    addFood.hide()
    dog.remove()
  } else {
    feed.show()
    addFood.show()
    dog.addImage(dogImg)
  }

  drawSprites();

  stroke(20)
  textSize(50)
  fill('black');
  textSize(30)
  text('food: ' + foodS, 600, 200)
  text('The name of your dog is: ' + dogName, 450, 100);

  fill(255, 255, 254);
  textSize(15);

}

function readStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS);
}

function feedDog(){

  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour(),
    GameState: 'Full'
  })
}

function addFoods(){
  foodS ++;

  database.ref('/').update({
    Food: foodS
  })
}

function update(state){
    database.ref('/').update({
      GameState:state
    })
  }
/*
function writeStock(x){

  if (x <= 0){
    x = 0;
    dog.addImage(dogImg)
  } else {
    x -= 1;
  }
  
  database.ref('/').update({
    Food:x
  })

}
*/

function enterDogName(){
  dogName = dogInput.value() 
}