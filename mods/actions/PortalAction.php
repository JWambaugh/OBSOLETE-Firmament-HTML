<?php

class PortalAction extends BaseAction {

	
	public function onEnter(){
		$params=$this->params();
		$query=new Doctrine_Query();
		$sec=$query->from("Sector s")->where("s.id = ?")->fetchOne(array($params[0]));
		//echo $params[1];
		if($sec){
			$this->player()->addDescription($params[1]);
			$this->player()->teleport($sec);
		}
		
		
	}


	
}

?>