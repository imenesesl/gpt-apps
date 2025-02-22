import type { ImproveTextOptions, ImproveTextResponse } from './types';
import { TextImprover } from './TextImprover';

export const improveText = async (
  text: string,
  options: Omit<ImproveTextOptions, 'text'> = {}
): Promise<ImproveTextResponse> => {
  const improver = new TextImprover();
  return await improver.improveText({ text, ...options });
}; 