# Como instalar o node.js pelo arquivo binário
#### 1. Criar um diretório para fazer o download do arquivo binário:
```
sudo mkdir -p /usr/local/lib/nodejs
 ```
#### 2. Entrar no diretório que criamos:
```
cd /usr/local/lib/nodejs
 ```
#### 3. Fazer o dowload do arquivo binário:
###### OBS: substituir os Xs pelo o número da versão LTS.
```
wget https://nodejs.org/dist/vXX.XX.X/node-vXX.XX.XX-linux-x64.tar.xz
 ```
#### 4. Descompactar o arquivo:
```
tar -xvf node-vXX.XX.X-linux-x64.tar.xz
 ```
#### 5. Entrar no diretório que acabamos de descompactar:
```
cd node-vXX.XX.X-linux-x64
 ```
#### 6. copiar os arquivos parar seu diretório */usr/local*:
```
sudo cp -R * /usr/local/
 ```
#### 7. Realizar o simlink para o diretório */usr/bin*:
```
sudo ln -s /usr/local/lib/nodejs/node-node-vXX.XX.XX-linux-x64/bin/node /usr/bin/node
 ```
```
sudo ln -s /usr/local/lib/nodejs/node-node-vXX.XX.XX-linux-x64/bin/npm /usr/bin/npm
 ```
```
sudo ln -s /usr/local/lib/nodejs/node-node-vXX.XX.XX-linux-x64/bin/npx /usr/bin/npx
 ```
#### 8. verificar se foi instalado:
```
node -v
 ```
# Exemplo de uma app.js:
```
const http = require("http");
const fs = require('fs').promises;
const host = 'localhost';//se for um servidor remoto, por o IP no lugar do localhost
const port = 3000;//porta padrão do nodejs é a 3000

const requestListener = function (req, res) {
    fs.readFile('/home/rickedu/ftp/files/index.html')//colocar o path até o html que deseja exibir na porta 3000
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
 ```