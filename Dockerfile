# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . /app

# Expose the port the application will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]
