FROM node:10.16.3-alpine

ENV TZ=Europe/Zurich

RUN apk add --update tzdata && \
    rm -rf /var/cache/apk/* && \
    mkdir /user && \
    echo 'nobody:x:65534:65534:nobody:/:' > /user/passwd && \
    echo 'nobody:x:65534:' > /user/group

COPY package.json package.json
RUN npm install

COPY .babelrc .babelrc
COPY src src
RUN npm run build \
  && rm -rf src

COPY src/proto/message/ dist/proto/message/


# Ensure we are not running as root
USER nobody:nobody

CMD ["node", "dist/index.js"]
