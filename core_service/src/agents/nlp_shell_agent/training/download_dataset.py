import requests
import os

url_nl = "https://raw.githubusercontent.com/TellinaTool/nl2bash/master/data/bash/all.nl"
url_cm = "https://raw.githubusercontent.com/TellinaTool/nl2bash/master/data/bash/all.cm"

os.makedirs("data", exist_ok=True)

print("Downloading dataset...")

nl = requests.get(url_nl)
cm = requests.get(url_cm)

with open("data/all.nl", "wb") as f:
    f.write(nl.content)

with open("data/all.cm", "wb") as f:
    f.write(cm.content)

print("Dataset downloaded successfully.")