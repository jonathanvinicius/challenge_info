# Build Stage 1
# This build created a staging docker image
# set image
FROM node:18 as build

# set working directory
WORKDIR /usr/src/app
# copy project file
COPY package*.json ./
# install node packages
RUN npm install --ignore-scripts
# copy app files
COPY . .
# run build, linter, setup and tests
RUN npm run build core

# Build Stage 2
# This build takes the production build from staging build
# set image
FROM node:18 as production

# Build Arguments
ARG API_PORT

#Environment Variables
ENV LANG=pt_BR.UTF-8
ENV TZ=America/Sao_Paulo
ENV API_PORT=$API_PORT

# set working directory
WORKDIR /usr/src/app
# copy project file
COPY package*.json ./
# install only packages required
RUN npm install --omit=dev --ignore-scripts
# copy app files
COPY . .
# # load secrets from key vault
# RUN npm run build:env
# # load vault.env to process
# RUN ./keyvault.sh
# run build, linter, setup and tests
COPY --from=build /usr/src/app/dist ./dist
# application server port
EXPOSE $API_PORT
# start app
CMD ["node", "dist/apps/core/apps/core/src/main"]