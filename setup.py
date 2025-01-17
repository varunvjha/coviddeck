from flask import Flask, render_template, request, jsonify, url_for
import joblib, sklearn, json
app = Flask(__name__)

model = joblib.load("models/random_forest.joblib")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/assessment', methods = ['GET', 'POST'])
def assessment():
    return render_template('bot.html')

@app.route('/tracker')
def tracker():
    return render_template('tracker.html')

@app.route('/assessmentComplete', methods = ['GET', 'POST'])
def assessmentComplete():
    jsonResponse = request.get_json(force = True)
    seedData = jsonResponse["data"]
    response = model.predict_proba(seedData)
    return jsonify(round(response[0][1] * 100, 2))

if __name__ == "__main__":
    app.run(debug = True)