<?php

	/*echo '<pre>';
	print_r($_GET);
	exit;*/
	
	require_once '../../../../../app/Mage.php';
	umask(0);
	Mage::app('default');



	// ------------ prod collection for image
	$productImageModel = Mage::getModel('catalog/product');
	// ------------ prod collection for image


	// all simple product count 
	/*$allSimpleProductCollection = Mage::getResourceModel('catalog/product_collection')->joinField(
    'qty',
    'cataloginventory/stock_item',
    'qty',
    'product_id=entity_id',
    '{{table}}.stock_id=1',
    'left'
	); 
	$allSimpleProductCollection->addAttributeToFilter('type_id','simple');
  	$allSimpleProductCollection->addAttributeToSelect('*');
	
	$allSimpleProductCollection->addAttributeToSort('entity_id','asc');
	$allSimpleFilteredProductCount = $allSimpleProductCount;
	if ( isset($_GET['sSearch']) && $_GET['sSearch'] != "" )
	{
		if ( isset($_GET['bSearchable_'.$i]) && $_GET['bSearchable_'.$i] == "true" )
			{
				$allSimpleProductCollection->addFieldToFilter(array(
				array('attribute'=>'name','like'=>"%Dixie")
				
				));
			}
			
			$gg = 0;
			foreach($allSimpleProductCollection as $allSimpleProductCollectiona)
			{	
				$gg++;
			}
			echo $gg;
		
			
	}*/
	
	//end  all simple product count 




	// ------------ prod collection

	//get only default product
	$simpleProductCollection = Mage::getModel('cataloginventory/stock_item')->getCollection()
	       ->addFieldToFilter('type_id', 'simple');//filter by simple products
	             
	    $_productIds = array();
	             
	    foreach ($stockCollection as $item) //get all product  ids
	   {
	        $_productIds[] = $item->getOrigData('product_id');
	    }
	//end get only default product




	$collection = Mage::getResourceModel('catalog/product_collection')->joinField(
    'qty',
    'cataloginventory/stock_item',
    'qty',
    'product_id=entity_id',
    '{{table}}.stock_id=1',
    'left'
	); 


	$collection->addAttributeToFilter('type_id','simple');
	$collection->addAttributeToSelect('*');

	if ( isset( $_GET['iSortCol_0'] ) )
	{	
	
		for ( $i=0 ; $i<intval( $_GET['iSortingCols'] ) ; $i++ )
		{
			if ( $_GET[ 'bSortable_'.intval($_GET['iSortCol_'.$i]) ] == "true" )
			{
				
				if($_GET['iSortCol_'.$i] == 2)	
				{
					$collection->addAttributeToSort('name',$_GET['sSortDir_'.$i]);
				}
				elseif($_GET['iSortCol_'.$i] == 6)	
				{
					$collection->addAttributeToSort('price',$_GET['sSortDir_'.$i]);
				}
				elseif($_GET['iSortCol_'.$i] == 7)	
				{
					$collection->addAttributeToSort('qty', $_GET['sSortDir_'.$i]);
				}
				else
				{
					$collection->addAttributeToSort('entity_id',$_GET['sSortDir_'.$i]);
				}
			}
		}
		
		
	}
	
	
	/* 
	 * Filtering
	 */
	if ( isset($_GET['sSearch']) && $_GET['sSearch'] != "" )
	{
		if ( isset($_GET['bSearchable_'.$i]) && $_GET['bSearchable_'.$i] == "true" )
			{
				$collection->addFieldToFilter(array(
				array('attribute'=>'name','like'=>"%".$_GET['sSearch']."%"),
				array('attribute'=>'price','like'=>"%".$_GET['sSearch']."%"),
				array('attribute'=>'entity_id','like'=>"%".$_GET['sSearch']."%"),
				array('attribute'=>'qty','like'=>"%".$_GET['sSearch']."%"),
				));
			}
	}
	
	/* 
	 * Paging
	 */
	$iTotal = count($collection->getData());
/*echo "<pre>";
print_r($collection->getData());
die;*/
/*	if ( isset( $_GET['iDisplayStart'] ) && $_GET['iDisplayLength'] != '-1' )
	{
			$collection->setPage($_GET['iDisplayStart'],$_GET['iDisplayLength']);
	}*/
	

	

	$iFilteredTotal =count($collection->getData());
	
	//echo "<pre>";
//print_r($collection->getData());


	

	
	/*
	 * Output
	 */
	$output = array(
		"sEcho" => intval($_GET['sEcho']),
		"iTotalRecords" => $iTotal,
		"iTotalDisplayRecords" => $iTotal,
		"aaData" => array()
	);



	$i = 0; 
	$j = 1; 
	foreach($collection as $_testproduct)
	{	
		
		if($_GET['iDisplayStart'] <= $i )
		{
			$row = array();
			//id
			$row[] = $_testproduct->getId();

			//product image
			$_prod = $productImageModel->loadByAttribute('sku', $_testproduct->getSku());
			$v =$_prod->getImageUrl();
			$img = '<img src="'.$v.'" height="125px" width="125px">';
			$row[] =	$img;

			//name
			$row[] = $_testproduct->getName();


			//size, color and colour image
			$productCustomAttribute = Mage::getModel('catalog/product')->load($_testproduct->getId());
			$row[] = $productCustomAttribute->getAttributeText('size');
			$row[] = $productCustomAttribute->getAttributeText('color');
			$productThumbnail = $_prod->getThumbnailUrl();
			$thumbImg =  '<img src="'.$productThumbnail.'" height="75px" width="75px">';
			$row[] = $thumbImg;



			//price
			$row[] = number_format ($_testproduct->getPrice(), 2);

			//qty
			$row[] = number_format (Mage::getModel('cataloginventory/stock_item')->loadByProduct($_testproduct)->getQty(), 0);
			
			

			$output['aaData'][] = $row;
			if($j == $_GET['iDisplayLength'])
			{
				
				break;
			}
			$j++;
		}
		
		$i++;

	}
	echo json_encode( $output );
?>


