// import external
import {Schema} from 'mongoose';
import {isAlphanumeric, isHexadecimal, isIP} from 'validator';

// schemas
export const userSchema = new Schema({
	impequidServer: {
		type: String,
		required: true
	},
	impequidId: {
		type: String,
		required: true,
		validate: [isAlphanumeric, 'invalid id']
	},
	impequidToken: {
		type: String,
		required: true,
		validate: [isHexadecimal, 'invalid token']
	}
});
userSchema.index({
	impequidId: 1,
	impequidServer: 1
}, {
	unique: true
});

export const domainSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true
	},
	history: [{
		time: {
			type: Date,
			default: Date.now
		},
		ip: {
			type: String,
			validate: [isIP, 'invalid history ip']
		}
	}],
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
	},
	ip: {
		type: String,
		validate: [isIP, 'invalid IP']
	}
});
