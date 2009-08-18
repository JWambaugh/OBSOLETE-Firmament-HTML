<?php

class SmallBag extends BaseContainerItem{
	function onInsertItem(PlayerItem $item){
		true;
	}
	
	/**
	 * modifies the weight of items in the container
	 *
	 * @param int $baseWeight
	 * @return int
	 */
	function getWeight($baseWeight){
			return (int)($baseWeight/1.3);
		}
}


?>