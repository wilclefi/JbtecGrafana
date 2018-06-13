'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Playlist = sequelize.define('st_playlist', {
    sf_playlist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    sf_name: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'st_playlist'
  });
  return Playlist;
};