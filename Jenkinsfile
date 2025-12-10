pipeline {
    agent any
    tools {
        maven 'Default Maven'   // mismo nombre que acabas de guardar
    }
    stages {
        stage('Build & SonarQube') {
            steps {
                withSonarQubeEnv('SonarLocal') {  // servidor que ya configuraste
                    sh '''
                      mvn clean verify sonar:sonar \
                      -Dsonar.projectKey=ci-sonar-demo \
                      -Dsonar.projectName=ci-sonar-demo
                    '''
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
