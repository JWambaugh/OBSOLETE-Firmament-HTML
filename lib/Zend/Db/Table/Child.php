<?php
abstract class Zend_Db_Table_Child extends Zend_Db_Table {
	public $controller;

	public function __construct($config = null) {
		parent::__construct($config);
		$this->initialize();
	}

	public function initialize() {
	}

	public static function loadChild($model, $class) {
		$className = $model."_".$class."Controller";
		require(strtolower($model)."/controllers/".$class."Controller.php");
		$obj = new $className();
		return $obj;
	}
}
?>