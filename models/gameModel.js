const CardModel = require('./cardModel');
 const {Stack} = require('datastructures-js')
 

class GameModel {

    constructor(){
      this.iniciarJuego();
    }
    iniciarJuego(){
       const stack = this.generarCartas()
       const mano1 = new Stack();
       const mano2 = new Stack();
       const mano3 = new Stack();
       const mano4 = new Stack();

       for (let i = 0; i <= 8; i++) {
         mano1.push(stack.pop())
         mano2.push(stack.pop())
         mano3.push(stack.pop())
         mano4.push(stack.pop())
        
       }
        console.log(mano1)
        console.log(stack.size());
       
       
    }
     barajar(array) {
        let currentIndex = array.length,  randomIndex;
      
        
        while (currentIndex > 0) {
      
          
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
        
      }

    generarCartas(){

      
        const array = []
        for (let i = 1; i <= 13; i++) {
            for (let j = 0; j <=3; j++) {
                // 0 = corazones, 1 = diamantes, 2 = trevoles, 3 = picas
                let type;
                let color;
                if(j === 0 ){
                    type = "corazones"
                    color = "rojo"
                }
                if(j === 1){
                    type = "diamantes"
                    color = "rojo"
                }
                if(j === 2){
                    type = "trevoles"
                    color = "negro"
                }
                if(j === 3){
                    type = "picas"
                    color = "negro"
                }

               const card = new CardModel(type, i, i, color)

               array.push(card)
               

            }
            
        }
       return Stack.fromArray(this.barajar(array))
    }
    
    
    
}
module.exports = GameModel;

