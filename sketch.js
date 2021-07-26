var Background1, BackgroundImage;
var car, Jake, zombie1, Jake_Image, zombieImage;
var edge, rock_image, rock, attack_animation, Jake_Attack;
var jake_jumpImage, ground, zombies, shurikens,rocks,broken_rock,broken_rockImage;
var shuriken, shurikenImage;
var life, life_image;
var deadZombieImage, deadzom;
var shurikenAmmo=20;
var isTouching = false
life = 3 
var x = 0;
var lifeDeducted = false;
function preload() {
    BackgroundImage = loadImage("level_One.gif.2.gif")
    Jake_Image = loadAnimation("ninja/Run_000.png", "ninja/Run_001.png", "ninja/Run_002.png", "ninja/Run_003.png", "ninja/Run_004.png", "ninja/Run_005.png", "ninja/Run_006.png", "ninja/Run_007.png", "ninja/Run_008.png", "ninja/Run_009.png")
    zombieImage = loadAnimation("zombie/Walk (1).png", "zombie/Walk (2).png", "zombie/Walk (3).png",
        "zombie/Walk (4).png", "zombie/Walk (5).png", "zombie/Walk (6).png", "zombie/Walk (7).png",
        "zombie/Walk (8).png")
    shurikenImage = loadImage("shuriken1.png")
    rock_image = loadImage("rock.png")
    jake_jumpImage = loadAnimation("ninja/Jump_000.png", "ninja/Jump_000.png", "ninja/Jump_001.png", "ninja/Jump_001.png", "ninja/Jump_002.png", "ninja/Jump_003.png", "ninja/Jump_004.png", "ninja/Jump_005.png", "ninja/Jump_006.png", "ninja/Jump_006.png", "ninja/Jump_007.png", "ninja/Jump_007.png", "ninja/Jump_008.png")
    attack_animation = loadAnimation("ninja/Throw__000.png", "ninja/Throw__000.png", "ninja/Throw__001.png", "ninja/Throw__003.png", "ninja/Throw__003.png", "ninja/Throw__004.png", "ninja/Throw__005.png", "ninja/Throw__006.png", "ninja/Throw__007.png", "ninja/Throw__007.png", "ninja/Throw__008.png", "ninja/Throw__009.png", "ninja/Throw__009.png")
    life_image = loadImage("heart1.png")
    deadZombieImage = loadAnimation("zombie/Dead1.png", "zombie/dead2.png", "zombie/dead3.png", "zombie/dead4.png", "zombie/dead5.png", "zombie/dead6.png", "zombie/dead6.png", "zombie/dead7.png", "zombie/dead7.png", "zombie/dead8.png", "zombie/dead8.png", "zombie/dead8.png", "zombie/dead8.png", "zombie/dead8.png", "zombie/dead8.png", "zombie/dead8.png", "zombie/dead8.png", "zombie/dead8.png", "zombie/dead8.png", "zombie/dead8.png", "zombie/dead8.png", "zombie/dead8.png", "zombie/dead8.png", "zombie/dead8.png", "zombie/dead8.png")
      broken_rockImage=loadImage("broken.png")
      broken_rockImage.scale=0.5
    }


function setup() {
    createCanvas(1000, 455)
    Background1 = createSprite(0, 225, 1000, 680)
    Background1.x = Background1.width / 2
    //Background1.width = 1200;
    //Background1.height = 600;
    //edge=createEdgeSprites();
    ground = createSprite(500, 454, 1000, 1)
    Background1.addImage(BackgroundImage)
    Jake = createSprite(400, 400, 10, 40)
    Jake.addAnimation("Jake_Image", Jake_Image)
    Jake.addAnimation("jake_jumpImage", jake_jumpImage)
    Jake.addAnimation("attack_animation", attack_animation)
    Jake.scale = 0.28;
    zombies = createGroup()
    shurikens = createGroup();
    rocks=createGroup();
    
}

function draw() {
    background(0)
    Background1.velocityX = -2
    if (Background1.x < 0) {
        Background1.x = Background1.width / 2

    }
    

    if (Jake.velocityY === 0 || Jake.velocityY === 0.4) {
        Jake.changeAnimation("Jake_Image", Jake_Image)
        Jake.velocityX = 0
    }
    for (var i = 0; i < shurikens.length; i++) {

        for (var j = 0; j < zombies.length; j++) {
            if (shurikens[i] !== undefined && zombies[j] !== undefined) {

                if (shurikens[i].isTouching(zombies[j]) && shurikens[i].x < width) {

                    shurikens[i].destroy();
                    i--
                    zombies[j].changeAnimation("deadZombieImage", deadZombieImage)
                 zombies[j].lifetime = 60;
                //  setTimeout(function(){
                //      zombies[j].destroy()
                //  },2000);
                    j--
                }
            }
        }

    }
for (var s = 0; s < shurikens.length; s++) {

        for (var r = 0; r < rocks.length; r++) {
            if (shurikens[s] !== undefined && rocks[r] !== undefined) {

                if (shurikens[s].isTouching(rocks[r]) && shurikens[s].x < width) {

                    shurikens[s].destroy();
                    s--
                    rocks[r].addImage(broken_rockImage)
                 rocks[r].lifetime = 10;
            
                //  setTimeout(function(){
                //      zombies[j].destroy()
                //  },2000);
                    j--
                }
            }
        }

    }
    if (ground.x < 0) {
        ground.x = ground.x.width / 2
    }
    ground.visible = false
    if (keyDown(RIGHT_ARROW)) {
        Jake.x = Jake.x + 10

    }
    else if (keyDown(LEFT_ARROW)) {
        Jake.x = Jake
            .x - 10

    }

    else if (keyDown(DOWN_ARROW)) {
        Jake.y = Jake.y + 20

    }

    else if (keyDown("space") & Jake.y > 360) {
        Jake.velocityY = -9
        Jake.changeAnimation("jake_jumpImage", jake_jumpImage)
        Jake.velocityX = 1
    }
    else if (keyWentDown("g")) {
        Attack();

    }





    Jake.velocityY = Jake.velocityY + 0.4
    Jake.collide(ground)


    spawnZombie();
    spawnRock();
    // if (zombies.isTouching(Jake)) {

    //     if (life > 0 && isTouching === false)  {
    //         isTouching = true;
    //         life--

    //     }
    // }

    if (zombies.isTouching(Jake) || rocks.isTouching(Jake)) {
        if (life > 0 && lifeDeducted === false ) {
            life--
            lifeDeducted = true;
            Jake.velocityX = 0;
            Background1.velocityX = 0;
            zombies.setVelocityXEach(0);
            rocks.setVelocityXEach(0);
            gameOver();
        }
    }
    drawSprites();
    textSize(20)
    fill("white")

    text("Shurikens:"+shurikenAmmo,500,200)

    for (var h = 1; h <= life; h++) {
        x = 50 * h;
        image(life_image, x, 50, 40, 40)


    }
}


function spawnZombie() {

    if (frameCount % 50 === 0) {
        zombie1 = createSprite(Jake.x + 1000, 400, 40, 40)
        zombie1.velocityX = -4
        zombie1.collide(ground)
        zombie1.addAnimation("ZOMBIE", zombieImage)
        zombie1.addAnimation("deadZombieImage", deadZombieImage)

        deadZombieImage.scale = 1.2
 
        zombie1.setCollider("circle", 0, 0, 24)
        zombie1.scale = 0.25;
        zombies.add(zombie1)
    }



}
function spawnRock() {
    if (frameCount % 100 === 0) {
        rock = createSprite(Jake.x + 900, 425, 40, 40)
        rock.velocityX = -5
        rock.addImage(rock_image)
        rock.scale = 0.45
        rock.collide(ground)
        
        rock.setCollider("circle", 0, 0, 44)
        rock.scale = 0.65;
        rocks.add(rock)
       
        
    }
}

function Attack() {
if(shurikenAmmo>0){
    Jake.velocityX = 0;
    shuriken = createSprite(Jake.x, Jake.y, 10, 10)
    shuriken.velocityX = 2;

    shuriken.addImage(shurikenImage)

    shuriken.scale = 0.10
    Jake.changeAnimation("attack_animation", attack_animation)
    shurikenAmmo--
    shurikens.add(shuriken)
}
}



function gameOver() {

    console.log(life)
    if(life>0 && Jake.isTouching(rocks)){
        titleText = "Oh No a rock hit you";
        mainText = "This is your dead sensei speaking!You are a ninja, how did you get killed by a rock you fool! I'm going to send you back, and you better not die to some rock!!!!  ";
        confirmText = "Continue Playing"
    }
    else if (life > 0) {
        titleText = "Oh Oh! Zombie got you!";
        mainText = "This is your sensei speaking, let me give  you some some advice, don't eat your vegetables. Ha just kidding, don't eat a bean chili mix before bedtime.";
        confirmText = "Continue Playing"
    }
   
    else {
        titleText = "Game Over";
        mainText = "Thanks for playing also this is your dead sensei speaking, I don't know you";
        confirmText = "Play Again at your own risk"
    }
    swal(
        {
            title: titleText,
            text: mainText,
            imageUrl:
                "heart1.png",
            imageSize: "150x150",
            confirmButtonText: confirmText
        },
        function (isConfirm) {
            if (isConfirm && life === 0) {
                location.reload();
            }
            else if (isConfirm) {

                Jake.x = 400;
                lifeDeducted = false;
                Background1.velocityX = -2;
               rocks.destroyEach();
               zombies.destroyEach();
                Jake.velocityX = 1
            }
        }
    );
}





