<?php
class Error_Check_ErrorMessage {
	public $view;

    public function setView(Zend_View_Interface $view) {
        $this->view = $view;
    }
    
    public function errorMessage($errorCode, $message) {
    	if (in_array($errorCode, $this->view->errorTypes)) 
    		 return "<br><font color='red'>".$message."</font>";
    	else return "";
    }
}

