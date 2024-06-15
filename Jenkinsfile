pipeline {
    agent { label 'frontend' } // specify the frontend agent

    stages {
        stage('Check Git Installation') {
            steps {
                script {
                    sh 'git --version || (echo "Git is not installed. Exiting." && exit 1)'
                }
            }
        }
        
        stage('Navigate to Repository') {
            steps {
                dir('/home/react-app') {
                    script {
                        sh '''
                            if [ -d "career-insight-frontend" ]; then
                                cd career-insight-frontend
                                git pull
                            else
                                git clone https://github.com/Career-Insight/career-insight-frontend.git
                            fi
                        '''
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
