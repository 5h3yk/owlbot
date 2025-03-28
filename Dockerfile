FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY commands ./commands
COPY events ./events
COPY data ./data
COPY index.js ./

CMD [ "npm", "start" ]