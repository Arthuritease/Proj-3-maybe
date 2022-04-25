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
  return db.createTable('user',{
    id: { type: 'smallint', primaryKey:true, autoIncrement:true, unsigned: true},
    firstName:{type:'char',length:50, notNull:true},
    lastName:{type:'smallint', length:20, notNull:true},
    email:{type:'char', length:200,notNull:true},
    pw:{type:'char',length:200, notNull:true}
  })
};


exports.down = function(db) {
  return db.dropTable('user')
};

exports._meta = {
  "version": 1
};
