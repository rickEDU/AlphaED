# Como instalar o nginx apartir do código fonte

#### 1. Atualize do gerenciador de arquivos:
``` sudo apt-get update```
#### 2. Instale as bibliotecas essenciais para o nginx:
```  sudo apt-get install build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev libssl-dev libgd-dev libxml2 libxml2-dev uuid-dev ```
#### 3. Faça o download do nginx:
###### OBS: substitua os X da versão pelos números.
``` wget  http://nginx.org/download/nginx-x.xx.x.tar.gz ```
#### 4. Descompacte a arquivo baixado:
```tar -zxvf nginx-x.xx.x.tar.gz```
#### 5. Entre no diretório que acabos de descompactar:
```cd nginx-x.xx.x```
#### 6. Configure a instalação usando o ./configure abaixo:
```./configure --prefix=/var/www/html --sbin-path=/usr/sbin/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --with-pcre  --lock-path=/var/lock/nginx.lock --pid-path=/var/run/nginx.pid --with-http_ssl_module --with-http_image_filter_module=dynamic --modules-path=/etc/nginx/modules --with-http_v2_module --with-stream=dynamic --with-http_addition_module --with-http_mp4_module```
#### 7. Use o comando Make depois de completada a configuração:
```sudo make```
#### 8. Por fim instale o nginx:
```sudo make install```
#### 9. Teste para verificar se instalou:
```nginx -v```
#### 10. habilitando o sistemctl para o nginx:
```sudo vim /lib/systemd/system/nginx.service```
##### 10.1 O conteúdo do arquivo, o não está comentado, deve ser:
```
[Unit]
Description=The NGINX HTTP and reverse proxy server
After=syslog.target network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target

[Service]
Type=forking
PIDFile=/var/run/nginx.pid
ExecStartPre=/usr/sbin/nginx -t
ExecStart=/usr/sbin/nginx
ExecReload=/usr/sbin/nginx -s reload
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
 ```
###### OBS: devemos criar esse arquivo caso ele não exista. 
#### 11. status, enable, restart do nginx:
```sudo systemctl status nginx```
```sudo systemctl enable nginx```
```sudo systemctl restart nginx```

#### 12. Criando chaves públicas e privadas para o nginx:
###### seguir os comandos abaixo:
```
mkdir /etc/nginx/certificate
cd /etc/nginx/certificate
openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out nginx-certificate.crt -keyout nginx.key
 ```
#### 13. Redirecionar o nginx para páginas https:
###### Editar o arquivo /etc/nginx/nginx.conf, ele deve está como abaixo:
Campos que devemos alterar:
```
...
    server {
        listen       80;
        server_name  localhost;
        return 301 https://192.168.1.5/;
        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /home/usuario_apache/ftp/files;
            index  index.html index.htm;
        }
...
 ``` 
###### OBS: o campo **listen** se refere a porta para o servidor, por padrão o nginx usa a 80, **server_name** ip ou domínio, o **return** se refere ao ip da máquina virtual, **root** é **caminho (path)** ao diretório do html que será exibido quando digitarmos o ip no navegador, **pode ser alterado**.
```
...
    server {
        listen       443 ssl;
        server_name  localhost;

        ssl_certificate      /etc/nginx/certificate/nginx-certificate.crt;
        ssl_certificate_key  /etc/nginx/certificate/nginx.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

        location / {
            root   /home/usuario_apache/ftp/files;
            index  index.html index.htm;
        }
    }

}
 ```
###### OBS:  O **root** do bloco location é onde caminho até o diretório do html que será exibido quando acontecer uma solicitação via https.

# Como desinstalar o nginx:
##### Verificando a versão do Nginx
```
sudo nginx -v
 ```
##### Removendo o Nginx e o Nginx-common (caso esteja instalado também)
```
sudo apt remove nginx nginx-common
 ```
##### Dar o purge no Nginx e o Nginx-common
```
sudo apt purge nginx nginx-common
sudo apt autoremove
 ```
##### Verificar novamente se tem alguma versão instalada do Nginx
```
sudo nginx -v
 ```
### Como verificar se ainda há algum processo usando a porta 80:
```sudo lsof -i :80 ```
#### Para matar o processo usar o PID dele:
```kill -9 "número do PID"```