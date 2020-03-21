FROM rust:latest as build

RUN rustup default nightly

WORKDIR /build

COPY ./Cargo.lock ./Cargo.toml ./


COPY ./src/dummy.rs ./src/dummy.rs

RUN cargo build --locked --bin dummy

# RUN cargo build && rm -r src

COPY ./src/ ./src/

RUN cargo build

FROM debian:sid-slim as backend

WORKDIR /app

ENV ROCKET_ENV=production

COPY ./Rocket.toml ./
COPY --from=build /build/target/debug/backend ./

CMD [ "/app/backend" ]