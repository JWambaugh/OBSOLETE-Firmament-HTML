<?php

class EnterAction extends BaseAction {
	
	
	public function onDisplay(){
		$p=$this->params();
		
		$_SESSION['teleportTo']=$p[0];
		$_SESSION['teleportMessage']=$p[2];
		$l= $p[1]?$p[1]:"Enter";
		$this->player()->addOption("<a href='/play/teleport'>$l</a>");
	}
	
	public function onExecCommand($command){
		$this->player()->addDescription("yeeha!");
	}
	
}

?>