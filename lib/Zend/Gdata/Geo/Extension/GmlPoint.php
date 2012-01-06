<?php

/**
 * Zend Framework
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://framework.zend.com/license/new-bsd
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@zend.com so we can send you a copy immediately.
 *
 * @category   Zend
 * @package    Zend_Gdata
 * @copyright  Copyright (c) 2005-2007 Zend Technologies USA Inc. (http://www.zend.com)
 * @license    http://framework.zend.com/license/new-bsd     New BSD License
 */

/**
 * @see Zend_Gdata_Extension
 */
require_once 'Zend/Gdata/Extension.php';

/**
 * @see Zend_Gdata_Geo
 */
require_once 'Zend/Gdata/Geo.php';

/**
 * @see Zend_Gdata_Geo_Extension_GmlPos
 */
require_once 'Zend/Gdata/Geo/Extension/GmlPos.php';


/**
 * Represents the gml:point element used by the Gdata Geo extensions.
 *
 * @category   Zend
 * @package    Zend_Gdata
 * @copyright  Copyright (c) 2005-2007 Zend Technologies USA Inc. (http://www.zend.com)
 * @license    http://framework.zend.com/license/new-bsd     New BSD License
 */
class Zend_Gdata_Geo_Extension_GmlPoint extends Zend_Gdata_Extension
{

    protected $_rootNamespace = 'gml';
    protected $_rootElement = 'Point';
    
    protected $_pos = null;
    
    /**
     * Create a new instance.
     * 
     * @param Zend_Gdata_Geo_Extension_GmlPos $pos (optional) Pos to which this
     *          object should be initialized.
     */
    public function __construct($pos = null) 
    {
        foreach (Zend_Gdata_Geo::$namespaces as $nsPrefix => $nsUri) {
            $this->registerNamespace($nsPrefix, $nsUri);
        }
        parent::__construct();
        $this->setPos($pos);
    }
    
    /**
     * Retrieves a DOMElement which corresponds to this element and all
     * child properties.  This is used to build an entry back into a DOM
     * and eventually XML text for application storage/persistence.
     *
     * @param DOMDocument $doc The DOMDocument used to construct DOMElements
     * @return DOMElement The DOMElement representing this element and all
     *          child properties.
     */
    public function getDOM($doc = null)
    {
        $element = parent::getDOM($doc);
        if ($this->_pos !== null) {
            $element->appendChild($this->_pos->getDOM($element->ownerDocument));
        }
        return $element;
    }

    /**
     * Creates individual Entry objects of the appropriate type and
     * stores them as members of this entry based upon DOM data.
     *
     * @param DOMNode $child The DOMNode to process
     */
    protected function takeChildFromDOM($child)
    {
        $absoluteNodeName = $child->namespaceURI . ':' . $child->localName;
        
        switch ($absoluteNodeName) {
            case $this->lookupNamespace('gml') . ':' . 'pos'; 
                $pos = new Zend_Gdata_Geo_Extension_GmlPos();
                $pos->transferFromDOM();
                $this->_pos = $pos;
                break;
        }
    }
    
    /**
     * Get the value for this element's pos attribute.
     *
     * @see setName
     * @return string The requested attribute.
     */
    public function getPos()
    {
        return $this->_pos;
    }

    /**
     * Set the value for this element's distance attribute.
     *
     * @param string $value The desired value for this attribute.
     * @return Zend_Gdata_Geo_Extension_Pos The element being modified.
     */
    public function setPos($value)
    {
        $this->_pos = $value;
        return $this;
    }
    

}
