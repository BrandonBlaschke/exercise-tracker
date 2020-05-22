import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    unit: {
        type: String,
        default: "lb",
        enum: [
            "kg",
            "lb",
            "time",
            "reps"
        ]
    },
    dataPoints: [{
        date: {
            type: Date,
            required: true
        },
        data: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
        }
    }]
});

interface IExerciseSchema extends mongoose.Document {
    name: string,
    owner: mongoose.Schema.Types.ObjectId,
    unit: string,
    dataPoints: [{
        date: Date,
        data: string,
        notes: string
    }]
}

const Exercise = mongoose.model<IExerciseSchema>('Exercise', exerciseSchema);
export default Exercise;