const { query } = require('express');
const executar = require('./conection.js')
const insert = require('./query/query.js')

const TAG = '/REPOSITORIES '

exports.DB_insertProduct = (id, product) =>{
    try{
        let produto = "";
        for( let id=0; id<product.length; id++){
            if(id==product.length-1){
                produto = produto +`(${product[id]}, lista_pedidos_id)`
                continue;
            }
            produto = produto +`(${product[id]}, lista_pedidos_id),`
        }
        const queryFormatada = insert.replace(/\n/g, "")
        console.log(queryFormatada)
        const query = [{
            text:`
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

            COMMIT;

            select * from lista_pedidos;
            `,
            values: [id,produto]
        }]
        console.log(query)
        const response  = executar.executarQuerys(query)
        console.log(response)
        return response
    }catch(e){
        console.log(TAG, e)
        throw e
    }
}