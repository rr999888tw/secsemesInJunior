import socket
import time


UDP_IP = "127.0.0.1"
# "172.20.10.3"
UDP_PORT = 5005
MESSAGE = b"Hello, World!"

print ("UDP target IP:", UDP_IP)
print ("UDP target port:", UDP_PORT)
print ("message:", MESSAGE)

sock = socket.socket(socket.AF_INET, # Internet
                     socket.SOCK_DGRAM) # UDP

for i in range(10000):
    sock.sendto(MESSAGE, (UDP_IP, UDP_PORT))
    time.sleep(0.0001)
