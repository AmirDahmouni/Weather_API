#!/usr/bin/env/ groovy
#!/bin/sh

@Library("jenkins-shared-library")
def gv
pipeline {
  agent any
  environment {
    NAME_PROJECT = 'weather_api'
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
          sh 'git config --global user.email "dahmouni_amir@hotmail.fr"'
          sh 'git config --global user.name "AmirDahmouni"'

          echo "testing node version"
          sh "node -v"
          NEXT_VERSION = sh(script: 'npm version patch --no-git-tag-version', returnStdout: true)
          sh 'rm -f weather_api*'
          sh "npm pack"
          echo "building version ${NEXT_VERSION}"
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
          buildDocker("${HOST_DOCKER}/${NAME_PROJECT}:${NEXT_VERSION} .")
          buildNexus("${HOST_NEXUS}/${NAME_PROJECT}:${NEXT_VERSION}.tgz .")
        }
      }
    }
    stage("commit version update") {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'github-credentials', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')])
            sh 'git config --global user.email "dahmouni_amir@hotmail.fr"'
            sh 'git config --global user.name "AmirDahmouni"'
            sh 'git config '
            sh 'git status'
            sh 'git branch'
            sh 'git config --list'
            sh "git remote set-url origin https://${USERNAME}:${PASSWORD}@github.com/AmirDahmouni/Weather_API.git"
            sh 'git add .'
            sh 'git commit -m "ci: Next version" '
            sh 'git push origin HEAD:master'
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