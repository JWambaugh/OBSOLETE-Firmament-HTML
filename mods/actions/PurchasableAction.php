<?php

class PurchasableAction extends BaseAction {


	public function onDisplay(){
		$p=$this->params();
		if(!$p[0])$p[0]=1000000;
		$data=$this->player()->sector()->getData("purchase");

		if($data['owner']==$this->player()->id){
			$this->player()->addOption("You own this property.");
			if(!$data['forSale']){
				$this->player()->addOption("<a href='".$this->getActionURL("getOfferPrice",array())."'>Offer this property for sale.</a>");
				$_SESSION['purchase']['offerSectorID']=$this->player()->sector()->id;
			}else{
				$this->player()->addOption("This property is listed for sale for {$data['forSalePrice']} credits.");
				$this->player()->addOption("<a href='".$this->getActionURL("getOfferPrice",array())."'>Change asking price.</a>");
				$this->player()->addOption("<a href='".$this->getActionURL("takeOffMarket",array())."'>Take this property off market.</a>");
				$_SESSION['purchase']['offerSectorID'] = $this->player()->sector()->id;
				$_SESSION['purchase']['changeOfferSectorID'] =$this->player()->sector()->id;
			}
		}
		
		else if(!$data||!$data['owner']||$data['forSale']){
			$salePrice=$data['forSalePrice']? $data['forSalePrice']:$p[0];
			$_SESSION['purchase']['buySectorID']=$this->player()->sector()->id;
			$this->player()->addOption("This property is listed for sale for {$salePrice} credits.");
			$this->player()->addOption("<a href='".$this->getActionURL("buy",array())."'>Purchase this land</a>");
		}

	}

	public function buy($params){
		$p=$this->params();
		if(!$p[0])$p[0]=1000000;
		if($_SESSION['purchase']['buySectorID']!=$this->player()->sector()->id)return;
		$_SESSION['purchase']=array();
		$data=$this->player()->sector()->getData('purchase');
		if(!$data || ($data['forSale'] && !$data['owner'])){
			if($this->player()->subtractCredits($p[0]) === false){
				$this->player()->addMessage("You don't have enough money");
				return ;
			}
			$data["owner"]=$this->player()->id;
			$data["forSale"]=0;
			$this->player()->sector()->saveData('purchase',$data);
			$this->player()->addMessage("Successfully purchased this land!");

		}elseif($data['forSale']){
			$q=new Doctrine_Query();
			if($this->player()->subtractCredits($data['forSalePrice'])===false){
				$this->player()->addMessage("You don't have enough money");
				return ;
			}
			//sell our property
			$seller=$q->from('Player p')->where("p.id = ?")->fetchOne(array($data['owner']));
			$seller->addCredits($data['forSalePrice']);
			$seller->addMessage("Your property '{$this->player()->sector()->name}' has been purchased by {$this->player()->name} for {$data['forSalePrice']} credits.");
			$data['forSale']=0;
			$data['owner']=$this->player()->id;
			$this->player()->sector()->saveData('purchase',$data);
			$this->player()->addMessage("You purchased this property for {$data['forSalePrice']} credits.");
		}else{
			$this->player()->addMessage("This land is not for sale.");
		}
		
	}

	public function getOfferPrice($params){
		if($_SESSION['purchase']['offerSectorID']!=$this->player()->sector()->id)return;
		$_SESSION['purchase']=array();
		$_SESSION['purchase']['offerSetSectorID']=$this->player()->sector()->id;
		$this->player()->addOption("Offer this property for: <form action='".$this->getActionURL("submitOfferPrice")."' method='POST'><input type='text' name='propertyPrice' /><input type='submit' value='go'/></form>");

	}

	public function submitOfferPrice($params){
		
		if($_SESSION['purchase']['offerSetSectorID']!=$this->player()->sector()->id)return;
		if(!$_POST['propertyPrice']){
			$this->player()->addMessage("You did not enter a price. Your property is not for sale.");
			return;
		}else{
			$data=$this->player()->sector()->getData('purchase');
			if($data['owner']!=$this->player()->id)return;
			$data['forSale']=1;
			$data['forSalePrice']=(int)$_POST['propertyPrice'];
			$this->player()->sector()->saveData('purchase',$data);
			$this->player()->addMessage("Your property is now for sale for {$data['forSalePrice']} credits.");
		}
		$_SESSION['purchase']=array();

	}

	public function takeOffMarket(){
		if($_SESSION['purchase']['changeOfferSectorID']!=$this->player()->sector()->id)return;
		$_SESSION['purchase']=array();
		$data=$this->player()->sector()->getData('purchase');
		if($data['owner']!=$this->player()->id)return;
		$data['forSale']=0;
		$this->player()->sector()->saveData('purchase',$data);
		$this->player()->addMessage("Your property is no longer for sale.");
	}

}
?>