<?php
date_default_timezone_set('America/Los_Angeles');
error_reporting(E_ALL);
set_include_path('.' .
PATH_SEPARATOR . '../lib/' .
PATH_SEPARATOR . '../base/models/' .
PATH_SEPARATOR . '../mods/actions' .
PATH_SEPARATOR . '../mods/items' .
PATH_SEPARATOR . '../mods/npcs' .
PATH_SEPARATOR . get_include_path());

require_once("Zend/Loader.php");

//customize the zend loader to work with doctrine classes
class ClassLoader extends Zend_Loader {
    public static function loadClass($class, $dirs = null) {
    	//echo "<br>$class.php";
    	if(!@include_once("$class.php")) {
	        parent::loadClass($class, $dirs);
    	}
    }

    public static function autoload($class) {
        try {
            self::loadClass($class);
            return $class;
        } catch (Exception $e) {
            return false;
        }
    }
}

error_reporting(E_ERROR | E_WARNING | E_PARSE);
//error_reporting(E_WARNING);
error_reporting(E_ALL);
//date_default_timezone_set('Europe/London');

//enable zend's autoloading functionality (this way we dont need to include every class file we use
@Zend_Loader::registerAutoload("ClassLoader");
// load configuration
$config = new Zend_Config_Xml('../base/config.xml', 'development');
$dbConfig = $config->database;
$registry = Zend_Registry::getInstance();
$registry->set('config', $config);
// setup database
$dbAdapter = Zend_Db::factory($dbConfig->adapter, $dbConfig->config->toArray());
Zend_Db_Table::setDefaultAdapter($dbAdapter);
Zend_Registry::set('dbAdapter', $dbAdapter);
//set up doctrine's connection using zend's connection
Doctrine_Manager::connection(Zend_Registry::get('dbAdapter')->getConnection());

Zend_Registry::set('baseURL', substr($_SERVER['DOCUMENT_ROOT'], 0, strlen($_SERVER['DOCUMENT_ROOT'])-3)); 
session_start();
// setup controller
Zend_Controller_Front::run('../base/controllers');

?>
