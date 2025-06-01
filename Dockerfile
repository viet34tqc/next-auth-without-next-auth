# Stage 1: Install pnpm
FROM node:20-alpine3.16 AS base
RUN npm install -g pnpm

# Stage 2: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/
RUN pnpm install --frozen-lockfile --prod=false

# Stage 3: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Stage 4: Production stage
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create appuser and data folder (for sqlite db volume)
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    mkdir -p /data && \
    chown -R appuser:appgroup /data

# Copy entrypoint script
COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

# Switch to non-root user
USER appuser

# Copy necessary files from builder stage
COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./
COPY --from=builder --chown=appuser:appgroup /app/.next/static ./.next/static
COPY --from=builder --chown=appuser:appgroup /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=appuser:appgroup /app/node_modules/.bin ./node_modules/.bin

# Set entrypoint
ENTRYPOINT ["./entrypoint.sh"]

# Default command (will run after entrypoint script)
CMD ["node", "server.js"]
