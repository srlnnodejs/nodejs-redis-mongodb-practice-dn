'use strict';
const User = require('../config/db');

module.exports = new class UserRepository {

    getAll() {
        return User.find();
    }

    getById(id) {
        return User.findById(id);
    }

    create(user) {
        return User.create(user);
    }

    update(id, user) {

        const updatedUser = {
            name: user.name,
            name: user.surname,
            mail: user.mail
        }

        return User.findByIdAndUpdate(id, updatedUser);
    }

    delete(id) {
        return User.findByIdAndRemove(id);
    }
}

