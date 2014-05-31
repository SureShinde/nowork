<?php 
include('includes/header.php');
$productId = $_GET['id'];
$productObj = Mage::getModel('catalog/product')->load($productId);
  	
//echo "<pre>"; print_r($productObj->getData()); echo "</pre>"; 

?>

<div class="attributeCon">
<?php 
	$attribute = Mage::getModel('eav/config')->getAttribute('catalog_product', 'clothtype');
	  foreach ($attribute->getSource()->getAllOptions(true, true) as $instance) {
	      	if($instance['label'] != "")
	      	{
	      		$optionsArray[$instance['value']] = $instance['label'];
	      	}
	    }

        // echo "<pre>"; print_r($optionsArray); echo "</pre>"; 
?>
<select id="options" >
	<?php
		foreach ($optionsArray as $key => $value) {
			?>
				<option><?php echo $value ?></option>
			<?php
		}
	?>
</select>
<h2><a href="#" id="addScnt">Add Another Input Box</a></h2>


<script type="text/javascript">

jQuery(document).ready(function () {

	jQuery("#addScnt").click(function () {

		

	})

})

</script>
<?php 
include('includes/footer.php');
 
?>