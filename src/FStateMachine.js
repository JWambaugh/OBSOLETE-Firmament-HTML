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
 * @class FStateMachine
 * Base class for creating a state machine
 */


function FStateMachine(states){
    this.states=states;
    this.currentState=null;
    this.currentStateId=null;
    
    this.setState=function(stateId){
        //do nothing if we're already in that state
        if(stateId==this.currentStateId) return;
        if(this.currentState!=null && typeof(this.stopState)=='function'){
            this.currentState.stopState.call(this);
        }
        if(this.states[stateId]){
            this.currentState=this.states[stateId]
            this.currentStateId=stateId;
            if(typeof(this.currentState.initState)=='function'){
                this.currentState.initState.call(this);
            }
        } else {
            throw "State of type "+stateId+' Is not a valid state object'
        }
    }
    
    /**
     *
     * Returns the currentState
     */
    this.getState=function(){
        return this.currentState;
    }
    
    /**
     * Calls the function of name func in the current state, in the scope of the state machine.
     * @param {function} func the name of the function to call
     * @param {Array} arguments the arguments to pass to the function
     * @note For the sake of speed, this function does not do any error checking.
     *
     */
    this.callState=function(func,args){
        this.currentState[func].apply(this,args)
    }
    
}

