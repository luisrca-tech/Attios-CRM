#!/usr/bin/env bash
# Use this script to start a docker container for a test database

DB_CONTAINER_NAME="attios-crm-postgres-test"

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Test database container '$DB_CONTAINER_NAME' already running"
  exit 0
fi

if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  docker start "$DB_CONTAINER_NAME"
  echo "Existing test database container '$DB_CONTAINER_NAME' started"
else
  # import env variables from .env.test
  set -a
  source .env.test

  DB_PASSWORD=$(echo "$DATABASE_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')

  docker run -d \
    --name $DB_CONTAINER_NAME \
    -e POSTGRES_USER="postgres" \
    -e POSTGRES_PASSWORD="$DB_PASSWORD" \
    -e POSTGRES_DB="attios-crm" \
    -p 5432:5432 \
    docker.io/postgres && echo "Test database container '$DB_CONTAINER_NAME' was successfully created"
fi

# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 5

# Test the connection
max_retries=30
counter=0
while ! docker exec $DB_CONTAINER_NAME pg_isready -U postgres > /dev/null 2>&1; do
    counter=$((counter+1))
    if [ $counter -gt $max_retries ]; then
        echo "Failed to connect to database after $max_retries attempts"
        exit 1
    fi
    echo "Waiting for database to be ready... ($counter/$max_retries)"
    sleep 1
done

echo "Database is ready!"

# Create the test database if it doesn't exist
docker exec $DB_CONTAINER_NAME psql -U postgres -c "CREATE DATABASE \"attios-crm-test\";" || true 