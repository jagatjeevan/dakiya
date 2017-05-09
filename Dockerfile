FROM node:7.9
WORKDIR /src
EXPOSE 2222
ADD . /src
RUN cd /src \
#  && npm cache clean \
 && npm rebuild node-sass \
 && yarn install \
 && npm run build
ENTRYPOINT ["npm", "run", "start"]
