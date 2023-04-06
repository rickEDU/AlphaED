const insert = `
DO $$
DECLARE lista_pedidos_id INTEGER;
BEGIN
    -- insere a lista de pedidos e retorna o ID
    INSERT INTO lista_pedidos(id_usuario, status, create_at)
    VALUES ($1, 1, NOW()) RETURNING id INTO lista_pedidos_id;

    -- insere os produtos na lista de pedidos
    BEGIN
        INSERT INTO pedido(id_produto, id_lista)
        VALUES $2;
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
`
module.exports = insert