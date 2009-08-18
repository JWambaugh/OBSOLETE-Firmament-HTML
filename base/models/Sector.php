<?php
include_once("CoordinateInterface.php");
class Sector extends Doctrine_Record //implements CoordinateInterface
{

	private $players;
	
	public function setTableDefinition()
	{
		// set 'user' table columns, note that
		// id column is auto-created as no primary key is specified

		$this->hasColumn('name', 'string',50);
		$this->hasColumn('latitude', 'integer',10);
		$this->hasColumn('longitude', 'integer',11);
		$this->hasColumn('plane_id', 'integer',11);
		$this->hasColumn('sector_text_id', 'integer',11);
		$this->index('find_index', array('fields' => array('latitude','longitude','plane_id')));

	}

	public function setUp()
	{
		// notice the 'as' keyword here
		$this->hasOne('Plane as plane', array('local' => 'plane_id', 'foreign' => 'id'));
		$this->hasOne('SectorText as text', array('local' => 'sector_text_id', 'foreign' => 'id'));
		$this->hasMany('SectorAction as actions', array('local' => 'id', 'foreign' => 'sector_id'));
		$this->hasMany('SectorData as data', array('local' => 'id', 'foreign' => 'sector_id'));
		$this->hasMany('NpcSpawner as spawners', array('local' => 'id', 'foreign' => 'sector_id'));
		
		//$this->hasMany('SectorPortal as portals', array('local' => 'id', 'foreign' => 'from_sector_id'));
		//$this->hasMany('Player as players', array('local' => 'id', 'foreign' => 'sector_id'));
		$this->loadTemplate('TimestampTemplate');
	}

	static function getSector($plane,$coord){
	
		$query=new Doctrine_Query();
		$t=$query->from('Sector')->where('plane_id = ? and latitude = ? and longitude = ?')->fetchOne(array($plane->id,$coord->latitude(),$coord->longitude()));
	
		
		if(!$t && $plane->generic_sector_id !=0){
			$t=$plane->genericSector;
			$t->latitude=$coord->latitude();
			$t->longitude=$coord->longitude();
			//
			
		}
		return $t;
	}
	
	
	function players(){
		if(!$this->players){
			$query=new Doctrine_Query();
			$this->players=$query->from("Player p")->where("p.latitude = ? and p.longitude = ? and p.plane_id = ?")->execute(array($this->latitude(),$this->longitude(),$this->plane_id));
		}
		return $this->players;
	}


	function setLatitude($lat){
		$this->latitude=(int)$lat;
	}

	function setLongitude($long){
		$this->longitude=(int)$long;
	}


	function latitude(){
		return $this->latitude;
	}

	function longitude(){
		return $this->longitude;
	}

	function down(){
		return Sector::getSector($this->plane, new Coordinate($this->latitude,$this->longitude+1));
	}

	function up(){
		return Sector::getSector($this->plane,new Coordinate($this->latitude,$this->longitude-1));
	}

	function right(){
		return Sector::getSector($this->plane,new Coordinate($this->latitude+1,$this->longitude));
	}

	function left(){
		return Sector::getSector($this->plane,new Coordinate($this->latitude-1,$this->longitude));
	}


	function downRight(){
		return Sector::getSector($this->plane,new Coordinate($this->latitude+1,$this->longitude+1));
	}

	function upRight(){
		return Sector::getSector($this->plane, new Coordinate($this->latitude+1,$this->longitude-1));
	}

	function downLeft(){
		return Sector::getSector($this->plane,new Coordinate($this->latitude-1,$this->longitude+1));
	}

	function upLeft(){
		return Sector::getSector($this->plane,new Coordinate($this->latitude-1,$this->longitude-1));
	}

	function getData($type){
		if(count($this->data))foreach ($this->data as $item){
			if($item->type==$type){
				if($item->data){
					return unserialize($item->data);
				}else{
					return false;
				}
			}
		}
	}
	
	
	function saveData($type,$data){
		$found=false;	
		if(count($this->data))foreach ($this->data as $item){
			if($item->type==$type){
				$found=$item;
			}
		}
		if(!$found){
			$found = new SectorData();
			$found->sector_id=$this->id;
			$found->type=$type;
		}
		$found->data=serialize($data);
		$found->save();
		
	}
	
	/**
	 * Finds and returns the sectorAction object for action of name $name
	 *
	 * @param unknown_type $name
	 */
	
	function findAction($name){
		foreach ($this->actions as $action){
			if($action->action->name==$name){
				return $action;
			}
		}
		return false;
		
	}
	
	
	/**
	 * Triggers an event on all npcs in the sector
	 *
	 * @param unknown_type $event
	 * @return unknown
	 */
	public function triggerNpcEvent($event,$params=""){
		$retvals=array();
		$spawners=$this->spawners;
		if(count($spawners))foreach ($spawners as $spawner){
			$npcs=$spawner->npcs;
			
			if(count($npcs))foreach($npcs as $npc){
				$retvals[]= call_user_func_array(array($npc->getObject(),$event),$params);
			}
					
			
		}
	//	Zend_Debug::dump($action->action->toArray(1));
			
		
		return $retvals;
	}
	

}

?>
