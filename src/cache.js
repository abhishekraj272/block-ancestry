const fs = require("fs");

const saveBlockHashInCache = (blockHash) => {
    const block = {
        hash: blockHash,
    }

    fs.writeFileSync("./src/block.json", JSON.stringify(block));
}

const getBlockHashFromCache = () => {
    try {
        const block = JSON.parse(fs.readFileSync("./src/block.json"));
        return block.hash;
    } catch (error) {
        return null;
    }
}

const getBlockTransactionsFromCache = () => {
    try {
        const txns = JSON.parse(fs.readFileSync("./src/transactions.json"));
        return txns;
    } catch (error) {
        return null;
    }
}

const saveBlockTransactionsInCache = (transactions) => {
    const txns = getBlockTransactionsFromCache();
    if (txns) {
        transactions = [...txns, ...transactions];
    }
    fs.writeFileSync("./src/transactions.json", JSON.stringify(transactions, null, 2));
}
   
const saveAncestorsInCache = (ancestors) => {
    fs.writeFileSync("./src/ancestors.json", JSON.stringify(ancestors, null, 2));
}

const saveResultsInCache = (results) => {
    fs.writeFileSync("./src/results.json", JSON.stringify(results, null, 2));
}

module.exports = {
    saveBlockHashInCache,
    getBlockHashFromCache,
    getBlockTransactionsFromCache,
    saveBlockTransactionsInCache,
    saveAncestorsInCache,
    saveResultsInCache
}