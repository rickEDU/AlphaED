-- Criei a tabela pelo pgAdmin, então não precisei usar nenhum comando para isso.

-- Criação da tabela:
create table accounts(
	id serial primary key not null,
	email varchar(255),
	name varchar(255),
	password varchar(60));