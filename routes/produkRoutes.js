const express = require('express')
const router = express.Router()

const produkController = require('../controller/produkController')
const uploadFile = require('../utils/multer')

router.route('/produk').get(produkController.paginationProduk).post(produkController.AddPorduk)
router.route('/produk/:produk_id').get(produkController.getOneProduk).patch(uploadFile("poto_produk"),produkController.updateProduk)
router.route('/kd-produk').get(produkController.getAllKdProduk)
router.route('/kd-satuan').get(produkController.getAllKdSatuan)

module.exports = router