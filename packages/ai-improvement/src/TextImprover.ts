import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import * as path from 'path';
import type { ImproveTextOptions, ImproveTextResponse } from './types';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export class TextImprover {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.GPT_API_KEY;
    const organization = process.env.ORGANIZATION_OPENAI;
    
    if (!apiKey || !organization) {
      throw new Error('GPT_API_KEY or ORGANIZATION_OPENAI is not set in environment variables');
    }

    this.openai = new OpenAI({
      apiKey,
      organization,
    });
  }

  async improveText({
    text,
    maxTokens = 1000,
    temperature = 0.7
  }: ImproveTextOptions): Promise<ImproveTextResponse> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a professional editor who improves text while maintaining its original meaning.
            You MUST respond in the same language as the input text.
            If the text is in Spanish, respond in Spanish.
            If the text is in English, respond in English.
            Always maintain the same language as the input.`
          },
          {
            role: 'user',
            content: `Please improve the following text while maintaining its core meaning and its original language. 
            Make it more professional, clear, and well-structured:

            ${text}`
          }
        ],
        max_tokens: maxTokens,
        temperature: temperature,
      });

      const improvedText = response.choices[0]?.message?.content;
      
      if (!improvedText) {
        throw new Error('No improved text was generated');
      }

      return {
        origin: text,
        improved: improvedText
      };

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to improve text: ${error.message}`);
      }
      throw error;
    }
  }
} 