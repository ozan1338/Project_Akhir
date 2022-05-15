const express = require('express')
const router = express.Router()

const produkController = require('../controller/produkController')

router.route('/produk').get(produkController.paginationProduk)
router.route('/produk/:produk_id').get(produkController.getOneProduk)

module.exports = router