'use strict';

const UserRepository = require('../repositories/userRepository');

const redis = require('redis');
const client = redis.createClient();

exports.get = (req, res) => {

    client.get('users', (err, result) => {

        if (result) {
            res.send(result);
        } else {
            UserRepository.getAll()
                .then(user => {
                    client.set('users', JSON.stringify(user));
                    client.expire('users', 20);
                    res.status(200).send(user);
                }).catch(err => res.status(500).send(err));
        }
    });

};

exports.getById = (req, res) => {
    const _id = req.params.id;

    UserRepository.getById(_id)
        .then((user) => {
            res.status(200).send(user);
        }).catch(err => res.status(500).send(err))
};

exports.post = (req, res) => {
    const userParams = req.body;

    UserRepository.create(userParams)
        .then((user) => {
            res.status(200).send(user);
        }).catch(err => res.status(500).send(err))
};

exports.put = (req, res) => {
    const _id = req.params.id;
    const userParams = req.body;

    UserRepository.update(_id, userParams)
        .then((user) => {
            res.status(201).send(user);
        }).catch(err => res.status(500).send(err))
};

exports.delete = (req, res) => {
    UserRepository.delete(req.params.id)
        .then(() => {
            res.status(200).send('Deleted user successfully.');
        }).catch(err => console.error.bind(console, `Error ${err}`))
};