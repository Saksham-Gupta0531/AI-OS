import pickle
from pathlib import Path

MODEL_PATH = Path(__file__).resolve().parent / "nlp_cli_model.pkl"

with open(MODEL_PATH, "rb") as f:
    embedder, nn, X_train, commands = pickle.load(f)


def preprocess(text):
    return text.lower().strip()


def predict_command(query):
    vec = embedder.encode([preprocess(query)])
    dist, idx = nn.kneighbors(vec)
    return commands[idx[0][0]], float(dist[0][0])