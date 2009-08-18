<?php

class SectorAction extends Doctrine_Record
{
    public function setTableDefinition()
    {
        // set 'user' table columns, note that
        // id column is auto-created as no primary key is specified

        $this->hasColumn('action_id', 'integer',10);
        $this->hasColumn('sector_id','integer',10);
        $this->hasColumn('parameters', 'string');

    }
    
    public function setUp()
    {
        $this->hasOne('Sector as sector', array('local' => 'sector_id', 'foreign' => 'id'));
        $this->hasOne('Action as action', array('local' => 'action_id', 'foreign' => 'id'));   
        $this->loadTemplate('TimestampTemplate');
    }
}

?>
