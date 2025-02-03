import mongoose  from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    contact: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 150,
        validate: {
            validator: function(v) {
                // Check if the contact is a valid email or phone number
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) || /^\+?[0-9]{1,15}$/.test(v);
            },
            message: props => `${props.value} is not a valid email or phone number.`
        }
    }
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;