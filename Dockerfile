FROM alpine:latest

WORKDIR /app

ADD . /app

RUN chmod +x asmttpd

CMD ./asmttpd ./public ${PORT}