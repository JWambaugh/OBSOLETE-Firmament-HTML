<?php
/** Zend_Controller_Action */
require_once 'Zend/Controller/Action.php';

class AdminController extends Zend_Controller_Action
{
	public function indexAction()
	{
		//$this->_forward('index', 'search', 'jobs');
		//$this->initView();
		//$this->render("comingsoon");
	}



	//displays a plane
	public function showPlaneAction(){
		$this->initView();




		$this->showPlaneEditor();
	}


	//displays a plane
	public function addPlaneAction(){
		$this->initView();
		$plane=new Plane();
		$plane->name=$_POST['name'];
		$plane->save();



		$this->showPlaneEditor();
	}
	//displays a plane
	public function selectPlaneAction(){
		$this->initView();
		$_SESSION['plane']=$_POST['plane'];


		$this->showPlaneEditor();
	}

	public function editSectorAction(){
		$this->initView();
		if($_POST['id']){
			$query=new Doctrine_Query();
			$this->view->sector=$query->from("Sector s")->where("s.id=".$_POST['id'])->fetchOne();

		}
		else{
			$this->view->sector=new Sector();
			$ar=explode(",",$_POST['latlong']);


			$this->view->sector->latitude=$ar[0];
			$this->view->sector->longitude=$ar[1];


		}
		$this->showPlaneEditor();
	}


	public function saveSectorAction(){
		$query=new Doctrine_Query();
		$this->initView();
		if(!isset($_POST['latitude']) || !isset($_POST['longitude'])){
			$this->showPlaneEditor();
			return;
		}

		if($_SESSION['plane']){
			if($_POST['id']){
				
				$sector=$query->from("Sector s")->where("s.id=".$_POST['id'])->fetchOne();
			}else {
				$sector=new Sector();
				$sector->text=new SectorText();
			}
			$sector->name=$_POST['name'];
			$sector->latitude=$_POST['latitude'];
			$sector->longitude=$_POST['longitude'];
			$sector->plane_id=$_SESSION['plane'];
			if($_POST['text'])	$sector->text->text=$_POST['text'];
			
			if($_POST['newActionID']){
				$action=new SectorAction();
				$action->action_id=$_POST['newActionID'];
				$action->parameters=$_POST['newActionParams'];
				$sector->actions[]=$action;
			}
			
			foreach ($_POST as $k=>$v){
			
			}
			//	Zend_Debug::dump($sector->toArray(true));
			$sector->save();
		}else {
			echo "Please select a plane";
		}
		$this->showPlaneEditor();

	}



	private function showPlaneEditor(){
		
		$query=new Doctrine_Query();

		$this->view->planes=$query->from("Plane")->execute();
		$query=new Doctrine_Query();
		if($_SESSION['plane']){
			$this->view->plane=$query->from("Plane p")->where("p.id=".$_SESSION['plane'])->fetchOne();
			$this->view->sectors=$query->from("Sector s")->where("s.plane_id=".$_SESSION['plane'])->execute();
		}
		if($this->view->plane)
		$this->view->planeViewer=new PlaneViewer($this->view->plane);

		if($_POST['zoomX'] && $_POST['zoomY']){
			$this->view->planeViewer->setCenter(new Coordinate($_POST['zoomX'],$_POST['zoomY']));
		}
		if($_POST['zoom']){
			$this->view->planeViewer->setZoom($_POST['zoom']);
		}
		
		$this->view->actions=$query->from("Action")->where("1")->execute();
		
		//Zend_Debug::dump($_POST);
		$this->render("selectPlane");
		$this->render("addPlane");
		$this->render('sectoreditor');
		if($this->view->plane)
		$this->render("planeviewer");
	}

}


?>