const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        validate: {
            validator: value => {
                if (value.length < 6) return false;
                if (value.length > 40) return false;
                return true;
            },
            message: ({ value }) => {
                if (value.length < 6) return `Title must be at least 6, got only ${value.length} char`;
                if (value.length > 40) return `Title must be max 40, got ${value.length} char`;
            },
        },
    },
    description: {
        type: String,
        required: false
    },
    dueDate: {
        type: String,
        validate: {
            validator: value => value !== "dd-mm-yyyy",
            message: () => "Date is required",
        },
        required: true,
    },
    time: {
        type: String,
        validate: {
            validator: value => value !== ":",
            message: () => "Time is required",
        },
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: false,
        default: "/"
    },
    state: {
        type: String,
        enum: ["to do", "in progress", "completed"],
        required: false,
        default: "to do",
    }
});

module.exports = mongoose.model("task", taskSchema);
