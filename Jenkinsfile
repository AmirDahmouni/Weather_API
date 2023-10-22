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
          gv = load "script.groovy"
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
        withCredentials([
          usernamePassword(credentialsId: 'Dockerhub', usernameVariable: 'USER_DOCKER', passwordVariable: 'PASSWORD_DOCKER'),
          usernamePassword(credentialsId: 'Nexus', usernameVariable: 'USER_NEXUS', passwordVariable: 'PASSWORD_NEXUS')
        ]) {
          echo "variable ${ENV}"
          echo "deploying application version ${params.VERSION}... "
          script {
            gv.buildApp()
          }
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