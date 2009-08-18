<?php

/**
 * joTimer.class.php
 * 
 * Class to time execution of php scripts.
 * Outputs results in hours,minutes, seconds, and hundredths of a second in a easy to read way.
 *
 */
class joTimer{
	private $time;
	private $lapTimes;
	public $numLaps;
	private $currentLap;
	private $lastLapTime;
	private $fakeLapCounter;
	
	function start(){
		$this->time=microtime(true);
		$this->currentLap=0;
	}

	function stop(){
		$totalTime=$this->getTime();
		$this->echoTime($totalTime, "elapsed");
	}
	
	
	function lap(){
		$time=microtime(true);
		if($this->currentLap==0){
			$this->lapTimes[0]=$time-$this->time;
		}else{
			$this->lapTimes[$this->fakeLapCounter]=$time-$this->lastLapTime;
		}
		$this->lastLapTime=$time;
		$this->fakeLapCounter++;
		$this->currentLap++;
		if($this->fakeLapCounter>25){
			$this->fakeLapCounter=1;
		}
	}
	
	
	function getEstimatedTime(){
		//add all the laps together
		$sum=0;
		foreach($this->lapTimes as $lap){
			$sum+=$lap;
		}
		$average=$sum/count($this->lapTimes);
		$numLapsLeft=$this->numLaps-($this->currentLap);
		$estimate=$numLapsLeft*$average;
		$this->echoTime($estimate,"Remaining");
	}
	
	
	/**
	 * returns the number of milliseconds since start.
	 *
	 */
	function getTime(){
		return(microtime(true)-$this->time);
	}
	
	
	function echoTime($totalTime,$text){
		if($totalTime<60){
			$totalTime=sprintf("%'02.2f",$totalTime);
			echo " (00:00:$totalTime $text)";
		}
		elseif($totalTime>60&&$totalTime<=3600){
			$minutes=sprintf("%'02.0f",floor($totalTime/60));
			$seconds=sprintf("%'02.2f",$totalTime-($minutes*60));
			echo " (00:$minutes:$seconds $text)";
		}
		elseif($totalTime>3600){
			$hours=sprintf("%'02.0f",floor($totalTime/3600));
			$minutes=sprintf("%'02.0f",floor($totalTime-($hours*3600))/60);
			$seconds=sprintf("%'02.2f",$totalTime-(($hours*3600)+($minutes*60)));
			$totalTime=sprintf("%'02.4f",($totalTime/3600));
			echo " ($hours:$minutes:$seconds $text)";
		}
	}

}
?>