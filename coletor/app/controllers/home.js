var util = require('util');

function convertMS(milliseconds) {
   var seconds = Math.floor(milliseconds / 1000);
   var minutes = Math.floor(seconds / 60);
   var hours = Math.floor(minutes / 60);
   var milliseconds = milliseconds % 1000;
   var seconds = seconds % 60;
   var minutes = minutes % 60;

   var format = '%s:%s:%s';
   var time = util.format(format, ("00" + hours).substr(-2), ("00" + minutes).substr(-2), ("00" + seconds).substr(-2));
  return time;
  };


module.exports = function(app){

    const results = [];
    const novo = [];

    const pg = require('pg');
    const connectionString = process.env.DATABASE_URL || 'postgres://postgres:adm09db@172.17.0.218:5432/cm';
    
    var controller = {
        index: function(req,res){
            var html = '';
            pg.connect(connectionString, (err, client, done) => {
    
                const query = client.query(`SELECT A.sf_playlist_id as id_playlist, A.sf_name as nome_playlist, B.sf_media_item_id as id_media,  D.sf_long_value as duracao_playlist, C.sf_name as nome_midia, D.sf_long_value as duracao_midia, C.sf_type as tipo_midia, B.sf_playlist_media_item_id as id_playlist_midia
                FROM st_playlist A INNER JOIN st_playlist_media_item B ON (A.sf_playlist_id = B.sf_owner_playlist_id)
                INNER JOIN st_media_item C ON (B.sf_media_item_id = C.sf_media_item_id)
                LEFT JOIN st_media_info D ON (B.sf_media_item_id = D.sf_media_item_id) WHERE D.sf_name <> 'height' AND D.sf_name <> 'width' AND D.sf_long_value <> '0';`);
                
                query.on('row', (row) => {
                    html += (`relatorio_1{id_playlist="`+row.id_playlist+`",nome_playlist="`+row.nome_playlist+`", id_media="`+row.id_media+`", nome_midia="`+row.nome_midia+`", duracao_midia="`+convertMS(row.duracao_midia)+`", tipo_midia="`+row.tipo_midia+`", id_playlist_midia="`+row.id_playlist_midia+`"} `+row.duracao_playlist+`\n`);
                    
                });
                
                query.on('end', () => {
                  done();
                  res.set('Content-type','text/plain').status(200).send(html)
                });
              });
            

            //;


           
        }
    }
    return controller;
}