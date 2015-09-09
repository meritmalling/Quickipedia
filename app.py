import json
import wikipedia
from flask import Flask, request
from lxml import html
import requests
import Algorithmia

app = Flask(__name__)

@app.route('/')
def index():
        return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_path(path):
        return app.send_static_file(path)

# A Hard Coded JSON Object
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

# Scrape Testing
@app.route('/scrape')
def scrape():
        return "Scrape testing page."

# Summarize Testing
@app.route('/summary', methods=['GET'])
def summary():
        query = request.args.get('q')
        input = wikipedia.WikipediaPage(title=query).summary
        image = wikipedia.WikipediaPage(title=query).images[0]
        client = Algorithmia.client('Simple simR+nQkQw61vI6qiGu6A7wTfaG1')
        algo = client.algo('nlp/Summarizer/0.1.2')
        contents ={
                'image': image,
                'summary': algo.pipe(input)
        }
        return json.dumps(contents)

@app.route('/random', methods=['GET'])
def random():
        query = wikipedia.random(pages=1)
        input = wikipedia.WikipediaPage(title=query).summary
        image = wikipedia.WikipediaPage(title=query).images[0]
        client = Algorithmia.client('Simple simR+nQkQw61vI6qiGu6A7wTfaG1')
        algo = client.algo('nlp/Summarizer/0.1.2')
        contents ={
                'image': image,
                'summary': algo.pipe(input)
        }
        return json.dumps(contents)

app.run(debug=True)


