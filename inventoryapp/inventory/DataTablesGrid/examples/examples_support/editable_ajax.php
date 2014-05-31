<?php

	/*print_r($_POST);
	echo $_POST['value'].' (server updated)';*/

	
	

	require_once '../../../../app/Mage.php';
	umask(0);
	
	Mage::app('default');
	$websites = Mage::app()->getWebsites();

    $product_id = $_POST['row_id'];



 	$stockQty = $_POST['value'];
    $product = Mage::getModel('catalog/product')->load($product_id);
   
    if (!($stockItem = $product->getStockItem())) 
    {
    	$stockItem = Mage::getModel('cataloginventory/stock_item');
    	$stockItem->assignProduct($product);
	}
	$stockItem->setData('qty', $stockQty)->save();



?>