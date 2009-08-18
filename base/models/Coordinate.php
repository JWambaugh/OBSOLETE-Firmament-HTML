<?php

class Coordinate //implements CoordinateInterface 
{
	private $latitude;
	private $longitude;
	
	function __construct($lat,$long){
		$this->setLatitude($lat);
		$this->setLongitude($long);
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
		return new Coordinate($this->latitude,$this->longitude+1);
	}
	
	function up(){
		return new Coordinate($this->latitude,$this->longitude-1);
	}
	
	function right(){
		return new Coordinate($this->latitude+1,$this->longitude);
	}
	
	function left(){
		return new Coordinate($this->latitude-1,$this->longitude);
	}
	
	
	function downRight(){
		return new Coordinate($this->latitude+1,$this->longitude+1);
	}
	
	function upRight(){
		return new Coordinate($this->latitude+1,$this->longitude-1);
	}
	
	function downLeft(){
		return new Coordinate($this->latitude-1,$this->longitude+1);
	}
	
	function upLeft(){
		return new Coordinate($this->latitude-1,$this->longitude-1);
	}
	
	
}



?>