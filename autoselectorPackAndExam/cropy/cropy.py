from PIL import Image as CROPPER
import simplejson as JSON
import os, sys

class CropImage():
        def start_crop(self, imgSrc, jsnSrc):
                #Openning image file use to PIL lib.
                img = CROPPER.open(imgSrc)
                print(*self.crop(jsnSrc, img))

        def crop(self, jsonSrc, img):
                lines = open(jsonSrc)

                width = img.getbbox()[2]
                height = img.getbbox()[3]
                print("pixel : " + str(img.getbbox()))

                for line in lines:
                        jsonData = JSON.loads(line) #JSON.loads(line, dict) #json to str.
                        tag = jsonData['tag']
                        
                        x = jsonData["imageLocation"].split("/")
                        rowSize = len(x)
                        imgName = x[rowSize - 1].split(".")[0]
                        perX = jsonData['anno']['x']
                        perY = jsonData['anno']['y']
                        
                        setX = perX * width
                        setY = perY * height
                        print(setX,setY)
                        #print(str(int(setWidth)) + "  " + str(int(setHeight)))
                        
                        yield self.annotation(img, tag, imgName, setX, setY) #generate function.

        def annotation(self, img, tag, name, X, Y):
                a = (X,Y,X+64,Y+64)
                cropping = img.crop(a)
                i = 0
                while True:
                        isFileCountN = name + "_" + tag + "_" + str(i) + ".jpg"

                        d = os.path.exists(isFileCountN)
                        if d != True:
                                print("no exists")
                                return cropping.save(isFileCountN,"JPEG")
                        
                        i = i + 1

                #cropping.save(jsonData['tag'], "JPEG")

        def run(self, arrays):
                path = "../cropbefore/"
                i = 0
                length = len(arrays)
                while True:
                        if(i >= length):
                                break
                        img = arrays[i]
                        i += 1
                        json = arrays[i]
                        self.start_crop(path + img,path + json)
                        i += 1
                        
                      

def image_list():
        imgFiles = os.listdir("../cropbefore")
        imgList = []
        for img in imgFiles:
                if(img.rfind(".jpg") > 0):
                        ImageAndJsonArray.append(img)

def json_list():
        imgFiles = os.listdir("../cropbefore")
        imgList = []
        for img in imgFiles:
                if(img.rfind(".json") > 0):
                        ImageAndJsonArray.append(img)



ImageAndJsonArray = []
if __name__ == "__main__":
        crop = CropImage()
        #test image src

        image_list()
        json_list()
        ImageAndJsonArray.sort()
        crop.run(ImageAndJsonArray)
        
        
        #crop.start_crop(img)


