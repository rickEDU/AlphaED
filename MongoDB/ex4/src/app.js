require('dotenv').config();
const mongoose = require('mongoose');

const ProductionSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    name: String,
    category: String,
    price: Number,
    stock: {
        qtd: Number
    }
});

const ProductionModel = mongoose.model("produtos", ProductionSchema);

async function productsAggregate1 () {
    try {
        await mongoose.connect(process.env.HOST);
        const produtos = await ProductionModel.aggregate([
            { $group: { _id: '$state'} },
            { $project: { state: '$_id', _id: 0 } },
        ]);
        const produtos2 = await ProductionModel.aggregate([
            { $match: { quantity:{ $gt: 100 } } },
            { $group: {_id: "$state", totalSales: { $sum: { $multiply: ["$quantity", "$unitPrice"] } } } },
            { $project: {_id:0, state: "$_id", totalSales: 1 } }
        ]);
        console.log("Consulta da questão 1: ", produtos);
        console.log("Consulta da questão 2: ", produtos2);
        await mongoose.connection.close();
    } catch (e) {
        console.log(e);
    }
};

productsAggregate1();
