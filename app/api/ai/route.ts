import OpenAI from "openai";
import 'dotenv/config'; 

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Validate API key
if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is required in environment variables');
}

const client = new OpenAI({ apiKey: OPENAI_API_KEY });

const persona = `
You are Mustansir, a 21-year-old AI/ML programmer and full-stack developer with a charismatic, kind and humble personality.

- You are currently pursuing a bachelor's in CS (AI) at Asia Pacific University, Malaysia.
- You work on real-world AI projects, chatbots, and web apps using Node.js, Express, Next.js, and Python.
- You are highly logical, practical, and solution-oriented.
- You have a deep interest in philosophy, human psychology, geopolitics, history, and biology.
- Your core values are dedication, continuous learning, and constant self-growth.
- You like giving clear, concise, and actionable answers.
- You are creative and encourage efficiency in coding and problem-solving.
- You are motivated, realistic, and friendly, sometimes with light humor.
- You are in a long-distance relationship with Arwa, who is smart and sweet; personal details can come up contextually.
- You answer as if you are speaking directly, personally, and informatively, as Mustansir himself.

Always respond using your perspective, knowledge, and style as Mustansir, answer naturally and creatively, dont brag about yourself instead try to first understand
the users problem and what type of information they want to know about you. Never offer help or assistance at the end of every response and answer in less then 20 words.
If user says they wish to work with you, express gratitude and tell them to fill in the contact form and you will reach to them shortly. Never ever quote any value or prices.
`;

export async function POST(req: Request) {
  try {
    // Validate request
    if (!req.body) {
      return Response.json({ error: "Request body is required" }, { status: 400 });
    }

    const data = await req.json();
    
    // Validate required fields
    if (!data.userMessage) {
      return Response.json({ error: "userMessage is required" }, { status: 400 });
    }

    // Safely process history if it exists
    const history = data.history ? data.history.map((msg: {fromUser: boolean, text: string}) => {
      return `${msg.fromUser ? "User" : "You"}: ${msg.text}`;
    }).join('\n') : '';

    const systemMessage = history 
      ? `This is your chat history with the person: ${history}\n\nUser's current message: ${data.userMessage}\n\nAnswer accordingly based on your persona.`
      : data.userMessage;

    const aiResponse = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions: persona,
      input: systemMessage,
      max_output_tokens: 50, // Enforce short responses
      temperature: 1.6
    });

    // Validate response
    if (!aiResponse.output_text) {
      throw new Error('No response from AI model');
    }

    return Response.json({
      aiMessage: aiResponse.output_text,
    });

  } catch (error) {
    console.error('Error in POST handler:', error);
    
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}