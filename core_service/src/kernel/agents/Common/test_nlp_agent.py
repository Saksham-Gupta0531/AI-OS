from kernel.agents.Common.NLP_agent import NLPAgent

agent = NLPAgent()

while True:
    query = input("Enter query: ")

    result = agent.run(query)

    print("\n--- OUTPUT ---")
    print("Agent:", result["agent"])
    print("Command:", result["command"])
    print("Confidence:", result["confidence"])
    print("Result:", result["result"])
    print("--------------\n")