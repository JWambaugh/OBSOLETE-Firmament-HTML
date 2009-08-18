<?php

class SectorText extends Doctrine_Record
{
    public function setTableDefinition()
    {
        // set 'user' table columns, note that
        // id column is auto-created as no primary key is specified

        $this->hasColumn('text', 'string');
        
    }
    
    public function setUp()
    {
        // notice the 'as' keyword here
    	 $this->hasMany('SectorText as text', array('local' => 'id', 'foreign' => 'sector_text_id'));
    	 $this->loadTemplate('TimestampTemplate');
    }
}

?>
