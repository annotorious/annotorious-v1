import boto_client_configure as conf
import boto_upload_S3
import expressJson
import os

if __name__ == "__main__":
    
    croppedBucket = 'hjkim-serverless-cropped'
    jsonBucket = 'hjkim-serverless-jsonbucket'

    #boto client configuration for AWS_Access
    aws = conf.AWSManager()
    s3 = boto_upload_S3.S3()
    client = aws.config_s3('s3')
    exp = expressJson.ExpressJson()
    exp.run()

    #upload cropped Image
    bucketList = s3.get_bucketList(client)
    #print(bucketList)
    myBucket = s3.selection_bucket(bucketList, croppedBucket)
    #print(myBucket)
    
    isTrue = s3.upload_bucket_all_img(client,myBucket)

    #upload Json
    if(isTrue == 1):
        myBucket = s3.selection_bucket(bucketList, jsonBucket)
        isTrue = s3.upload_bucket_all_jsonZip(client, myBucket)

