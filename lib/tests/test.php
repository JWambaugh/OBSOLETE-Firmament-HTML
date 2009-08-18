<?php
/**
 * set up the environment for our tests
 */
error_reporting(E_ALL);
date_default_timezone_set('Europe/London');
set_include_path('.' .
PATH_SEPARATOR . '../../lib/' .
PATH_SEPARATOR . '../../app/modules/default/models/' .
PATH_SEPARATOR . '../../app/modules/jobs/models/' .
PATH_SEPARATOR . '../../app/modules/people/models/' .
PATH_SEPARATOR . get_include_path());

require_once("Zend/Loader.php");
//enable zend's autoloading functionality (this way we dont need to include every class file we use
Zend_Loader::registerAutoload();
// load configuration
$config = new Zend_Config_Xml('../../app/config.xml', 'development');
$dbConfig = $config->database;
$registry = Zend_Registry::getInstance();
$registry->set('config', $config);
// setup database
$dbAdapter = Zend_Db::factory($dbConfig->adapter, $dbConfig->config->toArray());
Zend_Db_Table::setDefaultAdapter($dbAdapter);
Zend_Registry::set('dbAdapter', $dbAdapter);

?>