import 'dotenv/config';
import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import { UserRoleName } from '../shared-types.js';

const app = express();
const PORT = process.env.PORT || 4000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    min: 4,
    max: 20
});

app.use(express.json());

async function connectAndStartServer() {
    try {
        await pool.query('SELECT 1 + 1 AS result');
        console.log('✅ PostgreSQL connection succeded. DB: aism_young_connect');

        app.listen(PORT, () => {
            console.log(`🚀 Server Express is listening on http://localhost:${PORT}`);
            console.log(`Open http://localhost:${PORT}/api/roles to test the DB connection.`);
        });
    } catch (error) {
        console.error('❌ CRITICAL ERROR: PostgreSQL connection error.');
        console.error('Verify the string DATABASE_URL (.env) and Postgres server state.');
        process.exit(1);
    }
}

app.get('/', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT role_id, role_name FROM roles');

        const roles: { role_id: number, role_name: UserRoleName }[] = result.rows.map(row => {
            role_id: row.role_id,
                role_name: row.role_name as UserRoleName
        });

        res.json({ success: true, roles });
    } catch (error) {
        console.error('Error retrieving roles:', error);
        res.status(500).json({ success: true, message: 'Internal server error' });
    }
});

connectAndStartServer();
