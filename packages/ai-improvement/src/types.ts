export type ImproveTextResponse = {
  origin: string;
  improved: string;
};

export type ImproveTextOptions = {
  text: string;
  maxTokens?: number;
  temperature?: number;
};

export type OpenAIMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type OpenAIResponse = {
  choices: Array<{
    message?: {
      content?: string;
    };
  }>;
}; 