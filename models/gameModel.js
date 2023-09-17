 const CardModel = require('./cardModel');
 const userModel = require('./userModel')
 const {Stack} = require('datastructures-js')
 

class GameModel {

    // constructor( jugadores){
    //     //  this.jugadores = jugadores;
       
    // }
    constructor(){
      this.iniciarJuego();
    }
    
    asignarMano(cantidadCartas){
       const mano = []
       const mazo = this.generarCartas() ///genera el mazo
        for (let i = 0; i < cantidadCartas; i++) {
          const cartas =   Math.floor(Math.random()* mazo.size)
          const removeCarta = mazo.pop()
          mano.push(removeCarta)
         
          
        }
        return mano

    }

    iniciarJuego(){
       const stack = this.generarCartas()
       const mano1 = new Stack();
       const mano2 = new Stack();
       const mano3 = new Stack();
       const mano4 = new Stack();

       let manoasig = this.asignarMano( 9) 
       let manoasig2 = this.asignarMano( 9)
       let manoasig3 = this.asignarMano( 9)
       let manoasig4 = this.asignarMano( 9)//pasa la cantidad de cartas

       for (let i = 0; i <= 8; i++) {
         mano1.push(stack.pop())
         mano2.push(stack.pop())
         mano3.push(stack.pop())
         mano4.push(stack.pop())
        
       }
       
        // console.log(mano1)
        // console.log(stack.size());
       console.log('mano jugador 1', manoasig)
       console.log('tamaño del mazo restante', stack.size())

       const jugador1 = new userModel(123, 1, 'hey', manoasig)
       const jugador2 = new userModel(123, 1, 'hey', manoasig2)
       const jugador3 = new userModel(123, 1, 'hey', manoasig3)
       const jugador4 = new userModel(123, 1, 'hey', manoasig4)
       
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
// module.exports = userModel;

