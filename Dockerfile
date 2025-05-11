# Use the official Node.js 23 Alpine image as the base image for a lightweight container
FROM node:23-alpine             

# Set the working directory inside the container to /app
WORKDIR /app                    

# Copy both package.json and package-lock.json for dependency installation consistency
COPY package*.json .            

# Install the dependencies defined in package.json
RUN npm install                 

# Expose port 3000 for the application to be accessible from outside the container
EXPOSE 3000                     

# Copy all files from the current directory to the container's working directory
COPY . .                        

# Start the application using npm start, which typically runs the development server
CMD [ "npm" , "start"]    