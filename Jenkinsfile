#!/usr/bin/env/ groovy

@Library("jenkins-shared-library")
def gv
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
    stage("init") {
      steps {
        script {
          initialize()
        }
      }
    }
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
      input {
        message "Select the environment to deploy to"
        ok "Done"
        parameters {
          choice(name: 'ENV', choices: ['Dev', 'Staging', 'Production'], description: '')
        }
      }
      steps {
        script {
          build("12851043/weather_api:1.2", "localhost:8082/weather_api:1.2")
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