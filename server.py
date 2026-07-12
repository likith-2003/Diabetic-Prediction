import http.server
import socketserver
import os
import sys

PORT = 3000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Disable caching for easier debugging/development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def translate_path(self, path):
        # Override translate_path to log files accessed
        translated = super().translate_path(path)
        return translated

def run_server():
    # Set the working directory to where this file lives
    current_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(current_dir)

    Handler = CustomHTTPRequestHandler
    
    # Allow port reuse to avoid 'Address already in use' errors on fast restarts
    socketserver.TCPServer.allow_reuse_address = True

    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print("==================================================")
            print("   GlycoPredict AI - Python Local Web Server")
            print("==================================================")
            print(f"Server successfully started on port: {PORT}")
            print(f"Access the Dashboard at: http://localhost:{PORT}")
            print("Press Ctrl+C to terminate the server session.")
            print("--------------------------------------------------")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\nShutting down local web server. Goodbye!")
        sys.exit(0)
    except Exception as e:
        print(f"Error starting local web server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_server()
