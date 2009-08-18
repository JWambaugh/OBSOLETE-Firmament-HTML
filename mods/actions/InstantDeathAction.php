<?php

class InstantDeathAction extends BaseAction {

	
	public function onEnter(){
		$params=$this->params();
	
		echo $params[0];
		echo "<br>You have died.";
		
	}
	public function onLeave(){
		echo "You may not leave! You are dead!";
		//return BaseAction::NO_EXIT;
	}
	
}

?>