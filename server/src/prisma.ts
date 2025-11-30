import { PrismaClient } from '@prisma/client';

// Handle connection pooling for Supabase
const databaseUrl = process.env.DATABASE_URL;
const connectionUrl = databaseUrl && !databaseUrl.includes('pgbouncer=true')
    ? `${databaseUrl}${databaseUrl.includes('?') ? '&' : '?'}pgbouncer=true`
    : databaseUrl;

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: connectionUrl,
        },
    },
});

export default prisma;
