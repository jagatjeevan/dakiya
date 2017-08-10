FROM node:8.0
WORKDIR /app

EXPOSE 9001

ADD cloud /app/cloud
ADD build /app/build
ADD index.js package.json /app/

RUN cd /app && yarn install --production

ENTRYPOINT ["yarn", "serve"]
