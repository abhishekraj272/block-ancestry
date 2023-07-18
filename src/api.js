const { get: fetch } = require("axios");

// helpers
const { getBlockHashFromCache, saveBlockHashInCache, getBlockTransactionsFromCache, saveBlockTransactionsInCache } = require("./cache");

// constants
const { BLOCKSTREAM_BASE_URL, BLOCK_HEIGHT, ENDPOINTS } =  require("./constants");
const { format } = require("./helpers");

const getBlockHash = async (height) => {
    let hash = getBlockHashFromCache();

    if (!hash) {
        try {
            const response = await fetch(`${BLOCKSTREAM_BASE_URL}${ENDPOINTS.BLOCK_HEIGHT}${height}`);
            hash = response.data;
            saveBlockHashInCache(hash);
        }
        catch (error) {
            console.log(error);
        }
    }

    return hash;
}

const getBlockTrasactions = async (hash, page) => {
    const url = format(`${BLOCKSTREAM_BASE_URL}${ENDPOINTS.TXNS}`, hash, page);
    let txns;
    try {
        const response = await fetch(url);
        txns = response.data;
        saveBlockTransactionsInCache(txns);
    }
    catch (error) {
        console.log(error);
        return null
    }

    return txns;
}

const getBlock = async () => {
    let txns = getBlockTransactionsFromCache();
    
    if (txns) {
        return txns;
    }


    const hash = await getBlockHash(BLOCK_HEIGHT);

    let count = 0;
    while (true) {
        const transactions = await getBlockTrasactions(hash, count++ * 25);
        console.log(`Fetched ${transactions.length} transactions, Page: ${count}`);
        if (!transactions) break;
    }

    txns = getBlockTransactionsFromCache();
    return txns;
}

module.exports = {
    getBlock
}