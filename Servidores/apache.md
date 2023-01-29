# Instalando o Apache

#### 1. Atualizar o gerenciador de arquivos:
```
sudo apt update
 ```
#### 2. Instalando o Apache2 através do apt:
```
sudo apt install apache2
 ```
#### 3 Ajustando o firewall:
###### Durante a instalação pelo apt o apache se registra no UFW (firewall), comando para vê se está registrado:
```
sudo ufw app list
 ```
```
sudo ufw allow "Apache Full"
 ```
###### a saída deverá ser:
```
Output
Available applications:
  Apache
  Apache Full
  Apache Secure
  OpenSSH
 ```
##### 3.1 É recomendável habilitar o perfil mais restritivo:
```
sudo ufw allow apache
 ```
###### para verificar:
```
sudo ufw status
 ```
###### a saída deverá ser:
```
Output
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere                  
Apache                     ALLOW       Anywhere                
OpenSSH (v6)               ALLOW       Anywhere (v6)             
Apache (v6)                ALLOW       Anywhere (v6)
 ```

###### OBS: Observar as permissões referentes ao Apache.

#### 4. Verificar se o apache está rodando:
```sudo systemctl status apache2
 ```
##### 4.1 Comandos para o apache:
###### Parar:
```
sudo systemctl stop apache2
 ```
###### Iniciar:
```
sudo systemctl start apache2
 ```
###### Reiniciar:
```
sudo systemctl restart apache2
 ```
###### Desativar:
```
sudo systemctl disable apache2
 ```
###### Ativar:
```
sudo systemctl enable apache2
 ```

#### 5. Configurando Hosts Virtuais:
##### 5.1 Criando o diretório do seu domínio:
```
sudo mkdir /var/www/your_domain
 ```
##### 5.2 Atribua a propriedade a variável de ambiente $USER :
```
sudo chown -R $USER:$USER /var/www/your_domain
 ```
##### 5.3 Configurando as permissões do seu web root:
```
sudo chmod -R 755 /var/www/your_domain
 ```
###### OBS: dentro do diretório **/var/www/your_domain** é onde ficará o arquivo html que será exibido se acessarmos o http://"ip da VM/máquina remota"

#### 6. Criando um virtual host para seu novo domínio:
```
sudo nano /etc/apache2/sites-available/your_domain.conf
 ```
#### 7. Configure o arquivo de configuração de seu domínio para a porta 80, adcionando as linhas abaixo nele:
```
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName your_domain
    ServerAlias www.your_domain
    DocumentRoot /var/www/your_domain
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
 ```
#### 8. Habilite o arquivo "your_domain.conf" usando o a2ensite :
```
sudo a2ensite your_domain.conf
 ```
##### 8.1 Desabilite o site padrão definido pelo apache:
```
sudo a2dissite 000-default.conf
 ```
#### 9. Teste a procura de erros na configuração que acabos de criar e editar:
```
sudo apache2ctl configtest
 ```
##### 9.1 O resultado deve ser:
```
Output
Syntax OK 
 ```
#### 10. Reinicar o apache2:
```
sudo systemctl restart apache2
 ```

# Habilitando o modo SSL (https):
#### 1. habilite o mod_ssl com o comando :
```
sudo a2enmod ssl
 ```
#### 2. Criando o certificado SSL :
```
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt
 ```
##### Irá aparece campos para serem preenchidos como mostrado abaixo:
```
Country Name (2 letter code) [XX]:US
State or Province Name (full name) []:Example
Locality Name (eg, city) [Default City]:Example 
Organization Name (eg, company) [Default Company Ltd]:Example Inc
Organizational Unit Name (eg, section) []:Example Dept
Common Name (eg, your name or your server's hostname) []:your_domain_or_ip
Email Address []:webmaster@example.com
 ```
#### 3. Configurando o apache para usar SSL:
##### 3.1 editar o arquivo /etc/apache2/sites-available/*your_domain.conf*:
```
<VirtualHost *:443>
    ServerAdmin root@localhost
    #ServerName/Alias pode ser o nome do dominio ou o ip
    ServerName your_domain.com
    ServerAlias www.your_domain.com
    DocumentRoot /var/www/your_domain.com
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/apache-selfsigned.crt
    SSLCertificateKeyFile /etc/ssl/private/apache-selfsigned.key
</VirtualHost>

<VirtualHost *:80>
    ServerName your_domain.com
    Redirect / https://192.168.1.5
</VirtualHost>
 ```
###### OBS: ServerName e ServerAlias é o nome do domínio ou ip da máquina, DocumentRoot é onde está o diretório raíz das páginas que serão servidas, https é na porta 443, se tentar acessar pela porta 80 será redirecionado para o https.

### 4. Acrescentar o domínio ao arquivo /etc/hosts :
```
127.0.0.1 localhost
127.0.1.1 ubuntu-server
127.0.0.1 your_domain.com 
 ```
#### 5. Reiniciar o apache2
```
sudo systemctl restart apache2
 ```
### OBS: Para permitir outro diretório além do /var/www/:
#### Para permitir que o apache use outro diretório como root, devemos acrescentar ao arquivo de configuração do apache "/etc/apache2/apache2.config" uma tag de Diretório como mostrado abaixo:
```
<Directory /"novo caminho até o diretório desejado">
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
</Directory> 
 ```

# Como desinstalar o apache do linux:
```
sudo service apache2 stop
 ```
```
sudo apt-get purge apache2 apache2-utils apache2.2-bin
 ```
```
apache2-common
 ```
```
sudo apt remove apache2.*
 ```
```
 sudo apt-get autoremove
 ```
```
whereis apache2
 ```
```
sudo rm -rf /etc/apache2
 ```

### Como verificar se ainda há algum processo usando a porta 80:
```
sudo lsof -i :80
 ```
#### Para matar o processo usar o PID dele:
```
kill -9 "número do PID"
 ```