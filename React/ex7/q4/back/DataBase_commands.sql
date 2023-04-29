-- Criei a tabela pelo pgAdmin, então não precisei usar nenhum comando para isso.

-- Criação da tabela:
create table accounts(
	id serial primary key not null,
	email varchar(255) not null unique,
	name varchar(255),
	password varchar(60));

-- povoamento:
insert into accounts(email, name, password) values('user@gmail.com', 'user1', 'senha123'),('user2@gmail.com', 'user2', 'senha123')