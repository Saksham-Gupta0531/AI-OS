from kernel.agents.Common.NLP_Shell.predictor import predict_command


class NLPAgent:
    def __init__(self):
        self.name = "nlp_shell_agent"

    def run(self, query):

        if not query or not query.strip():
            return {
                "agent": self.name,
                "command": None,
                "confidence": 0.0,
                "result": "Empty query"
            }

        command, confidence = predict_command(query)

        return {
            "agent": self.name,
            "command": command,
            "confidence": confidence,
            "result": "Generated using ML model"
        }