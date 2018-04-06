import socket

HOST, PORT = "", 12345


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
            requestNheaders = recm.split('\n')
            request = requestNheaders[0].split()
            command = request[0]
            path = "." + request[1]
            protocal = request[2]

            try:
                file = open(path,'r')
                response = file.read()
            except:
                response = "404 Not Found"
            
            client.send(b'HTTP/1.1 200 OK\n')
            client.send(b'Content-Type: text/html\n')
            client.send(b'\n') # header and body should be separated by additional newline
            client.sendall((response).encode('utf-8'))
            # client.send()
            client.close()
        except:
            print("except")









# class HTTPRequest(BaseHTTPRequestHandler):
#     def __init__(self, request_text):
#         self.rfile = StringIO(request_text)
#         self.raw_requestline = self.rfile.readline()
#         self.error_code = self.error_message = None
#         self.parse_request()

#     def send_error(self, code, message):
#         self.error_code = code
#         self.error_message = message
