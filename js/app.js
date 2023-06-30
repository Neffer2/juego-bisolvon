let pulmones;
let buttonStart;
let buttonReset;
let respiracion = true; //true inhala, false exhala 
let virusMove = true;
let score = 0; 
let cronometro = 30;
let displayScore;
let displayCronometro;
let mContext;

let positions = Array(
    [130, 450],
    [160, 590],
    [190, 520],

    [220, 420],
    [250, 555],
    [280, 580],
    [310, 630],

    [340, 590],
    [370, 549],
    [400, 440],

    [430, 460],
    [460, 530],
    [310, 540],
    [420, 475]
);
let aux;

// Virus
let virus = [];

class MainScene extends Phaser.Scene {
    constructor(){
        super('gameScene');
    } 

    preload(){ 
        this.load.image('background', './assets/img/juegobisolvon-background.jpg');
        this.load.image('pulmones', './assets/img/pulmon.png'); 
        this.load.image('virus1', './assets/img/virus_1.png');
        this.load.image('virus2', './assets/img/virus_2.png');
        this.load.image('virus3', './assets/img/virus_3.png');
        this.load.image('virus4', './assets/img/virus_4.png');
        this.load.image('virus5', './assets/img/virus_5.png');
        this.load.image('virus6', './assets/img/virus_6.png');
        this.load.image('virus7', './assets/img/virus_7.png');
        this.load.image('hero', './assets/img/hero.png');
        this.load.image('productos', './assets/img/productos.png');
        this.load.image('header', './assets/img/header.png');
        this.load.image('marcador', './assets/img/marcador.png');
        this.load.image('cronometro', './assets/img/cronometro.png');
        this.load.image('logo', './assets/img/logo.png');
        this.load.image('play', './assets/img/play.png');
        this.load.image('reset', './assets/img/reset.png');
    }
 
    create(){
        let background = this.add.image(257, 500, 'background').setScale(.48, .5);
        this.getContext();
        pulmones = this.add.image(257, 500, 'pulmones').setScale(.38, .5);
        this.add.image(257, 125, 'header').setScale(.5);
        this.add.image(95, 285, 'marcador').setScale(.4);
        this.add.image(420, 285, 'cronometro').setScale(.4);
        buttonStart = this.add.sprite(460, 950, 'play').setScale(.4).setInteractive();
        buttonReset = this.add.sprite(460, 950, 'reset').setScale(.4).setInteractive();
        buttonReset.visible = false;
        displayScore = this.add.text(75, 280, score, { font: '32px Courier', fill: '#ff0000' });
        displayCronometro = this.add.text(382, 280, "0:"+cronometro, { font: '32px Courier', fill: '#ff0000' });

        // Start
        buttonStart.on('pointerdown', function (pointer){   
            buttonStart.setScale(.45) 
            mContext.generateVirus();
            mContext.startCronometro();
            buttonStart.destroy();                   
        });

        buttonStart.on('pointerover', function (pointer){   
            buttonStart.setScale(.45)         
        });

        buttonStart.on('pointerout', function (pointer){   
            buttonStart.setScale(.4)         
        });

        // Reset
        buttonReset.on('pointerdown', function (pointer){   
            location.reload();
        });

        buttonReset.on('pointerover', function (pointer){   
            buttonReset.setScale(.45)         
        });

        buttonReset.on('pointerout', function (pointer){   
            buttonReset.setScale(.4)         
        });

        this.add.image(257, 750, 'hero').setScale(.5);
        this.add.image(257, 940, 'productos').setScale(.5);        
    }    

    generateVirus(){
        // Destruye los elementos y vacía el arreglo
        virus.forEach((elem) => {
            elem[0].destroy();
        });
        virus = [];


        let cont = 1;
        let acum = 0;     
        while(cont < 8){
            if (cont == 1 || cont == 2 || cont == 3){
                virus.push([this.add.image(positions[this.getRandomInt(positions.length)][0], positions[this.getRandomInt(positions.length)][1], `virus${cont}`).setScale(.6), 1]);
            }else if (cont == 4 || cont == 5) {
                virus.push([this.add.image(positions[this.getRandomInt(positions.length)][0], positions[this.getRandomInt(positions.length)][1], `virus${cont}`).setScale(.6), 2]);
            }else {
                virus.push([this.add.image(positions[this.getRandomInt(positions.length)][0], positions[this.getRandomInt(positions.length)][1], `virus${cont}`).setScale(.6), 3]);
            }
            cont++;
        }
        
        virus.forEach((elem) => {
            elem[0].setInteractive();
            elem[0].on('pointerdown', function (pointer){   
                elem[0].setTexture('logo');
                mContext.addScore(elem[1]);
                elem[0].disableInteractive();
                

                setTimeout(function(){
                    mContext.deleteElem(elem[0]);
                }, 1500);

                acum++;
                if (acum == 7){
                    acum = 0;
                    mContext.generateVirus();
                } 
            });
        });
    }

    addScore(num){
        score += num;
        displayScore.setText(score);
    }

    startCronometro(){
        const interval = setInterval(() => {
            cronometro--;
            displayCronometro.setText("0:"+cronometro);        
            if (cronometro == 0){
                // Juego terminado
                buttonReset.visible = true;     
                fireworks.style.visibility='visible';
                clearInterval(interval);
                virus.forEach((elem) => {
                    elem[0].disableInteractive();
                });
            }
        }, 500);        
    }

    deleteElem(elem){
        elem.destroy();
    }

    getRandomInt(max) {
        if (aux != Math.floor(Math.random() * max)){
            aux = Math.floor(Math.random() * max)
        }else {
            this.getRandomInt(positions.length);
        }
        return aux;
    }

    getRandomDouble(max){
        return Math.random() * max;
    }

    getContext (){
        mContext = this;
    }

    update(){
        if (respiracion){
            pulmones.scale += .0013;
            respiracion = pulmones.scale >= .6 ? !respiracion : respiracion;
        }else if (!respiracion) {
            pulmones.scale -= .0013;
            respiracion = pulmones.scale <= .5 ? !respiracion : respiracion;            
        }        


        if (virusMove){
            // movimiento virus
            virus.forEach((elem) => {
                elem[0].y += .1
                elem[0].x += .1
                elem[0].angle += .5;

                virusMove = elem[0].angle >= 10 ? !virusMove : virusMove;            
            });
        }else if (!virusMove){
            virus.forEach((elem) => {
                elem[0].y -= .1
                elem[0].x -= .1
                elem[0].angle -= .5;

                virusMove = elem[0].angle <= -10 ? !virusMove : virusMove;   
            });
        }
    }
} 

// Configuracion general
const config = {
    // Phaser.AUTO, intenta usa WebGL y si el navegador no lo tiene, usa canva.
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 512,
    height: 1024,
    scene: [MainScene],
    scale: {
        mode: Phaser.Scale.FIT
    },
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            // gravity: { y: 350 }
        }
    }
}

// Inicializacion del objeto
game = new Phaser.Game(config)