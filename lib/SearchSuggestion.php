<?php

class SearchSuggestion{
	private $suggestions=array();
	private $words=array();
	private $dictionary;
	private $misspelled;
	function __construct($searchString){
		$this->words=preg_split("/[\s,\+\-_]+/",$searchString);
		$this->dictionary = pspell_new("en");
		//print_r($this->words);
	}
	
	function getSuggestion(){
		foreach ($this->words as $word){
			//make sure our word is free of punctuation
			$word=str_replace(array('!','@','.',",",';',':','$','#','+'),"",$word);
			if($word!=''){
				$this->processWord($word);
				//echo "<br>$word";
			}
		}
		if(count($this->suggestions>0)&&$this->misspelled){
			return (implode(" ",$this->suggestions));
		}else{
			return false;
		}
	}
	
	function processWord($word){
		//make sure our word is free of punctuation
			$word=str_replace(array('!','@','.',",",';',':','$','#','+'),"",$word);
			if($word!=''){
				//check spelling
				if(pspell_check($this->dictionary,$word)){
					$this->suggestions[]=$word;
				}else{
					$this->misspelled=true;
					$temp=pspell_suggest ( $this->dictionary, $word);
					if($temp && $temp[0]!=''){
						$this->suggestions[]=$temp[0];
					}else{
						$this->suggestions[]=$word;
					}
				}
			}
	}
	
	
	
	
	
}


?>