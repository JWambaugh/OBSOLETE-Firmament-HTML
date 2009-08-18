<?php

class BaseContainerItem extends BaseItem{

	function getItemOptions(){
		$options=array();

		$options[]="<a href='".$this->getActionURL("addItemPrompt")."'>Add an Item</a>";
		$options[]="<a href='".$this->getActionURL("viewContents")."'>View Contents</a>";
		return $options;
	}
	
	function addItemPrompt($params){
		$count = 0;
		
		if(count($this->player()->items))foreach ($this->player()->items as $item){
			if($item->getObject()!=$this && $item->container->getObject()!=$this){
				$text.="<br /><a href='".$this->getActionURL("addItem",array($item->id))."'>{$item->item->name}</a>";
				$count++;
			}
		}
		if($count){
			$text="Select an item to add:".$text;
			$_SESSION['containerItem']['addItemPrompt']=1;
			$this->player()->addOption($text);
		}else{
			$this->player()->addOption("You don't have any items!");
		}
	}
	
	
	function additem($params){
		if(!$_SESSION['containerItem']['addItemPrompt'])return ;
		$_SESSION['containerItem']=array();
		$item=$this->player()->getItemByID($params[0]);
		if($item){
			$this->player()->addMessage("You put your {$item->item->name} into your ".$this->itemRecord()->item->name.".");
			$this->itemRecord()->insertItem($item);
		}else{
			$this->player()->addMessage("You could not put that into your ".$this->itemRecord()->item->name.".");
		}
		
		
	}
	
	function viewContents($params){
		$count = 0;
		
		if(count($this->player()->items))foreach ($this->player()->items as $item){
			if($item->getObject()!=$this && $item->container->getObject()==$this){
				$text.="<br />{$item->item->name} (".$item->getUnmodifiedWeight()." lbs)";
				$count++;
			}
		}
		if($count){
			$text="Contents:".$text;
			$this->player()->addOption($text);
		}else{
			$this->player()->addOption("Your container is empty.");
		}
	}
	
	
	

}

?>