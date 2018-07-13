import email
import pprint
from io import StringIO

request_string = 'GET /index.html HTTP/1.1\r\nHost: localhost\r\nConnection: keep-alive\r\nCache-Control: max-age=0\r\nUpgrade-Insecure-Requests: 1\r\nUser-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\r\nAccept-Encoding: gzip, deflate, sdch\r\nAccept-Language: en-US,en;q=0.8'

# pop the first line so we only process headers
_, headers = request_string.split('\r\n', 1)

# construct a message from the request string
message = email.message_from_file(StringIO(headers))

# construct a dictionary containing the headers
headers = dict(message.items())

# pretty-print the dictionary of headers
pprint.pprint(headers, width=160)



# from http.server import BaseHTTPRequestHandler
# from io import StringIO

# class HTTPRequest(BaseHTTPRequestHandler):
#     def __init__(self, request_text):
#         self.rfile = StringIO(request_text)
#         self.raw_requestline = self.rfile.readline()
#         self.error_code = self.error_message = None
#         self.parse_request()

#     def send_error(self, code, message):
#         self.error_code = code
#         self.error_message = message
