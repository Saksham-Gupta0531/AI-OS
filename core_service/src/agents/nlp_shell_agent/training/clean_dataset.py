import pandas as pd

df = pd.read_csv("dataset.csv")

# extract command intent
df["intent"] = df["command"].apply(lambda x: x.split()[0])

# keep only intents appearing >= 50 times
intent_counts = df["intent"].value_counts()

valid_intents = intent_counts[intent_counts >= 50].index

df = df[df["intent"].isin(valid_intents)]

df.to_csv("clean_dataset.csv", index=False)

print("Clean dataset created")
print("Dataset size:", len(df))
print("Intents:", df["intent"].unique())