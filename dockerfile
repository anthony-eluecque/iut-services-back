FROM postgres:13

COPY init.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_DB=mydatabase
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword


EXPOSE 5432