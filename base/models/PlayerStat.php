 <?php

class PlayerStat extends Doctrine_Record
{
	public function setTableDefinition()
	{
		$this->hasColumn('player_id', 'int');
		
		$this->hasColumn('stat_id', 'int');
		

	}

	
	public function setUp()
	{
		$this->loadTemplate('TimestampTemplate');
		$this->hasOne('Player as player', array('local' => 'player_id', 'foreign' => 'id'));
		$this->hasOne('Stat as stat', array('local' => 'stat_id', 'foreign' => 'id'));
		
	
		}
	
}

?> 