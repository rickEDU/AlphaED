create table usuario(
    id serial not null primary key,
    nome varchar(255)
)
insert into usuario(nome)
values('teste 1');

create table categoria(
	id serial not null primary key,
	name varchar(255)
);
create table marca(
	id serial not null primary key,
	name varchar(255)
);
create table status(
	id serial primary key not null, 
	nome varchar(30) not null
);

insert into status (nome)
values('open'), ('close');

insert into categoria (nome)
values('categoria 1'), ('categoria 2'), ('categoria 3');

insert into marca (nome)
values('marca 1'), ('marca 2'), ('marca 3');

create table produto(
	id serial not null primary key,
	categoria serial,
	marca serial,
	preco double precision not null,
	nome varchar(255),
	foreign key (marca) references marca(id),
	foreign key (categoria) references categoria(id)
);

insert into produto (categoria, marca, preco, nome)
values (1, 2, 22.5, 'produto 1'),
(2, 3, 12.45, 'produto 2'),
(3, 3, 10.99, 'produto 3');

create table lista_pedidos(
	id serial primary key not null, 
	id_usuario serial,
	status serial,
	valor_total double precision,
	create_at date
);
create table pedido(
	id serial not null primary key,
	id_produto serial not null,
	id_lista serial not null,
	foreign key (id_produto) references produto(id),
	foreign key (id_lista) references lista_pedidos(id)
);


-- adicionando um pedido para um usuário
-- onde primeiro é criado o pedido, onde é indico o usuário que está fazendo o pedido e o status dele

-- variáveis: 
--  id_pedido= ao id do pedido que é criado no insert abaixo
--  id_produto = ao id do protudo que será pedido

insert into lista_pedidos(id_usuario, status, create_at)
values (1, 1, now()) returning id;
-- em seguida são criados os cadastros dos produtos que serão pedidos nessa lista
insert into pedido(id_produto, id_lista) 
values(id_produto, id_pedido),(id_produto, id_pedido);
-- por fim é feito um update no cadastro do pedido para colocar o valor total do pedido feito.
update lista_pedidos set 
valor_total=(
	select sum(preco) 
	from pedido inner join produto on produto.id=pedido.id_produto 
	where pedido.id_lista= id_pedido ) where id= id_pedido ;


-- solução para o rollback dessas querys acima

DO $$
DECLARE lista_pedidos_id INTEGER;
BEGIN
    -- insere a lista de pedidos e retorna o ID
    INSERT INTO lista_pedidos(id_usuario, status, create_at)
    VALUES (1, 1, NOW()) RETURNING id INTO lista_pedidos_id;

    -- insere os produtos na lista de pedidos
    BEGIN
        INSERT INTO pedido(id_produto, id_lista)
        VALUES (1, lista_pedidos_id), (2, lista_pedidos_id);
    EXCEPTION WHEN OTHERS THEN
        RAISE;
    END;

    -- atualiza o valor total da lista de pedidos
    BEGIN
        UPDATE lista_pedidos SET
        valor_total = (
            SELECT SUM(preco)
            FROM pedido
            INNER JOIN produto ON produto.id = pedido.id_produto
            WHERE pedido.id_lista = lista_pedidos_id
        ) WHERE id = lista_pedidos_id;
    EXCEPTION WHEN OTHERS THEN
        RAISE;
    END;
END $$;

COMMIT;