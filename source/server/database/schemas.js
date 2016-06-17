// import external
import {default as mongoose, Schema} from 'mongoose';
import {isEmail, isAlphanumeric, isHexadecimal} from 'validator';

// schemas
export const userSchema = new Schema({
	impequid: {
		server: {
			type: String,
			required: true
		},
		id: {
			type: String,
			required: true,
			validate: [isAlphanumeric, 'invalid id']
		},
		token: {
			type: String,
			required: true,
			validate: [isHexadecimal, 'invalid token']
		}
	}
});
userSchema.index({impequid: {name: 1, server: 1}}, {unique: true});

export const domainSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true
	},
	subdomain: {
		type: String,
		unique: true,
		required: true,
		validate: [isAlphanumeric, 'invalid subdomain']
	},
	token: {
		type: String,
		unique: true,
		required: true,
		validate: [isHexadecimal, 'invalid token']
	}
});
