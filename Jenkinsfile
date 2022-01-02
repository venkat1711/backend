pipeline {
    agent any
    stages {
        stage('DEV BUILD') {
            steps {
                sh 'npm install'
		
            }
        }
	stage('DEV RUN') {
            steps {
                sh 'npm start'
		
            }
        }
    }
}
