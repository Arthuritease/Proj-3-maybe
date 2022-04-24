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
  return db.createTable('product_type', {
      id: { type: 'smallint', primaryKey: true, autoIncrement: true, unsigned: true },
      product_id: {
          type: 'smallint',
          notNull: true,
          unsigned: true,
          foreignKey: {
              name: 'product_type_product_FK',
              table: 'product',
              rules: {
                  onDelete: 'CASCADE',
                  onUpdate: 'RESTRICT'
              },
              mapping: 'id'
          }
      },
      type_id: {
          type: 'smallint',
          notNull: true,
          unsigned:true,
          foreignKey: {
              name: 'product_type_type_FK',
              table: 'type',
              rules: {
                  onDelete: 'CASCADE',
                  onUpdate: 'RESTRICT'
              },
              mapping: 'id'
          }
      }
  });
};



exports.down = function(db) {
  return db.dropTable('product_type');
};

exports._meta = {
  "version": 1
};
