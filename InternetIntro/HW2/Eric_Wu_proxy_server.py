from socket import *
import sys
from _thread import *

max_buffer = 2**(12)
if len(sys.argv) <= 1:
    print('Usage : "python ProxyServer.py server_ip"\n[server_ip : It is the IP Address Of Proxy Server]')
    sys.exit(2)

# Create a server socket, bind it to a port and start listening
tcpSerSock = socket(AF_INET, SOCK_STREAM)
# Fill in start.
IP = (sys.argv[1]).partition(":")
HOST, PORT = IP[0], int(IP[2])
max_conn = 5;
tcpSerSock.bind((HOST, PORT))
tcpSerSock.listen(max_conn)
# Fill in end.
def recvall(sock):
    BUFF_SIZE = 4096 # 4 KiB
    data = b''
    while True:
        part = sock.recv(BUFF_SIZE)
        data += part
        if len(part) < BUFF_SIZE:
            # either 0 or end of data
            break
    return data
def conn_str(tcpCliSock, message):
    try:
        #message = recvall(tcpCliSock).decode('ascii')
        if(message == "12"):
            pass
        else:
            print("Message:\n"+message)
            # Extract the filename from the given message
            print(message.split()[1])
            filename = message.split()[1].partition("/")[2]
            print(filename)
            fileExist = "false"
            filetouse = "/" + filename
            print(filetouse)
            request = message.split()[1].partition("/")[2]
            file_req = request.partition(".")
            # Check wether the file exist in the cache
            if(file_req[len(file_req)-1] == "png"):
                image = open("./"+request, 'rb')
                fileExist = "true"
                body = image.read();
                http_req = bytes("HTTP/1.0 200 OK\nContent-Type: image/png\n\n", 'utf-8') + body
                tcpCliSock.send(http_req)
                image.close()
            elif(file_req[len(file_req)-1] == "mp4"):
                image = open("./"+request, 'rb')
                fileExist = "true"
                body = image.read();
                http_req = bytes("HTTP/1.0 200 OK\nContent-Type: video/mpeg4\n\n", 'utf-8') + body
                tcpCliSock.send(http_req)
                image.close()
            elif(file_req[len(file_req)-1] == "html"):
                html = open(request, 'r')
                fileExist = "true"
                body = html.read()
                http_req = bytes("HTTP/1.0 200 OK\nContent-Type: text/html\n\n"+body, 'ascii')
                tcpCliSock.send(http_req)
                html.close()
            print('Read from cache')
    except IOError:
        if (fileExist == "false"):
            # Create a socket on the proxyserver
            c = socket(AF_INET, SOCK_STREAM)
            #c = # Fill in start.		# Fill in end.
            hostn = filename.replace("www.","",1)
            print(hostn)
            try:
                # Connect to the socket to port 80
                # Fill in start.
                c.connect((HOST, 80))
                # Fill in end.
                # Create a temporary file on this socket and ask port 80 for the file requested by the client
                fileobj = c.makefile('wb', 0)
                req = bytes("GET /"+filename+" HTTP/1.0\n\n", 'utf-8')
                fileobj.write(req)
                print("Done!")
                # Read the response into buffer
                # Fill in start.
                #resp = (c.recv(max_buffer))
                resp = recvall(c)
                resp = resp.partition(b'\n\n')
                # Fill in end.
                # Create a new file in the cache for the requested file.
                # Also send the response in the buffer to client socket and the corresponding file in the cache
                # Fill in start.
                tmpFile = open("./" + filename, "wb")
                File = b""
                for i in range(2, len(resp), 1):
                    File += resp[i]
                tmpFile.write((File))
                tmpFile.close()
                fileobj.close()
                # Fill in end.
            except Exception as e:
                print("Illegal request")
                print(e)
        else:
            # HTTP response message for file not found
            # Fill in start.
            print("Repnse error")
    tcpCliSock.close()
while 1:
    # Strat receiving data from the client
    print('Ready to serve...')
    tcpCliSock, addr = tcpSerSock.accept()
    print('Received a connection from:', addr)
    message = recvall(tcpCliSock).decode('ascii')
#    start_new_thread(conn_str, (tcpCliSock, message))
    try:
        #message = recvall(tcpCliSock).decode('ascii')
        if(message == ""):
            continue
        else:
            print("Message:\n"+message)
            # Extract the filename from the given message
            print(message.split()[1])
            filename = message.split()[1].partition("/")[2]
            print(filename)
            fileExist = "false"
            filetouse = "/" + filename
            print(filetouse)
            request = message.split()[1].partition("/")[2]
            file_req = request.partition(".")
            # Check wether the file exist in the cache
            if(file_req[len(file_req)-1] == "png"):
                image = open("./"+request, 'rb')
                fileExist = "true"
                body = image.read();
                http_req = bytes("HTTP/1.0 200 OK\nContent-Type: image/png\n\n", 'utf-8') + body
                tcpCliSock.send(http_req)
                image.close()
            elif(file_req[len(file_req)-1] == "mp4"):
                image = open("./"+request, 'rb')
                fileExist = "true"
                body = image.read();
                http_req = bytes("HTTP/1.0 200 OK\nContent-Type: video/mpeg4\n\n", 'utf-8') + body
                tcpCliSock.send(http_req)
                image.close()
            elif(file_req[len(file_req)-1] == "html"):
                html = open(request, 'r')
                fileExist = "true"
                body = html.read()
                http_req = bytes("HTTP/1.0 200 OK\nContent-Type: text/html\n\n"+body, 'ascii')
                tcpCliSock.send(http_req)
                html.close()
            print('Read from cache')
    except IOError:
        if (fileExist == "false"):
            # Create a socket on the proxyserver
            c = socket(AF_INET, SOCK_STREAM)
            #c = # Fill in start.		# Fill in end.
            hostn = filename.replace("www.","",1)
            print(hostn)
            try:
                # Connect to the socket to port 80
                # Fill in start.
                c.connect((HOST, 80))
                # Fill in end.
                # Create a temporary file on this socket and ask port 80 for the file requested by the client
                fileobj = c.makefile('wb', 0)
                req = bytes("GET /"+filename+" HTTP/1.0\n\n", 'utf-8')
                fileobj.write(req)
                print("Done!")
                # Read the response into buffer
                # Fill in start.
                #resp = (c.recv(max_buffer))
                resp = recvall(c)
                resp = resp.partition(b'\n\n')
                # Fill in end.
                # Create a new file in the cache for the requested file.
                # Also send the response in the buffer to client socket and the corresponding file in the cache
                # Fill in start.
                tmpFile = open("./" + filename, "wb")
                File = b""
                for i in range(2, len(resp), 1):
                    File += resp[i]
                tmpFile.write((File))
                tmpFile.close()
                fileobj.close()
                # Fill in end.
            except Exception as e:
                print("Illegal request")
                print(e)
        else:
            # HTTP response message for file not found
            # Fill in start.
            print("Repnse error")
    tcpCliSock.close()
