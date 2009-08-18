<?php


include("test.php");
include("../Collection.php");


require_once 'PHPUnit/Framework.php';

class CollectionTest extends PHPUnit_Framework_TestCase{
	
	protected $collection;
 
    protected function setUp()
    {
        $this->collection=new Collection();
    }
	
	function testAdd(){
		$this->collection->add("hello");
		$this->collection->add("Number 2");
		foreach ($this->collection as $item){
			echo "\nItem :$item";
		}
	}
	
	
}

?>