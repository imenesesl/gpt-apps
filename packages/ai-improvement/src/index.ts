import { improveText } from './improveText';

async function main() {
  try {
    // Get text from command line arguments
    const inputText = process.argv.slice(2).join(' ');
    
    if (!inputText) {
      throw new Error('Please provide text to improve. Usage: yarn dev "your text here"');
    }

    console.log('Original text:\n', inputText);
    console.log('\nImproving text...\n');
    
    const improved = await improveText(inputText, {
      temperature: 0.7,
      maxTokens: 2000
    });
    
    console.log('Improved text:\n', improved);
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main(); 