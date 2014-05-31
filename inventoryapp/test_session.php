<?php
//error_reporting(1);
// Include Magento application
require_once ( "app/Mage.php" );
umask(0);
// Initialize Magento
Mage::app("default");

// You have two options here,
// "frontend" for frontend session or "adminhtml" for admin session

Mage::getSingleton("core/session", array("name" => "adminhtml"));
$session = Mage::getSingleton("admin/session");
$adminUserData = $session->getData();
if(isset($adminUserData['user'])) {
    echo "1";
} else {
    echo "0";
}
?>