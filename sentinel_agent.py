
import os, requests, hmac, hashlib, json
from flask import request

SENTINEL_SECRET = os.getenv("SENTINEL_SECRET")
SENTINEL_URL = os.getenv("SENTINEL_URL")

def sentinel_monitor(app):
    @app.before_request
    def inspect():
        if not SENTINEL_SECRET: return
        payload = {"origin": "runtime_agent", "path": request.path, "method": request.method, "ip": request.remote_addr}
        data = json.dumps(payload).encode()
        sig = hmac.new(SENTINEL_SECRET.encode(), data, hashlib.sha256).hexdigest()
        try:
            requests.post(SENTINEL_URL, data=data, headers={"X-Sentinel-Signature": sig, "Content-Type": "application/json"}, timeout=0.5)
        except: pass
