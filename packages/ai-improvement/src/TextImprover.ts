import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import * as path from 'path';
import type { ImproveTextOptions } from './types';

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
  }: ImproveTextOptions): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a professional editor who improves text while maintaining its original meaning.'
          },
          {
            role: 'user',
            content: `Please improve the following text while maintaining its core meaning. 
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

      return improvedText;

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to improve text: ${error.message}`);
      }
      throw error;
    }
  }
} 