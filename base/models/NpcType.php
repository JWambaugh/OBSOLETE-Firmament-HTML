<?php

class NpcType extends Doctrine_Record
{
	public function setTableDefinition()
	{
		$this->hasColumn('name', 'string',20);
		$this->hasColumn('description', 'string');
		$this->hasColumn('class', 'string',20);
		
	}

	
	public function setUp()
	{
		$this->loadTemplate('TimestampTemplate');
		//$this->hasOne('User as user', array('local' => 'user_id', 'foreign' => 'id'));
		}
	
}

?>