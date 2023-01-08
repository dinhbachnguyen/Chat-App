FROM ghcr.io/dexidp/dex:v2.30.0

WORKDIR /usr/local/dex/conf

COPY config.yaml .

RUN mkdir examples

CMD ["dex", "serve", "./config.yaml"]