<?php
/** Zend_Controller_Action */
require_once 'Zend/Controller/Action.php';

class AuthController extends Zend_Controller_Action
{
	public function indexAction()
	{
		
		$this->initView();
	}

	public function loginAction(){
		
		$this->initView();
		$this->view->jsonResponse=array();
		$query= new Doctrine_Query();
		$user=$query->from('User u')->where("u.email = ? and u.password = ?")->fetchOne(array($_POST['email'],$_POST['password']));
		if(!$user){
		
			$this->view->jsonResponse[0]['command']='loginFailure';
			$this->render('json');
			return;
		}else{
			if(count($user->players)){
				$_SESSION['playerID']=$user->players[0]->id;
			}else{
				$user->players[0]=new Player();
				$user->players[0]->latitude=0;
				$user->players[0]->longitude=0;
				$user->players[0]->plane_id=1;
				
				
				$user->save();
				$_SESSION['playerID']=$user->players[0]->id;
			}
			$this->view->jsonResponse[0]['command']='loginSuccess';
			$this->view->jsonResponse[0]['playerId']=$_SESSION['playerID'];

			$this->render('json');
			//$this->_forward("index","play");
			return ;
		}
		
	}
	

}


?>
