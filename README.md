# block-ancestry

## Getting Started

1. `npm install`
2. `node src/index.js`

## Working?
1. It pulls hash from the block with given height and caches in `block.json`.
2. Then it pulls the trasactions with the given hash from the paginated Txn API and caches in `transactions.json`.
3. Then it creates map of txnId and array of its input txIds.
4. Then we do a BFS on the map to find the ancestors of the given txnId.