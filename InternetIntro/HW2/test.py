import socket

HOST, PORT = '', 8888

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
s.bind((HOST, PORT))
s.listen(1)

while True:
    client, address = s.accept()
    request = client.recv(1000).decode('utf-8')
    print(request)

    response = "Hello World!!\n\n"

    client.sendall(bytes(response.encode('utf-8')))
    client.close()
