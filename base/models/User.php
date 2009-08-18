<?php

class User extends Doctrine_Record
{
	public function setTableDefinition()
	{
		// set 'user' table columns, note that
		// id column is auto-created as no primary key is specified
		$this->hasColumn('firstName', 'string',20);
		$this->hasColumn('lastName', 'string',20);
		$this->hasColumn('email', 'string',50);
		$this->hasColumn('password', 'string',20);
	}

	public function setUp()
	{
		
		$this->hasMany('Player as players', array('local' => 'id', 'foreign' => 'user_id'));
		$this->loadTemplate('TimestampTemplate');
	}
}

?>
