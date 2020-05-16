from openpyxl import load_workbook
import requests
import time
from bs4 import BeautifulSoup
import json
import re

wb = load_workbook(filename = '/Users/PJ/cdv/points.xlsx')
sheet_id1 = wb['points']
#sheet_id2 = wb['liens']

row = 0

for n1 in range(2,4043):
    cell_lat= "A" + str(n1)
    cell_lon= "B" + str(n1)

    lat = sheet_id1[cell_lat].value
    #print(lat)
    lon = sheet_id1[cell_lon].value
    #print(lon)
    url_ok = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=650e87c48c00d39cb61a9fd3dbab62a1&lat=" + str(lat) + "&lon=" + str(lon) + "&radius=0.1&extras=geo&format=json&jsoncallback=?"
    print(url_ok)

    #extras=geo

    response= requests.get(url_ok)      
    time.sleep(1)
    source_code = response.text
    #print(source_code)
    
    result = re.fullmatch('[ ]*jsonFlickrApi[ ]*\((.+?)\)[ ]*', source_code)
    jsonparsed = (json.loads(result.group(1)))

    photos = jsonparsed["photos"]["photo"]

    for n2 in range(0,len(photos)):
        print(photos[n2])

    #url_ok = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=650e87c48c00d39cb61a9fd3dbab62a1&lat=" + str(lat) + "&lon=" + str(lon) + "&radius=0.1&extras=url_m&format=json&jsoncallback=?"


    
 #   jsonparsed = json.loads(source_code)
   # print(jsonparsed)

 #   photos = jsonparsed["photos"]
    
    #print(photos)

#    url_ok = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=650e87c48c00d39cb61a9fd3dbab62a1&lat=" + str(lat) + "&lon=" + str(lon) + "&radius=0.1&extras=geo&format=json&jsoncallback=?"
 #  print(url_ok)
