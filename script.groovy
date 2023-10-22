def buildApp() {
  echo "building the application ..."
  sh "docker-buildx build -t 12851043/weather_api_app:1.0 ."
  sh "docker-buildx build -t localhost:8082/weather_api_app:1.0 ."
  echo "Login to dockerHub ..."
  sh "echo $PASSWORD_DOCKER | docker login -u $USER_DOCKER --password-stdin"
  echo "Login to Nexus ..."
  sh "echo $PASSWORD_NEXUS | docker login -u $USER_NEXUS --password-stdin localhost:8082"
  echo "Login to Dockerhub ..."
  sh "docker push 12851043/weather_api_app:1.0"
  echo "Login to Nexus ..."
  sh "docker push localhost:8082/weather_api_app:1.0"
}
return this