import socket

UDP_IP = "127.0.0.1"
UDP_PORT = 5005

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) 
                    # Internet # UDP
sock.bind((UDP_IP, UDP_PORT))
count = 0


while True:
    data, addr = sock.recvfrom(1024) # buffer size is 1024 bytes
    print ("received message:", data)
    count += 1
    print(count)

# a = sock.getsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF)
# print(a)
# print(type(a))
# a = sock.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, socket.SO_RCVBUF*8)
# a = sock.getsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF)
# print(a)
# print(type(a))