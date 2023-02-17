create table endereco(
	id uuid primary key not null,
	cep varchar(9),
	bairro varchar(50),
	cidade varchar(70),
	estado varchar(2));
	
CREATE TABLE usuarios (
	id uuid primary key NOT NULL,
	endereco uuid NOT NULL,
	end_num varchar(5) NOT NULL,
	end_rua varchar(5) NOT NULL,
	cpf VARCHAR(11) NOT NULL,
	nome varchar(255) NOT NULL,
	data_nascimento DATE NOT NULL,
	email varchar(1) NOT NULL,
	telefone varchar(1) NOT NULL,
	foreign key (endereco) references endereco(id));

create table status(
	id uuid primary key not null,
	nome varchar(50));
	
create table categoria(
	id uuid primary key not null,
	nome varchar(50));
	
create table marca(
	id uuid primary key not null,
	nome varchar(75));
	
create table produtos (
	id uuid primary key not null,
	categoria uuid not null,
	marca uuid not null,
	preco float,
	nome varchar(255));
	
alter table produtos add foreign key (categoria) references categoria(id);
alter table produtos add foreign key (marca) references marca(id);

create table lista_produtos(
	id uuid primary key not null,
	lista uuid[])
	
create table carrinho(
	id uuid primary key not null,
	lista_produtos uuid,
	foreign key (lista_produtos) references lista_produtos(id));
	
create table pedidos(
	id uuid primary key not null,
	id_user uuid not null,
	lista_produtos uuid not null,
	status uuid not null,
	valor_total float,
	data_compra timestamp,
	foreign key (id_user) references usuarios(id),
	foreign key (lista_produtos) references lista_produtos(id),
	foreign key (status) references status(id));




-- para verificar as estensões do postgres
SELECT * FROM pg_extension;
-- para instalar o UUID:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Save

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SELECT * FROM pg_extension;

insert into marca(id, nome) values(gen_random_uuid (), 'Italac');
insert into categoria(id, nome) values(gen_random_uuid (), 'categoria 3');
delete from produtos where id='733da7f5-41ef-4229-8f35-b1bca6cff37d';
select * from marca;
select * from categoria;
select * from produtos;


update produtos set nome='whey protein' where id='97e4db7b-02f4-4a00-851c-b5d482f6052c';


select p.*, m.*, c.* 
from produtos p, marca m, categoria c 
where p.categoria=c.id and p.marca=m.id order by p.preco;

insert into produtos 
(id, categoria, marca, preco, nome) 
values(
	gen_random_uuid(), 
	'12e291a5-ee80-44be-88a0-838dbba35b02', 
	'5db0b095-1194-4e5e-a59a-2e5d09fc525c',
	150.99, 
	'Leite em pó pasteurizado');



-- ex5
insert into lista_produtos(id, lista, contador) values (gen_random_uuid(),'{"a5845983-d7a2-46e5-8ff0-35a0da7afb7c", "5b2ef440-b1bd-4330-b119-111b55c7b906"}', 2 );

select l.lista[1], p.nome, p.preco from lista_produtos l, produtos p where l.lista[1]=p.id;

select * from status


insert into usuarios (id, endereco, end_num, end_rua, cpf, nome, data_nascimento, email, telefone) values (gen_random_uuid(), '1ff67ac1-dfc3-4c9b-a048-237180a73dcb', '56', 'Caste', '11111111122', 'Edu Henri', '1991-09-01 00:00:00', 'email@gmail.com', '9999-9999')
select*from usuarios

insert into endereco (id, cep, bairro, cidade, estado) values(gen_random_uuid(), '59300-000', 'Centro', 'Caicó', 'RN') 

insert into carrinho (id, lista_produtos) values ('5cee8292-61a6-4836-8141-282b52b3eb9f', 'a39b03e9-8d22-458b-8101-19870d75f17b')

select sum(p.preco) from produtos p, c_produto cp, carrinho c where c.id=cp.id_carrinho and p.id=cp.id_produto 


create table carrinho_produto (
	id uuid primary key,
	id_produto uuid,
	id_user uuid,
	id_pedido uuid,
	status uuid,
	foreign key (id_produto) references produtos(id),
	foreign key (id_user) references usuarios(id),
	foreign key (id_pedido)references pedido(id),
	foreign key (status)references status(id))
	
create table pedido (
	id uuid primary key not null,
	id_user uuid not null,
	status uuid,
	valor_total float,
	data_compra timestamp,
	foreign key (id_user) references usuarios(id),
	foreign key (status)references status(id))
select * from status

select cp.* from carrinho_produto cp, status s, usuarios u where cp.status=s.id and s.nome ='pedido' and u.id=cp.id_user


delete from carrinho_produto where id='6c492e7e-5ebb-4991-bdf2-dd27c95a4b57'

select count(cp.*) from carrinho_produto cp where cp.id_user='5cee8292-61a6-4836-8141-282b52b3eb9f' and cp.status='0628c19d-c9fc-49e0-b020-ccb6b77bc6b5'

select sum(p.preco) from produtos p, carrinho_produto cp 
where cp.id_user='5cee8292-61a6-4836-8141-282b52b3eb9f' and cp.status='0628c19d-c9fc-49e0-b020-ccb6b77bc6b5' and p.id=cp.id_produto

select p.nome, p.preco from produtos p, carrinho_produto cp, status s
where cp.id_user='5cee8292-61a6-4836-8141-282b52b3eb9f' and cp.status=s.id and s.nome='pedido' and p.id=cp.id_produto

insert into status (id, nome) values(gen_random_uuid(), 'processando'),(gen_random_uuid(), 'pedido'),(gen_random_uuid(), 'entrega'),(gen_random_uuid(), 'encerrado'),(gen_random_uuid(), 'cancelado'), (gen_random_uuid(), 'desejado')
select * from carrinho_produto													   
insert into carrinho_produto (id, id_produto, id_user, status) 
values(gen_random_uuid(), 'a5845983-d7a2-46e5-8ff0-35a0da7afb7c', '5cee8292-61a6-4836-8141-282b52b3eb9f', '0628c19d-c9fc-49e0-b020-ccb6b77bc6b5'), 
(gen_random_uuid(), '97e4db7b-02f4-4a00-851c-b5d482f6052c', '5cee8292-61a6-4836-8141-282b52b3eb9f', '0628c19d-c9fc-49e0-b020-ccb6b77bc6b5')


explain select sum(p.preco) from produtos p, carrinho_produto cp, status s
where cp.id_user='5cee8292-61a6-4836-8141-282b52b3eb9f' and cp.status=s.id and s.nome='pedido' and p.id=cp.id_produto