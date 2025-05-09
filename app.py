from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/tip')
def tip():
    return render_template('tip.html')

@app.route('/bmi')
def bmi():
    return render_template('bmi.html')

@app.route('/interest')
def interest():
    return render_template('interest.html')

@app.route('/split')
def split():
    return render_template('split.html')

@app.route('/terms')
def terms():
    return render_template('terms.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
