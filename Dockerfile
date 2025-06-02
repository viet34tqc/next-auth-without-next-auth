# Stage 1: Install pnpm
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Stage 2: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# uses Docker BuildKit cache mounts (--mount=type=cache) to speed up pnpm install
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts

# Stage 3: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN --mount=type=cache,id=prisma,target=/app/prisma \
    npx prisma generate
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

# Switch to non-root user
USER appuser


# Copy necessary files from builder stage
COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./
COPY --from=builder --chown=appuser:appgroup /app/.next/static ./.next/static
COPY --from=builder --chown=appuser:appgroup /app/prisma ./prisma
# npx prisma needs to know which version of @prisma/client to generate the client
# This information is stored in package.json.
COPY --from=builder --chown=appuser:appgroup /app/package.json ./

# Default command with database setup and server start
CMD ["sh", "-c", "npx prisma generate && npx prisma db push && node server.js"]
