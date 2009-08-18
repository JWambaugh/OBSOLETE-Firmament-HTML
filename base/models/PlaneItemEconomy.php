<?php

class PlaneItemEconomy extends Doctrine_Record
{
	public function setTableDefinition()
	{
		// set 'user' table columns, note that
		// id column is auto-created as no primary key is specified

		$this->hasColumn('plane_id', 'int');
		$this->hasColumn('itemType', 'string',20);
		$this->hasColumn('value','float');
	}

	public function setUp()
	{
		// notice the 'as' keyword here
		$this->loadTemplate('TimestampTemplate');
	}
}

?>
