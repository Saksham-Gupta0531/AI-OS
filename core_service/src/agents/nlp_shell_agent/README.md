# Natural Language Shell Agent

## Overview

This module implements a **Natural Language Interface for CLI commands** in the AI-OS system.
It allows users to enter natural language queries which are converted into **Linux shell commands**.

Example:

User Input:
list files

Predicted Command:
ls

---

## Current Progress

The following components have been implemented:

* Dataset preparation using **NL2Bash**
* Dataset cleaning and preprocessing
* Training a semantic retrieval model using **SentenceTransformers**
* Command prediction using **Nearest Neighbour similarity**
* Basic testing script for querying the model

---

## Model Pipeline

Natural Language Query
↓
Sentence Embedding (MPNet)
↓
Vector Similarity Search
↓
Closest Matching Bash Command

---

## Folder Structure

```
nl_shell_agent/
│
├── training/
│   ├── clean_dataset.py
│   └── train_model.py
│
├── model/
│   └── nlp_cli_model.pkl
│
└── test_model.py
```

---

## How to Run

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

## Next Steps

* Create **predictor module** for model inference
* Convert the model into an **AI-OS agent**
* Integrate the agent with the **core service**
* Add **command safety filtering**
