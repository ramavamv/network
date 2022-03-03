/*
criar 3 endpoints (ex. /foo, /baz, /bar) e retornar 3 tipos difeentes de dados

Pesquisar e tratar outros tipos de http method

Criar 3 arquivos ".txt" com conteúdo.
  criar 1 endpoints com um deles retornando html e renderizando o conteúdo dentro de uma lista.
  criar 1 endpoint  retornando o conteúdo dentro de um json
*/
const http = require('http');
const server = http.createServer();
const fsPromise = require('fs').promises;
const path = require('path');

//const newFilePath = path.join(__dirname, 'txt-files', 'new_file.txt');
const folderPath = path.join(__dirname, 'txt-files');

server.on('request', (req, res) => {
  const { method, url} = req;
  if (method === 'GET' && url === '/html'){
    res.statusCode = 201;
    res.writeHeader(200, {'Content-Type': 'txt/html'});
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
  } else if (method === 'PUT' && url === '/xml'){
      res.statusCode = 203;
      res.writeHeader(200, {'Content-Type': 'txt/xml'});
      res.end(`
      <?xml version="1.0">
      <escolas>
        <escola id="1">
          <titulo>Lets Code</titulo>
          <aluno>Rafael</aluno>
          <ano>2022</ano>
        </escola>
      </escolas>
      `);
  } else if (method === 'POST' && url === '/txt'){
    res.statusCode = 203;
    res.writeHeader(200, {'Content-Type': 'txt'});
      fsPromise
        .readdir(folderPath)
        .then(files => {
          files.forEach((file, index,array) => {
            const filePath = path.join(__dirname, 'txt-files', file);
            const filePath1 = path.join(__dirname, 'txt-files/file1.txt');

            const data = `${fsPromise.readFileSync(filePath1,'utf-8')}`;

            fsPromise
              .readFile(filePath, 'utf-8')
              .then((content, ds) => {
                  res.end(`
                    <body>
                      <li>
                        <ul>{content} ${content}</ul>
                        <ul>{array[content]} ${array[content]}</ul>
                        <ul>{array[index]} ${array[index]}</ul>
                        <ul>{array[index+1]} ${array[index+1]}</ul>
                        <ul>{array[index+2]} ${array[index+2]}</ul>
                        <ul>File ${file}</ul>
                        <ul>Index ${index}</ul>
                        <ul>Array ${array}</ul>
                        <ul>Array ${content[ds]}</ul>
              <ul>ReadFileSync /*fsPromise.readFileSync(filePath,'utf-8')*/</ul>
                      </li>
                    </body>`);
              });
          });
        });   
}
});

server.listen(8080, () => {
  console.log(`escutando em http://localhost:8080`);
});


//promise.all  promise assincrono,
//readFileSync é sincrono não dá pra usar com primise