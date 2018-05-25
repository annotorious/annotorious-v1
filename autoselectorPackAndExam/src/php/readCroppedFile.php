<?php
$getData = $_GET["data"];

if(!empty($getData)){
	
	//echo $getData.$getTag;
    $cropDir = "../cropy/";

    $fp = opendir($cropDir);
    $cropyFiles = array();

    while(false !== ($fileName = readdir($fp))){
        if($fileName !== "." || $fileName !== ".." || !strrpos($fileName, ".jpg")){
            if(strpos($fileName, $getData) !== false ){
			echo $cropDir.$fileName."\n";
		}
        }
    }
    closedir($fp);

} else {
	echo "noting data";
}

clearstatcache();	

?>
