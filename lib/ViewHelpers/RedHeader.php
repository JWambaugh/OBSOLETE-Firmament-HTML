<?php
class Error_Check_RedHeader {
	public $view;

    public function setView(Zend_View_Interface $view) {
        $this->view = $view;
    }
    
    public function redHeader($errorCode, $title) {
    	if (is_array($errorCode)) {
    		$found = false;
    		foreach($errorCode as $ec) {
    			if (in_array($ec, $this->view->errorTypes)) {
    				$found = true;
    				break;
    			}
    		}
    		if ($found) return "<font color='red'>".$title."</font>";
    		else return $title;
    	} else {
    		if (in_array($errorCode, $this->view->errorTypes)) 
    		 	return "<font color='red'>".$title."</font>";
    		else return $title;
    	}
    }
}

