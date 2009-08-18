<?php
class TimestampTemplate extends Doctrine_Template
{
    public function setTableDefinition()
    {
        $this->hasColumn('created', 'timestamp');
        $this->hasColumn('updated', 'timestamp');

        $this->setListener(new TimestampListener());
    }
}
?>