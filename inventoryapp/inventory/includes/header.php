<?php ob_start();
  require_once '../app/Mage.php';
  umask(0) ;
  Mage::app();
  $baseUrl = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB);
  define('SITE_URL',"http://192.168.3.12/magento162/");

  /*$header = new Mage_Zebra_Block_Adminhtml_Zebra;*/
?>
<!DOCTYPE HTML>
	<html <?php echo HTML_PARAMS; ?>>
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=<?php echo CHARSET; ?>">
			<title>Pordosol Inventory Management</title>
      <!-- <link rel="stylesheet" href="includes/css/ui-custom.css"> -->
			<!-- <link rel="stylesheet" href="includes/css/ui-lightness/jquery.ui.all.css"> -->
			<!-- <link rel="stylesheet" type="text/css" href="includes/css/jquery.qtip.min.css" /> -->
			<link rel="stylesheet" type="text/css" href="includes/css/stylesheet.css">
			<script src="includes/js/jquery-latest.js" type="text/javascript"></script>
			<script type="text/javascript" src="includes/js/general.js"></script>
			<script type="text/javascript" src="includes/js/jquery.qtip.min.js"></script>
			<script>
                jQuery(document).ready(function(){
                    var site_path = '<?php echo $baseUrl; ?>';
                    jQuery.ajax({
                            url: site_path+"test_session.php",
                            type:"GET",
                            async:false,
                            success:function(data){
                                if(data == 0) {
                                    window.location="<?php echo $baseUrl; ?>index.php/admin";
                                } else if(data == 1) {
                                    jQuery("#temp").css("display","block");    
                                }
                                
                            }
                        });
                });
      </script>
    </head>
		<body id="temp" style="display: none;">
      <noscript><b>Your browser does not support JavaScript!</b></noscript>	
        <section id="bodyWrapper"> 
          <section id="pageWrapper"> 
            <header id="header">
              <section class="logo"> 
                <a href="index.php"><img src="includes/images/logo.png" alt=""></a> 
              </section>
              <div class="clear"></div>
            </header>
              
            <section id="containar">
              <div class="containar_t"></div>
              <section class="containar">
                <section class="content">
						
                  <div style="margin: 10px 0px 40px 0px;" >
                      <div style="width:450px;">
                        <h2 style="color: #2E2D2D;font-family: Lucida Sans Unicode,Lucida Grande,sans-serif;
											font-size: 22px; margin:0px;">Inventory Management : 
                    </h2>
                  </div>
									
                  <div style=" float:left;">
                    <div id="content" style=" float: right;left: 145px; position: relative;top: -1px;width: 24px;">
										</div>
								  </div>
							</div>
          
			
