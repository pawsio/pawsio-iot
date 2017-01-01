const superagent = require('superagent');
const url = 'https://pawsio.herokuapp.com/api/tests';

module.exports = {
    get() {
        return superagent.get(url)
                .then(res => res.body)
                .catch(err => err.error);
    },
    put() {
        return superagent.put(url)
                .then(res => res.body)
                .catch(err => err.error);
    },
    post() {
        return superagent.post(url)
                .then(res => res.body)
                .catch(err => err.error);
    },
    del() {
        return superagent.del(url)
                .then(res => res.body)
                .catch(err => err.error);
    },
};