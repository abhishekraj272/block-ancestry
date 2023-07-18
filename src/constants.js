const BLOCKSTREAM_BASE_URL = "https://blockstream.info/api";

const BLOCK_HEIGHT = 680001;

const ENDPOINTS = {
    BLOCK_HEIGHT: "/block-height/",
    TXNS: "/block/{0}/txs/{1}",
}

module.exports = {
    BLOCKSTREAM_BASE_URL,
    BLOCK_HEIGHT,
    ENDPOINTS
}