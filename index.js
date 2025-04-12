#!/usr/bin/env node

import fetch from 'node-fetch';
import clipboard from 'clipboardy';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const componentName = process.argv[2];
const userInput = process.argv.slice(3).join(' ') || `create a component ${componentName}`;

async function main() {
  if (!componentName) {
    console.log(chalk.yellow('Provide a component name'));
    return;
  }

  console.log(chalk.yellow('\nGenerating code, please wait...⏳'));

  try {
    const response = await fetch('https://insta-appz.vercel.app/api/generateCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemini-1.5-pro',
        messages: [
          {
            role: 'user',
            content: userInput,
          },
        ],
      }),
    });

    const code = await response.text();

    console.log(chalk.green('\nComponent:\n'));
    console.log(chalk.whiteBright(code));

    await clipboard.write(code);
    console.log(chalk.cyan('\n📋 Code copied to clipboard!'));

    const filename = `${componentName}.tsx`;
    fs.writeFileSync(path.join(process.cwd(), filename), code);
    console.log(chalk.magenta(`\n💾 Saved to ${filename}`));

  } catch (err) {
    console.error(chalk.red('❌'), err.message);
  }
}

main();


