#!/usr/bin/env/ groovy

@Library("jenkins-shared-library")
def gv
pipeline {
  agent any
  environment {
    NAME_PROJECT = 'Weather_api'
    HOST_DOCKER = "12851043"
    HOST_NEXUS = "localhost:8082"
  }
  tools {
    nodejs 'node'
  }
  parameters {
    string(name: 'VERSION', defaultValue: '', description: 'version deploy')
    choice(name: 'VERSION', choices: ['Major', 'Minor', 'Patch'], description: '')
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
    stage("build") {
      steps {
        script {

          echo "testing node version"
          sh "node -v"
          sh 'sudo npm version patch'
          sh 'rm weather_api*'
          sh "npm pack"
          echo "building version ${nextVersion}"
        }

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
          buildDocker("${HOST_DOCKER}/${NAME_PROJECT}:${NEXT_VERSION}")
          buildNexus("${HOST_NEXUS}/${NAME_PROJECT}:${NEXT_VERSION}.tgz")
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