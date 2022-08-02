FROM registry.access.redhat.com/ubi8/nodejs-14:1 AS BUILD_IMAGE

USER 65532:65532

WORKDIR /app
COPY ./package.json ./
COPY ./index2.js ./

USER 0
RUN npm install

COPY ./ ./

EXPOSE 8080
CMD ["node", "index2.js"]