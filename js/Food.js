class Food {
    constructor(){
        this.foodStock = 10;
        this.lastFed;
        this.image = loadImage('images/Milk.png')
    }

    updateFoodStock(foodStock){

        this.foodStock = foodStock;
    }

    getFedTime(lastFed){
        this.lastfed = lastFed;
    }

    deductFood(){

        if (this.foodStock > 0){

            this.foodStock --;

        } else {

            this.foodStock = 0;
        }
    }

    getFoodStock(){
        return this.foodStock
    }

    bedroom(){
        background(bedroom, 550, 500)

    }

    garden(){
        background(garden, 550, 500)

    }

    washroom(){
        background(washroom, 550, 500)

    }
    
    display(){
        background(46, 139, 87);

        if(lastFed >= 12){
            text('Last Fed: ' + lastFed % 12 + ' PM', 350, 30)
          } else if(lastFed === 0){
            text('Last Fed: 12 AM', 350, 30)
          } else {
            text('Last Fed: ' + lastFed + ' AM', 350, 30)
          }

        var x = 200;
        var y = 600;

        imageMode(CENTER);

        if(this.foodStock != 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i % 20 === 0){
                    x = 200;
                    y += 50;
                }
                image(this.image, x, y, 50, 50)
                x += 30;
            }
        }
    }
}
