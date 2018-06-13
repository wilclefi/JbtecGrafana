'use strict'

module.exports = (sequelize, DataTypes) => {  
  const MediaInfo = sequelize.define('st_media_info', {
    sf_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    sf_name: {
      type: DataTypes.STRING
    },
    sf_long_value: {
      type: DataTypes.INTEGER
    },
    sf_string_value: {
      type: DataTypes.INTEGER
    },
    sf_media_item_id: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'st_media_info'
  });
  return MediaInfo;
};

