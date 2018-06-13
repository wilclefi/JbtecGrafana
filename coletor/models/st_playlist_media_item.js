'use strict'

module.exports = (sequelize, DataTypes) => {  
  const PlaylistMediaItem = sequelize.define('st_playlist_media_item', {
    sf_playlist_media_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    sf_media_item_id: {
      type: DataTypes.INTEGER
    },
    sf_owner_playlist_id: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'st_playlist_media_item'
  });
  return PlaylistMediaItem;
};

