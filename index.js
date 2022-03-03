const http = require('http');

const server = http.createServer();

/*server.on('request', (req, res) => {
  res.statusCode = 200;
  //res.write('Olá mundo!');
  res.setHeader('Content-Type', 'txt/html');
  res.end(<h1>Olá mundo!</h1>);
});*/
//html
server.on('request', (req, res) => {
  const { method, url} = req;
  if (method === 'GET' && url === '/html'){
    res.statusCode = 201;
    res.writeHeader(200, {'Content-Type': 'txt/html'});
    //res.setHeader('Content-Type', 'txt/html');
    res.end(`
    <body>
      <h1>Olá mundo!</h1>
    </body>`);
  } else if (method === 'POST' && url === '/json') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      escola: 'Lets Code',
      aluno: 'Rafael',
      ano: '2022'
    }));
  }
});
// rodar o index ->npm run dev
//vai restart cada vez que tiver uma alteração
//npm i --save-dev nodemon
//npm i -g nodemon //ficar diosponivel em todos os escopos
//https://www.npmjs.com/package/nodemon
//JSON
/*server.on('request', (req, res) => {
  const { method, url} = req;
  if (method === 'POST' && url === '/json'){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      escola: 'Lets Code',
      aluno: 'Rafael',
      ano: '2022'
    }));
  }
});
criar script -- npm set-script start "node index.js"
*/

server.listen(8080, () => {
  console.log(`escutando em http://localhost:8080`);
});