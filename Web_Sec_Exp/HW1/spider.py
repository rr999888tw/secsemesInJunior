import numpy as np
import urllib3

http = urllib3.PoolManager()


def requestStatus(str1,str2):
	try:
		r = http.request('GET', str1+str2)
		# print (r.status)
		return (r.status)
	except:
		return 0
		# print("this is shit")

target = 'http://www.lmsh.tn.edu.tw/'

myfile = open("all.txt","r")


temp = myfile.read().splitlines()
# print(temp)

# requestStatus(target,"")
size = len(temp)
sucArr = []

for i in range(0, size):
	ret = requestStatus(target, temp[i])
	if(ret == 200):
		sucArr.append(target+temp[i])
		print(target+temp[i])
		print(" try " + str(i+1) + " times , success " + str(len(sucArr)) +" times.")
	if(i % 1000 == 0):
		print(" try " + str(i+1) + " times , success " + str(len(sucArr)) +" times.")
 
print(sucArr)


wFile = open('valid_links.txt','w')
for i in sucArr:
    wFile.write(str(i))
    wFile.write('\n')



