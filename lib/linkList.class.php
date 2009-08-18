<?php
require_once("link.class.php");
class linkList{
	protected $links;
	protected $catLocation;
	protected $categoryCount;
	/**
	 * linkList class constructor
	 * can aoptionally give it an array of link obects
	 *
	 * @param unknown_type $strings
	 */
	function __construct(){
		$this->links=array();
		$this->categoryCount=0;
		$this->catLocation=0;

	}

	function addLink($link){
		//make sure we're getting a link object
		if(is_object($link)){
			//add the link to our array
			$this->links[$this->categoryCount]['links'][]=$link;
		}
	}


	function addCategory($label){
		$this->categoryCount++;
		$this->links[$this->categoryCount][label]=$label;
	}


	function printAll(){
		$buffer="";

		foreach($this->links as $k=>$catagories){

			$buffer.=$catagories['label']." ";
			$linkNum=count($catagories['links']);
			$count=0;
			foreach($catagories['links'] as $link){
				$buffer.=$link->makeHTML();
				$count++;
				if($count<$linkNum){
					$buffer.=" | ";
				}
			}
			$lineCount++;
			$buffer.="\n<br />";

		}
		return($buffer);
	}

	function printNextCat(){
		$buffer="";
		$catcount=0;
		foreach($this->links as $k=>$catagories){

			if($catcount==$this->catLocation){
				$buffer.=$catagories['label']." ";
				$linkNum=count($catagories['links']);
				$count=0;
				foreach($catagories['links'] as $link){
					$buffer.=$link->makeHTML();
					$count++;
					if($count<$linkNum){
						$buffer.=" | ";
					}
				}
				$this->catLocation++;
				return($buffer);
			}
			$catcount++;
		}
		return($buffer);
	}
	
	function catName(){
		$catcount=0;		
		foreach($this->links as $k=>$catagories){
			
			if($catcount==$this->catLocation){
				return($catagories['label']);
			}		
			$catcount++;
		}
	}
	
	
	
	function printCatLinks(){
		$buffer="";
		$catcount=0;
		foreach($this->links as $k=>$catagories){

			if($catcount==$this->catLocation){
				
				$linkNum=count($catagories['links']);
				$count=0;
				if(count($catagories['links'])>0)
				foreach($catagories['links'] as $link){
					$buffer.=$link->makeHTML();
					$count++;
					if($count<$linkNum){
						$buffer.=' <span class="warn">&bull;</span> ';
					}
				}
				
				return($buffer);
			}
			$catcount++;
		}
		return($buffer);
	}
	
	/**
	 * Increments the internal category counter
	 *
	 */
	function nextCat(){
		$this->catLocation++;
	}
	
	/**
	 * Returns true if there are any more categories, false if there are none.
	 *
	 */
	function more(){
		if($this->catLocation<$this->categoryCount){
			return(true);
		}else{
			return(false);
		}
	}
	
	
}


?>