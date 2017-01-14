const superagent = require('superagent');
// Pull the common host/api into own module or env variable
const url = 'https://pawsio.herokuapp.com/api/pet-snapshots';

module.exports = {
    post(token, petId, payload) {
        return superagent.post(`${url}/${petId}`)
                .set('authorization', `Bearer ${token}`)
                .send(payload)
                .then(res => res.body)
    }
};
