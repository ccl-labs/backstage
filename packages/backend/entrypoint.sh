#!/bin/sh
set -e

until pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -q; do
  sleep 2
done

exec node packages/backend --config app-config.yaml --config app-config.production.yaml
