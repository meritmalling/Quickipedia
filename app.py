import json
import wikipedia
from flask import Flask
# from lxml import html
import requests

app = Flask(__name__)

@app.route('/')
def index():
        return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_path(path):
        return app.send_static_file(path)

@app.route('/stuff')
def stuff():
        contents= {
                'image': 'imageURL',
                'sumary': 'wikipediasumary',
                'sections': [
                        {'section1': 'section1summary'},
                        {'section2': 'section2summary'},
                        {'section3': 'section3summary'},
                        {'section4': 'section4summary'},
                        {'section5': 'section5summary'},
                        {'section6': 'section6summary'},
                        ]
        }
        return json.dumps(contents)

@app.route('/scrape')
def scrape():
        return "Scrape testing page."
app.run(debug=True)
