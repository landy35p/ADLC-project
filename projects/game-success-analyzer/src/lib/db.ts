import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';

const dbPath = path.resolve('dev.db');
const db = new sqlite3.Database(dbPath);

export const dbQuery = promisify(db.all.bind(db));

export async function getAllGames() {
    return await dbQuery("SELECT * FROM Game");
}
