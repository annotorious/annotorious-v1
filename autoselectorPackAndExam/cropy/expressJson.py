import zipfile
import datetime
import os

class ExpressJson():
    def express(self, zp, path, img):
        zp.write(path + "/" + img)

    def express_all_json(self, zp):
        path = "../cropbefore"
        for img in os.listdir(path):
            if img.rfind('.json') > 0:
                #print(path + "/" + img)
                self.express(zp,path,img)
                
        return 1

    def run(self):
        time = datetime.datetime.now()
        now = str(time.year) + str(time.month) + str(time.day) + str(time.hour) + str(time.minute)
        
        zp = zipfile.ZipFile(now + "_jsonExpr.zip", "w")
        isTrue = self.express_all_json(zp)
        zp.close()

        if isTrue != 1:
            print("error")
