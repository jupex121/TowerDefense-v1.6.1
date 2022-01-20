//ENGLISH & SPANSIH VERSIONS
//v1.6

//variables para imágenes, sprites y grupos
var bg, bgHome, castle, castleImg, castle2Img, castle3Img, castleGroup;
var will, willWlk, willAtk, willGroup, power, powerImg, powerGroup;
var power2, power2Img, power2Group;
var skeleton, skeletonAtk, skeletonGroup;

var wall, wall2, wall3;
var health100Img, health83Img, health66Img, health50Img, health33Img, health16Img;
var start, startImg;
var dragon, dragonImg, dragonGroup;
var life;

var necro, necroImg, necroGroup;
var necFb, necFbImg, necFbGroup;


//temprizadores para poderes y vidas 
var timer1 = 30;
var timer2 = 0;
var timer3 = 3;
var timer4 = 0;
var timer5 = 5;
var lifeTimer = 100;


//contadores y estado de juego
var gameState = "home";
var game = "notInter";
var lives = 100;
var wave = 1;
var skeletonCount = 5;

var iniciowave = 1;
var necroLives = 100;


//precarga de imágenes y animaciones
function preload() {
    //fondo
    bg = loadImage("images/bg.png");
    bgHome = loadImage("images/bgHome.jpg");

    //castillo
    castleImg = loadImage("images/castle1.png");
    castle2Img = loadImage("images/castle2.png");
    castle3Img = loadImage("images/castle3.png");

    //Will y sus poderes
    willWlk = loadAnimation("images/willsonWlk.png", "images/willsonWlk2.png", "images/willsonWlk3.png", 
    "images/willsonWlk4.png", "images/willsonWlk5.png");
    
    willAtk = loadAnimation("images/willsonAtk.png", "images/willsonAtk2.png", "images/willsonAtk3.png", 
    "images/willsonAtk4.png", "images/willsonAtk5.png");

    powerImg = loadImage("images/power.png");

    power2Img = loadAnimation("images/p1.png", "images/p2.png", "images/p3.png", "images/p4.png", "images/p5.png", 
    "images/p6.png", "images/p7.png", "images/p8.png", "images/p9.png", "images/p10.png", "images/p11.png", 
    "images/p12.png", "images/p13.png");


    //enemigos
    skeletonAtk = loadAnimation("images/skeleton1.png", "images/skeleton2.png", "images/skeleton3.png",
    "images/skeleton4.png", "images/skeleton5.png", "images/skeleton6.png", "images/skeleton7.png", 
    "images/skeleton8.png", "images/skeleton9.png", "images/skeleton10.png", "images/skeleton11.png", 
    "images/skeleton12.png", "images/skeleton13.png");

    dragonImg = loadAnimation("images/dragon1.png", "images/dragon2.png", "images/dragon3.png", 
    "images/dragon4.png", "images/dragon5.png", "images/dragon6.png", "images/dragon7.png");

    necroImg = loadAnimation("images/nec1.png", "images/nec2.png", "images/nec3.png", "images/nec4.png",
    "images/nec5.png", "images/nec6.png", "images/nec7.png", "images/nec8.png");

    necFbImg = loadAnimation("images/fireball1.png", "images/fireball2.png", "images/fireball3.png",
    "images/fireball4.png", "images/fireball5.png");

    //vida y botones
    health100Img = loadImage("images/life100.png");
    health83Img = loadImage("images/life83.png");
    health66Img = loadImage("images/life66.png");
    health50Img = loadImage("images/life50.png");
    health33Img = loadImage("images/life33.png");
    health16Img = loadImage("images/life16.png");

    startImg = loadImage("images/startButton.png");

}

//disposición
function setup() {
    willGroup = new Group();
    castleGroup = new Group();

    //sprite castillo
    castle = createSprite(200, 350);
    castle.setCollider("circle", 0, 0, 700);
    castle.visible = false;
    castleGroup.add(castle);

    //sprite Will
    will = createSprite(600, 525);
    will.addAnimation("willCaminando", willWlk);
    will.addAnimation("willAtacando", willAtk);
    will.visible = false;
    willGroup.add(will);

    //paredes invisibles
    wall = createSprite(displayWidth / 2, 355, displayWidth, 1);
    wall.visible = false;
    wall2 = createSprite(displayWidth / 2, displayHeight +8, displayWidth, 20);
    wall2.visible = false;

    //barra de vida
    life = createSprite(displayWidth / 2 -200, displayHeight / 2 -300);
    life.visible = false;

    //botón de inicio
    /*start = createSprite(displayWidth / 2, displayHeight / 2 +200);
    start.addImage(startImg);
    start.scale = 0.5;
    start.debug = true;
    start.setCollider("rectangle", 0, 0, 400, 150);*/

    //grupos
    powerGroup = new Group();
    power2Group = new Group();
    skeletonGroup = new Group();
    dragonGroup = new Group();
    necroGroup = new Group();

    necFbGroup = new Group();
    
}

function draw() {
    //creación del lienzo
    createCanvas(displayWidth, displayHeight);

    //estado de juego "inicio"
    if(gameState == "home") {
        //fondo
        background(bgHome);

        //start.visible = true;

        //mensaje de bienvenida
        textSize(40);
        fill("black");
        stroke("white");
        strokeWeight(2.5);
        text("¡Bienvenido al mundo de Ataque a los Esqueletos!", displayWidth / 2 -450, displayHeight / 2);

        textSize(30);
        text("¡Presiona la tecla 'ENTER' para empezar!", displayWidth / 2 -290, displayHeight / 2 +100);

        textSize(20);
        text("P.D.: ¡Si quieres saber más sobre el funcionamiento del juego, presiona la letra 'T'!", 
        displayWidth / 2 -370, displayHeight / 2 +300);

        if(keyWentDown("ENTER")) {
            gameState = "fight";
        }

        if(keyWentDown("T")) {
            gameState = "tutorial";
        }

        //createSprite(displayWidth / 2, displayHeight / 2, 5, displayHeight);
    }

    if(gameState == "tutorial") {
        background(bgHome);

        textSize(50);
        fill("black");
        stroke("white");
        strokeWeight(2.5);
        text("TUTORIAL", displayWidth / 2 -125, displayHeight / 2 -300);

        textSize(20);
        text("➼ El funcionamiento es simple: tendrás que eliminar a todos los enemigos antes de que puedan trespasar el castillo.", 
        displayWidth / 2 -650, displayHeight / 2 -240);
        text("Si logran llegar a él, empezará a recibir daño. ¡Cuando llegue al 0% el juego habrá acabado!", 
        displayWidth / 2 -624, displayHeight / 2 -210);

        text("➼ Para contrarrestar a los enemigos, puedes usar 2 poderes pertenecientes a Will. El primero se activa con la barra espacidora.",
        displayWidth / 2 -650, displayHeight / 2 -160);
        text("El segundo (Shockwave) se activa presionando la tecla de la letra O. Sin embargo, este poder cuenta con un temporizador.",
        displayWidth / 2 -624, displayHeight / 2 -130);

        text("➼ Para mover a Will (tu personaje), usa las flechas de arriba y abajo.", displayWidth / 2 -650, 
        displayHeight / 2 -80);

        text("➼ En la esquina superior derecha podrás ver la cantidad de enemigos restantes para pasar a la siguiente Oleada (nivel).",
        displayWidth / 2 -650, displayHeight / 2 -30);

        text("➼ A partir de la sexta Oleada las cosas se pondrán mas difíciles, los enemigos aumentarán de vlocidad y aparecerán con más frecuencia.",
        displayWidth / 2 -650, displayHeight / 2 +20);
        text("Al llegar a la décima Oleada, tendrás que sobrevivir la mayor cantidad de tiempo y derrotar a los enemigos.",
        displayWidth / 2 -624, displayHeight / 2 +50);
        text("Una vez superada, habrás conseguido llegar a la batalla con el jefe final.", displayWidth / 2 -624, 
        displayHeight / 2 +80);

        textSize(35);
        text(". . . . . ╰──╮ Pero lo más importante... ¡Diviértete! ╭──╯ . . . . .", displayWidth / 2 -500, 
        displayHeight / 2 +300);

        textSize(20);
        text("¡Presiona la tecla 'ENTER' para comenzar a jugar!", displayWidth / 2 -225, displayHeight / 2 +350);

        if(keyWentDown("ENTER")) {
            gameState = "fight";
        }
        
        //createSprite(displayWidth / 2, displayHeight / 2, 5, displayHeight);
    }

    //estado de juego "jugar"
    if(gameState == "fight") {

        //fondo
        background(bg);

        //start.visible = false;
        will.visible = true;
        castle.visible = true;
        life.visible = true;


        //movimiento del personaje
        if(keyDown("UP_ARROW")) {
            will.y = will.y -10;
        }

        if(keyDown("DOWN_ARROW")) {
            will.y = will.y +10;
        }


        //generación de poderes
        if(keyWentDown("space") && timer2 >= 1) {
            power = createSprite(420, 405);
            power.addImage("poder", powerImg);
            power.scale = 0.3;
            power.visible = true;

            power.velocityX = +10;
            power.position.x = will.position.x +25;
            power.position.y = will.position.y;
            power.lifetime = 75;

            power.setCollider("rectangle", 0, 0, 50, 50);
            powerGroup.add(power);
            
            timer2 = 0;

            will.changeAnimation("willAtacando", willAtk);

        }
        else if(keyWentUp("space")){
            will.changeAnimation("willCaminando", willWlk);
        }

        if(keyWentDown("O") && timer1 <= 0) {
            power2 = createSprite(420, 405);
            power2.addAnimation("poder2", power2Img);
            power2.scale = 3;
            power2.visible = true;

            power2.position.x = mouseX;
            power2.position.y = mouseY;
            power2.lifetime = 50;
            power2Group.add(power2);

            power2.setCollider("circle", 0, -25, 90);

            if(wave <= 2) {
                timer1 = 30;
            }
            else if(wave >= 3 && wave <= 5) {
                timer1 = 25;
            }
            else if(wave >= 6 && wave <= 7) {
                timer1 = 20;
            }
            else if(wave >= 8 && wave <= 9) {
                timer1 = 15;
            }
            else if(wave == 10) {
                timer1 = 10;
            }
            else if(game == "Final_Boss") {
                timer1 = 5;
            }

            will.changeAnimation("willAtacando", willAtk);

        }
        else if(keyWentUp("O")){
            will.changeAnimation("willCaminando", willWlk);
        }


        //detección poder1
        if(skeletonGroup.isTouching(powerGroup)) {
            for(var i = 0; i < skeletonGroup.length; i++) {     
                if(skeletonGroup[i].isTouching(powerGroup)) {
                    skeletonGroup[i].destroy();
                    powerGroup.destroyEach();
                    skeletonCount = skeletonCount -1;

                } 
            }
        }

        if(necroGroup.isTouching(powerGroup)) {
            for(var i = 0; i < necroGroup.length; i++) {     
                if(necroGroup[i].isTouching(powerGroup)) {
                    powerGroup.destroyEach();
                    necroLives = necroLives -1;

                } 
            }
        }


        //detección poder2
        if(skeletonGroup.isTouching(power2Group)) {
            for(var i = 0; i < skeletonGroup.length; i++) {     
                if(skeletonGroup[i].isTouching(power2Group)) {
                    skeletonGroup[i].destroy();
                    skeletonCount = skeletonCount -1;

                } 
            }
        }

        if(dragonGroup.isTouching(power2Group)) {
            for(var i = 0; i < dragonGroup.length; i++) {     
                if(dragonGroup[i].isTouching(power2Group)) {
                    dragonGroup[i].destroy();
                    skeletonCount = skeletonCount -3;

                } 
            }
        }

        if(necroGroup.isTouching(power2Group)) {
            for(var i = 0; i < necroGroup.length; i++) {     
                if(necroGroup[i].isTouching(power2Group)) {
                    power2Group.destroyEach();
                    necroLives = necroLives -3;

                } 
            }
        }

        if(necFbGroup.isTouching(power2Group)) {
            for(var i = 0; i < necFbGroup.length; i++) {     
                if(necFbGroup[i].isTouching(power2Group)) {
                    necFbGroup[i].destroy();

                } 
            }
        }


        //detección entre fb y will y castillo y poder1
        if(necFbGroup.isTouching(willGroup)) {
            for(var i = 0; i < necFbGroup.length; i++) {     
                if(necFbGroup[i].isTouching(willGroup)) {
                    necFbGroup[i].destroy();
                    lives = lives -1;

                } 
            }
        }

        if(necFbGroup.isTouching(castleGroup)) {
            for(var i = 0; i < necFbGroup.length; i++) {     
                if(necFbGroup[i].isTouching(castleGroup)) {
                    necFbGroup[i].destroy();
                    lives = lives -10;

                } 
            }
        }

        if(necFbGroup.isTouching(powerGroup)) {
            for(var i = 0; i < necFbGroup.length; i++) {     
                if(necFbGroup[i].isTouching(powerGroup)) {
                    necFbGroup[i].destroy();
                    powerGroup.destroyEach();

                } 
            }
        }


        //detección de tacto entre los enemigos y el castillo
        if(skeletonGroup.isTouching(castle)) {
            for(var i = 0; i < skeletonGroup.length; i++){     
                if(skeletonGroup[i].isTouching(castle)){
                    skeletonGroup[i].velocityX = 0;

                    if(frameCount % 100 == 0) {
                        lifeTimer = lifeTimer -1;
                    }

                    lives = lifeTimer;
                }
            }
        }

        if(dragonGroup.isTouching(castle)) {
            for(var i = 0; i < dragonGroup.length; i++){     
                if(dragonGroup[i].isTouching(castle)){
                    dragonGroup[i].velocityX = 0;

                    if(frameCount % 100 == 0) {
                        lifeTimer = lifeTimer -5;
                    }

                    lives = lifeTimer;
                }
            }
        }

        //temporizador para poderes
        if(frameCount % 20 == 0 && timer1 != 0 && game != "inter" && game != "Final_BossInter") {
            timer1 = timer1 -1;
        }

        if(frameCount % 20 == 0 && game != "inter" && game != "Final_BossInter" && game != "Final_Boss") {
            timer2 = timer2 +1;
        }

        if(frameCount % 10 == 0 && game != "inter" && game != "Final_BossInter" && game == "Final_Boss") {
            timer2 = timer2 +1;
        }


        //condición de jefe final
        if(wave == 10 && skeletonCount <= 0) {
            game = "Final_BossInter";
        }
        
        //condiciones de oleadas
        if(skeletonCount <= 0 && wave <= 10 && game != "Final_BossInter") {
            game = "inter";
            wave = wave +1;
            iniciowave = 1;
        }

        if(game == "inter") {
            if(frameCount % 60 == 0) {
                timer3 = timer3 -1;
            }
            
            skeletonGroup.destroyEach();
            dragonGroup.destroyEach();
            powerGroup.destroyEach();
            power2Group.destroyEach();

            textSize(20);
            fill("black");
            stroke("white");
            strokeWeight(2.5);
            text("¡Has avanzado de Oleada!, siguiente Oleada en: " + timer3, displayWidth / 2 -100, displayHeight / 2);

            if(timer3 <= 0) {
                game = "notInter";
                timer3 = 3;
            }
            
        }

        if(wave == 2 && iniciowave == 1) {
            skeletonCount = 10;
            iniciowave = 0;
        }

        if(wave == 3 && iniciowave == 1) {
            skeletonCount = 15;
            iniciowave = 0;
        }

        if(wave == 4 && iniciowave == 1) {
            skeletonCount = 20;
            iniciowave = 0;
        }

        if(wave == 5 && iniciowave == 1) {
            skeletonCount = 25;
            iniciowave = 0;
        }

        if(wave == 6 && iniciowave == 1) {
            skeletonCount = 30;
            iniciowave = 0;
        }

        if(wave == 7 && iniciowave == 1) {
            skeletonCount = 35;
            iniciowave = 0;
        }

        if(wave == 8 && iniciowave == 1) {
            skeletonCount = 40;
            iniciowave = 0;
        }

        if(wave == 9 && iniciowave == 1) {
            skeletonCount = 45;
            iniciowave = 0;
        }

        if(wave == 10 && iniciowave == 1) {
            skeletonCount = 50;
            iniciowave = 0;
        }

        if(game == "Final_BossInter") {
            if(timer5 <= 5 && timer5 > 0) {
                if(frameCount % 60 == 0) {
                    timer5 = timer5 -1;
                }
                
                skeletonGroup.destroyEach();
                dragonGroup.destroyEach();
                powerGroup.destroyEach();
                power2Group.destroyEach();

                textSize(30);
                fill("black");
                stroke("white");
                strokeWeight(2.5);
                text("¡Has llegado a la etapa del Jefe Final!, empezará en: " + timer5, displayWidth / 2 -150, 
                displayHeight / 2 -200);
            }
            else {
                game = "Final_Boss";
            }

        }

        if(game == "Final_Boss") {

            if(timer4 <= 5) {
                if(frameCount % 1 == 0) {
                    timer4 = timer4 +1;
                }
            }

            textSize(20);
            fill("black");
            stroke("white");
            strokeWeight(2.5);
            text("Vida Restante del Jefe Final: " + necroLives, displayWidth / 2 +350, displayHeight / 2 -350);

            if(necroLives <= 0) {
                gameState = "won";
            }

            lvl11();
        }


        //cambio de imagen para barra de vida
        if(lives <= 100 && lives > 83) {
            life.addImage(health100Img);
            castle.addImage(castleImg);
            castle.scale = 0.5;
        }

        if(lives <= 83 && lives > 66) {
            life.addImage(health83Img);
        }

        if(lives <= 66 && lives > 50) {
            life.addImage(health66Img);
        }

        if(lives <= 50 && lives > 33) {
            life.addImage(health50Img);
            castle.addImage(castle2Img);
            castle.scale = 0.5;
            castle.y = 400;
        }

        if(lives <= 33 && lives > 16) {
            life.addImage(health33Img);
            castle.y = 400;
        }

        if(lives <= 16 && lives > 0) {
            life.addImage(health16Img);
            castle.addImage(castle3Img);
            castle.scale = 0.5;
            castle.y = 500;
        }


        //colisión entre Will y las paredes invisibles
        will.collide(wall);
        will.collide(wall2);

        //porcentaje de vida restante
        textSize(20);
        fill("black");
        stroke("white");
        strokeWeight(0.25);
        text(lives + "%", life.x -20, life.y -20);

        //tiempo restante para shockwave
        if(timer1 > 1) {
            text("Tiempo restante para usar 'Shockwave' (Letra O): " + timer1 + " segundos", displayWidth / 2 +90, 
            displayHeight / 2 +375);
        }
        else if(timer1 == 1) {
            text("Tiempo restante para usar 'Shockwave' (Letra O): " + timer1 + " segundo", displayWidth / 2 +90, 
            displayHeight / 2 +375);
        }
        else if(timer1 == 0) {
            text("Tiempo restante para usar 'Shockwave' (Letra O): " + timer1 + " segundos", displayWidth / 2 +90, 
            displayHeight / 2 +375);
        }

        if(game != "Final_BossInter" && game != "Final_Boss") {
            //oleadas
            strokeWeight(2.5);
            text("Oleada: " + wave, displayWidth / 2 +550, displayHeight / 2 -350);

            //cantidad de enemigos restantes
            textSize(17.5);
            if(wave == 1 && game != "inter") {
                text("Enemigos Restantes: " + skeletonCount + "/5", displayWidth / 2 +440, displayHeight / 2 -320);
                lvl1();
            }

            if(wave == 2 && game != "inter") {
                text("Enemigos Restantes: " + skeletonCount + "/10", displayWidth / 2 +440, displayHeight / 2 -320);
                lvl2();
            }

            if(wave == 3 && game != "inter") {
                text("Enemigos Restantes: " + skeletonCount + "/15", displayWidth / 2 +440, displayHeight / 2 -320);
                lvl3();
            }

            if(wave == 4 && game != "inter") {
                text("Enemigos Restantes: " + skeletonCount + "/20", displayWidth / 2 +440, displayHeight / 2 -320);
                lvl4();
            }

            if(wave == 5 && game != "inter") {
                text("Enemigos Restantes: " + skeletonCount + "/25", displayWidth / 2 +440, displayHeight / 2 -320);
                lvl5();
            }

            if(wave == 6 && game != "inter") {
                text("Enemigos Restantes: " + skeletonCount + "/30", displayWidth / 2 +440, displayHeight / 2 -320);
                lvl6();
            }

            if(wave == 7 && game != "inter") {
                text("Enemigos Restantes: " + skeletonCount + "/35", displayWidth / 2 +440, displayHeight / 2 -320);
                lvl7();
            }

            if(wave == 8 && game != "inter") {
                text("Enemigos Restantes: " + skeletonCount + "/40", displayWidth / 2 +440, displayHeight / 2 -320);
                lvl8();
            }

            if(wave == 9 && game != "inter") {
                text("Enemigos Restantes: " + skeletonCount + "/45", displayWidth / 2 +440, displayHeight / 2 -320);
                lvl9();
            }

            if(wave == 10 && game != "inter") {
                text("Enemigos Restantes: " + skeletonCount + "/50", displayWidth / 2 +440, displayHeight / 2 -320);
                lvl10();
            }

        }
        

        //condición de derrota
        if(lives <= 0) {
            gameState = "gameOver";
        }
    }

    //estado de juego "victoria"
    if(gameState == "won") {
        will.visible = false;
        life.visible = false;
        castle.visible = false;

        skeletonGroup.destroyEach();
        dragonGroup.destroyEach();
        powerGroup.destroyEach();
        power2Group.destroyEach();
        necro.destroyEach();
        necFb.destroyEach();

        background(bgHome);

        textSize(50);
        fill("red");
        stroke("black");
        strokeWeight(2.5);
        text("¡Ganaste!", displayWidth / 2 -120, displayHeight / 2);

        textSize(20);
        fill("white");
        stroke("red");
        text("Presiona la letra 'R' para reiniciar el juego", displayWidth / 2 -200, displayHeight / 2 +80);

        restart();
    }

    //estado de juego "derrota"
    if(gameState == "gameOver") {
        will.visible = false;
        life.visible = false;
        castle.visible = false;

        skeletonGroup.destroyEach();
        dragonGroup.destroyEach();
        powerGroup.destroyEach();
        power2Group.destroyEach();
        necroGroup.destroyEach();
        necFbGroup.destroyEach();

        background(bgHome);

        textSize(50);
        fill("red");
        stroke("black");
        strokeWeight(2.5);
        text("¡Perdiste!", displayWidth / 2 -120, displayHeight / 2);

        if(game != "Final_Boss") {
            textSize(25);
            fill("black");
            stroke("white");
            text("Oleada: " + wave, displayWidth / 2 -65, displayHeight / 2 +50);
        }
        else {
            textSize(25);
            fill("black");
            stroke("white");
            text("Oleada: " + game, displayWidth / 2 -65, displayHeight / 2 +50);
        }

        textSize(20);
        fill("white");
        stroke("red");
        text("Presiona la letra 'R' para reiniciar el juego", displayWidth / 2 -200, displayHeight / 2 +80);

        restart();

    }

    drawSprites();
}


//generación de enemigos
function lvl1() {
    if(frameCount % 100 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }
}

function lvl2() {
    if(frameCount % 90 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }
}

function lvl3() {
    if(frameCount % 80 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }
}

function lvl4() {
    if(frameCount % 70 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }
}

function lvl5() {
    if(frameCount % 60 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }
}

function lvl6() {
    if(frameCount % 50 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }

    if(frameCount % 200 == 0) {
        dragon = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
        dragon.addAnimation("dragón", dragonImg);
        dragon.scale = 1.8;

        dragon.velocityX = -2.5;
        dragon.setCollider("circle", 0, 0, 30);
        dragonGroup.add(dragon);
    }
}

function lvl7() {
    if(frameCount % 40 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }

    if(frameCount % 180 == 0) {
        dragon = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
        dragon.addAnimation("dragón", dragonImg);
        dragon.scale = 1.8;

        dragon.velocityX = -2.5;
        dragon.setCollider("circle", 0, 0, 30);
        dragonGroup.add(dragon);
    }
}

function lvl8() {
    if(frameCount % 30 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }

    if(frameCount % 160 == 0) {
        dragon = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
        dragon.addAnimation("dragón", dragonImg);
        dragon.scale = 1.8;

        dragon.velocityX = -2.5;
        dragon.setCollider("circle", 0, 0, 30);
        dragonGroup.add(dragon);
    }
}

function lvl9() {
    if(frameCount % 30 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }

    if(frameCount % 140 == 0) {
        dragon = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
        dragon.addAnimation("dragón", dragonImg);
        dragon.scale = 1.8;

        dragon.velocityX = -2.5;
        dragon.setCollider("circle", 0, 0, 30);
        dragonGroup.add(dragon);
    }
}

function lvl10() {
    if(frameCount % 20 == 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;

        skeleton.velocityX = -5;
        skeleton.setCollider("circle", 0, -5, 30);
        skeletonGroup.add(skeleton);
    }

    if(frameCount % 120 == 0) {
        dragon = createSprite(displayWidth +10, random(displayHeight / 2 -200, displayHeight / 2 -300));
        dragon.addAnimation("dragón", dragonImg);
        dragon.scale = 1.8;

        dragon.velocityX = -2.5;
        dragon.setCollider("circle", 0, 0, 30);
        dragonGroup.add(dragon);
    }
}

function lvl11() {
    if(timer4 == 1) {
        necro = createSprite(displayWidth -50, random(displayHeight / 2 +50, displayHeight / 2 +225));
        necro.addAnimation("finalBoss", necroImg);
        necro.scale = 1.8;

        necro.velocityX = random(-0.1, -0.5);
        necro.velocityY = random(-0.1, 0.1);
        necro.setCollider("circle", 10, -5, 25);
        necroGroup.add(necro);

        necro.bounceOff(wall);
        necro.bounceOff(wall2);
        
    }

    if(frameCount % 100 == 0) {
        necFb = createSprite(displayWidth -50, random(displayHeight / 2 +50, displayHeight / 2 +225));
        necFb.addAnimation("fireball", necFbImg);
        necFb.scale = 1;
        necFb.velocityX = -15;

        necFb.position.x = necro.position.x;
        necFb.setCollider("rectangle", -10, 0, 50, 50);
        necFbGroup.add(necFb);

    }
}


//reinicio de juego
function restart() {
    if(keyWentDown("R")) {
        wave = 1;
        timer1 = 30;
        lives = 100;
        lifeTimer = 100;

        necroLives = 100;
        timer4 = 0;
        timer5 = 5;
        skeletonCount = 5;

        gameState = "home";
        game = "notInter";
    }
}
