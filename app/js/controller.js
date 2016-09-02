'use strict';
let Model = require('./model'),
    View = require('./view');

module.exports = {
    musicRoute: function() {
        return Model.getMusic().then(function(music) {
            results.innerHTML = View.render('music', {list: music});
        });
    },
    friendsRoute: function() {
        return Model.getFriends().then(function(friends) {
            results.innerHTML = View.render('friends', {list: friends});
        });
    },
    newsRoute: function() {
        return Model.getNews().then(function(news) {
            results.innerHTML = View.render('news', {list: news.items});
        });
    },
    groupsRoute: function() {
        return Model.getGroups().then(function(groups) {
            groups = groups.slice(1);
            results.innerHTML = View.render('groups', {list: groups});
        });
    },
    photosRoute: function() {

        return Model.getAlbums().then(function(albums) {
            let count = albums.count,
                i = 0,
                ids = [];

            for(let album of albums.items){
                let id = album.id;
                switch (id){
                    case -7:
                        id = 'wall';
                        break;
                    case -6:
                        id = 'profile';
                        break;
                    case -15:
                        id = 'saved';
                        break;
                }
                ids.push(id);
            }

            function getPhotosForEachAlbum(){
                Model.getPhotosOfAlbum(ids[i]).then(function(photosOfAlbum) {                    
                    // Get comments
                    function getComments(){
                        photosOfAlbum.forEach(function(photo, index){
                            if(photo.comments.count > 0) {
                                Model.getPhotoComments(photo.pid).then(function(comments) {
                                    let photoEl = document.querySelector('[data-id="' + photo.pid + '"]');
                                    photoEl.innerHTML = photoEl.innerHTML + View.render('comments', {list: comments.items});
                                });
                            }
                        });
                    };

                    if (i === 0) results.innerHTML = ''; // remove preloader in first time
                    results.innerHTML = results.innerHTML + View.render('photos', {list: photosOfAlbum});
                    getComments();
                    i++;
                    if (i < count) {
                        getPhotosForEachAlbum(); // recursion
                    }
                    
                });
            }
            getPhotosForEachAlbum();
        });
    }
};
