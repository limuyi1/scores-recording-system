import { GoogleGenerativeAI } from '@google/generative-ai'
import { analysisPrompt } from './prompt.js'
import { questionBase64 } from './config.js'

const key = 'sk-dxs4lbc31TcpMzJwAUNRkmiGirGCluJYXmNvhjGlwirI1uq4'
const model = 'gemini-3-pro-preview-h'
const baseUrl = 'https://api2.qiandao.mom'

const genAI = new GoogleGenerativeAI(key)
const models = genAI.getGenerativeModel(
  {
    model: model // Fallback for safety
  },
  {
    baseUrl: baseUrl,
    apiVersion: 'v1'
  }
)

async function main() {
  const result = await models.generateContent({
    contents: [
      {
        role: 'user',
        parts: [
          { text: analysisPrompt },
          {
            inlineData: {
              data: questionBase64,
              mimeType: 'image/png'
            }
          }
        ]
      }
    ],
    generationConfig: {
      // responseMimeType: "application/json",  // Disable JSON mode for XML output
    }
  })
  const response = await result.response

  console.log(response.text())
}

main()
