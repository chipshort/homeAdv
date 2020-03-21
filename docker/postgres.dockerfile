FROM postgres:12

COPY ./backend/sql/* /docker-entrypoint-initdb.d/