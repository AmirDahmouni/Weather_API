#! usr/bin/env/ bash
export DOCKER_IMAGE = $1
docker-compose -f docker-compose.yaml up --detach
echo "success deployment"