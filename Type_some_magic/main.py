from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Store latest WPM (for demo purposes)
latest_wpm = None

@app.route('/')
def home():
    return render_template('index.html', wpm = latest_wpm)

@app.route('/submit', methods=['GET'])
def submit():
    global latest_wpm

    # Retrieve WPM from GET parameter
    wpm = request.args.get('wpm')

    if int(wpm) !=69:
        latest_wpm = wpm  # Store the latest WPM
        return jsonify({"message": "Sorry!!You didn't get the magice number"})

    if int(wpm) ==69:
        latest_wpm = wpm  # Store the latest WPM
        return jsonify({"message": "What a hacker Flag: CUETCTF{S0uRc3_C0d3_1s_1mport4nt_bruhh}"})
    
    return jsonify({"latest_wpm": latest_wpm if latest_wpm else "No data yet"})

if __name__ == '__main__':
    app.run(debug=True)
