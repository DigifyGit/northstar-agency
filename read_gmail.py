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
            "name": "gmail_search",
            "arguments": {
                "query": "in:inbox",
                "max_results": 5
            }
        }
    }
    p.stdin.write(json.dumps(tools_req) + '\n')
    p.stdin.flush()
    tools_resp = p.stdout.readline()
    print("Mails:", tools_resp)
    
    p.kill()

if __name__ == "__main__":
    main()
