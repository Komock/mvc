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
    getPhotos: function() {
        let code = 'var offset = 200,' + 
                    'photos = API.photos.getAll({"v": "5.53", "extended": 1}).items,' +
                    'photosQty = photos.count;' +
                    'while(offset < photosQty){' +
                    'photos = photos + "," + API.photos.getAll({"v": "5.53", "extended": 1, "offset": offset }).items;' +
                    'offset = offset + offset;' +
                    '}' +
                    'return [ photos, API.photos.getAllComments({"v": "5.53", "extended": 1}) ];';

        // return this.callApi('execute', {code: 'return [API.photos.getAll({"v": "5.53", "extended": 1, "count": 10})];' });
        return this.callApi('execute', {code: code });
    }
};
