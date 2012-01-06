

var baseState={
        
        afterRender:function(painter){
            //render image first
            var camera=fgame.getMainCamera();
            
            
               
           // this.positionLabel.setText(Math.round(camera.getPositionX())+","+Math.round(camera.getPositionY()));
            if (fgame.isKeyPressed({key:0x01000014})||fgame.isKeyPressed({key:0x57})){
                camera.setPosition({x:camera.getPositionX(),y:camera.getPositionY()-.1})
            }
            if (fgame.isKeyPressed({key:0x53})){
                camera.setPosition({x:camera.getPositionX(),y:camera.getPositionY()+.1})
            }
                    
            if (fgame.isKeyPressed({key:0x41})){
                camera.setPosition({x:camera.getPositionX()-.1,y:camera.getPositionY()})
            }
                    
            if (fgame.isKeyPressed({key:0x44})){
                        camera.setPosition({x:camera.getPositionX()+.1,y:camera.getPositionY()})
            }                    
            
            
            
            
            if(this.image){
                painter.drawImage({
                    x:(0-camera.getCalculatedLeft())*camera.getZoom()-this.image.getWidth()/2
                    ,y:(0-camera.getCalculatedTop())*camera.getZoom()-this.image.getHeight()/2
                    ,image:this.image
                    });
            }
            painter.drawLine({
                start:{x:100,y:20},end:{x:2000,y:20}
                });
            painter.drawLine({
                start:{x:100,y:20},end:{x:100,y:1500}
                });
            
           drawGrid(painter,camera);
            
            for (var y=0;y<this.shapes.length;y++){
                for(var x=0;x<this.shapes[y].vectors.length;x++){
                    if(y==this.currentShapeIndex){
                        painter.setPenColor("blue");
                    }
                    var vec1=this.shapes[y].vectors[x];
                    var vec2=this.shapes[y].vectors[x+1];
                    if(vec1 && vec2){
                        painter.drawLine({start:{x:(vec1.x-camera.getCalculatedLeft())*camera.getZoom(),y:(vec1.y-camera.getCalculatedTop())*camera.getZoom()}
                                         ,end:{x:(vec2.x-camera.getCalculatedLeft())*camera.getZoom(),y:(vec2.y-camera.getCalculatedTop())*camera.getZoom()}});
                    }
                    if(y==this.currentShapeIndex){
                        painter.setPenColor("white");
                    }
                }
                if(this.shapes[y].vectors.length>2){
                    //print(fh.debug({start:this.shapes[this.currentShapeIndex].vectors[0],end:this.shapes[this.currentShapeIndex].vectors[this.shapes[this.currentShapeIndex].vectors.length-1]}))
                    painter.setPenColor("gray");
                    painter.setPenStyle("dot");
                    painter.drawLine({start:{x:(this.shapes[y].vectors[0].x-camera.getCalculatedLeft())*camera.getZoom()
                                        ,y:(this.shapes[y].vectors[0].y-camera.getCalculatedTop())*camera.getZoom()}
                                     ,end:{x:(this.shapes[y].vectors[this.shapes[y].vectors.length-1].x-camera.getCalculatedLeft())*camera.getZoom()
                                     ,y:(this.shapes[y].vectors[this.shapes[y].vectors.length-1].y-camera.getCalculatedTop())*camera.getZoom()}})
                    painter.setPenColor("white");
                    painter.setPenStyle("solid");
                }
            }
        }
        
        ,beginStep:function(){}
    }


var ShapeEditor=FHelper.extend({},new FStateMachine({
    editPoly:FHelper.extend({},baseState,{
        
        initState:function(){
            this.modeLabel.setText("Mode: edit");
        }
        ,shapeSelected:false
        ,vectorSelected:null
        ,beginStep:function(){
            var state=this.getState();
            if(fgame.isMousePressed("left")){
                if(fg.getMouseX()<100)return;
                if(fg.getMouseY()<20)return;
                if(!this.getState().shapeSelected)
                    if(this.selectShape()===null)return;
                state.shapeSelected=true;
                var index;
                if(state.vectorSelected===null){
                    if((index=this.selectVector(.2))===null)return;
                    state.vectorSelected=index;
                    
                }
                this.shapes[this.currentShapeIndex].vectors[state.vectorSelected]={x:FHelper.getMouseWorldX(),y:FHelper.getMouseWorldY()};
                
                
            } else {
                state.shapeSelected=false;
                state.vectorSelected=null;
            }
        }
        
      
    
    })
    ,drawPoly:FHelper.extend({},baseState,{
                    
                    plotCount:0
                    ,initState:function(){
                        this.modeLabel.setText("Mode: Draw");
                    }
                    ,beginStep:function(){
                        if(fgame.isMousePressed("left")){
                            var camera=fgame.getMainCamera();
                            if(fg.getMouseX()<100)return;
                            if(fg.getMouseY()<20)return;
                            if(this.getState().plotCount==0){
                                var vector={x:FHelper.getMouseWorldX(),y:FHelper.getMouseWorldY()}
                                //make sure we don't alredy have this point
                                for(var x=0;x<this.shapes[this.currentShapeIndex].vectors;x++){
                                    if(this.shapes[this.currentShapeIndex].vectors[x]==vector)return;
                                }
                                this.shapes[this.currentShapeIndex].vectors.push(vector)
                                this.getState().plotCount=10;
                            }
                        }
                        if(fgame.isMousePressed("right")){
                            if(this.getState().plotCount==0){
                                if(this.shapes[this.currentShapeIndex].vectors.length){
                                    this.shapes[this.currentShapeIndex].vectors.pop();
                                }
                                this.getState().plotCount=10;
                            }
                        }
                        
                        if(this.getState().plotCount>0)this.getState().plotCount--;
                        
                    }
                   
                    ,afterRender:function(painter){
                        //call parent
                        baseState.afterRender.call(this,painter);
                        var camera=fgame.getMainCamera();
                        if(this.shapes[this.currentShapeIndex] && this.shapes[this.currentShapeIndex].vectors.length){
                            var vec1=this.shapes[this.currentShapeIndex].vectors[this.shapes[this.currentShapeIndex].vectors.length-1];
                            painter.drawLine({start:{x:(vec1.x-camera.getCalculatedLeft())*camera.getZoom(),y:(vec1.y-camera.getCalculatedTop())*camera.getZoom()}
                                             ,end:{x:FGame.getMouseX(),y:FGame.getMouseY()}});
                        }
                    }
                    
                    
            })
    
    
    }),{
    init:function(){
        config.init("EntityEditor.db");
        this.config=config;
        FGame.endRender.connect(this,this.afterRender);
        FGame.beginStep.connect(this,this.beginStep);
        FGame.addUIElement(this.versionLabel);
        FGame.addUIElement(this.modeLabel);
        FGame.addUIElement(this.drawButton);
        FGame.addUIElement(this.editButton);
        FGame.addUIElement(this.saveButton);
        FGame.addUIElement(this.newPolyButton);
        FGame.addUIElement(this.loadButton);
        FGame.addUIElement(this.insertImageButton);
        FGame.addUIElement(this.nameField);
        FGame.addUIElement(this.changeDirButton);
        this.drawButton.clicked.connect(this,function(){this.setState('drawPoly')})
        this.editButton.clicked.connect(this,function(){this.setState('editPoly')})
        this.saveButton.clicked.connect(this,this.save)
        
        this.newPolyButton.clicked.connect(this,this.newPoly)
        this.insertImageButton.clicked.connect(this,this.insertImage);
        this.setState('drawPoly');
        this.obEditor.widget.show();
        this.setGameDir();
        
    }
    
    
    
    ,afterRender:function(painter){
        this.callState('afterRender',[painter]);
    }
    
    ,beginStep:function(){
        this.callState('beginStep');
    }
    
    ,shapes:[{vectors:[]}]
    ,image:false
    ,imageName:false
    ,currentShapeIndex:0
    ,versionLabel:FGame.createUIElement({
        type:'label'
        ,text:"Firmament Entity Editor Version 0.3"
        })
    
    ,nameField:FGame.createUIElement({
        type:'text'
        ,positionX:325        
        })
    ,modeLabel:FGame.createUIElement({
        type:'label'
        ,text:""
        ,positionX:200
        ,minWidth:100
        ,style:FHelper.css({
                color:'red'
            })
    })
    ,drawButton:FGame.createUIElement({
        type:'button'
        ,text:'Draw Mode'
        ,positionX:0
        ,positionY:100
      
    })
    ,editButton:FGame.createUIElement({
        type:'button'
        ,text:'Edit Mode'
        ,positionX:0
        ,positionY:125
       
    })
    
    
    ,newPolyButton:FGame.createUIElement({
        type:'button'
        ,text:'New Poly'
        ,positionX:0
        ,positionY:150
    
    })
    ,saveButton:FGame.createUIElement({
        type:'button'
        ,text:'Save'
        ,positionX:0
        ,positionY:200
    
    })
    
    
    ,insertImageButton:FGame.createUIElement({
        type:"button"
        ,text:"Insert Image"
        ,positionX:0
        ,positionY:275
        })
    ,obEditor:new ObjectEditor({
        type:'dynamic'
        ,restitution:0
        ,friction:0
        ,density:.5
        ,linearDamping:0
        ,angularDamping:0
        ,fixedRotation:0
        
    })

    /**
     * Finds the nearest shape and makes it the current shape
     * @return {int} the index to the closest vector in the shape that became selected. Null if none found.
     */
    ,selectShape:function(){
        var x=FHelper.getMouseWorldX();
        var y=FHelper.getMouseWorldY();
        if(!this.shapes[0].vectors[0]) return null;
        var bubbleI=0,bubbleJ=0;
        var bubbleDistance=FHelper.vectorDistance({x:x,y:y},this.shapes[0].vectors[0]);
        for(var i=0;i<this.shapes.length;i++){
            for(var j=0;j<this.shapes[i].vectors.length;j++){
                var vec = this.shapes[i].vectors[j];
                var distance=FHelper.vectorDistance({x:x,y:y},vec);
                if(distance<bubbleDistance){
                    bubbleI=i;
                    bubbleJ=j;
                    bubbleDistance=distance;
                }
            }
        }
        this.currentShapeIndex=bubbleI;
        return bubbleJ;
    }
    
    
    ,selectVector:function(maxDistance){
        var x=FHelper.getMouseWorldX();
        var y=FHelper.getMouseWorldY();
        if(!this.shapes[this.currentShapeIndex].vectors[0]) return null;
        var bubbleI=0;
        var bubbleDistance=FHelper.vectorDistance({x:x,y:y},this.shapes[this.currentShapeIndex].vectors[0]);
        for(var i=0;i<this.shapes[this.currentShapeIndex].vectors.length;i++){
            var vec = this.shapes[this.currentShapeIndex].vectors[i];
            var distance=FHelper.vectorDistance({x:x,y:y},vec);
            if(distance<bubbleDistance){
                bubbleI=i;
                bubbleDistance=distance;
            }
        }
        
        if(bubbleDistance <= maxDistance){
            return bubbleI
        }
        return null;
        
    }
    ,save:function(){
        var name=this.nameField.getValue();
        if(name==""){
            alert("You have not provided a name. Please set a name for this entity before saving.","Error: No name");
            return;
        }
        this.versionLabel.setText("Saving Data...");
        var file=fg.fileSavePrompt({});
        if(file==''){
            this.versionLabel.setText("Save Aborted");
            return;
        }
        var buffer="";
        var s=[];
        for(var x=0;x<this.shapes.length;x++){
            var vectors=[]
            for(var y=0;y<this.shapes[x].vectors.length;y++){
                var v =this.shapes[x].vectors[y];
                vectors.push({x:v.x,y:v.y})
            }
            s=s.concat(fh.polyShape(vectors,{}))
        }
        var entity={shapes:s
                    
                    }
        if(this.image){
            entity.imageName=this.imageName;
            entity.renderer="sprite"
        }
        entity=fh.extend({},this.obEditor.getObject(),entity);
        print(JSON.stringify(entity))
        buffer=" FEntityRepo.addEntityType('"+name+"',"+JSON.stringify(entity)+");";
        var f=fg.openFile({
                                file:file
                                ,mode:'write'
                             })
        f.write(buffer);
        f.close();
        this.versionLabel.setText("Saved.");
        
        
    }
   
    
    ,loadButton:FGame.createUIElement({
        type:'button'
        ,text:'Load'
        ,positionX:0
        ,positionY:225
        
        ,onClick:function(){
                var file=fg.fileOpenPrompt({});
                if(file=='')return;
                
                var buffer = '';
                var f=fg.openFile({file:file,mode:'read'});
                buffer=f.readAll();
                f.close();
                try{
                    ShapeEditor.shapes=[]
                    ShapeEditor.image=false;
                    ShapeEditor.currentShapeIndex=0;
                    eval(buffer);
                    
                }catch(e){
                    print("An error ocurred while trying to read file: "+e.message);
                }
                }
    
    })
    
    ,changeDirButton:FGame.createUIElement({
        type:'button'
        ,text:'Change Project'
        ,positionX:0
        ,positionY:255
        
        ,onClick:function(){
             dir=FGame.directoryPrompt({title:"Select Game Directory"});
             if(dir=='')return;
             ShapeEditor.config.set("gameDir",dir);
             print(":"+ShapeEditor.config.get("gameDir"));
             FGame.setCurrentDirectory(dir);
        }
    
    })
    
    
    ,newPoly:function(){
      
        this.shapes.push({vectors:[]})
        this.currentShapeIndex=this.shapes.length-1;
        this.setState("drawPoly");
       
        
    }
    
    ,insertImage:function(){
        var fName=fg.fileOpenPrompt({});
        this.imageName=fName;
        this.image = fg.loadImage(fName);
    
        
    }
    ,setGameDir:function(){
        var dir=this.config.get("gameDir");
        if(!dir||dir==''){
             dir=FGame.directoryPrompt({title:"Select Game Directory"});   
        }
        
        this.config.set("gameDir",dir);
        print(":"+this.config.get("gameDir"));
        FGame.setCurrentDirectory(dir);
    }
})
//print(FHelper.debug(ShapeEditor))
ShapeEditor.init();


/**
 * override FEntityRepo to allow for the loading of entities
 */
FEntityRepo={
    addEntityType:function(title,ob){
       // print(fh.debug(ob))
        for(var x=0;x<ob.shapes.length;x++){
            for (var y=0; y<ob.shapes[x].vectors.length;y++){
                var v=ob.shapes[x].vectors[y];
                ob.shapes[x].vectors[y]={x:v.x,y:v.y}
            }
        }
        
        ShapeEditor.shapes=ShapeEditor.shapes.concat(ob.shapes);
        ShapeEditor.nameField.setValue(title);
        if(ob.imageName){
            ShapeEditor.imageName=ob.imageName;
            ShapeEditor.image=fg.loadImage(ob.imageName);
        }
        ShapeEditor.obEditor.clear();
        ShapeEditor.obEditor.setObject(fh.extend({},ob,{shapes:null}));
       // print(fh.debug(ShapeEditor.shapes));
    }
    
}


