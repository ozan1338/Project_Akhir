const express = require('express')
const router = express.Router()

const produkController = require('../controller/produkController')

router.route('/produk').get(produkController.paginationProduk)
router.route('/produk/:produk_id').get(produkController.getOneProduk).patch(produkController.updateProduk)
router.route('/kd-produk').get(produkController.getAllKdProduk)
router.route('/kd-satuan').get(produkController.getAllKdSatuan)

module.exports = router