const Transaction = require('../models/transaction');

//desc  : get all transactions
//route : /api/v1/transactions
//acess : public
exports.getTransactions = async (req, res, next) => {
  try {
    const trasactions_collection = await Transaction.find();

    return res.status(200).json({
      success: true,
      count: trasactions_collection.length,
      data: trasactions_collection
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

//desc  : add a transaction
//route : /api/v1/transactions
//acess : public
exports.addTransactions = async (req, res, next) => {
  const { text, amount } = req.body;

  try {
    const newTrasactions_doc = await Transaction.create(req.body);
    const trasactions_collection = await Transaction.find();

    return res.status(201).json({
      success: true,
      count: trasactions_collection.length,
      data: trasactions_collection,
      added: newTrasactions_doc
    });
  } catch (err) {
    console.log('error occurs while working with DB ' + err.message.red);

    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }
  }
};

//desc  : delete a transaction
//route : /api/v1/transactions:id
//acess : public
exports.deleteTransactions = async (req, res, next) => {
  try {
    const foundTransaction_doc = await Transaction.findById(req.params.id);

    if (!foundTransaction_doc) {
      return res.status(404).json({
        success: false,
        error: 'No Matched transaction found'
      });
    }

    await foundTransaction_doc.remove();
    const trasactions_collection = await Transaction.find();

    return res.status(200).json({
      success: true,
      data: trasactions_collection,
      removed: foundTransaction_doc
    });
  } catch (err) {}
};
