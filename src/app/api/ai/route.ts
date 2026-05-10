import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  const { ingredients } = await req.json()

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  })

  const prompt = `
Generate a recipe based on these ingredients: ${ingredients}.

Return:
- title
- short description
- cooking instructions
`

  const result = await model.generateContent(prompt)
  const response = result.response.text()

  return Response.json({ response })
}
