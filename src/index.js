const { getBlock } = require("./api");
const { saveResultsInCache } = require("./cache");

const getTxIdAndInputTxidMap = (txns) => {
    const txIdMap = {};
    for (const txn of txns) {
        const { vin, txid } = txn;
        const inputTxIds = vin.map((input) => input.txid);
        txIdMap[txid] = inputTxIds;
    }
    return txIdMap;
}

const findAncestors = (txIdMap, txnId, result = []) => {
    const txnIds = txIdMap[txnId];
    if (!txnIds) return result;
    result.push(txnId);
    for (const id of txnIds) {
        findAncestors(txIdMap, id, result);
    }
    return result;
}

(async() => {
    const txns = await getBlock();
    const txIdMap = getTxIdAndInputTxidMap(txns);
    const ancestorChain = [];

    for (key in txIdMap) {
        const result = findAncestors(txIdMap, key);
        ancestorChain.push([key, result ]);
    }

    ancestorChain.sort((a, b) => b[1].length - a[1].length)
    const ancestorChainToConsider = ancestorChain.slice(0, 10);
    const result = ancestorChainToConsider.map(([txnId, ancestors]) => {
        return {[txnId]: ancestors.length}
    });
    saveResultsInCache(result);
})()
