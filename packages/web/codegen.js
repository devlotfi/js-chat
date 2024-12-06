import fs from 'node:fs';
import openapiTS, { astToString } from 'openapi-typescript';
import { config } from 'dotenv';

config({
  path: ['.env'],
});

const ast = await openapiTS(new URL(process.env.OPENAPI_URL));
const contents = astToString(ast);

// (optional) write to file
fs.writeFileSync('./src/__generated__/schema.ts', contents);
