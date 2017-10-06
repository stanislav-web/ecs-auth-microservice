db.createUser({
    user: 'administrator',
    pwd: 'password',
    roles: [ {
        role: 'readWrite',
        db: 'test'
    }]
});

db.user.save({
    login: 'admin',
    password: 'password'
});