<?php 
include('includes/header.php');
  require_once '../app/Mage.php';
  umask(0);
  Mage::app('default');

?>

<section>
	<link rel="shortcut icon" type="image/ico" href="images/favicon.ico" />
  <style type="text/css" title="currentStyle">
    @import "DataTablesGrid/media/css/demo_page.css";
    @import "DataTablesGrid/media/css/demo_table.css";
  </style>
  <script type="text/javascript" language="javascript" src="DataTablesGrid/media/js/jquery.js"></script>

  <script type="text/javascript" charset="utf-8">
    /*$(document).ready(function() {
        var oTable = $('#example').dataTable( {
          "bProcessing": true,
          "bServerSide": true,
          "bSortClasses": false,
          "aoColumns": [ { "sClass": "center" }, 
                         { "bSortable": false, "sClass": "center" }, 
                         {  "sClass": "center" }, 
                         { "bSortable": false, "sWidth": "60px","sClass": "center" }, 
                         { "bSortable": false, "sClass": "center" },
                         { "bSortable": false, "sClass": "center" },
                         {  "sClass": "center" },
                          { "bSearchable": false, "sWidth": "60px","sClass": "qty center"  }  ],
          "sAjaxSource": "DataTablesGrid/examples/server_side/scripts/server_processing.php",
          "fnCreatedRow": function( nRow, aData, iDataIndex ) {
              $(nRow).attr('id', aData[0]);
          },
          "fnDrawCallback": function () {
          $('#example tbody td.qty').editable( 'DataTablesGrid/examples/examples_support/editable_ajax.php', {
              "placeholder" : "Processing..", 
              "callback": function( sValue, y ) { 
                   
                    var aPos = oTable.fnGetPosition( this );
                    oTable.fnUpdate( sValue, aPos[0], aPos[1] );
                },
                "submitdata": function ( value, settings ) {
                    
                    return {
                        "row_id": this.parentNode.getAttribute('id'),
                        "column": this.getAttribute('class')+"-"+oTable.fnGetPosition( this )[2]
                    };
                },
                "height": "14px",
                "width": "100%"
            } );
          }
        } );
      } );*/
  </script>
<div id="productCollection">

<?php



  // ------------ prod collection for image
   $_product = Mage::getModel('catalog/product');
  $productCollection =$_product->getCollection()->addFieldToFilter('status',"1");;

  foreach ($productCollection as $key => $value) {
    $productObj = Mage::getModel('catalog/product')->load($value->getId());

    
   ?>
      <div class="productCon">
          <div class="productRow"><a href="<?php echo $baseUrl ?>inventory/editproduct.php?id=<?php echo $value->getId(); ?>"> <?php echo $productObj->getName() ?></a></div>
      </div>
   <?php
  }
  
?>
</div>
  <div id="dynamic">
    



  </div>
      <div class="spacer"></div>
</section>

<?php include('includes/footer.php');?>