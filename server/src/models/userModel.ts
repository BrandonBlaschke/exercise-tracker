import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(val: string) {
            if (!validator.isEmail(val)) { throw new Error('Email is invalid') }
            return true;
        },
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(val: string) {
            if (val.toLowerCase().includes("password")) { throw new Error('Password is invalid') }
            return true;
        }
    },
    tokens: [{
        token: {
            required: true,
            type: String
        }
    }],
})

interface IUserSchema extends mongoose.Document {
    generateAuthToken(): string,
    email: string,
    password: string,
}

// Return only the properties that need to be return, security risks
userSchema.methods.toJSON = function (): JSON {
    const user = this
    const userObject = user.toObject()

    delete userObject.password

    return userObject
}

// Hash password every time saved
userSchema.pre<IUserSchema>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }

    next()
})

userSchema.statics.findByCredentials = async (email: string, password: string) => {
    const user = await User.findOne({email})

    if (!user) {
        throw new Error("No user found with that email")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Login in failed')
    }

    return user
}

// Generate a authentication token using jsonwebtoken
userSchema.methods.generateAuthToken = async function() {
    const secret = process.env.JWT_SECRET || "";
    const token = jwt.sign({ _id: this._id.toString() }, secret)

    // Add token to the list of tokens on the user object
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}

interface IUserModel extends mongoose.Model<IUserSchema> {
    findByCredentials(email: string, password: string): Promise<IUserModel>,
    generateAuthToken(): string
}

const User = mongoose.model<IUserSchema, IUserModel>('User', userSchema);
export default User;