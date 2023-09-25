FROM alpine as nanobuilder
RUN apk update && apk add nano

FROM postgres:15.1-alpine

COPY --from=nanobuilder /usr/bin/nano /usr/bin/nano
# COPY *.sql /docker-entrypoint-initdb.d/