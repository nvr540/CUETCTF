import os
from flask import Flask, request, render_template

app = Flask(__name__)

# Directory where "allowed" files are stored
BASE_DIR = "files"

# Ensure the directory exists
os.makedirs(BASE_DIR, exist_ok=True)

# Create a test file (ShadowCorp's report)
with open(os.path.join(BASE_DIR, "report.txt"), "w") as f:
    f.write("ShadowCorp Security Report:\n\nWARNING! Unauthorized access detected!\nWe suspect a backdoor in our system...")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/read", methods=["GET"])
def read_file():
    filename = request.args.get("file")

    try:
        # ❌ Vulnerable to directory traversal
        file_path = os.path.join(BASE_DIR, filename)

        with open(file_path, "r") as f:
            content = f.read()
        
        return f"<h3>Security Report:</h3><pre>{content}</pre>"

    except Exception as e:
        return f"<p style='color: red;'>Error: {str(e)}</p>"

if __name__ == "__main__":
    app.run(debug=True)
