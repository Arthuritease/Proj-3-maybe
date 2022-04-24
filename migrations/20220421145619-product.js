'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('product',{
    id: { type: 'smallint', primaryKey:true, autoIncrement:true, unsigned: true},
    title: { type: 'char', length:50, notNull:true},
    country_id:{
      type:"smallint",
      unsigned:true,
      notNull:true,
      foreignKey:{
        name:"product_country_FK",
        table:"country",
        rules:{
          onDelete:'cascade',
          onUpdate:'restrict'
        },
        mapping:'id'
      }
      
  },
    brand:{type:'char', length:50, notNull:true},
    description:{type:'text',notNull:false},
    price:{type:'int', unsigned:true},
    ingredient:{type:'text', notNull:true},
    stock:{type:'smallint', unsigned:true}

})

};

exports.down = function(db) {
  return db.dropTable('product')
};

exports._meta = {
  "version": 1
};
