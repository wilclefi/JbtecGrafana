const yaml = require('js-yaml');
const fs = require('fs');

try {
  var config = yaml.safeLoad(fs.readFileSync('./config/comercial.yml', 'utf8'));
} catch (e) {
  console.log(e);
}

const Sequelize = require('sequelize');  
const sequelize = new Sequelize(config.services.postgres.base, config.services.postgres.user, config.services.postgres.pass, {  
  host: config.services.postgres.host,
  dialect: 'postgres'
});

const db = {};
const Op = Sequelize.Op

db.Sequelize = Sequelize;  
db.sequelize = sequelize;
db.Op = Op;

db.Playlist = require('../models/st_playlist')(sequelize, Sequelize);
db.PlaylistMediaItem = require('../models/st_playlist_media_item')(sequelize, Sequelize);
db.MediaItem = require('../models/st_media_item')(sequelize,Sequelize);
db.MediaInfo = require('../models/st_media_info')(sequelize,Sequelize);

db.Playlist.hasMany(db.PlaylistMediaItem,{ foreignKey: 'sf_owner_playlist_id' });
db.PlaylistMediaItem.belongsTo(db.Playlist,{ foreignKey: 'sf_owner_playlist_id' });

db.PlaylistMediaItem.hasMany(db.MediaItem, {foreignKey: 'sf_media_item_id'});
db.MediaItem.belongsTo(db.PlaylistMediaItem, {foreignKey: 'sf_media_item_id'});

db.MediaItem.hasMany(db.MediaInfo, {foreignKey: 'sf_media_item_id'});
db.MediaInfo.belongsTo(db.MediaItem, {foreignKey: 'sf_media_item_id'});

module.exports = db;