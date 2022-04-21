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
  return db.createTable('bundle',{
    bundle_id: { type: 'smallint', primaryKey:true, autoIncrement:true, unsigned: true},
    title:{type:'char',length:200, notNull:true},
    price:{type:'decimal', notNull:true}
  })
};

exports.down = function(db) {
  return db.dropTable('bundle')
};

exports._meta = {
  "version": 1
};
