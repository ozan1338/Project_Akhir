'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      produk.belongsTo(models.kode_produk, {
        foreignKey: {
          name: "kd_produk"
        }
      })

      produk.belongsTo(models.kode_satuan, {
        foreignKey: {
          name: "kd_satuan"
        }
      })
    }
  }
  produk.init({
    nama_produk: DataTypes.STRING,
    kd_produk: DataTypes.INTEGER,
    kd_satuan: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    total_produk: DataTypes.INTEGER,
    unassigned: DataTypes.INTEGER,
    rak: DataTypes.STRING,
    poto_produk: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'produk',
  });
  return produk;
};