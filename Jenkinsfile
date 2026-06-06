// Minimal Jenkinsfile for Playwright project
pipeline {
    agent any

    tools { nodejs 'NodeJS-20' }

    options {
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
    }

    stages {
        stage('Install dependencies') {
            steps {
                echo 'Installing npm dependencies'
                sh 'npm ci'
            }
        }

        stage('Install Playwright browsers') {
            steps {
                echo 'Installing Playwright browsers'
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Run tests') {
            steps {
                echo 'Running Playwright tests'
                sh 'npx playwright test'
            }
        }

        stage('Publish reports') {
            steps {
                echo 'Generating Allure report if results exist'
                sh '''
                    if [ -d allure-results ]; then
                        npx allure generate allure-results --clean -o allure-report || true
                    fi
                '''
            }
        }
    }

    post {
        always {
            echo 'Archiving test artifacts'
            archiveArtifacts artifacts: 'allure-results/**/*', allowEmptyArchive: true
            publishHTML(target: [allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'allure-report', reportFiles: 'index.html', reportName: 'Allure Report'])
        }

        failure {
            echo 'Build failed.'
        }
    }
}
