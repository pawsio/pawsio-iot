const superagent = require('superagent');
const url = 'https://pawsio.herokuapp.com/api/pets';

module.exports = {
    getAll(token) {
        return superagent.get(`${url}/all`)
                .set('authorization', `Bearer ${token}`)
                .then(res => res.body);
    },
    getOne(token, id) {
        return superagent.get(`${url}/${id}`)
                .set('authorization', `Bearer ${token}`)
                .then(res => res.body);
    },
    getQstring(token, query) {
        return superagent.get(`${url}${query}`)
                .set('authorization', `Bearer ${token}`)
                .then(res => res.body);
    },
    addPet(token, pet) {
        return superagent.post(url)
                .set('authorization', `Bearer ${token}`)
                .send(pet)
                .then(res => res.body);
    },
    updatePet(token, info, id) {
        return superagent.put(`${url}/${id}`)
                .set('authorization', `Bearer ${token}`)
                .send(info)
                .then(res => res.body);
    }
};
