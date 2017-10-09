db.createUser({
    user: 'administrator',
    pwd: 'password',
    roles: [ {
        role: 'readWrite',
        db: 'users'
    }]
});
db.createCollection('access');
db.access.ensureIndex({email:1},{unique:true});
