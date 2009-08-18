
	var responseHandler = function(t) {
	    json = eval(t.responseText);
	    doIt();
	}
	function doIt() {
		//alert(json[0]['id']);
	}
	new Ajax.Request('/ajax/school/list?country_code=us',{onSuccess:responseHandler});
	
	function workStatusChange() {
		var workstatus = $('registerForm').getInputs('radio','workstatus').find(function(radio) { return radio.checked; }).value;
		switch(workstatus) {
			case "employed":
				$('company_label').style.display = "block";
				$('title_label').style.display = "block";
				break;
			case "business_owner":
				$('company_label').style.display = "block";
				$('title_label').style.display = "none";
				break;
			default:
				$('company_label').style.display = "none";
				$('title_label').style.display = "none";
				break;
		}
	}
	
	var cc = "";
	function countryPick() {
		cc = $F('edu_country_code');
		$('sp_state').style.display = "none";
		$('sp_school').style.display = "none";
		$('sp_school_other').style.display = "none";
		if (cc != "") {
			new Ajax.Request('/ajax/state/list?country_code='+cc,{onSuccess:eduStateHandler});
		} 
	}	
	
	function statePick() {
		st = $F('edu_state_code');
		$('sp_school').style.display = "none";
		$('sp_school_other').style.display = "none";
		if (st != "") {
			new Ajax.Request('/ajax/school/list?country_code='+cc+'&state_code='+st,{onSuccess:eduSchoolHandler});
		} 
	}	
	
	function schoolPick() {
		if ($F('school_id') == "other") {
			$('sp_school_other').style.display = "block";
		} else {
			$('sp_school_other').style.display = "none";
		}
	}
	
	var eduStateList = new Array();
	var eduStateHandler = function(t) {
	    eduStateList = eval(t.responseText);
	    if (eduStateList.length == 0) {
	    	new Ajax.Request('/ajax/school/list?country_code='+cc,{onSuccess:eduSchoolHandler});
	    } else {
	    	$('sp_state').style.display = "block";
	    	$('sp_school').style.display = "none";
	    	$('sp_school_other').style.display = "none";
	    	$('edu_state_code').options.length = 0;
	    	$('edu_state_code').options[0]=new Option("Choose a state...", "", true, false)
	    	for(i = 0; i < eduStateList.length; i++) {
	    		$('edu_state_code').options[i+1]=new Option(eduStateList[i]['name'], eduStateList[i]['state_code'], false, false)
	    	}
	    }
	}
	
	var eduSchoolList = new Array();
	var eduSchoolHandler = function(t) {
		eduSchoolList = eval(t.responseText);
		$('school_id').options.length = 0;
		if (eduSchoolList.length == 0) {
			$('sp_school').style.display = "none";
			$('sp_school_other').style.display = "block";
		} else {
			$('sp_school').style.display = "block";
			$('sp_school_other').style.display = "none";
	    	$('school_id').options[0]=new Option("Choose a school...", "", true, false)
	    	for(i = 0; i < eduSchoolList.length; i++) {
	    		$('school_id').options[i+1]=new Option(eduSchoolList[i]['name'], eduSchoolList[i]['id'], false, false)
	    	}
	    	$('school_id').options[eduSchoolList.length+1]=new Option("Other...", "other", false, false)
		}
	}
