<?php

require 'aws-autoloader.php';

use Aws\DynamoDb\Marshaler as Ms;
use Aws\DynamoDb\Exception\DynamoDbException as dbExpt;

date_default_timezone_set('UTC');
$client = new Aws\DynamoDb\DynamoDbClient([
	'region' => 'ap-northeast-2',
	'version' => 'latest',
	'profile' => 'dynamoDB_user'
]);
#print_r($client);
/* Describe table
   $result = $client->describeTable([
   'TableName' => 'simpleImgInfoTable_kookmin',
   ]);
 */

$result = $client->getItem(array(
	'AttributesToGet' => ['image'],
	'ConsistentRead' => true,
	'Key' => [
		'testNum' => [
		'N' => '1']
	],
	'TableName' => 'simpleImgInfoTable_kookmin',
));

$test = strstr($result, "{"); // 모델링 오류 ??? 
echo $test;
?>

