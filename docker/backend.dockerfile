FROM rust:latest as build

RUN rustup default nightly

WORKDIR /build


COPY ./Cargo.lock ./Cargo.toml ./
COPY ./src/ ./src/

RUN cargo build --release

FROM debian:sid-slim as backend

WORKDIR /app

COPY ./Rocket.toml ./
COPY --from=build /build/target/release/backend ./

CMD [ "/app/backend" ]