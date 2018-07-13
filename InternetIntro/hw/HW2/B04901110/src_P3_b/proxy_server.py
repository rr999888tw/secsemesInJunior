from socket import *
import sys

if len(sys.argv) <= 1:
	print('Usage : "python ProxyServer.py server_ip"\n[server_ip : It is the IP Address Of Proxy Server')
	sys.exit(2)

# Create a server socket, bind it to a port and start listening
tcpSerSock = socket(AF_INET, SOCK_STREAM)
# Fill in start.
HOST, PORT = sys.argv[1], 23456
tcpSerSock.bind((HOST, PORT))
tcpSerSock.listen(5)
# Fill in end.
while 1:
	# Strat receiving data from the client
	print('Ready to serve...')
	tcpCliSock, addr = tcpSerSock.accept()
	print('Received a connection from:', addr)
	message = tcpCliSock.recv(1024).decode('utf-8')# Fill in start.		# Fill in end.
	print(message)
	# Extract the filename from the given message
	print(message.split()[1])
	filename = message.split()[1].partition("/")[2]
	print(filename)
	fileExist = "false"
	filetouse = "/" + filename
	print(filetouse)
	try:
		# Check wether the file exist in the cache
		f = open(filetouse[1:], "r")
		outputdata = f.read()
		fileExist = "true"
		# ProxyServer finds a cache hit and generates a response message
		tcpCliSock.send(b"HTTP/1.0 200 OK\r\n")
		tcpCliSock.send(b"Content-Type:text/html\r\n")
		# Fill in start.
		tcpCliSock.send(b'\n')
		tcpCliSock.send((outputdata).encode('utf-8'))
		# Fill in end.
		print('Read from cache')
	# Error handling for file not found in cache
	except IOError:
		if fileExist == "false":
			# Create a socket on the proxyserver
			c = socket(AF_INET, SOCK_STREAM)# Fill in start.		# Fill in end.
			hostn = filename.replace("www.","",1)
			print("hostn", hostn)
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
				# fileobj = c.makefile('wb', 0)
				# fileobj.write(b"GET "+"http://" + filename + " HTTP/1.0\n\n")
				# print("sent file request !!")
				# Read the response into buffer
				# Fill in start.
				
				resp = c.recv(2**20)
				resp = (resp.partition(b'\n\n'))[2]
				# print(buffer.decode("utf-8"))
				# Fill in end.
				# Create a new file in the cache for the requested file.
				# Also send the response in the buffer to client socket and the corresponding file in the cache
				tmpFile = open("./" + filename, "wb")
				tmpFile.write(resp)

				# File = b""
				# for i in range(2, len(resp), 1):
				# 	File += resp[i]
				# tmpFile.write((File))
				tmpFile.close()
				fileobj.close()
				# Fill in end.
			except:
				print("Illegal request")
		else:
			# HTTP response message for file not found
			# Fill in start.
			print("HTTP response message for file not found")
			# Fill in end.
	# Close the client and the server sockets
	tcpCliSock.close()
# Fill in start.
# Fill in end.
