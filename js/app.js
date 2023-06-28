let pulmones;
let respiracion = true; //true inhala, false exhala 

// Virus
let virus_1_1;
let virus_1_2;
let virus_1_3;
let virus_2_1;
let virus_2_2;
let virus_3_1;
let virus_3_2;

class MainScene extends Phaser.Scene {
    constructor(){
        super('gameScene');
    } 

    preload(){ 
        this.load.image('background', './assets/img/juegobisolvon-background.jpg');
        this.load.image('pulmones', './assets/img/pulmon.png'); 
        this.load.image('virus_1_1', './assets/img/virus_1-1.png');
        this.load.image('virus_1_2', './assets/img/virus_1-2.png');
        this.load.image('virus_1_3', './assets/img/virus_1-3.png');
        this.load.image('virus_2_1', './assets/img/virus_2-1.png');
        this.load.image('virus_2_2', './assets/img/virus_2-2.png');
        this.load.image('virus_3_1', './assets/img/virus_3-1.png');
        this.load.image('virus_3_2', './assets/img/virus_3-2.png');
        this.load.image('hero', './assets/img/hero.png');
        this.load.image('productos', './assets/img/productos.png');
        this.load.image('header', './assets/img/header.png');
        this.load.image('marcador', './assets/img/marcador.png');
    }
 
    create(){
        let background = this.add.image(257, 500, 'background').setScale(.48, .5);
        pulmones = this.add.image(257, 500, 'pulmones').setScale(.38, .5);
        this.add.image(257, 125, 'header').setScale(.5);
        this.add.image(95, 285, 'marcador').setScale(.4);
        
        // Virus left
        virus_1_1 = this.add.image(150, 450, 'virus_1_1').setScale(.6);
        virus_2_1 = this.add.image(90, 590, 'virus_2_1').setScale(.6);
        virus_3_1 = this.add.image(200, 580, 'virus_3_1').setScale(.6);

        // Virus right
        virus_1_2 = this.add.image(310, 420, 'virus_1_2').setScale(.6);
        virus_2_2 = this.add.image(420, 530, 'virus_2_2').setScale(.6);
        virus_3_2 = this.add.image(310, 580, 'virus_3_2').setScale(.6);
        virus_1_3 = this.add.image(420, 630, 'virus_1_3').setScale(.6);

        virus_1_1.setInteractive()

        
        let cont = 1;
        while(cont < 7){
            virus_1_1
        }
        virus_1_1.on('pointerdown', function (pointer)
        {   
            virus_1_1.setTexture('hero');
        });

        this.add.image(257, 750, 'hero').setScale(.5);
        this.add.image(257, 940, 'productos').setScale(.5);
    }
    
    update(){
        if (respiracion){
            pulmones.scale += .0028;
            respiracion = pulmones.scale >= .6 ? !respiracion : respiracion;
        }else if (!respiracion) {
            pulmones.scale -= .0028;
            respiracion = pulmones.scale <= .5 ? !respiracion : respiracion;            
        }

        console.log(pulmones.scale);
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