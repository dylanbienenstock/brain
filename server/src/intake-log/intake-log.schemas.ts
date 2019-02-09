import { model, Schema } from "mongoose";

const logEntrySchema = new Schema({
    name: String,
    description: String,
    amount: String,
    isFood: Boolean,
    notable: Boolean,
    date: Date
},
{ timestamps: true });

const LogEntryModel = model("LogEntry", logEntrySchema);

export { LogEntryModel }