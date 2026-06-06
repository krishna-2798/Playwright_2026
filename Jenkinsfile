// PLAYWRIGHT AUTO PIPELINE - CLEANED
// Restored and simplified notifications to avoid Groovy parsing errors
pipeline {
    agent any

    tools { nodejs 'NodeJS-20' }

    environment {
        NODE_VERSION = '20'
        CI = 'true'
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/.cache/ms-playwright"
        SLACK_WEBHOOK_URL = credentials('slack-webhook-token')
        EMAIL_RECIPIENTS = 'krishna.270798@gmail.com, gopikrishna.boina@gmail.com'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {
        stage('🔍 ESLint Analysis') {
            steps {
                echo 'Installing dependencies and running ESLint'
                sh 'npm ci'
                sh 'mkdir -p eslint-report || true'
                script {
                    def eslintStatus = sh(script: 'npm run lint', returnStatus: true)
                    env.ESLINT_STATUS = eslintStatus == 0 ? 'success' : 'failure'
                }
                sh 'npm run lint:report || true'
            }
            post {
                always {
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'eslint-report',
                        reportFiles: 'index.html',
                        reportName: 'ESLint Report'
                    ])
                }
            }
        }

        stage('🔧 DEV Tests') {
            steps {
                sh 'npx playwright install --with-deps chromium'
                sh 'rm -rf allure-results playwright-report playwright-html-report test-results || true'
                script {
                    env.DEV_TEST_STATUS = sh(script: 'npx playwright test --grep "@sample" --config=playwright.config.dev.ts', returnStatus: true) == 0 ? 'success' : 'failure'
                }
                sh '''
                    mkdir -p allure-results
                    echo "Environment=DEV" > allure-results/environment.properties
                    echo "Browser=Google Chrome" >> allure-results/environment.properties
                    echo "Config=playwright.config.dev.ts" >> allure-results/environment.properties
                '''
            }
            post {
                always {
                    sh '''
                        mkdir -p allure-results-dev
                        cp -r allure-results/* allure-results-dev/ 2>/dev/null || true
                        npx allure generate allure-results-dev --clean -o allure-report-dev || true
                    '''
                    publishHTML(target: [allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'allure-report-dev', reportFiles: 'index.html', reportName: 'DEV Allure Report'])
                    publishHTML(target: [allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'DEV Playwright Report'])
                    publishHTML(target: [allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'playwright-html-report', reportFiles: 'index.html', reportName: 'DEV HTML Report'])
                    archiveArtifacts artifacts: 'allure-results-dev/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                }
            }
        }

        stage('🔍 QA Tests') {
            steps {
                sh 'rm -rf allure-results playwright-report playwright-html-report test-results || true'
                script {
                    env.QA_TEST_STATUS = sh(script: 'npx playwright test --grep "@sample" --config=playwright.config.qa.ts', returnStatus: true) == 0 ? 'success' : 'failure'
                }
                sh '''
                    mkdir -p allure-results
                    echo "Environment=QA" > allure-results/environment.properties
                    echo "Browser=Google Chrome" >> allure-results/environment.properties
                    echo "Config=playwright.config.qa.ts" >> allure-results/environment.properties
                '''
            }
            post {
                always {
                    sh '''
                        mkdir -p allure-results-qa
                        cp -r allure-results/* allure-results-qa/ 2>/dev/null || true
                        npx allure generate allure-results-qa --clean -o allure-report-qa || true
                    '''
                    publishHTML(target: [allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'allure-report-qa', reportFiles: 'index.html', reportName: 'QA Allure Report'])
                    publishHTML(target: [allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'QA Playwright Report'])
                    publishHTML(target: [allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'playwright-html-report', reportFiles: 'index.html', reportName: 'QA HTML Report'])
                    archiveArtifacts artifacts: 'allure-results-qa/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                }
            }
        }

        stage('🎯 STAGE Tests') {
            steps {
                sh 'rm -rf allure-results playwright-report playwright-html-report test-results || true'
                script {
                    env.STAGE_TEST_STATUS = sh(script: 'npx playwright test --grep "@sample" --config=playwright.config.stage.ts', returnStatus: true) == 0 ? 'success' : 'failure'
                }
                sh '''
                    mkdir -p allure-results
                    echo "Environment=STAGE" > allure-results/environment.properties
                    echo "Browser=Google Chrome" >> allure-results/environment.properties
                    echo "Config=playwright.config.stage.ts" >> allure-results/environment.properties
                '''
            }
            post {
                always {
                    sh '''
                        mkdir -p allure-results-stage
                        cp -r allure-results/* allure-results-stage/ 2>/dev/null || true
                        npx allure generate allure-results-stage --clean -o allure-report-stage || true
                    '''
                    publishHTML(target: [allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'allure-report-stage', reportFiles: 'index.html', reportName: 'STAGE Allure Report'])
                    publishHTML(target: [allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'STAGE Playwright Report'])
                    publishHTML(target: [allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'playwright-html-report', reportFiles: 'index.html', reportName: 'STAGE HTML Report'])
                    archiveArtifacts artifacts: 'allure-results-stage/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                }
            }
        }

        stage('🚀 PROD Tests') {
            steps {
                sh 'rm -rf allure-results playwright-report playwright-html-report test-results || true'
                script {
                    env.PROD_TEST_STATUS = sh(script: 'npx playwright test --grep "@sample" --config=playwright.config.prod.ts', returnStatus: true) == 0 ? 'success' : 'failure'
                }
                sh '''
                    mkdir -p allure-results
                    echo "Environment=PROD" > allure-results/environment.properties
                    echo "Browser=Google Chrome" >> allure-results/environment.properties
                    echo "Config=playwright.config.prod.ts" >> allure-results/environment.properties
                '''
            }
            post {
                always {
                    sh '''
                        mkdir -p allure-results-prod
                        cp -r allure-results/* allure-results-prod/ 2>/dev/null || true
                        npx allure generate allure-results-prod --clean -o allure-report-prod || true
                    '''
                    publishHTML(target: [allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'allure-report-prod', reportFiles: 'index.html', reportName: 'PROD Allure Report'])
                    publishHTML(target: [allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'PROD Playwright Report'])
                    publishHTML(target: [allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'playwright-html-report', reportFiles: 'index.html', reportName: 'PROD HTML Report'])
                    archiveArtifacts artifacts: 'allure-results-prod/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                }
            }
        }

        stage('📈 Combined Allure Report') {
            steps {
                sh '''
                    mkdir -p allure-results-combined
                    cp -r allure-results-dev/* allure-results-combined/ 2>/dev/null || true
                    cp -r allure-results-qa/* allure-results-combined/ 2>/dev/null || true
                    cp -r allure-results-stage/* allure-results-combined/ 2>/dev/null || true
                    cp -r allure-results-prod/* allure-results-combined/ 2>/dev/null || true
                    echo "Environment=ALL (DEV, QA, STAGE, PROD)" > allure-results-combined/environment.properties
                    echo "Browser=Google Chrome" >> allure-results-combined/environment.properties
                    echo "Pipeline=${JOB_NAME}" >> allure-results-combined/environment.properties
                    echo "Build=${BUILD_NUMBER}" >> allure-results-combined/environment.properties
                '''
            }
            post {
                always {
                    allure([includeProperties: true, jdk: '', properties: [], reportBuildPolicy: 'ALWAYS', results: [[path: 'allure-results-combined']]])
                }
            }
        }
    }

    post {
        always {
            echo 'PIPELINE SUMMARY:'
            script {
                def devStatus = env.DEV_TEST_STATUS ?: 'unknown'
                def qaStatus = env.QA_TEST_STATUS ?: 'unknown'
                def stageStatus = env.STAGE_TEST_STATUS ?: 'unknown'
                def prodStatus = env.PROD_TEST_STATUS ?: 'unknown'

                def devEmoji = devStatus == 'success' ? '✅' : '❌'
                def qaEmoji = qaStatus == 'success' ? '✅' : '❌'
                def stageEmoji = stageStatus == 'success' ? '✅' : '❌'
                def prodEmoji = prodStatus == 'success' ? '✅' : '❌'

                env.OVERALL_STATUS = (devStatus == 'failure' || qaStatus == 'failure' || stageStatus == 'failure' || prodStatus == 'failure') ? 'FAILURE' : 'SUCCESS'
                env.STATUS_EMOJI = env.OVERALL_STATUS == 'SUCCESS' ? '✅' : '❌'
                env.DEV_EMOJI = devEmoji
                env.QA_EMOJI = qaEmoji
                env.STAGE_EMOJI = stageEmoji
                env.PROD_EMOJI = prodEmoji
            }
        }

        success {
            echo 'Pipeline completed successfully.'
            script {
                // Slack call intentionally disabled. Uncomment to re-enable.
                // try { slackSend(color: 'good', message: "All tests passed: ${JOB_NAME} #${BUILD_NUMBER}") } catch (e) { echo "Slack send failed: ${e.message}" }

                // Send a simple HTML email (minimal) to recipients
                try {
                    emailext(
                        subject: "✅ Playwright Tests Passed - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: "All tests passed for ${env.JOB_NAME} #${env.BUILD_NUMBER}. View build: ${env.BUILD_URL}",
                        to: env.EMAIL_RECIPIENTS
                    )
                } catch (e) {
                    echo "Email send failed: ${e.message}"
                }
            }
        }

        failure {
            echo 'Pipeline failed.'
            script {
                // Slack call intentionally disabled. Uncomment to re-enable.
                // try { slackSend(color: 'danger', message: "Tests failed: ${JOB_NAME} #${BUILD_NUMBER}") } catch (e) { echo "Slack send failed: ${e.message}" }

                try {
                    emailext(
                        subject: "❌ Playwright Tests Failed - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                        body: "Tests failed for ${env.JOB_NAME} #${env.BUILD_NUMBER}. View build: ${env.BUILD_URL}",
                        to: env.EMAIL_RECIPIENTS
                    )
                } catch (e) {
                    echo "Email send failed: ${e.message}"
                }
            }
        }

        unstable {
            echo 'Pipeline unstable.'
            script {
                // Slack disabled
                // try { slackSend(color: 'warning', message: "Pipeline unstable: ${JOB_NAME} #${BUILD_NUMBER}") } catch (e) { echo "Slack send failed: ${e.message}" }
            }
        }
    }
}
