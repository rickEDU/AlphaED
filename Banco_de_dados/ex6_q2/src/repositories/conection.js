const pool = require("./pool");

TAG = "Connection: "

exports.executarQuerys = async (querys)=> {
    const client = await pool.connect(); 
    let results = [];
    try {
        await client.query("BEGIN");
        for (let i = 0; i < querys.length; i++) {
            try {
                const result = await client.query(querys[i].text, querys[i].values);
                results.push(result.rows[0]);
            } catch (err) {
                console.log(err);
                await client.query("ROLLBACK");
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