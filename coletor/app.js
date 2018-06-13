const express = require('express');

const app = express();

const colectorOne = require('./controllers/colector_one');


app.get('/coletor_one', (req, res) => {
  colectorOne.Playlist.findAll({
    attributes:  [['sf_playlist_id','id_playlist'],['sf_name','nome_palylist']],
    include: [
      {
        model: colectorOne.PlaylistMediaItem, 
          attributes: [['sf_media_item_id','id_media'], ['sf_playlist_media_item_id','id_playlist_midia']],
          include:[
            {
              model: colectorOne.MediaItem, 
              attributes:  [['sf_name','nome_midia'],['sf_type','tipo_midia']],
              include: [
                {
                  model: colectorOne.MediaInfo, 
                  attributes: [['sf_long_value','duracao_midia']],
                  where: {
                      sf_name: 'duration',
                  }
                }
              ]
            }
          ]
      },
    ],
  }).then(result => {
    var html = '';
    var jsonString = JSON.stringify(result);

      html += (`relatorio_1{id_playlist="`+jsonString+`"}`);
    res.set('Content-type','text/plain').status(200).send(jsonString);
  });
});

app.listen(3030);