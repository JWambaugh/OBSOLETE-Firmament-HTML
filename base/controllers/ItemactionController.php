<?php
/** Zend_Controller_Action */
require_once 'Zend/Controller/Action.php';

class ItemactionController extends Zend_Controller_Action
{
	public function indexAction()
	{

		$this->_forward("index","play");
		return;

		//$this->_forward('index', 'search', 'jobs');
		//$this->initView();
		//$this->render("comingsoon");
	}


	public function __call($method, $args)
	{
		if(!$_SESSION['playerID']){
			$this->_forward("index","auth");
			return;
		}

		if ('Action' == substr($method, -6)) {
			$actionClass=substr($method, 0,strlen($method)-6);


			$this->initPlayer();
			$player=$this->view->player;
			if(count($player->items))foreach ($player->items as $item){
				//	Zend_Debug::dump($action->action->toArray(1));
			
				if($item->id == $_GET['id']){
					
					$event=$_GET['a'];
					$retval= $item->getObject()->$event($_GET['p']);

				}
			}

			$this->_forward("index","play");
			return ;
			
		}

		// all other methods throw an exception
		throw new Exception('Invalid method "' . $method . '" called');
	}


	private function initPlayer(){
		$query=new Doctrine_Query();
		if(!$this->view->player){

			$this->view->player=$query->from("Player p")->where('p.id = ?')->fetchOne(array($_SESSION['playerID']));
		}
	}



}


?>