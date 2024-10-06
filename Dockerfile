# Stage 1: Build
FROM node:20.10.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

RUN ls -lR /app/src/components/RegistroDeColectivo/styles/
RUN ls -lR /app/src || true

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# List files to verify the directory structure
RUN ls -R src/components/

# Build the application
RUN npm run build

# Stage 2: Serve the static files
FROM nginx:alpine AS production

# Copy the build output from the first stage to the default nginx public directory
COPY --from=build /app/list /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 80

# Start nginx in the foreground (to keep the container running)
CMD ["nginx", "-g", "daemon off;"]
