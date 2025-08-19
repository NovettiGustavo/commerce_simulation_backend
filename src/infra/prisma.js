const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['warn', 'error', 'query']
})

module.exports = prisma;