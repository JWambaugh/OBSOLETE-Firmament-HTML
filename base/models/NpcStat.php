 <?php

class NpcStat extends Doctrine_Record
{
	public function setTableDefinition()
	{
		$this->hasColumn('Npc_id', 'int');
		
		$this->hasColumn('stat_id', 'int');
		

	}

	
	public function setUp()
	{
		$this->loadTemplate('TimestampTemplate');
		$this->hasOne('Npc as npc', array('local' => 'npc_id', 'foreign' => 'id'));
		$this->hasOne('Stat as stat', array('local' => 'stat_id', 'foreign' => 'id'));
		
	
		}
	
}

?> 