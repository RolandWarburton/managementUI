FROM node:14 as build_stage

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies for backend gateway
COPY ./frontend/package.json /usr/src/app
RUN npm install

# Bundle app source
COPY ./frontend /usr/src/app
RUN npm run build

# Exports
EXPOSE 3000
EXPOSE 4000
CMD [ "npm", "run", "start:client" ]

FROM nginx:latest

COPY --from=build_stage /usr/src/app/build /usr/share/nginx/html
EXPOSE 3000

# this is for the development client
EXPOSE 4000
COPY ./nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]