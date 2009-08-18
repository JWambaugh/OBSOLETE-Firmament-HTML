<?php
/** Zend_Controller_Action */
require_once 'Zend/Controller/Action.php';

class PlayController extends Zend_Controller_Action
{
	public function indexAction()
	{

		if(!$_SESSION['playerID']){
			$this->_forward("index","auth");
			return;
		}
		$this->showLocation();
	}


	public function teleportAction(){
		if(!$_SESSION['playerID']){
			$this->_forward("index","auth");
			return;
		}
		$this->initPlayer();
		$player=$this->view->player;
		$query=new Doctrine_Query();

		$sec=$query->from("Sector s")->where("s.id = ?")->fetchOne(array($_SESSION['teleportTo']));
		if($sec){
			$player->teleport($sec);
			if($_SESSION['teleportMessage']){
				$player->addMessage($_SESSION['teleportMessage']);
			}
		}
		//reset our teleport location for security
		$_SESSION['teleportTo']=0;
		$_SESSION['teleportMessage']=0;
		$this->showLocation();
	}

	//displays a plane
	public function moveAction(){
		if(!$_SESSION['playerID']){
			$this->_forward("index","auth");
			return;
		}
		$this->initPlayer();
		$player=$this->view->player;
		switch($_GET['l']){
			case "NW":
				$player->move("upLeft");
				break;
			case "W":
				$player->move("left");
				break;
			case "SW":
				$player->move("downLeft");
				break;
			case "N":
				$player->move("up");
				break;
			case "S":
				$player->move("down");
				break;
			case "NE":
				$player->move("upRight");
				break;
			case "E":
				$player->move("right");
				break;
			case "SE":
				$player->move("downRight");
				break;

		}
		$player->sector()->triggerNpcEvent('onPlayerEnter',array($player));
		$this->showLocation();

	}

	public function getMessagesAction(){
		if(!$_SESSION['playerID']){
			return;
		}
		$this->initPlayer();
		//record this player's presence
		$this->view->player->updated=date('Y-m-d H:i:s', time());
		$this->view->player->save();
		
		//$this->initView();

		$this->render("messages");

	}

	public function commandAction(){
		if(!$_SESSION['playerID']){
			return;
		}
		$this->initPlayer();
		
		if($_POST['command'][0]!='/'){
			$message="<b>".$this->view->player->name."</b>: ".$_POST['command'];
			$this->view->player->tellNeighbors($message);
			$this->view->player->addMessage($message);
		}else{
			$_POST['command']=substr($_POST['command'],1);
			$commands=explode("/",$_POST['command']);
			$this->view->player->runCommands($commands);
		}
		$this->showLocation();


	}
	private function initPlayer(){
		$query=new Doctrine_Query();
		if(!$this->view->player){
			$this->view->player=$query->from("Player p")->where('p.id = ?')->fetchOne(array($_SESSION['playerID']));

		}
	}



	private function showLocation(){

		$this->initPlayer();

		$this->view->planeViewer=new PlaneViewer($this->view->player->sector()->plane);

		$this->view->planeViewer->setZoom(1);
		$this->view->planeViewer->setCenter(new Coordinate($this->view->player->sector()->latitude(),$this->view->player->sector()->longitude()));

		/**
		 * Trigger our last-minute before-display event
		 */
		$this->view->player->triggerAction("onDisplay");

		//add other players to description
		$players=$this->view->player->sector()->players();
		if(count($players))foreach ($players as $player){
			if($player->id!=$this->view->player->id){
				if((time()-strtotime($player->updated))<60)
				
					$this->view->player->addDescription("<b>$player->name is here.</b>");
			}
		}
		
		//display npcs in the area
		$spawners=$this->view->player->sector()->spawners;
		if(count($spawners))foreach ($spawners as $spawner){
			$npcs=$spawner->npcs;
			
			if(count($npcs))foreach($npcs as $npc){
				$description = $npc->getObject()->getDescription();
				$this->view->player->addDescription("<b>$description</b>");
			}
					
			
		}

		//$this->initView();
		try{
				$this->render("radar");
		
				$this->render("locationView");
		$this->render("inventoryView");
		}catch(Exception $e){
			echo $e->getMessage();
		}
		
		
		/**
		 * Trigger our after-display event
		 */
		$this->view->player->triggerAction("afterDisplay");
	}



}


?>