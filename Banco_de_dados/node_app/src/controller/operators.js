var  pool  = require('../repositories/index.js')
let service = require('../service/planet_service')


exports.insert = async(req, res)=>{
    await pool.query("insert into produtos (id, categoria, marca, preco, nome) values(gen_random_uuid(), '12e291a5-ee80-44be-88a0-838dbba35b02', '5db0b095-1194-4e5e-a59a-2e5d09fc525c',150.99, 'Leite em pó pasteurizado');")
    pool.end()
}

exports.update = async()=>{
    await pool.query("update produtos set nome='Leite de caixa' where id='a515d196-66f5-4ec1-a209-70c3cde35598';")
    pool.end()
}

exports.select = async(req, res)=>{
    let resposta = await pool.query("select p.nome as Nome, p.preco as Preço, m.nome as Marca, c.nome as Categoria from produtos p, marca m, categoria c where p.categoria=c.id and p.marca=m.id order by p.preco")
    res.status(200).json({
        status:200,
        data: resposta.rows})

    pool.end()
}

exports.del = async()=>{
    let id = 'a515d196-66f5-4ec1-a209-70c3cde35598'
    await pool.query(`delete from produtos where id='${id}';`)
    pool.end()
}

exports.car_select = async(req, res)=>{
    
    let resposta = await pool.query('select cp.* from carrinho_produto cp, status s, usuarios u where cp.status=s.id and s.nome ="pedido" and u.id=cp.id_user')
}   

exports.getPlanetById = (req, res) =>{
    try{
        const planets = await service.getPlanet()
        console.log(planets)
    }catch(e){
        console.log(e)
    }
}