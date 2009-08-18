<?php

class SectorData extends Doctrine_Record
{
	public function setTableDefinition()
	{
		$this->hasColumn('sector_id', 'integer');
		$this->hasColumn('type','string',10);
		$this->hasColumn('data', 'string');
	}

	public function setUp()
	{
		// notice the 'as' keyword here
		$this->hasOne('Sector as sector', array('local' => 'sector_id', 'foreign' => 'id'));
		$this->loadTemplate('TimestampTemplate');
	}
}

?>
