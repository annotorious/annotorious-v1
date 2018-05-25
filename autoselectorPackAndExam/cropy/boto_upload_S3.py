import boto3 as bt
import simplejson as JSON
import os, sys


class S3():
    def get_bucketList(self, client):
        BUCKETLIST = client.list_buckets()
        return BUCKETLIST

    def selection_bucket(self, BUCKETLIST, argv):
        #argv String = 'bucket name'
        for bucket in BUCKETLIST['Buckets']:
            if bucket['Name'] == argv:
                return bucket['Name']


    def upload_bucket_all_img(self, client, bucket):
        for img in os.listdir('.'):
            if img.rfind('.jpg') > 0:
                path = os.getcwd()
                
                try:
                    client.upload_file(path + "/" + img, bucket, img)
                except Exception as e:
                    print(e)
                    return 0

        return 1

    def upload_bucket_all_jsonZip(self, client, bucket):
        for jsonZip in os.listdir('.'):
            if jsonZip.rfind('.zip') > 0:

                path = os.getcwd()
                
                try:
                    client.upload_file(path + "/" + jsonZip, bucket, jsonZip)
                except Exception as e:
                    print(e)
                    return 0

        return 1


    
                
