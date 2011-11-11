





//load sprites

var saucerImage=Firmament.loadImage("images/ufo.gif");
var fireBallImage=Firmament.loadImage('images/fireball.jpeg');
var rocketImage=Firmament.loadImage("images/rocket.png");
var alienImage=Firmament.loadImage("images/alien.jpg");
var alienAnimation=Firmament.loadImage("images/alienAnimation.gif");
var ufoAnimation=Firmament.loadImage("images/ufoAnimation.gif");
var shrapnel=Firmament.loadImage("images/shrapnel.png");
//var explosionSound=fgame.loadSound("sounds/Explosion.wav");
//var music=fgame.loadMusic("music/test.mp3");
//music.play();
//test button
/*
var button=fgame.createUIElement({
    type:"button"
    ,name:"testButton"
    ,icon:{
        normal:fireBallImage
        ,active:saucerImage
    }
});


button.setScreenPosition({x:100,y:100});

var layout=fg.createUILayout({type:'hBox'});
layout.addUIElement(button);
//fgame.addUIElement(button);
fgame.setStyleSheetFile("/games/spaceInvaders.css");


var healthDisplay=fgame.createUIElement({
    type:"label"
    ,name:'healthDisplay'
    ,text:"Health: 100"
    ,style: fh.css({
        color:'red'
        ,background:'transparent'
        ,fontWeight:'bold'
        ,fontSize:'20px'
    })    
})

//fgame.addUIElement(healthDisplay);
layout.addUIElement(healthDisplay);
var killsDisplay=fgame.createUIElement({
    type:"label"
    ,name:'killsDisplay'
    ,text:"Aliens Killed: 0"
    ,positionX:200
    ,minWidth:200
    ,style: fh.css({
        color:'red'
        ,background:'transparent'
        ,fontWeight:'bold'
        ,fontSize:'20px'
    })    
})

*/

var killCount=0;
//layout.addUIElement(killsDisplay);
/*
var container=fg.createUIElement({
    type:'container'
    ,style:fh.css({
        background:'transparent'
        })
})

container.setUILayout(layout);
fg.addUIElement(container);
*/

FEntityRepo.addEntityType('fireBullet',{
    bullet:true
    ,maxLifeSeconds:5
    ,shapes:[{
        type:'circle'
        ,restitution:.8
        ,radius:.08
        ,density:1
    }]
    ,imageScale:1875  // (width of image)/(radius*2)
    ,init:function(){
    	//console.log(this)
        this.connect('collide',function(ent){
            if(ent.isEnemy==true){
                ent.health--;
                if(ent.health<1){
                    explode(ent);
                }
                this.deleteLater();
            }
            
            if(ent.isAlien==true){
                bleed(ent);
                killCount++;
                //killsDisplay.setText("Aliens Killed: "+killCount);
               
                this.deleteLater();
            }
          
        },this);
        
    }
	,image:fireBallImage
    ,renderer:'sprite'
});


function bleed(entity){
    for (var x=0;x<17;x++){
        var color=
        fgame.createEntity({
            //type:'static'
            positionY:entity.getPositionY()+Math.random()*.2-.1
            ,positionX:entity.getPositionX()+Math.random()*.2-.1
            ,maxLifeSeconds:2
            ,color:'#00'+(FHelper.dec2hex(150+Math.floor(Math.random()*105)))+'00'
            ,shapes:[{
                friction:5
                ,type:'circle'
                ,radius:.04
            }]
            ,init:function(){
                var angle=Math.random()*4;
                this.setVelocity({x:Math.cos(angle)*2,y:Math.sin(angle)*2});
            }
        })
        entity.deleteLater();
       
    }
}
function explode(entity){
    //explosionSound.play();
    if(entity.exploded)return;
    entity.exploded=true;
    var shipColors=['#56849c','#FFFFFF','#fafafa','#fbfcfc','#b4eefb','#bdd1db']
   
    for (var x=0;x<20;x++){
        fgame.createEntity({
            //type:'static'
            positionY:entity.getPositionY()+Math.random()*.2-.1
            ,positionX:entity.getPositionX()+Math.random()*.2-.1
            ,maxLifeSeconds:2
            ,color:shipColors[Math.floor(Math.random()*shipColors.length)]
        	,image:shrapnel
        	,imageWidth:15
            ,shapes:[{
                friction:5
                ,type:'circle'
                ,radius:.04
            }]
            ,init:function(){
                var angle=Math.random()*4;
                this.setVelocity({x:Math.cos(angle)*7,y:Math.sin(angle)*7});
            }
        });
    }
    
    console.log(JSON.stringify(entity.body.m_xf));
      //console.log(entity.getPositionY())
      fgame.createEntity({
            //type:'static'
            positionY:entity.getPositionY()+Math.random()*.2-.1
            ,positionX:entity.getPositionX()+Math.random()*.2-.1
            ,maxLifeSeconds:10
            ,renderer:'sprite'
            ,shapes:[{
                friction:5
                ,density:4
                ,type:'box'
                ,width:.2
                ,height:.3
            }]
            ,imageScale:FHelper.getImageScale({imageWidth:400,entityWidth:.3})
            ,image:alienImage
            ,init:function(){
                var angle=Math.random()*4;
               // this.setVelocity({x:Math.cos(angle)*3,y:Math.sin(angle)*3});
                //this.setCurrentImage(alienImage);
                //this.setCurrentAnimation(alienAnimation);
                this.isAlien=true;
            }
        });
      entity.deleteLater();
}

var bottom=fgame.createEntity({
    type:'static'
    ,positionY:20
    ,positionX:10
    ,shapes:[{
        friction:5
        ,type:'box'
        ,width:'90'
        //,height:1
    }]
	//,image:fireBallImage
    ,init:function(){
        this.connect('collide',function(ent){
            if(ent!=player&&ent!=bottom)ent.deleteLater();
            if(ent.type=='ship'){
                player.health--;
               // healthDisplay.setText("Health: "+player.health);
            }
        });
        //this.setCurrentImage(fireBallImage);
        
    }
})


var player = fgame.createEntity({
    positionX:9
    ,positionY:9
    ,imageScale:222
    ,angle:-1.57079633
    ,type:'static'
    ,shapes:[
        {
            type:'circle'
            ,radius:1
            ,density:.5
            
        }
             /*
             {
        type:'box'
        ,density:.4
        ,width:1
        ,height:1
    },  {
        type:'polygon'
        ,restitution:.5
        ,density:0
        ,vectors:[
            {x:0,y:1}
            ,{x:-.5,y:.5}
            ,{x:.5,y:.5}
        ]
    }*/]
	,image:rocketImage
    ,init:function(){
        //this.setCurrentImage(rocketImage);    
    }
   // ,renderer:'sprite'
});
console.log(player)
player.health=100;

function createAsteroid(){
    var radius=.4
    ent=fgame.createEntity({
           type:'statics'
            ,positionX:Math.random()*17
            ,positionY:-1
            ,maxLifeSeconds:10
            ,shapes:[{
                friction:0.1
                ,restitution:.2
                ,type:'circle'//((Math.floor(Math.random()*2)==1)?'box':'circle')
                ,radius:radius
                ,density:.5

            }]
            ,imageScale:'auto'
            ,renderer:'sprite'
            ,image:saucerImage
            ,imageWidth:256
            ,init:function(){
                //this.setCurrentImage(saucerImage);
               // this.setCurrentAnimation(ufoAnimation);
                this.isEnemy=true;
                this.health=1;
            }
        })
 ent.type="ship";
}

player.sinceShot=0;
player.sinceShot2=0;
player.sinceShotAmount=8;
player.sinceShot2Amount=8;



game.connect("beginStep",function(){
    if(player.sinceShot>0)player.sinceShot--;
   
    if(player.sinceShot2>0)player.sinceShot2--;
    
    if(input.isKeyPressed({key:0x2d})){
        
        camera.setZoom(camera.getZoom()-0.5);
    }
    
     if(input.isKeyPressed({key:0x2b})){
        
        camera.setZoom(camera.getZoom()+0.5);
    }
    
    if(input.isMousePressed("left")){
        if(player.sinceShot==0){
        	//Firmament.log("shooting");
            player.sinceShot=player.sinceShotAmount; // can shoot 10/60 times a second
            player.sinceShot2Amount=6;
            FHelper.shootBulletFromEntityToMouse(input,camera,world,player,FEntityRepo.getEntityType('fireBullet'));
        }
    }else{
        player.sinceShot2Amount=6
    }
    
    if (input.isKeyPressed({key:0x01000012}) ||input.isKeyPressed({key:0x41})){
        if(player.getPositionX() >0){
            player.setPosition(player.getPositionX()-.08,player.getPositionY());
        }
    }
    

    if (input.isKeyPressed({key:0x01000014})||input.isKeyPressed({key:0x44})){
        if(player.getPositionX() <17){
            player.setPosition(player.getPositionX()+.08,player.getPositionY());
        }
    }    

    if(input.isKeyPressed({key:0x20})){
        
        if(player.sinceShot2==0){
            player.sinceShot2=player.sinceShot2Amount; // can shoot 10/60 times a second
            FHelper.shootBulletFromEntity(player,FEntityRepo.getEntityType('fireBullet'));
            player.sinceShotAmount=12
        }
    } else {
            player.sinceShotAmount=6;
        }    
    if(Math.random()*40 <1){
        createAsteroid()
    }
});




