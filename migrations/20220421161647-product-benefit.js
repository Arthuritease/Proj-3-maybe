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
  return db.createTable('product_benefit', {
      id: { type: 'smallint', primaryKey: true, autoIncrement: true, unsigned:true },
      product_id: {
          type: 'smallint',
          notNull: true,
          unsigned: true,
          foreignKey: {
              name: 'product_benefit_product_FK',
              table: 'product',
              rules: {
                  onDelete: 'CASCADE',
                  onUpdate: 'RESTRICT'
              },
              mapping: 'id'
          }
      },
        benefit_id: {
          type: 'smallint',
          notNull: true,
          unsigned:true,
          foreignKey: {
              name: 'product_benefit_benefit_FK',
              table: 'benefit',
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
  return db.dropTable('product_benefit');
};

exports._meta = {
  "version": 1
};
