<?php

class Item extends Doctrine_Record
{
	public function setTableDefinition()
	{
		// set 'user' table columns, note that
		// id column is auto-created as no primary key is specified

		$this->hasColumn('name', 'string',30);
		$this->hasColumn('class', 'string',30);
		$this->hasColumn('type', 'string',20);
		$this->hasColumn('description', 'string');
		
		
		$this->hasColumn('baseData','string');
		$this->hasColumn('baseValue','int');
		$this->hasColumn('container','int');
		$this->hasColumn('weight','int');
	}

	public function setUp()
	{
		// notice the 'as' keyword here
		$this->hasMany('PlayerItem', array('local' => 'id', 'foreign' => 'item_id',));

		$this->loadTemplate('TimestampTemplate');
	}
}

?>
