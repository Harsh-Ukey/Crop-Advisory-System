FROM node:20-alpine

# Set production environment
ENV NODE_ENV=production

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy rest of the backend code
COPY . .

# Give ownership of the app directory to the node user
RUN chown -R node:node /app

# Switch to the non-root node user
USER node

# Expose the application port
EXPOSE 3000

# Use tini-style init: graceful shutdown signal handling
CMD ["node", "index.js"]
