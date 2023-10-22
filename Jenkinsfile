pipeline {
  agent any
  environment {
    NEW_VERSION = '1.3.0'
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
      steps {
        echo "running tests"
      }
    }
    stage("deploy") {
      when {
        expression {
          BRANCH_NAME == 'dev' || BRANCH_NAME == 'master'
        }
      }
      steps {
        withCredentials([
          usernamePassword(credentials: "Dockerhub", usernameVariable: USER_DOCKER, passwordVariable: PASSWORD_DOCKER),

        ]) {
          echo "deploying application ... "
          sh "docker-buildx build -t 12851043/weather_api_app:1.0 ."
          sh "docker-buildx build -t localhost:8082/weather_api_app:1.0 ."
          sh "docker login -u ${USER_DOCKER} -p ${PASSWORD_DOCKER}"
          sh "docker push 12851043/weather_api_app:1.0"
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