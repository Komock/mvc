'use strict';
module.exports = {
    login: function(appId, perms) {
        return new Promise(function(resolve, reject) {
            VK.init({
                apiId: appId
            });

            VK.Auth.login(function(response) {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, perms);
        });
    },
    callApi: function(method, params) {
        return new Promise(function(resolve, reject) {
            VK.api(method, params, function(response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    resolve(response.response);
                }
            });
        });
    },
    getUser: function() {
        return this.callApi('users.get', {});
    },
    getMusic: function() {
        return this.callApi('audio.get', {});
    },
    getFriends: function() {
        return this.callApi('friends.get', {fields: 'photo_100'});
    },
    getNews: function() {
        return this.callApi('newsfeed.get', {filters: 'post', count: 20});
    },
    getGroups: function() {
        return this.callApi('groups.get', {extended: 1});
    },
    getAlbums: function(){
        return this.callApi('photos.getAlbums', {v: 5.53, need_system: 1});
    },
    getPhotosOfAlbum: function(id){
        return this.callApi('photos.get', {extended: 1, album_id: id});
    },
    getPhotoComments: function(id){
        console.log(id);
        return this.callApi('photos.getComments', {v: 5.53, photo_id: id, count: 100});
    }
};
