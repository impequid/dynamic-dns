// import external
import mongoose from 'mongoose';

// import internal
import {userSchema} from './schemas';
import {domainSchema} from './schemas';

// define models
export const User = mongoose.model('user', userSchema);
export const Domain = mongoose.model('domain', domainSchema);
