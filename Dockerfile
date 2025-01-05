# Use the official Node.js image as the base image
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of the application files
COPY . .

# Build the application (if applicable)
RUN npm run build

# Use a lightweight production image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy dependencies and built application files from the build stage
COPY --from=build /app /app

# Expose the port the application will run on
EXPOSE 80

# Run the application
CMD ["npm", "start"]
