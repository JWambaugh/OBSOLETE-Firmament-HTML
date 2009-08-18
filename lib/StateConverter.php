<?php



class StateConverter{

	public $abreviation;
	public $name;

	/**
	 * Accepts the state's name or abreviation, and automatically populates the object's variables
	 * based on that. Does not use the database for speed purposes.
	 *
	 * @param string $state (abbreviation or name)
	 */
	function __construct($state){
		//debug(strlen($state));
		if(strlen($state)==2){
			$this->abreviation=strtoupper($state);
			$this->name=$this->abreviationToName($state);
		}else{
			$this->name=$state;
			$this->abreviation=$this->nameToAbreviation($state);
		}
	}

	static function abreviationToName($state){
		//debug($state);
		$abreviation=array("AA",
		"AB","AB","AE","AK","AL","AP","AR","AS","AZ","BC","BC","CA","CO","CT",
		"DC","DE","FL","FM","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA",
		"MA","MB","MB","MD","ME","MH","MI","MN","MO","MP","MS","MT","NB","NB",
		"NC","ND","NE","NF","NF","NH","NJ","NL","NM","NS","NS","NT","NT","NU","NV",
		"NY","OH","OK","ON","OR","PA","PE","PE","PQ","PR","PW","QC","RI",
		"SC","SD","SK","SK","SP","TN","TX","UT","VA","VI","VT","WA","WE","WI",
		"WV","WY","YT");
		
		$names=array("","Alberta","Alberta","","Alaska","Alabama","","Arkansas","","Arizona","British Columbia",
		"British Columbia","California","Colorado","Connecticut","District of Columbia","Delaware",
		"Florida","","Georgia","","Hawaii","Iowa","Idaho","Illinois","Indiana","Kansas","Kentucky",
		"Louisiana","Massachusetts","Manitoba","Manitoba","Maryland","Maine","","Michigan","Minnesota","Missouri",
		"","Mississippi","Montana","New Brunswick","New Brunswick","North Carolina",
		"North Dakota","Nebraska","Newfoundland","","New Hampshire","New Jersey","New Foundland","New Mexico",
		"Nova Scotia","Nova Scotia","Northwest Territories and Nunavut","Northwest Terri","Nunavut","Nevada",
		"New York","Ohio","Oklahoma","Ontario","Oregon","Pennsylvania","Prince Edward Is","Prince Edward Island",
		"Quebec","Puerto Rico","","Quebec","Rhode Island","South Carolina","South Dakota","Saskatchewan",
		"Saskatchewan","Spanish West Indies","Tennessee","Texas","Utah","Virginia","Virgin Islands",
		"Vermont","Washington","West Indies","Wisconsin","West Virginia","Wyoming","Yukon Territory");
		//debug (count($abreviation));
		
		strtoupper($state);
		$test=$state;
		$state=str_replace($abreviation,$names,$state);
		if ($test=="NV") $state="Nevada";
		return($state);
	}

	static function nameToAbreviation($state){
		$abreviation=array("AA",
		"AB","AB","AE","AK","AL","AP","AR","AS","AZ","BC","BC","CA","CO","CT",
		"DC","DE","FL","FM","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA",
		"MA","MB","MB","MD","ME","MH","MI","MN","MO","MP","MS","MT","NB","NB",
		"NC","ND","NE","NF","NF","NH","NJ","NL","NM","NS","NS","NT","NT","NU","NV",
		"NY","OH","OK","ON","OR","PA","PE","PE","PQ","PR","PW","QC","RI",
		"SC","SD","SK","SK","SP","TN","TX","UT","VA","VI","VT","WA","WE","WI",
		"WV","WY","YT");
		
		$names=array("","Alberta","Alberta","","Alaska","Alabama","","Arkansas","","Arizona","British Columbia",
		"British Columbia","California","Colorado","Connecticut","District of Columbia","Delaware",
		"Florida","","Georgia","","Hawaii","Iowa","Idaho","Illinois","Indiana","Kansas","Kentucky",
		"Louisiana","Massachusetts","Manitoba","Manitoba","Maryland","Maine","","Michigan","Minnesota","Missouri",
		"","Mississippi","Montana","New Brunswick","New Brunswick","North Carolina",
		"North Dakota","Nebraska","Newfoundland","","New Hampshire","New Jersey","New Foundland","New Mexico",
		"Nova Scotia","Nova Scotia","Northwest Territories and Nunavut","Northwest Terri","Nunavut","Nevada",
		"New York","Ohio","Oklahoma","Ontario","Oregon","Pennsylvania","Prince Edward Is","Prince Edward Island",
		"Quebec","Puerto Rico","","Quebec","Rhode Island","South Carolina","South Dakota","Saskatchewan",
		"Saskatchewan","Spanish West Indies","Tennessee","Texas","Utah","Virginia","Virgin Islands",
		"Vermont","Washington","West Indies","Wisconsin","West Virginia","Wyoming","Yukon Territory");
		$state=str_ireplace($names,$abreviation,(string)$state);
		return($state);
	}
	
}

?>