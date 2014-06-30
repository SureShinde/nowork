<?php
class NextBits_BannerNext_Block_Adminhtml_Bannernext_Edit_Tab_Gallery extends Mage_Adminhtml_Block_Widget {

    public function __construct()
    {
        parent::__construct();
        $this->setTemplate('bannernext/edit/tab/gallery.phtml');
    }

    protected function _prepareLayout()
    {
        $this->setChild('uploader',
            $this->getLayout()->createBlock('adminhtml/media_uploader')
        );

        $this->getUploader()->getConfig()
            ->setUrl(Mage::getModel('adminhtml/url')->addSessionParam()->getUrl('*/*/upload'))
            ->setFileField('image')
            ->setFilters(array(
                'images' => array(
                    'label' => Mage::helper('adminhtml')->__('Images (.gif, .jpg, .png)'),
                    'files' => array('*.gif', '*.jpg','*.jpeg', '*.png')
                )
            ));

        Mage::dispatchEvent('catalog_product_gallery_prepare_layout', array('block' => $this));

        return parent::_prepareLayout();
    }

    /**
     * Retrive uploader block
     *
     * @return Mage_Adminhtml_Block_Media_Uploader
     */
    public function getUploader()
    {
        return $this->getChild('uploader');
    }

    /**
     * Retrive uploader block html
     *
     * @return string
     */
    public function getUploaderHtml()
    {
        return $this->getChildHtml('uploader');
    }

    public function getJsObjectName()
    {
        return $this->getHtmlId() . 'JsObject';
    }

    public function getAddImagesButton()
    {
        return $this->getButtonHtml(
            Mage::helper('bannernext')->__('Add New Images'),
            $this->getJsObjectName() . '.showUploader()',
            'add',
            $this->getHtmlId() . '_add_images_button'
        );
    }

  /*   public function getImagesJson()
    {
		$model = Mage::registry('bannernext_data');
		if(isset($model['content']) && !empty($model['content'])){
			return $model->getData('content');
		}
		return '[]';		
    } */
	
	public function getImagesJson()
    {
		  $model = Mage::registry('bannernext_data');
		  if(isset($model['content']) && !empty($model['content'])){
			   $content = Mage::helper('core')->jsonDecode($model->getData('content'));
			   $this->aasort($content,"position");
			   $content = Mage::helper('core')->jsonEncode($content);
			   Mage::log($content,'7','77.log');
			   return $content;
			   //return $model->getData('content');
		  }
		  return '[]';
    }
	function aasort (&$array, $key) {
		$sorter = array();
		$ret = array();
		reset($array);
		foreach ($array as $ii => $va) {
		   $sorter[$ii]=$va[$key];
		}
		asort($sorter);
		foreach ($sorter as $ii => $va) {
		   $ret[]=$array[$ii];
		}
		$array = $ret;
	}
    public function getImagesValuesJson()
    {
        $values = array();
        foreach ($this->getMediaAttributes() as $attribute) {
            /* @var $attribute Mage_Eav_Model_Entity_Attribute */
            //$values[$attribute->getAttributeCode()] = $attribute->getValue();
        }
        return Mage::helper('core')->jsonEncode($values);
    }

    /**
     * Enter description here...
     *
     * @return array
     */
    public function getImageTypes()
    {
        $imageTypes = array();
		
        foreach ($this->getMediaAttributes() as $attribute) {
            /* @var $attribute Mage_Eav_Model_Entity_Attribute */
            $imageTypes[$attribute->getAttributeCode()] = array(
                'label' => $attribute->getLabel(),                         
                'field' => $attribute->getLabel()
            );
        }
        return $imageTypes;
    }

    /* public function hasUseDefault()
    {
        foreach ($this->getMediaAttributes() as $attribute) {
            if($this->getElement()->canDisplayUseDefault($attribute))  {
                return true;
            }
        }

        return false;
    } */

    /**
     * Enter description here...
     *
     * @return array
     */
    public function getMediaAttributes()
    {
		$attributeCollection = new Varien_Data_Collection();
		
		$attribute1 = new Varien_Object();
		$attribute1->setAttributeCode('attribute1');
		$attribute1->setLabel('attribute1');
		$attributeCollection->addItem($attribute1);
		
		$attribute2 = new Varien_Object();
		$attribute2->setAttributeCode('attribute2');
		$attribute2->setLabel('attribute2');
		//$attributeCollection->addItem($attribute2);
		
        return $attributeCollection;//$this->getElement()->getDataObject()->getMediaAttributes();
    }

    public function getImageTypesJson()
    {
        return Mage::helper('core')->jsonEncode($this->getImageTypes());
    }
	
	
	protected function getStoreId()
    {
        return Mage::app()->getStore(true)->getId();
    }
	
}