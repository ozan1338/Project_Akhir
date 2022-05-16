const {produk,kode_produk,kode_satuan} = require('../models')
const {query,QueryTypes} = require('sequelize')
const rawQuery = require('../models/rawQuery/raw_query')
const controller = {}
const db = require('../config/database')
const AppErrors = require('../utils/AppErrors')
//const sequelize = require('sequelize')


controller.paginationProduk = async(req,res,next) => {
    try {
        let offset = req.query.page > 0 ? req.query.page * 10 - 10 : 0;
        let nama_produk = req.query.nama_produk;

        //let page = req.query.page > 1 ? req.query.page * 10 - 10 : 0
        if(nama_produk) {
            offset = 0
        }

        const queryGetProduk = rawQuery.getListProduk(nama_produk)

        let result = await db.query(`${queryGetProduk} LIMIT 10 OFFSET ${offset}`, {
           type: QueryTypes.SELECT
        })
        
        const queryCountProduk = rawQuery.countAllProduk(nama_produk)

        let [count] = await db.query(queryCountProduk)


        //console.log(count[0].count)
        page_count = Math.ceil( count[0].count / 10)
        let desc = `${req.query.page} dari ${page_count}`

        res.status(200).json({
            status: "success",
            data: result,
            total: count[0].count,
            page_count: page_count,
            desc
        })
    } catch (err) {
        next(err)
    }
}

controller.getOneProduk = async(req,res,next) => {
    try {
        const produk_id = req.params.produk_id
        const getOneProdukQuery = rawQuery.getOneProduk(produk_id)
        const [data] = await db.query(getOneProdukQuery)

        if(data.length == 0) return next(new AppErrors("Tidak Ditemukan",404))

        res.status(200).json({
            status:"success",
            data: data[0]
        })
    } catch (err) {
        next(err)
    }
}

controller.getAllKdProduk = async(req,res,next) => {
    try {
        const data = await kode_produk.findAll()
        res.status(200).json({
            status:"success",
            data
        })
    } catch (err) {
        next(err)
    }
}

controller.getAllKdSatuan = async(req,res,next) => {
    try {
        const data = await kode_satuan.findAll()
        res.status(200).json({
            status:"success",
            data
        })
    } catch (err) {
        next(err)
    }
}

controller.updateProduk = async(req,res,next) => {
    try {
        const produk_id = req.params.produk_id

        const {...newData} = req.body

        //console.log(newData)
        
        //console.log(req.file)
        
        if(!req.file){
            console.log("OMG")
            await produk.update({...newData},{
                where: {
                    id: produk_id
                }
            })
        }else {
            const imageSrc = 'http://localhost:3001/images/'+req.file.filename
            //console.log(imageSrc)
            //newData.poto_produk = imageSrc
            //console.log(newData)
            await produk.update({
                ...newData,
                poto_produk: imageSrc
            },{
                where: {
                    id: produk_id
                }
            })
        }

        const getListProduk = rawQuery.getOneProduk(produk_id)

        const [updatedData] = await db.query(getListProduk,{
            type: QueryTypes.SELECT
        })

        res.status(200).json({
            status:"success",
            data: updatedData
        })
    } catch (err) {
        next(err)
    }
}

module.exports = controller