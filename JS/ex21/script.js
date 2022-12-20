class Avatar{
    constructor(x, y){
        const coin = 0;
        if(y<0 || x<0){
            throw new Error(`O valor de x ou y não pode ser menor igual a 0`);   
        }
        this.x = x;
        this.y = y;
        this.bolsa = coin;
    }

    get posicaoX(){
        return this.x
    }
    get posicaoY(){
        return this.y
    }
    get getBolsa(){
        return this.bolsa
    }

    // como não havia limite máximo de movimentação, acabei não colocando a condição que limitaria o valor máximo de x ou y
    foward(){
        // if(y==='valor máximo de y'){
        //     return false;
        // }
        return this.y += 1
    }

    back(){
        if(this.y===0){
            return false;
        }
        return this.y -= 1 
    }

    right(){
        // if(x==='valor máximo de x'){
        //     return false;
        // }
        return this.x += 1
    }

    left(){
        if(this.x<0){
            return false;
        }
        return this.x -= 1
    }
    // coloquei incrementando 1, mas poderia ser uma constante com o valor de cada coin
    // a lógica da movimentação e recebimento das moedas ficariam a cargo da aplicação fora da class
    // o addCoin só é responsável por incrementar o valor da 'bolsa' de moedas
    addCoin(){
        return this.bolsa += 1
    }
}



try{
    teste = new Avatar(0, -2)
    console.log(Avatar)
    console.log(teste)
}catch(e){
    console.log(e)
}

