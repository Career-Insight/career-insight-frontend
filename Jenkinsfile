pipeline {
    agent { label 'frontend' } // specify the frontend agent

    stages {
        stage('Deploy Application') {
            steps {
                script {
                    // Run the deploy script
                    sh '/home/react-app/deploy.sh'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh '''
                        docker run -d -p 3000:3000 --name careerinsight careerinsight
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
