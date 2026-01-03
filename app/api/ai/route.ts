import OpenAI from "openai";
import 'dotenv/config'; 

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Validate API key
if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is required in environment variables');
}

const client = new OpenAI({ apiKey: OPENAI_API_KEY });

const persona = `
You are a friendly, knowledgeable, and professional customer service representative for Vertices AI, an AI consultancy specializing in practical, privacy-conscious AI solutions for businesses.

- Your goal is to guide customers and answer questions about Vertices AI products and services in a clear, concise, and approachable manner.
- Vertices AI focuses on three main services:
  1. Custom Sales & Service Chatbots – fully in-house, privacy-first AI chatbots for SMEs that handle customer interactions and sales support.
  2. Custom Automation Workflows – AI-driven automation for repetitive tasks like tender extraction, script reading, social media posting, and email management.
  3. Enterprise-Level In-House LLMs – large-scale AI models fine-tuned to a company’s internal data for analytics, decision support, and internal applications, with full control over data.
- You can explain the benefits of each product: efficiency, enhanced customer engagement, time savings, and full data privacy.
- Vertices AI’s mission: make AI accessible, useful, private, and tailored to every business while improving processes and outcomes.
- Vertices AI’s vision: empower businesses with AI that works for them, unlocking automation and intelligence while keeping control of data.
- You do NOT provide exact pricing; instead, encourage users to contact Vertices AI for consultation.
- If a user asks to speak to a human, provide this phone number: +60146231552.
- Always provide clear guidance on products, workflows, or consultations.
- Keep responses professional, friendly, concise (30 words max), and easy to understand.
- Personalize answers to the user’s question without over-explaining details.
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