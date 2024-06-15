pipeline {
    agent { label 'frontend' } // specify the frontend agent

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    dir('/home/react-app') {
                        git 'https://github.com/Career-Insight/career-insight-frontend.git'
                    }
                }
            }
        }

        stage('Navigate to Client Directory') {
            steps {
                dir('/home/react-app/career-insight-frontend/client') {
                    script {
                        sh '''
                            docker rm -f careerinsight || true
                            docker build -t careerinsight .
                        '''
                    }
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
