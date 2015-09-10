import json
import wikipedia
from flask import Flask, request
import requests
import Algorithmia
import os

api_key = os.environ['KEY']
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

# Summarize
@app.route('/summary', methods=['GET'])
def summary():
        try:
                query = request.args.get('q')
                input = wikipedia.WikipediaPage(title=query).summary
                title = wikipedia.WikipediaPage(title=query).title
                image = wikipedia.WikipediaPage(title=query).images[0]
                client = Algorithmia.client('Simple simR+{}'.format(api_key))
                algo = client.algo('nlp/Summarizer/0.1.2')
                contents ={
                        'image': image,
                        'title': title,
                        'summary': algo.pipe(input),
                        'link': 'https://en.wikipedia.org/wiki/{}'.format(query)
                }
        except:
                return json.dumps({
                        'msg': "Sorry, we couldn't find a Wikipedia article matching your search."
                        })
        return json.dumps(contents)

# Random Summary
@app.route('/random', methods=['GET'])
def random():
        query = wikipedia.random(pages=1)
        input = wikipedia.WikipediaPage(title=query).summary
        title = wikipedia.WikipediaPage(title=query).title
        image = wikipedia.WikipediaPage(title=query).images[0]
        client = Algorithmia.client('Simple simR+{}'.format(api_key))
        algo = client.algo('nlp/Summarizer/0.1.2')
        contents ={
                'image': image,
                'title': title,
                'summary': algo.pipe(input),
                'link': 'https://en.wikipedia.org/wiki/{}'.format(wikipedia.random(pages=1))
        }
        return json.dumps(contents)

app.run(debug=True)


