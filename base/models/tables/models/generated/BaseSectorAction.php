<?php

/**
 * This class has been auto-generated by the Doctrine ORM Framework
 */
abstract class BaseSectorAction extends Doctrine_Record
{

  public function setTableDefinition()
  {
    $this->setTableName('sector_action');
    $this->hasColumn('id', 'integer', 8, array (
  'alltypes' => 
  array (
    0 => 'integer',
  ),
  'ntype' => 'bigint(20)',
  'unsigned' => 0,
  'values' => 
  array (
  ),
  'primary' => true,
  'notnull' => true,
  'autoincrement' => true,
));

    $this->hasColumn('action_id', 'integer', 8, array (
  'alltypes' => 
  array (
    0 => 'integer',
  ),
  'ntype' => 'bigint(20)',
  'unsigned' => 0,
  'values' => 
  array (
  ),
  'primary' => false,
  'notnull' => false,
  'autoincrement' => false,
));

    $this->hasColumn('sector_id', 'integer', 8, array (
  'alltypes' => 
  array (
    0 => 'integer',
  ),
  'ntype' => 'bigint(20)',
  'unsigned' => 0,
  'values' => 
  array (
  ),
  'primary' => false,
  'notnull' => false,
  'autoincrement' => false,
));

    $this->hasColumn('parameters', 'string', null, array (
  'alltypes' => 
  array (
    0 => 'string',
    1 => 'clob',
  ),
  'ntype' => 'text',
  'fixed' => false,
  'values' => 
  array (
  ),
  'primary' => false,
  'notnull' => false,
  'autoincrement' => false,
));

    $this->hasColumn('created', 'timestamp', null, array (
  'alltypes' => 
  array (
    0 => 'timestamp',
  ),
  'ntype' => 'datetime',
  'values' => 
  array (
  ),
  'primary' => false,
  'notnull' => false,
  'autoincrement' => false,
));
    $this->hasColumn('updated', 'timestamp', null, array (
  'alltypes' => 
  array (
    0 => 'timestamp',
  ),
  'ntype' => 'datetime',
  'values' => 
  array (
  ),
  'primary' => false,
  'notnull' => false,
  'autoincrement' => false,
));
  }


}