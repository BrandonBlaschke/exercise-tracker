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
            type: Number,
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
        data: number,
        notes: string
    }],
    addDataPoint(date: Date, data: number, notes: string): undefined,
    deleteDataPoint(index: number): undefined,
    updateDataPoint(name: string, dataPoint: any, index: number): undefined
}

interface IExerciseModel extends mongoose.Model<IExerciseSchema> {
    addDataPoint(date: Date, data: number, notes: string): undefined,
    deleteDataPoint(index: number): undefined,
    updateDataPoint(name: string, dataPoint: any, index: number): undefined
}

exerciseSchema.methods.addDataPoint = async function(date: Date, data: number, notes: string) {
    this.dataPoints.push({date, data, notes});
    await this.save();
}

exerciseSchema.methods.deleteDataPoint = async function(index: number) {
    this.dataPoints.splice(index, 1);
    await this.save();
}

exerciseSchema.methods.updateDataPoint = async function(name: string, dataPoint: any, index: number) {
    this.name = name;
    this.dataPoints[index] = dataPoint;
    await this.save();
}

const Exercise = mongoose.model<IExerciseSchema, IExerciseModel>('Exercise', exerciseSchema);
export default Exercise;