#!/bin/sh
echo "Entrypoint is running!"
npx prisma migrate deploy
npx prisma generate
node server.js
