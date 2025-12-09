pipeline {
  agent any
  tools { maven 'Default Maven' }
  stages {
    stage('Build') {
      steps {
        sh 'mvn clean compile'
      }
    }
    stage('Test') {
      steps {
        sh 'mvn test'
      }
    }
    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('SonarLocal') {
          sh "mvn sonar:sonar " +
             "-Dsonar.projectKey=building-a-multibranch-pipeline-project " +
             "-Dsonar.projectName='building-a-multibranch-pipeline-project'"
        }
      }
    }
    stage('Quality Gate') {
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
  }
}
