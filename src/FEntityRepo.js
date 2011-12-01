/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */
/**
 * Class: FEntityRepo
 * Singleton registry for storing element types
 */


var FEntityRepo={
    
    elements:{}
    
    /**
     * registers a new entity type in the registry.
     * @param {string} name the name of the new entity type
     * @param {Object} type an {@link FEntity} config object for the new type
     */
    ,addEntityType:function(name,type){
    	var completedShapes=[];
    	for(var x=0;x<type.shapes.length;x++){
    		var shape =type.shapes[x];
    		if(shape.type=='polygon'){
    			var v=FTriangulator.getTriangles(shape.vectors);
    			if(v!==false) {
    				for(var y=0;y<v.length;y++){
    					var ob = this.clone(shape);
    					ob.vectors = v[y];
    					ob.type='triangle';
    					completedShapes.push(ob);
    				}
    			}
    		}else{
    			completedShapes.push(shape)
    		}
    	}
    	type.shapes=completedShapes;
        this.elements[name]=type;
    }
    
    
    /**
     * Returns an {@link FEntity} config object from the registry of the specified type
     * @param {String} name the name of the type of  {@link FEntity} config object to return
     * @return {Object} The config object to create a {@link FEntity} object.
     */
    ,getEntityType:function(name){
        var ob=this.clone(this.elements[name]);
        ob._entityTypeName=name;
        return ob;
    }
    /**
     * Creates a new {@link FEntity} of type name and returns it.
     * This is a helper function that uses getEntityType in conjuction with {@link FGame#createEntity}.
     * @param {String} name the name of the {@link FEntity} type to create
     */
    ,createEntity:function(name){
        
        return FGame.createEntity(this.getEntityType(name));
    }
    
    ,clone:function (o) {
    	function c(o) {
    		for (var i in o) {
    		this[i] = o[i];
    		}
    		}

    		return new c(o);
    		}
    
};


