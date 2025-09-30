# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Set npm config for speed
RUN { \
    echo 'update-notifier=false'; \
    echo 'fund=false'; \
    echo 'audit=false'; \
    echo 'progress=false'; \
    echo 'prefer-offline=true'; \
} > /etc/npmrc

# Install deps and build
COPY package.json package-lock.json* ./

# Install all dependencies including devDependencies needed for build
RUN npm config set ignore-scripts true && \
    npm ci --no-audit --no-fund --ignore-scripts && \
    npm install --no-audit --no-fund typescript @types/node @types/react @types/react-dom && \
    npm config set ignore-scripts false

# Copy app files
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app

# Set environment
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOST=0.0.0.0 \
    PORT=3000

# Setup non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S -u 1001 -G nodejs nextjs && \
    mkdir -p /app/.next/{cache,static} /app/public && \
    chown -R nextjs:nodejs /app

# Copy package files first
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

# Install production dependencies only (disable scripts to avoid husky prepare)
RUN npm config set ignore-scripts true && \
    npm install --omit=dev --no-audit --no-fund --ignore-scripts && \
    npm config set ignore-scripts false

# Copy the standalone output and public files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Final setup
USER nextjs
WORKDIR /app
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the app using Next.js production server
CMD ["node", "server.js"]
