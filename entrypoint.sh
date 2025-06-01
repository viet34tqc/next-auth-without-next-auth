#!/bin/sh
echo "Entrypoint is running!"
npx prisma generate
npx prisma db push
exec "$@"
