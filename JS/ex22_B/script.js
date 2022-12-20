class Avatar{
    constructor(x, y){
        const coin = 0;
        const life = 10;
        const damage = 1;
        if(y<0 || x<0){
            throw new Error(`O valor de x ou y não pode ser menor igual a 0`);   
        }
        this.vida = life;
        this.dano = damage;
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
    get getVida(){
        return this.vida
    }
    get attack(){
        return this.dano
    }

    // como não havia limite máximo de movimentação, acabei não colocando a condição que limitaria o valor máximo de x ou y
    foward(){
        // if(y==='valor máximo de y'){
        //     return false;
        // }
        if(this.block()){
            console.log('ação bloqueada')
            return;
        }
        return this.y += 1
    }

    back(){
        if(this.y===0){
            return;
        }else if(this.block()){
            console.log('ação bloqueada')
            return;
        }
        return this.y -= 1 
    }

    right(){
        // if(x==='valor máximo de x'){
        //     return false;
        // }
        if(this.block()){
            console.log('ação bloqueada')
            return;
        }
        return this.x += 1
    }

    left(){
        if(this.x===0){
            return;
        }else if(this.block()){
            console.log('ação bloqueada')
            return;
        }
        return this.x -= 1
    }
    // coloquei incrementando 1, mas poderia ser uma constante com o valor de cada coin
    // a lógica da movimentação e recebimento das moedas ficariam a cargo da aplicação fora da class
    // o addCoin só é responsável por incrementar o valor da 'bolsa' de moedas
    addCoin(){
        if(this.block()){
            console.log('ação bloqueada')
            return;
        }
        return this.bolsa += 1
    }

    danoRecebido(dano_recebido){
        return this.vida -= dano_recebido
    }

    block(){
        if(this.vida<=0){
            console.log('avatar morto')
            return true;
        }else{
            console.log('avatar continua vivo')
            return false;
        }
    }
}


class Cowboy extends Avatar{
    constructor(x,y){
        const municao = 10;
        const dano = 2;

        super(x,y)
        this.municao = municao
        this.dano = dano
    }

    attack(){
        if(this.block()){
            console.log('block')
            return;
        }else if(this.municao===0){
            return;
        }
        this.municao-=1
        return this.dano
    }

    add_municao(valor){
        if(this.block()){
            console.log('block')
            return;
        }
        return this.municao+=valor
    }
}

class Mago extends Avatar{
    constructor(x,y){
        const feitico = 10;
        const dano = 3;

        super(x,y)
        this.feitico = feitico
        this.dano = dano
    }

    attack(){
        if(this.block()){
            console.log('block')
            return;
        }else if(this.feitico===0){
            this.add_feitico()
            return;
        }
        this.feitico-=1
        return this.dano
    }

    add_feitico(){
        setTimeout(()=>{
            this.feitico=10
        }, 10000)
    }
}


// teste = new Mago(0,0)

// for(i=0;i<9;i++){
//     teste.danoRecebido(1)
//     console.log(teste.getVida)
// }
// teste.foward()
// teste.attack()
