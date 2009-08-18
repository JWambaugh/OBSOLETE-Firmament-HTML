<?php
abstract class Zend_Controller_Action_Child {
	public function __construct() {
	}

	public function initialize() {
		$action = array();
		return $action;
	}
	
	public static function loadAction($this, $action) {
		$_classname = get_class($this);
		$model = substr($_classname, 0, strrpos($_classname, "_"));
		$class = substr($_classname, strrpos($_classname, "_")+1);
		$class = substr($class, 0, strrpos($class, "Controller"));
		$obj = addslashes(serialize($this));
		$args = '$params, $obj="'.$obj.'", $model="'.$model.'", $class="'.$class.'", $action="'.$action.'"';
		return create_function($args, '$v = strtolower($action)."Action"; $obj = unserialize($obj); $obj->$v($params); include(strtolower($model)."/views/scripts/".strtolower($class)."/".strtolower($action).".phtml");');
	}
	
	public function view($actionName, $param) {
		$action = $this->initialize();
		return $action[$actionName]($param);
	}
}
?>

