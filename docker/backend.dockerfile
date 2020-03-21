FROM rust:latest as build

RUN rustup default nightly

WORKDIR /build


COPY ./Cargo.lock ./Cargo.toml ./

# COPY ./src/dummy.rs ./src/main.rs

# RUN cargo build && rm -r src

COPY ./src/ ./src/

RUN cargo build

FROM debian:sid-slim as backend

WORKDIR /app

COPY ./Rocket.toml ./
COPY --from=build /build/target/debug/backend ./

CMD [ "/app/backend" ]