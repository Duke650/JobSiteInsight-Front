import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url'; // Import fileURLToPath function

// Load environment variables from .env file

const env = dotenv.config().parsed;

// Get the directory path of the current file
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Get the current file path
const __filename = fileURLToPath(import.meta.url); // Convert import.meta.url to file path
const __dirname = path.dirname(__filename);

// Resolve the correct file paths
const htmlTemplatePath = path.resolve(__dirname, 'index.html');
const outputHtmlPath = path.resolve(__dirname, 'dist', 'index.html');



// Read HTML template file
let htmlTemplate = readFileSync(htmlTemplatePath, 'utf-8');

// Replace placeholders in HTML template with actual environment variables
Object.keys(env).forEach((key) => {
  const placeholder = new RegExp(`%${key}%`, 'g');
  htmlTemplate = htmlTemplate.replace(placeholder, env[key]);
});

// Write the modified HTML content to a new file
writeFileSync(outputHtmlPath, htmlTemplate, 'utf-8');

console.log('Injected environment variables into HTML.');