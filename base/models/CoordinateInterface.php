<?php
interface CoordinateInterface{
	
    function setLatitude($lat);
	
	function setLongitude($long);
	
	
	function latitude();
	
	function longitude();
	
	function below();
	
	function above();
	
	function right();
	
	function left();
	
	
	function belowRight();
	
	function aboveRight();
	
	function belowLeft();
	
	function aboveLeft();
}


?>