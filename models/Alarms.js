import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        completionTime: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Alarm', blogSchema);