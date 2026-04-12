import os
from groq import Groq
from google import genai
from dotenv import load_dotenv
from PIL import Image

load_dotenv()

groq_api_key = os.getenv("AI_OS_Key")
groq_client = Groq(api_key=groq_api_key)

gemini_api_key = os.getenv("GEMINI_API_KEY")
gemini_client = genai.Client(api_key=gemini_api_key)

def ask_groq(prompt, system_role="You are a helpful AI OS assistant.", model="llama-3.3-70b-versatile", history=None):
    if history is None:
        history = []
        
    try:
        messages = [{"role": "system", "content": system_role}]
        messages.extend(history)
        messages.append({"role": "user", "content": prompt})

        completion = groq_client.chat.completions.create(
            model=model,  
            messages=messages, 
            temperature=0.0, 
            max_tokens=4096, 
            top_p=1,
            stream=False,
            stop=None,
        )
    
        return completion.choices[0].message.content

    except Exception as e:
        return f"Brain (Groq) Error: {str(e)}"


def ask_gemini_vision(prompt, image_input, model="gemini-2.5-flash"):
    if not gemini_client:
        return "Error: Gemini client not initialized in brain."
        
    try:
        if isinstance(image_input, str):
            img = Image.open(image_input)
        else:
            img = image_input 
            
        response = gemini_client.models.generate_content(
            model=model,
            contents=[img, prompt]
        )
        return response.text.strip()
    except Exception as e:
        return f"Brain (Gemini) Error: {str(e)}"
    
if __name__ == "__main__":
    print("Testing Brain connections...")
    print("Groq Test:", ask_groq("Hello, testing connection!"))