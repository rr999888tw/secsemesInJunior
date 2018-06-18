
import os
import time
from scapy.all import *
#from pcapng.scanner import FileScanner
import numpy as np
import os
import multiprocessing as mp
import pickle as pk
from utils import *



with open('objs/fileName2Application.pickle', 'rb') as f:
    dict_name2label = pk.load(f)


def pkts2X(pkts):
    X = []
    lens = []
    for p in pkts:
        #===================================
        # step 1 : remove Ether Header
        #===================================
        r = raw(p)[14:]
        r = np.frombuffer(r, dtype = np.uint8)
        #p.show()
        #===================================
        # step 2 : pad 0 to UDP Header
        # it seems that we need to do nothing this step
        # I found some length of raw data is larger than 1500
        # remove them.
        #===================================
        if (TCP in p or UDP in p):
            """
            if UDP in p:
                # todo : padding 0 to 
                print ('UDP', r[:20])
                print(p[IP].src, p[IP].dst)
            else :
                print('TCP', r[:20])
                print(p[IP].src, p[IP].dst)
            """
            if (len(r) > 1500):
                pass
            else:
                X.append(r)
                lens.append(len(r))
        else:
            pass
    return X, lens



def get_data_by_file(filename):
    pkts = rdpcap(filename)
    X, lens = pkts2X(pkts)
    # save X to npy and delete the original pcap (it's too large).
    return X, lens

def task(filename):
    global dict_name2label
    global counter
    head, tail = os.path.split(filename)
    if os.path.isfile(os.path.join('data', tail+'.pickle')):
        with lock:
            counter.value += 1        
        print('[{}] {}'.format(counter, filename))
        return '#ALREADY#'
    X, lens = get_data_by_file(filename)
    y = [dict_name2label[tail]] * len(X)
    with open(os.path.join('data', tail+'.pickle'), 'wb') as f:
        pk.dump((X, y), f)
    with lock:
        counter.value += 1
    print('[{}] {}'.format(counter, filename))
    return 'Done'


#=========================================
# mp init
#=========================================
lock = mp.Lock()
counter = mp.Value('i', 0)
cpus = mp.cpu_count()//2
pool = mp.Pool(processes=cpus)



todo_list = gen_todo_list('../pcaps')

#todo_list = todo_list[:3]

total_number = len(todo_list)

done_list = []
    
res = pool.map(task, todo_list)

print(len(res))


