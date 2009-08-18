<?php

class Plane extends Doctrine_Record
{
	public function setTableDefinition()
	{
		// set 'user' table columns, note that
		// id column is auto-created as no primary key is specified

		$this->hasColumn('name', 'string',50);
		$this->hasColumn('type', 'string',20);
		$this->hasColumn('generic_sector_id','int',10);

	}

	public function setUp()
	{
		// notice the 'as' keyword here
		$this->hasMany('Sector as sectors', array('local' => 'id', 'foreign' => 'plane_id'));
		$this->hasOne('Sector as genericSector', array('local' => 'generic_sector_id', 'foreign' => 'id'));
		$this->loadTemplate('TimestampTemplate');
	}
}

?>
