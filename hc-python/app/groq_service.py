from flask import current_app, g
from system_content import SYSTEM_CONTEXT
from groq import Groq
import os, json


def request_ai(data, conditions):
    client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": SYSTEM_CONTEXT,
            },
            {
                "role": "user",
                "content": f"data:{str(data)}, conditions:{str(conditions)}",
            },
        ],
        model="llama-3.2-11b-text-preview",
        temperature=0,
        max_tokens=8000,
        stream=False,
        response_format={"type": "json_object"},
        stop=None,
    )
    message_content = json.loads(chat_completion.choices[0].message.content)
    message_content["original"] = data
    print(message_content)
    return message_content
