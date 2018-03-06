#from array import array
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def sigmoid(x):
	return 1/(1+np.exp(-x))

def mse(prediction, groundtruth):
	return (( prediction - groundtruth )**2 )/2

# z(x,w,b)
def nn(inp, weight, bias):
	return (inp* weight+ bias)

def croEntrLoss(prediction, groundtruth):
	return -1* (groundtruth* np.log(prediction)+ (1- groundtruth)* np.log(1- prediction))




def derOfCroEntroLoss(inp, weight, bias):
	return sigmoid(nn(inp, weight, bias))


# paramaters able to be modified
x = 1
y = 0
learningrate = 0.005
Epochs = 300
w = 2
b = 2
f = []
n = []


#'''
for i in range(1, Epochs+1):
	w -= learningrate * derOfCroEntroLoss(x,w,b)
	b -= learningrate * derOfCroEntroLoss(x,w,b)
	f.append(croEntrLoss(sigmoid(nn(x,w,b)), y))
	n.append(i)
#'''

plt.plot(n,f)
plt.show()














