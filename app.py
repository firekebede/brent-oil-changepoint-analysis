from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

# This route serves the local CSV file as JSON data
@app.route('/api/events')
def serve_oil_events():
    df = pd.read_csv('data/processed/oil_events.csv')  # ✅ loading local CSV
    return jsonify(df.to_dict(orient='records'))       # ✅ converting to JSON

if __name__ == '__main__':
    app.run(debug=True)
