# Configurando o FTP/vsFTPd
#### 1. Atualizando o apt:
``` sudo apt-get update ```
#### 2. Instalando o vsFTPd:
``` sudo apt-get install vsftpd ```
#### 3. Depois de instalado criar uma cópia da configuração:
``` sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.original ```
#### 4. Verificando o firewall:
``` sudo ufw status ```
##### 4.1. Ativar/Desativar o firewall:
###### Ativar:
``` sudo ufw enable ```
###### Desativar:
``` sudo ufw disable ```
##### 4.2. Permitindo as portas 20, 21, 990 e 4000-5000:
```
udo ufw allow 20/tcp
sudo ufw allow 21/tcp
sudo ufw allow 990/tcp
sudo ufw allow 40000:50000/tcp 
 ```
##### 4.3. Verificar o status do firewall:
``` sudo ufw status ```
###### O resultado deve ser:
```
To                         Action      From
--                         ------      ----
20/tcp                     ALLOW       Anywhere
21/tcp                     ALLOW       Anywhere
990/tcp                    ALLOW       Anywhere
40000:50000/tcp            ALLOW       Anywhere
20/tcp (v6)                ALLOW       Anywhere (v6)
21/tcp (v6)                ALLOW       Anywhere (v6)
990/tcp (v6)               ALLOW       Anywhere (v6)
40000:50000/tcp (v6)       ALLOW       Anywhere (v6)
22 (v6)                    ALLOW       Anywhere (v6)
 ```
#### 5. Configurando um usuário para receber arquivos através do ftp
``` sudo adduser "nome do usuário" ```
###### 5.1 Criando o diretório que será o "root" durante a conexão ftp:
``` sudo mkdir /home/"usuário"/ftp ```
###### 5.2 trocando a propriedade do diretório "ftp":
``` sudo chown nobody:nogroup /home/"usuário"/ftp ```
###### 5.3 Removendo as permissões de gravação ao diretório "ftp":
``` sudo chmod 555 /home/"usuário"/ftp ```
###### 5.4 Criando o diretório "files" que será o diretório que receberá os arquivos através do ftp:
```
sudo mkdir /home/alex/ftp/files
sudo chown alex:alex /home/alex/ftp/files
 ```
#### 6. Configurando o arquivo /etc/vsftpd.conf  :
###### Apague todo o conteúdo do arquivo de configuração e copie o conteúdo abaixo nele:
```
anonymous_enable=NO
local_enable=YES
write_enable=YES
chroot_local_user=YES
user_sub_token=$USER
local_root=/home/$USER/ftp
pasv_min_port=40000
pasv_max_port=50000userlist_enable=YES
userlist_file=/etc/vsftpd.userlist
userlist_deny=NO

# SSL

rsa_cert_file=/etc/ssl/private/vsftpd.pem
rsa_private_key_file=/etc/ssl/private/vsftpd.pem
ssl_enable=YES
allow_anon_ssl=NO
force_local_data_ssl=YES
force_local_logins_ssl=YES
ssl_tlsv1=YES
ssl_sslv2=NO
ssl_sslv3=NO
require_ssl_reuse=NO
ssl_ciphers=HIGH
 ```
###### OBS: O certificado SSL do arquivo de configuração é criado no passo 6.2 desse tutorial.
#### 6.1. Criando a lista e adicionando um usuário a ela:
``` echo "usuario" | sudo tee -a /etc/vsftpd.userlist ```
###### Caso já tenha criado só editar o arquivo /etc/vsftpd.userlist e adicionar o nome usuário no arquivo:
``` sudo vim /etc/vsftpd.userlist ```
#### 6.2. Criando os certificados para o SSL :
``` sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/vsftpd.pem -out /etc/ssl/private/vsftpd.pem ```

#### 7. Reiniciar o vsftpd:
``` sudo systemctl restart vsftpd ```
ou
``` sudo service vsftpd restart ```

# Configurando o SFTP para ser chrooted (root jail):

#### 1. É obrigatório que o usuário /home/"usuário" esteja como usuário e senha root:
``` sudo chown root:root /home/"usuário" ```
#### 2. Para dar acesso aos usuários do cliente :
``` sudo chmod 755 /home/"usuario" ```
#### 3. Criando o grupo que será quem fará o root jail no usuário:
``` sudo groupadd sftponly ```
#### 4. adicionando o usuário ao grupo "sftponly" :
``` sudo gpasswd -a braz sftponly ```
#### 5. Editar o arquivo /etc/ssh/sshd_config :
###### 5.1 comentar a linha: 
``` Subsystem sftp /usr/lib/openssh/sftp-server ```
###### 5.2 adicionar ao final do arquivo as linhas:
```
Subsystem sftp internal-sftp
Match group sftponly
     ChrootDirectory /home/%u
     X11Forwarding no
     AllowTcpForwarding no
     ForceCommand internal-sftp 
 ```
#### 6. Reiniciar o ssh e o sshd:
```
service ssh restart
service sshd restart
 ```