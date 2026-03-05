import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("AI_OS_Key")

if not api_key:
    raise ValueError("ERROR: AI_OS_Key not found!")

client = Groq(api_key=api_key)

def ask_llama3(prompt, system_role="You are a helpful AI OS assistant."):
    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_role},
                {"role": "user", "content": prompt}
            ],
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