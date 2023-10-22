pipeline {
  agent any
  environment {
    NEW_VERSION = '1.3.0'
  }
  tools {
    nodejs 'node'
  }
  parameters {
    string(name: 'VERSION', defaultValue: '', description: 'version deploy')
    choice(name: 'VERSION', choices: ['1.1.0', '1.2.0', '1.3.0'], description: '')
    booleanParam(name: 'executeTests', defaultValue: true, description :'test')
  }
  stages {
    stage("build") {
      steps {
        echo "testing node version"
        sh "node -v"
        echo "building version ${NEW_VERSION}"
      }
    }
    stage("test") {
      when {
        expression {
          params.executeTests == true
        }
      }
      steps {
        echo "running tests"
      }
    }
    stage("deploy") {
      steps {
        withCredentials([
          usernamePassword(credentials: 'Dockerhub', usernameVariable: 'USER_DOCKER', passwordVariable: 'PASSWORD_DOCKER'),
          usernamePassword(credentials: 'Nexus', usernameVariable: 'USER_NEXUS', passwordVariable: 'PASSWORD_NEXUS')
        ]) {
          echo "variable ${USER_DOCKER}"
          echo "deploying application version ${params.VERSION}... "
          sh "docker-buildx build -t 12851043/weather_api_app:1.0 ."
          sh "docker-buildx build -t localhost:8082/weather_api_app:1.0 ."
          sh "docker login -u ${USER_DOCKER} -p ${PASSWORD_DOCKER}"
          sh "docker login -u ${USER_NEXUS} -p ${PASSWORD_NEXUS} localhost:8082"
          sh "docker push 12851043/weather_api_app:1.0"
          sh "docker push localhost:8082/weather_api_app:1.0"
        }
      }
    }
  }
  post {
    always {
      echo "always start this action"
    }
    success {
      echo "success!"
    }
    failure {
      echo "failure!"
    }
  }
}