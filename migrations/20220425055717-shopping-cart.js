'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('shopping_cart', {
    id: {
      type: 'smallint',
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: 'smallint',
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: 'shopping_cart_product_FK',
        table: 'product',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    user_id: {
      type: 'smallint',
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: 'shopping_cart_user_FK',
        table: 'user',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    date:{type:'date'},
    quantity:{type:"smallint", unsigned:true, notNull:true}
  });
}

exports.down = function (db) {
  return db.dropTable('shopping_cart');
};

exports._meta = {
  "version": 1
};