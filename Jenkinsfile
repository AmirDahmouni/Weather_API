#!/usr/bin/env/ groovy

@Library("jenkins-shared-library")
def gv
library identifier :'jenkins-shared-library@master',retriever: modernSCM(
  [$class: 'GitSCMSource',
   remote : 'https://github.com/AmirDahmouni/jenkins-shared-library.git',
   credentialsId: 'github-credentials'
  ]
)

pipeline {
  agent any
  environment {
      NAME_PROJECT = "weather_api_app"
      HOST_DOCKER = "12851043"
      HOST_NEXUS = "localhost:8082"
      TAG_NAME = sh(script: 'git describe --tags --abbrev=0', returnStatus: true)
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
    stage("Initialize Build") {
      steps {
        script {
          initialize()
        }
      }
    }
    stage("Tests") {
      when {
        expression {
          params.executeTests == true
        }
      }
      steps {
        echo "running tests ..."
      }
    }
    stage("build App") {
      steps {
        script {
          sh 'git config --global user.email "dahmouni_amir@hotmail.fr"'
          sh 'git config --global user.name "AmirDahmouni"'

          echo "testing node version"
          sh "node -v"
          sh 'git config --global user.email "dahmouni_amir@hotmail.fr" '
          sh 'git config --global user.name "AmirDahmouni" '

          NEXT_VERSION = sh(script: 'npm version patch --no-git-tag-version', returnStdout: true)
          sh 'rm -f weather_api*'
          sh "npm pack"
          echo "building version ${NEXT_VERSION}"


        }

      }
    }
    stage("Build & Push Image") {
      input {
        message "Select the deploiement environment "
        ok "Done"
        parameters {
          choice(name: 'ENV', choices: ['Dev', 'Staging', 'Production'], description: '')
        }
      }
      steps {
        script {
          buildDocker("${HOST_DOCKER}/${NAME_PROJECT}:5.0.10")
          buildNexus("${HOST_NEXUS}/${NAME_PROJECT}:5.0.10.tgz")
        }
      }
    }
    stage ("Deploy ...") {
      steps {
        script {
          echo "deploying docker image to EC2 ..."
          def docker_img = "${HOST_DOCKER}/${NAME_PROJECT}:5.0.10"
          def shellCmd = " bash ./server-cmds.sh ${docker_img}"
          //def dockerCMD = "docker run -p 3080:3000 -d 12851043/weather_api_app:v5.0.10"
          sshagent(['EC2-server']) {
             sh 'scp server-cmds.sh amazon@192.168.1.74:/home/amazon'
             sh "ssh -o StrictHostKeyChecking=no amazon@192.168.1.74 ${shellCmd}"
          }
        }
      }
    }
    stage("commit version update") {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'github-credentials', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')])
          {
            sh 'git config --global user.email "dahmouni_amir@hotmail.fr"'
            sh 'git config --global user.name "AmirDahmouni"'
            sh "git remote set-url origin https://${USERNAME}:${PASSWORD}@github.com/AmirDahmouni/Weather_API.git"
            sh 'git add .'
            sh 'git commit -m "CI: update version" '

            sh 'git stash save "Stash package.json changes"'
            sh 'git pull origin master'

            sh 'git push origin HEAD:master'
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
