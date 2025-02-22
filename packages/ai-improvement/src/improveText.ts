import type { ImproveTextOptions } from './types';
import { TextImprover } from './TextImprover';

export const improveText = async (
  text: string,
  options: Omit<ImproveTextOptions, 'text'> = {}
): Promise<string> => {
  const improver = new TextImprover();
  return await improver.improveText({ text, ...options });
}; 