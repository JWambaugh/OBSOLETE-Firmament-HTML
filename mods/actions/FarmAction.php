<?php

class FarmAction extends BaseAction {
	
	
	public function onDisplay(){
		$p=$this->params();
		
		
		$this->player()->addOption("<a href='/play/teleport'>$l</a>");
	}
	
}

?>