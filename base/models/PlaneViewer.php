<?php


class PlaneViewer{
	private $plane;
	private $tileScript;
	/**
	 * Enter description here...
	 *
	 * @var Coordinate
	 */
	private $center;
	private $zoom;
	private $xMin=0;
	private $yMin=0;
	private $xMax=0;
	private $yMax=0;

	private $x;
	private $y;
	private $planeMap;
	private $emptySector;


	function __construct(Plane $plane){
		$this->plane=$plane;
		$this->center=new Coordinate(0,0);
		if(count($this->plane->sectors)<1){
			$this->setZoom(1);
		}else{
			$this->setZoom(0);
		}
		
		$this->buildPlaneMap();
		$this->emptySector=new Sector();
		/*echo $this->xMax;
		echo "<br>".$this->xMin;
		echo "<br>".$this->yMax;
		echo "<br>".$this->yMin;*/
	}



	/**
	 * @return unknown
	 */
	public function getCenter() {
		return $this->center;
	}

	/**
	 * @return unknown
	 */
	public function getTileScript() {
		return $this->tileScript;
	}

	/**
	 * @return unknown
	 */
	public function getZoom() {
		return $this->zoom;
	}

	/**
	 * @param unknown_type $center
	 */
	public function setCenter($center) {
		$this->center = $center;
		$this->calculateMinMax();
	}

	/**
	 * @param unknown_type $tileScript
	 */
	public function setTileScript($tileScript) {
		$this->tileScript = $tileScript;
	}

	/**
	 * @param unknown_type $zoom
	 */
	public function setZoom($zoom) {
		$this->zoom = $zoom;
		$this->calculateMinMax();
	}

	public function resetX(){
		$this->x=$this->xMin-1;
	}

	public function resetY(){
		$this->y=$this->yMin-1;
	}

	public function reset(){
		$this->resetX();
		$this->resetY();
	}

	public function moreX(){
		if($this->x < $this->xMax){
			$this->x++;
			return true;
		}
	}

	public function moreY(){
		if($this->y < $this->yMax){
			$this->y++;
			return true;
		}
	}

	public function nextX(){
		return $this->x++;
	}

	public function nextY(){
		return $this->y++;
	}
	public function getCurrentSector(){
		if($this->planeMap[$this->x][$this->y])
		return $this->planeMap[$this->x][$this->y];
		else return $this->emptySector;
	}


	function calculateMinMax(){


		if($this->zoom==0){
			$this->getPlaneMinMax();
		}else{
			
			$this->xMin=$this->center->latitude() - $this->zoom;
			$this->yMin=$this->center->longitude() - $this->zoom;
			$this->xMax=$this->center->latitude() + $this->zoom;
			$this->yMax=$this->center->longitude() + $this->zoom;
		}
	}


	/**
	 * adjusts view to show all ssectors.
	 *
	 */
	private function getPlaneMinMax(){
		$this->xMax=$this->xMin=$this->plane->sectors[0]->latitude;
		$this->yMax=$this->yMin=$this->plane->sectors[0]->longitude;
		foreach ($this->plane->sectors as $sector){
			//Zend_Debug::dump($sector->toArray());

			if($sector->latitude >= $this->xMax)$this->xMax=$sector->latitude+1;
			if($sector->longitude >= $this->yMax)$this->yMax=$sector->longitude+1;
			if($sector->latitude <= $this->xMin)$this->xMin=$sector->latitude-1;
			if($sector->longitude <= $this->yMin)$this->yMin=$sector->longitude-1;
		}
	}

	private function buildPlaneMap(){
		foreach ($this->plane->sectors as $sector){
			$this->planeMap[$sector->latitude][$sector->longitude]=$sector;
			//Zend_Debug::dump($sector->toArray());
		}
	}

	public function render(){
		include($this->tileScript);
	}

}


?>