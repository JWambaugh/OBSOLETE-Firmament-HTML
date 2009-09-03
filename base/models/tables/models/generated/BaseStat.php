<?php

/**
 * This class has been auto-generated by the Doctrine ORM Framework
 */
abstract class BaseStat extends Doctrine_Record
{

  public function setTableDefinition()
  {
    $this->setTableName('stat');
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

    $this->hasColumn('name', 'string', 20, array (
  'alltypes' => 
  array (
    0 => 'string',
  ),
  'ntype' => 'varchar(20)',
  'fixed' => false,
  'values' => 
  array (
  ),
  'primary' => false,
  'notnull' => false,
  'autoincrement' => false,
));

    $this->hasColumn('description', 'string', null, array (
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

    $this->hasColumn('value', 'string', 20, array (
  'alltypes' => 
  array (
    0 => 'string',
  ),
  'ntype' => 'varchar(20)',
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