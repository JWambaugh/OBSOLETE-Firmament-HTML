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
		$this->view->jsonResponse=array();
		$this->view->jsonResponse[0]['command']='updateRadar';
		$this->view->jsonResponse[1]['command']='updateChat';
		$this->view->jsonResponse[2]['command']='updateLocationDescription';
		$this->render('json');




	//	$this->showLocation();

	}

	public function getmessagesAction(){
		try{
			if(!$_SESSION['playerID']){
				return;
			}
			$this->initPlayer();
			//record this player's presence
			$this->view->player->updated=date('Y-m-d H:i:s', time());
			$this->view->player->save();
			
			$this->view->jsonResponse=array();
			$this->view->jsonResponse[0]['command']='setMessages';
			foreach($this->view->player->getMessages() as $message){
				$msg=array();
				$msg['id']=$message->id;
				$msg['message']=$message->message;

				$this->view->jsonResponse[0]['messages'][]=$msg;	
			}
			
			$this->render("json");
		} catch(Exception $e){
			echo $e->getMessage();
		}
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

	public function getlocationdescriptionAction(){
		$this->initPlayer();


		$this->view->jsonResponse=array();
		/**
		 * Trigger our last-minute before-display event
		 */
		$this->view->player->triggerAction("onDisplay");

		//add other players to description
		$players=$this->view->player->sector()->players();
		$this->view->jsonResponse[0]['command']='updatePlayerList';
		if(count($players))foreach ($players as $player){
			if($player->id!=$this->view->player->id){
				if((time()-strtotime($player->updated))<60)
					$p=array();
					$p['name']=$player->name;
					$p['id']=$player->id;
					$this->view->jsonResponse[0]['players'][]=$p;
			}
		}
		
		//display npcs in the area
		$this->view->jsonResponse[1]['command']='updateNPCs';
		$spawners=$this->view->player->sector()->spawners;
		if(count($spawners))foreach ($spawners as $spawner){
			$npcs=$spawner->npcs;
					
			if(count($npcs))foreach($npcs as $npc){
				$p=array();
				$p['description']=$npc->getObject()->getDescription();
				$p['id']=$npc->id;
				$this->view->jsonResponse[1]['npcs'][]=$p;

			}
		}
		$this->view->jsonResponse[2]['command']='setLocationDescripton';
		$descriptions=$this->view->player->getDescriptions();
		$this->view->jsonResponse[2]['title']=$this->view->player->sector()->name;
		$this->view->jsonResponse[2]['playerDescriptions']=$descriptions;
		$this->view->jsonResponse[2]['description']=$this->view->player->sector()->text->text;

		$this->view->jsonResponse[2]['options']=$this->view->player->getOptions();
		$this->render('json');
		


	}
	

	public function getradarAction(){
		if(!$_SESSION['playerID']){
			return;
		}
		$this->initPlayer();
		$this->view->jsonResponse=array();
		$this->view->jsonResponse[0]['command']='setRadar';
		

		$directions=array('upLeft','up','upRight','left','right','downLeft','down','downRight');
		
		foreach($directions as $direction){
			$t=$this->view->player->sector()->$direction();
			if($t){
				$this->view->jsonResponse[0]['directions'][$direction]='1';
			}else {
				$this->view->jsonResponse[0]['directions'][$direction]='0';

			}
		}
		
		$this->render('json');
		$this->view->player->triggerAction("afterDisplay");
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
