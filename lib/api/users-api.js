const superagent = require('superagent');
const url = 'https://pawsio.herokuapp.com/api/users';

module.exports = {
    signup(user) {
        return superagent.post(`${url}/signup`)
                .send(user)
                .then(res => res.body);
    },
    signin(user) {
        return superagent.post(`${url}/signin`)
                .send(user)
                .then(res => res.body);
    },
    validate(user, token) {
        return superagent.post(`${url}/validate`)
                .set('authorization', `Bearer ${token}`)
                .send(user)
                .then(res => res.body);
    }
};
