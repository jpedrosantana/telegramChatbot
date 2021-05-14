const YouTube = require('youtube-node');
const config = require('./config/youtube-config.json');

const youtube = new YouTube();

youtube.setKey(config.key);

function searchVideoURL(message, queryText){
    return new Promise((resolve, _) => {
        youtube.search(`Curso de ${queryText}`, 5, function(error, result){
            if(error){
                resolve('Ocorreu um erro.');
            }else{
                const videoId = result.items.map((item) => item.id.videoId).filter(item => item);
                const youtubeLinks = videoId.map(videoId => `https://www.youtube.com/watch?v=${videoId}`);
                resolve(`${message} ${youtubeLinks.join(`, `)}`);
            }
        });
        
    });

};

module.exports.searchVideoURL = searchVideoURL;