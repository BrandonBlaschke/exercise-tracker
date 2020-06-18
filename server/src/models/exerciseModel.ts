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
    deleteDataPoint(id: string): undefined,
    updateDataPoint(name: string, dataPoint: any, unit: string): undefined
}

interface IExerciseModel extends mongoose.Model<IExerciseSchema> {
    addDataPoint(date: Date, data: number, notes: string): undefined,
    deleteDataPoint(id: string): undefined,
    updateDataPoint(name: string, dataPoint: any, unit: string): undefined
}

/**
 * Add data point to this exercise.
 * @param date: Date of data point.
 * @param data: Data of data point.
 * @param notes: Any notes on for the data point that could be added.
 */
exerciseSchema.methods.addDataPoint = async function(date: Date, data: number, notes: string) {
    this.dataPoints.push({date, data, notes});
    await this.save();
}

/**
 * Delete a data point.
 * @param index: Index number in dataPoints array to remove
 */
exerciseSchema.methods.deleteDataPoint = async function(id: string) {
    let index = this.dataPoints.find((dp: any) => dp._id === id);
    this.dataPoints.splice(index, 1);
    await this.save();
}

/**
 * Update data point
 * @param name: Name of the data point to change or leave same.
 * @param dataPoint: Data point object to save.
 * @param unit: Unit for the exercise.
 */
exerciseSchema.methods.updateDataPoint = async function(name: string, dataPoint: any, unit: string) {
    this.name = name ? name : this.name;
    this.unit = unit ? unit : this.unit;
    if (dataPoint) {
        for (let i = 0; i < this.dataPoints.length; i++) {
            if (this.dataPoints[i]._id == dataPoint._id) {
                this.dataPoints[i] = dataPoint;
            }
        }
    }
    await this.save();
}

const Exercise = mongoose.model<IExerciseSchema, IExerciseModel>('Exercise', exerciseSchema);
export default Exercise;