#!/usr/bin/env node

import fetch from 'node-fetch';
import readline from 'readline';
import clipboard from 'clipboardy';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

// Capture the component name from the command line
const componentName = process.argv[2];

async function main() {
  if (!componentName) {
    console.log(chalk.red('provide a component name'));
    return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(chalk.blue(`What do you want to generate for the "${componentName}" component? `), async (userInput) => {
    console.log(chalk.yellow('\nGenerating code, please wait...⏳'));

    try {
      // Send the POST request to the API (matching the curl request)
      const response = await fetch('https://insta-appz.vercel.app/api/generateCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gemini-1.5-pro',
          messages: [
            {
              role: 'user',
              content: userInput || `create a counter component`
            }
          ]
        })
      });

      const code = await response.text(); 

      console.log(chalk.green('\nComponent:\n'));
      console.log(chalk.whiteBright(code)); 

     
      await clipboard.write(code);
      console.log(chalk.cyan('\n📋 Code copied to clipboard!'));

   
      const filename = `${componentName}.tsx`; // Using .tsx extension for React components
      fs.writeFileSync(path.join(process.cwd(), filename), code);
      console.log(chalk.magenta(`\n💾 Saved to ${filename}`));

    } catch (err) {
      console.error(chalk.red('❌'), err.message);
    }

    rl.close();
  });
}

main();

