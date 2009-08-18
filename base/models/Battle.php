<?php

class Battle extends Doctrine_Record
{
	public function setTableDefinition()
	{
		
		$this->hasColumn('player1ID', 'int',30);
		$this->hasColumn('player2ID', 'int',30);
		$this->hasColumn('npc_id', 'int',30);
		
	}

	public function setUp()
	{
		// notice the 'as' keyword here
		
		$this->hasOne('Player as player1', array('local' => 'player1ID', 'foreign' => 'id',));
		$this->hasOne('Player as player2', array('local' => 'player2ID', 'foreign' => 'id',));
		$this->hasOne('Npc as npc', array('local' => 'npc_id', 'foreign' => 'id',));
		
		$this->loadTemplate('TimestampTemplate');
	}
}

