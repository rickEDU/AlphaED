const pool = require("./pool");

exports.executarQuerys = async (querys)=> {
    const client = await pool.connect(); 
    
    let results = [];
    try {
        await client.query("BEGIN");
        for (const query of querys) {
            try {
                const result = await client.query(query.text, query.params);
                results.push(result);
            } catch (err) {
                console.log(err);
                await client.query("ROLLBACK");
                client.release();
                throw err;
            }  
        }
    await client.query("COMMIT");
    return results;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
    client.release();
    }
}