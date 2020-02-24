import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';


export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dogOwner:{
        type: Boolean,
        required: true
    },
    dogName:{
        type: String,
        required: true
    },
    dogBreed:{
        type: String,
        required: true
    },
    dogBirthDay:{
        type: String,
        required: true
    },
    userTodos:{
        type: Array,
        required: true
    }
});


export interface IUser extends mongoose.Document {
    usernname: string,
    password: string
  }


// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
UserSchema.pre<IUser>('save', function(next){

    let user = this;

    // Make sure not to rehash the password if it is already hashed
    if(!user.isModified('password')) return next();

    // Generate a salt and use it to hash the user's password
    bcrypt.genSalt(10, (err, salt) => {

        if(err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {

            if(err) return next(err);
            user.password = hash;
            next();

        });

    });

}); 

UserSchema.methods.checkPassword = function(attempt, callback){

    let user = this;

    bcrypt.compare(attempt, user.password, (err, isMatch) => {
        if(err) return callback(err);
        callback(null, isMatch);
    });

};