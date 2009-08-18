<?php

class Message extends Doctrine_Record
{
	public function setTableDefinition()
	{
		// set 'user' table columns, note that
		// id column is auto-created as no primary key is specified

		$this->hasColumn('player_id', 'integer');
		$this->hasColumn('message', 'string');
		$this->hasColumn('viewed', 'int');
		
	}

	public function setUp()
	{
		// notice the 'as' keyword here
		$this->hasOne('Player as player', array('local' => 'player_id', 'foreign' => 'id'));
		$this->loadTemplate('TimestampTemplate');
	}
}

?>
