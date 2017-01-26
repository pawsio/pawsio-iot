const superagent = require('superagent');
const url = 'https://pawsio.herokuapp.com/api/tests';

module.exports = {
    get() {
        return superagent.get(url)
                .then(res => res.body);
    },
    put() {
        return superagent.put(url)
                .then(res => res.body);
    },
    post() {
        return superagent.post(url)
                .then(res => res.body);
    },
    del() {
        return superagent.del(url)
                .then(res => res.body);
    }
};
