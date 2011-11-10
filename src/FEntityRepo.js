
/**
 * @class FEntityRepo
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

