import * as http from 'node:http';
import * as fs from 'node:fs';
import * as path from 'node:path';

const PORT = 3000;

const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpg',
  svg: 'image/svg+xml'
};

const state = {
  path: 'undefined'
}

const prepareFile = async (url) => {
  const toBool = [() => true, () => false];

  let STATIC_PATH;

  if (url === '/' || url === '/to-do') {
    url = '/';
    state.path = 'to-do';
  } else if (url === '/calculator') {
    url = '/';
    state.path = 'calculator';
  };

  if (state.path === 'to-do') {
    STATIC_PATH = path.join(process.cwd(), './to-do-vanilla');
  } else if (state.path === 'calculator') {
    STATIC_PATH = path.join(process.cwd(), './calculator-vanilla');
  };

  const paths = [STATIC_PATH, url];

  console.log(`Paths: ${paths}`);
  console.log(`Current URL ${url}`);

  if (url.endsWith('/')) {
    paths.push('index.html');
  } 

  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);

  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : STATIC_PATH + '/404.html';
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };

};

http.createServer(async (req, res) => {
  console.log(req.url);
  const file = await prepareFile(req.url);
  const statusCode = file.found ? 200 : 400;
  const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
  res.writeHead(statusCode, { "Content-Type": mimeType });
  file.stream.pipe(res);
}).listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
