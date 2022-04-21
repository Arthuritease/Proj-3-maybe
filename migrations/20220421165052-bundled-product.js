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

exports.up = function (db) {
  return db.createTable('bundled_product', {
      bundled_product_id: { type: 'smallint', primaryKey: true, autoIncrement: true },
      name:{type:'char', length:200, notNull:true},
      product_id: {
          type: 'smallint',
          notNull: true,
          unsigned: true,
          foreignKey: {
              name: 'bundled_product_product_FK',
              table: 'product',
              rules: {
                  onDelete: 'CASCADE',
                  onUpdate: 'RESTRICT'
              },
              mapping: 'product_id'
          }
      },
        bundle_id: {
          type: 'smallint',
          notNull: true,
          unsigned:true,
          foreignKey: {
              name: 'bundled_product_bundle_FK',
              table: 'bundle',
              rules: {
                  onDelete: 'CASCADE',
                  onUpdate: 'RESTRICT'
              },
              mapping: 'bundle_id'
          }
      }
  });
};



exports.down = function(db) {
  return db.dropTable('bundled_product');
};

exports._meta = {
  "version": 1
};
