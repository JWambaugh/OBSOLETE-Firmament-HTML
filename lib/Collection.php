<?php

class Collection extends AbstractCollection {
	
	
	    
    public function add($val){
    	$this->values[]=$val;
    }
    
    public function remove($key){
    	unset($this->values[$key]);
    }
    

    
}

?>