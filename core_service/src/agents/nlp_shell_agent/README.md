# Natural Language Shell Agent

## Overview

The **Natural Language Shell Agent** enables users to interact with the system using natural language instead of traditional CLI commands.

Example:

User Input:
list files

Predicted Command:
ls

The agent converts natural language queries into appropriate **Linux shell commands** using a semantic similarity model.

---

# Current Implementation

This module currently includes:

* Dataset preparation using **NL2Bash**
* Dataset cleaning and preprocessing
* Training a semantic retrieval model using **SentenceTransformers**
* Command prediction using **Nearest Neighbour similarity**
* Testing script for querying the model

---

# Model Pipeline

Natural Language Query
↓
Sentence Embedding (MPNet)
↓
Vector Similarity Search
↓
Closest Matching Bash Command

---

# Project Structure

```
nl_shell_agent/
│
├── training/
│   ├── download_dataset.py
│   ├── clean_dataset.py
│   └── train_model.py
│
├── model/
│   └── nlp_cli_model.pkl
│
└── test_model.py
```

---

# Rebuilding the Model

The dataset is **not stored in the repository** to keep the repo lightweight.

To regenerate the model, follow these steps.

### 1. Download Dataset

Run:

```
python training/download_dataset.py
```

This downloads the **NL2Bash dataset**.

---

### 2. Clean Dataset

Run:

```
python training/clean_dataset.py
```

This removes rare command patterns and prepares the dataset.

---

### 3. Train the Model

Run:

```
python training/train_model.py
```

After training, the model file will be created:

```
model/nlp_cli_model.pkl
```

---

# Running the Model

Activate the virtual environment and run:

```
python test_model.py
```

Example:

```
Enter command request: find text files
Predicted command: find . -name "*.txt"
```

---

# Dependencies

Required Python libraries:

```
pandas
scikit-learn
sentence-transformers
torch
numpy
requests
```

Install them using:

```
pip install -r requirements.txt
```

---

# Next Steps

Planned improvements for this module:

* Create **predictor module** for inference
* Convert the model into a **CLI agent**
* Register the agent inside **AI-OS**
* Add **command safety filtering**
* Integrate the agent with **core_service**

---

# Author

Rachit Upadhyay
AI-OS Project – Natural Language Shell Agent
