FROM rust:1.67-slim-buster AS builder

RUN apt-get update && apt-get install -y libssl-dev pkg-config

WORKDIR /usr/src/app

COPY Cargo.toml Cargo.lock ./
COPY src ./src

RUN cargo build --release

FROM debian:buster-slim
RUN apt-get update && apt-get install -y libssl-dev ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/src/app/target/release/backend /usr/local/bin/backend

EXPOSE 8080

CMD ["backend"]