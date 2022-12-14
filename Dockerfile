FROM registry.access.redhat.com/ubi8/nodejs-14:1 AS BUILD_IMAGE

USER 65532:65532

WORKDIR /app
COPY ./package.json ./
COPY ./idx_redis.js ./

USER 0
RUN npm install

COPY ./ ./

EXPOSE 8081
CMD ["node", "idx_redis.js"]