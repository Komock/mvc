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
        return Model.getPhotos().then(function(photos) {
            console.log(photos);
            photos = photos.slice(1);
            results.innerHTML = View.render('photos', {list: photos});
        });
    }
};
