import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 140.112.42.108
s.connect(("127.0.0.1",12345))

while True:
    try:
        recm = s.recv(1000).decode('utf-8')
        if(len(recm)==0):
            break;
        print("Receive server message:")
        print(recm.rstrip())
        senm = input()
        s.send(senm.encode('utf-8'))
    except:
        print("sever socket closed")
