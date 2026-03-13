import urllib.request
import urllib.parse
import json
import subprocess
import sys

def main():
    init_req = {
        "jsonrpc": "2.0",
        "id": 0,
        "method": "initialize",
        "params": {
            "protocolVersion": "2024-11-05",
            "capabilities": {},
            "clientInfo": {"name": "test", "version": "1.0"}
        }
    }
    p = subprocess.Popen(
        ['/Users/maestro/.local/bin/uvx', 'workspace-mcp'],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        text=True
    )
    p.stdin.write(json.dumps(init_req) + '\n')
    p.stdin.flush()
    
    first_resp = p.stdout.readline()
    
    p.stdin.write(json.dumps({"jsonrpc": "2.0", "method": "notifications/initialized", "params":{}}) + '\n')
    p.stdin.flush()
    
    tools_req = {
        "jsonrpc": "2.0",
        "id": 2,
        "method": "tools/call",
        "params": {
            "name": "search_gmail_messages",
            "arguments": {
                "query": "in:inbox",
                "user_google_email": "digifyway@gmail.com",
                "page_size": 5
            }
        }
    }
    p.stdin.write(json.dumps(tools_req) + '\n')
    p.stdin.flush()
    search_resp = p.stdout.readline()
    print("Search Result:", search_resp)
    
    # parse the response
    data = json.loads(search_resp)
    if "result" in data and "content" in data["result"]:
        content_text = data["result"]["content"][0]["text"]
        print("Content:", content_text)
        
    p.kill()

if __name__ == "__main__":
    main()
