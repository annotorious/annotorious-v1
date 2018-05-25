<?php
$getData = $_POST["data"];
$getName =  $_POST["name"];

if(!empty($getData)){
	
	echo $getName;
	$savePath = "/var/www/html/jsondata/";
	$fileName = $savePath.$getName.".json"; // join path.
	echo $fileName;
	
	if(file_exists($fileName)){
		echo "ex";
		$fp = fopen($fileName, 'a');
	} else {
		echo "no";
		$fp = fopen($fileName, 'w');
	}
	
	fwrite($fp, $getData);
	fwrite($fp, "\n");
	fclose($fp);

} else {
	echo "noting data";
}

clearstatcache();	
?>
