# Bobby's Calculator Project for CS496  

Bobby’s Calculators is a dark-mode Flask application with Alpine.js interactivity, offering Tip & Bill Split, BMI and Simple Interest calculators, plus an advanced itemized bill splitter (with tax, tip & per-person shares).

## DEPLOYING LOCALLY
- create a virtual environment within repo; in command line, run 'python3 -m venv .venv', followed by 'source .venv/bin/activate', followed by 'pip install -r requirements.txt'
- in command line, run 'chmod +x run.sh'
- in command line, run './run.sh'



## DEPLOYING TO GCLOUD RUN

### Setting up Google Cloud SDK
#### macOS (via Homebrew)
brew install --cask google-cloud-sdk

#### Debian/Ubuntu
sudo apt-get update && sudo apt-get install google-cloud-sdk

#### Or follow the instructions here:
https://cloud.google.com/sdk/docs/install

- in command line, 'run gcloud init'
-- you'll be prompted to:
Log in via your browser.
Select (or create) a GCP project
Choose a default region/zone (you can override in deploy.conf)
- run this command to ensure that the required API's are enabled in GCloud: 'gcloud services enable run.googleapis.com \ cloudbuild.googleapis.com'

- copy deploy.conf.example to a new file 'deploy.conf', enter your Google Cloud credentials 

- in command line, run 'chmod +x deploy.sh'

- in command line, run './deploy.sh'


## CONTACT
For questions or feedback, reach out to Bobby Tomlinson:

✉️ btomlinson237@gmail.com

🔗 https://linkedin.com/in/bobby-tomlinson

🐙 https://github.com/btomlinson237
