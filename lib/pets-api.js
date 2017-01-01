const superagent = require('superagent');
const url = 'https://pawsio.herokuapp.com/api/pets';

module.exports = {
    getAll(token) {
        return superagent.get(url)
                .set('authorization', `Bearer ${token}`)
                .then(res => res.body)
                .catch(err => err.error);
    },
    getOne(token, id) {
        return superagent.get(`${url}/${id}`)
                .set('authorization', `Bearer ${token}`)
                .then(res => res.body)
                .catch(err => err.error);
    },
    addPet(token, pet) {
        return superagent.post(url)
                .set('authorization', `Bearer ${token}`)
                .send(pet)
                .then(res => res.body)
                .catch(err => err.error);
    },
    updatePet(token, info, id) {
        return superagent.put(`${url}/${id}`)
                .set('authorization', `Bearer ${token}`)
                .send(info)
                .then(res => res.body)
                .catch(err => err.error);
    }
};