const currencyModel = require("../models/currency.model");

const currencyController = { };

currencyController.getCurrencies = async (req, res, next) => {
    const currencies = await currencyModel.find();
    console.log(currencies[0]);
    if (currencies && currencies.length) {
        res.json({success: true, currencies: currencies})
    } else {
        res.json({success: false})
    }
}

module.exports = currencyController;