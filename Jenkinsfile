pipeline {
  agent any 
  stages {
    stage("build") {
      steps {
        echo "testing node version"
        sh "node -v"
      }
    }
    stage("test") {
      steps {
        echo "running tests"
      }
    }
     stage("deploy") {
      steps {
         echo "deploying application"
      }
    }
  }
}
node {
  //groovy script
}
      
