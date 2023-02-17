const pool = require('./index')

exports.car_insert = async (_id_product, _id_user, _id_status) => {
    try {
        const query = await (pool.query(`
        insert into carrinho_produto (id, id_produto, id_user, status) 
        values(
            gen_random_uuid(),
            $1,
            $2,
            $3);`, [_id_product,_id_user, _id_status]));
        if (query.rows[0])  return query.rows;
        throw new Error('No rows returned')

    } catch (error) {
        throw error;
    }
};


exports.car_delete = async (_id) => {
    try {
        const query = await (pool.query(`
        delete from carrinho_produto where id='$1';`, [_id]));
        if (query.rows[0])  return query.rows;
        throw new Error('No rows returned')

    } catch (error) {
        throw error;
    }
};

exports.car_select = async (_id_user) => {
    try {
        const query = await (pool.query(`
        select p.nome, p.preco 
        from produtos p, carrinho_produto cp, status s
        where cp.id_user=$1 and cp.status=s.id and s.nome='pedido' and p.id=cp.id_produto;`, [_id_user]));
        if (query.rows[0])  return query.rows;
        throw new Error('No rows returned')

    } catch (error) {
        throw error;
    }
};

exports.car_quantidade = async (_id_user) => {
    try {
        const query = await (pool.query(`
        select count(cp.*) 
        from carrinho_produto cp, status s
        where cp.id_user=$1 and cp.status=s.id and s.nome='pedido';
        `, [_id_user]));
        if (query.rows[0])  return query.rows;
        throw new Error('No rows returned')

    } catch (error) {
        throw error;
    }
};

exports.car_valor_total = async (_id_user) => {
    try {
        const query = await (pool.query(`
        select sum(p.preco) from produtos p, carrinho_produto cp, status s
        where cp.id_user=$1 and cp.status=s.id and s.nome='pedido' and p.id=cp.id_produto
        ;
        `, [_id_user]));
        if (query.rows[0])  return query.rows;
        throw new Error('No rows returned')

    } catch (error) {
        throw error;
    }
};

