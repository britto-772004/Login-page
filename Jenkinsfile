pipeline {
    agent any  // Run on any available Jenkins agent

    environment {
        DOCKER_IMAGE = "login-page-backend-dockerimage"
        CONTAINER_NAME = "login-page-backend-dockercontainer"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'server', url: 'https://github.com/britto-772004/Login-page.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        // stage('Run Tests') {
        //     steps {
        //         sh 'npm test'  // Make sure tests are in package.json
        //     }
        // }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Run Docker Container') {
            steps {
                // Stop and remove existing container (if any)
                sh 'docker stop $CONTAINER_NAME || true'
                sh 'docker rm $CONTAINER_NAME || true'

                // Run the new container
                sh 'docker run -d -p 3000:5000 --name $CONTAINER_NAME $DOCKER_IMAGE'
            }
        }
    }

    post {
        success {
            echo "✅ Backend successfully deployed using Docker!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}
