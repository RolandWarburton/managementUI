FROM node:14 as build_stage

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies for backend gateway
COPY ./frontend/package.json /usr/src/app
RUN npm install

# Bundle app source
COPY ./frontend /usr/src/app

# Exports
EXPOSE 4000

CMD [ "npm", "run", "start:client" ]
