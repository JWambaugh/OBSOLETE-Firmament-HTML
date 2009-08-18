<?php
require_once("linkList.class.php");
class pageLinks extends linkList {

	public $pageCount;
	public  $itemCount;
	public  $currentPage;
	public  $itemsPerPage;
	public $maxPages=1000;
	public function __construct($itemCount, $currentPage,$title=null,$format=null,$itemsPerPage=20){
		parent::__construct();	//execute the linkList constructor first
		$this->currentPage=$currentPage;
		$this->itemCount=$itemCount;
		$this->itemsPerPage=$itemsPerPage;
		$this->calculatePages();
		if(isset($title)){
			$this->addCategory($title);
		}
		if(isset($format)){
			$this->makeLinks($format);
		}


		//validate our values
		$this->validate();
		
		return $this;
	}
	/**
	 * calculates the number of pages there are
	 *
	 */
	private function calculatePages(){
		$this->pageCount=(int)ceil(($this->itemCount/$this->itemsPerPage));
		if($this->pageCount<1)$this->pageCount=1;
	}



	/**
 * validates the data
 *
 */
	private function validate(){
		//current page cannot be more than the pages we have
		if($this->currentPage > $this->pageCount){
			error_log("pageLinks.class.php: Current page is a page that doesn't exist.");
			$this->currentPage=$this->pageCount;
		}

		//pages start at one, so we can't have anything less.
		if($this->currentPage < 1){
			$this->currentPage=1;
		}

		//we have to have at least one item per page.
		if($this->itemsPerPage<1){
			$this->itemsPerPage=1;
		}
	}

	/**
	 * Generates the links based off the format string you pass it.
	 * makelinks inserts the page number where it finds a %p.
	 * and example format sring would be:
	 * http://www.forrent.com/search/page%p.html
	 * 
	 * makeLinks would then generate links to 
	 *  http://www.forrent.com/search/page1.html, 
	 * http://www.forrent.com/search/page2.html etc.
	 *
	 * @param string $hrefFormat
	 */
	public function makeLinks($hrefFormat){
		for($x=0;$x<$this->pageCount;$x++){
			$link=new link(str_replace("%p",$x+1,$hrefFormat),$x+1);
			$this->addLink($link);
		}
	}

	/**
 * returns a string containing the pagination links
 *
 * @return string
 */
	public function printCatLinks(){
		$buffer="";
		$catcount=0;
		//debug($this->links);
		
		if(count($this->links)>0){
			foreach($this->links as $k=>$catagories){

				if($catcount==$this->catLocation){
					$linkNum=count($catagories['links']);
					if($linkNum<2){
						return false;
					}

					$count=0;
					$start=$this->currentPage-5;

					if($start<0)$start=0;
					//print the 'previous' link
					if($this->currentPage>1){
						$buffer.="<a href=\"{$catagories['links'][$this->currentPage-2]->href}\"><<< Prev.</a> ";
					}
					for($x=$start;$x<$linkNum&&$x<(10+$start)&&$x<$this->maxPages;$x++){

						if($x+1==$this->currentPage){
							$buffer.="<strong>{$catagories['links'][$x]->text}</strong>";
						}else{
							$buffer.=$catagories['links'][$x]->makeHTML();
						}
						$count++;
						if(($start+$count)<$linkNum && $x<($this->maxPages-1) && $x<(9+$start)){
							$buffer.=" ";
						}

					}
					if($this->currentPage<$this->maxPages&&$this->currentPage<$linkNum){
						$buffer.=" <a href=\"{$catagories['links'][$this->currentPage]->href}\">Next >>></a>";
					}
					return($buffer);
				}
				$catcount++;
			}
		}
		return($buffer);
	}


}


?>