import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("AI_OS_Key")

if not api_key:
    raise ValueError("ERROR: AI_OS_Key not found!")

client = Groq(api_key=api_key)

# Added the 'history' parameter here
def ask_llama3(prompt, system_role="You are a helpful AI OS assistant.", history=None):
    if history is None:
        history = []
        
    try:
        # 1. Start with the system instructions
        messages = [{"role": "system", "content": system_role}]
        
        # 2. Inject all the previous messages (the Sidebar memory!)
        messages.extend(history)
        
        # 3. Add the brand new prompt from the user
        messages.append({"role": "user", "content": prompt})

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages, 
            temperature=0.5,  
            max_tokens=1024, 
            top_p=1,
            stream=False,
            stop=None,
        )
    
        return completion.choices[0].message.content

    except Exception as e:
        return f"Brain Error: {str(e)}"

if __name__ == "__main__":
    print("Connecting to Llama 3...")
    response = ask_llama3("Hello! Are you ready to run my Operating System?")
    print(f"Llama 3 says: {response}")