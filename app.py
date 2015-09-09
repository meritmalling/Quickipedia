import json
import wikipedia
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
        return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_path(path):
        return app.send_static_file(path)

@app.route('/stuff')
def stuff():
        query='Queen Elizabeth II'
        return wikipedia.summary(query, sentences=2)

app.run(debug=True)
