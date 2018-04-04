import socket

HOST, PORT = "", 12344
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
s.bind((HOST, PORT))

while(True):
    s.listen(0)
    print("The P3 web server for HW2 is running..")

    while(True):
        client, address = s.accept()
        print(str(address)+" connected")
        try:
            recm = client.recv(1000).decode('utf-8')
            arr = recm.split('\n')
            print(arr[0])
            http_response = "hello world \n"
            # client.send(b"Welcome to HW2 P1 Local Server. Please give me your identity. What's your name?\n")
            client.sendall(bytes(http_response.encode('utf-8')))
            client.close()
        except:
            print("except")
