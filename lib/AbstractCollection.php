<?php

/**
 * An abstract class for managing a collection of objects.
 * Extend me for great collecting fun!
 *
 * @author Jordan
 */

abstract class AbstractCollection implements Iterator {
	protected $values;

	function __construct(){
		$this->values=array();
	}



	public function rewind() {
		reset($this->values);
	}

	public function current() {
		$var = current($this->values);
		return $var;
	}

	public function key() {
		$var = key($this->values);
		return $var;
	}

	public function next() {
		$var = next($this->values);
		return $var;
	}

	public function valid() {
		$var = $this->current() !== false;
		return $var;
	}

	public function count(){
		return count($this->values);
	}

	public abstract  function add($val);

	public abstract  function remove($key);

	public function at($int){
		return $this->values[$int];
	}


	public function addArray($array){
		foreach($array as $item){
			$this->add($item);
		}
	}
}

?>