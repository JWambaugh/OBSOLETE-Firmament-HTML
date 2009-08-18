<?php

class link{
	public $href;
	public $text;

	function __construct($href=null,$text=null){
		if(isset($href)){
			$this->href=$href;
		}
		if(isset($text)){
			$this->text=$text;
		}
	}


	/**
	 * Generates the html for the link
	 * can take an optional string of extra options for the <a> tag as a parameter
	 * @param string $options (optional)
	 * @return unknown
	 */
	function makeHTML($options=null){
		$buffer="<a class=\"mainLinkTextSm\"href=\"$this->href\" $options>$this->text</a>";
		return ($buffer);
	}
}


?>