'use strict'

module.exports = (sequelize, DataTypes) => {  
  const MediaItem = sequelize.define('st_media_item', {
    sf_media_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    sf_name: {
      type: DataTypes.STRING
    },
    sf_type: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'st_media_item'
  });
  return MediaItem;
};
