<?php 
		define('ZEN_DB_PREFIX', '');
		define('DB_PREFIX', '');
		define('DB_SERVER', 'localhost');
		define('DB_SERVER_USERNAME', 'root');
		define('DB_SERVER_PASSWORD', 'root');
		define('DB_DATABASE', 'pordosol');
		define('SERVER_IP', '192.168.4.26');
		
		mysql_connect(DB_SERVER, DB_SERVER_USERNAME, DB_SERVER_PASSWORD) or die(mysql_error());
		mysql_select_db(DB_DATABASE) or die(mysql_error());
		$tokenId='jHtIoV4maJ411VT';
?>