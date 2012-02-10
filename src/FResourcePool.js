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
 * @class
 * 
 * @param constructor the constructor for the class to control a pool of
 */


function FResourcePool( constructor){
	//this.max=poolMax;
	this.constructorFunc = constructor;
	this.availablePool=[];
	this.totalPool=[];

}


FResourcePool.prototype.get=function(){
	var resource;
	if(this.availablePool.length>0){
		resource= this.availablePool.pop();
	}else{
		resource = new this.constructorFunc();
		this.totalPool.push(resource);
		//console.log('pool size: ' + this.totalPool.length);
	}
	return resource;
};


FResourcePool.prototype.addBack=function(object){
	//adds a resource back to the pool
	this.availablePool.push(object)
};