import { Requests } from "../../../shared/requests";
import { Responses } from "../../../shared/responses";
import { LogEntryModel } from "./intake-log.schemas";
import { LogEntry } from "./intake-log.types";

export module IntakeLogModule {
    export async function createLogEntry(req: Requests.CreateLogEntry): 
        Promise<Responses.CreateLogEntry> {
            let newEntry = new LogEntryModel({ 
                name: req.name,
                date: req.date,
                isFood: true
            });

            let savedEntry: LogEntry;
            let error: any;

            await newEntry.save()
                .then((entry: LogEntry) => {
                    savedEntry = entry;
                }).catch((err) => {
                    error = err;
                });

            if (!savedEntry || error) return { success: false, error };

            return {
                success: true,
                entry: savedEntry
            };
        }

    export async function getLogEntries(req: Requests.GetLogEntries):
        Promise<Responses.GetLogEntries> {
            let entries = [];
            let error: any;

            let query = {
                date: {
                    $gte: new Date(req.year, req.month, 1),
                    $lte: new Date(req.year, req.month + 1, 0),
                }
            };

            await LogEntryModel.find(query)
                .then((foundEntries: LogEntry[]) => {
                    entries = foundEntries;
                })
                .catch((err) => {
                    error = err;
                });

            if (error) return { success: false, error };
            
            return {
                success: true,
                entries
            };
        }

    export async function updateLogEntry(req: Requests.UpdateLogEntry):
        Promise<Responses.UpdateLogEntry> {
            let entry;
            let error: any;

            await LogEntryModel.findOneAndUpdate({ _id: req.entryId }, <LogEntry> {
                name: req.name,
                description: req.description,
                isFood: req.isFood,
                notable: req.notable,
                amount: req.amount,
                date: req.date
            }).then((_entry: LogEntry) => {
                entry = _entry;
            }).catch((err) => {
                error = err;
            });

            if (error) return { success: false, error };

            return {
                success: true,
                entry
            };
        }

    export async function deleteLogEntry(req: Requests.DeleteLogEntry):
        Promise<Responses.DeleteLogEntry> {
            let error: any;

            await LogEntryModel.findOneAndDelete({ _id: req.entryId })
                .then()
                .catch((err) => {
                    error = err;
                });

            if (error) return { success: false, error };

            return { success: true };
        }
}