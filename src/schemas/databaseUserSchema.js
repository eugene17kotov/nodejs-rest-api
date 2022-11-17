const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = Schema(
    {
        email: {
            type: String,
            unique: true,
            required: [true, 'Set name for contact'],
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        password: {
            type: String,
            required: [true, 'Set password for contact'],
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.pre('save', async function () {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

module.exports = userSchema;
