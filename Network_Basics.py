import socket

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(("127.0.0.1", 9999))
server.listen(1)
print("Server waiting for a connection on port 9999...")

conn, addr = server.accept()
print(f"Connected by {addr}")

data = conn.recv(1024).decode()
print(f"Received from client: {data}")

conn.sendall(b"Message received!")
conn.close()
server.close()