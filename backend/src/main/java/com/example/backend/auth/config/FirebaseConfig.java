package com.example.backend.auth.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Slf4j
@Configuration
public class FirebaseConfig {

	@Value("${firebase.credentials.path:}")
	private String credentialsPath;

	@Value("${firebase.credentials.resource:classpath:firebase-service-account.json}")
	private Resource credentialsResource;

	@Value("${firebase.project-id:}")
	private String projectId;

	@PostConstruct
	public void initialize() {
		if (FirebaseApp.getApps().isEmpty()) {
			try {
				FirebaseOptions.Builder builder = FirebaseOptions.builder();

				// credentials 경로가 설정되어 있으면 파일 경로로 초기화
				if (credentialsPath != null && !credentialsPath.isEmpty()) {
					FileInputStream serviceAccount = new FileInputStream(credentialsPath);
					GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
					builder.setCredentials(credentials);
					log.info("Firebase initialized with credentials file: {}", credentialsPath);
				} else if (credentialsResource != null && credentialsResource.exists()) {
					// 리소스 경로로 초기화
					try (InputStream serviceAccount = credentialsResource.getInputStream()) {
						GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
						builder.setCredentials(credentials);
						log.info("Firebase initialized with resource: {}", credentialsResource);
					}
				} else {
					// 환경 변수나 기본 인증 사용 (GCP 환경 등)
					GoogleCredentials credentials = GoogleCredentials.getApplicationDefault();
					builder.setCredentials(credentials);
					log.info("Firebase initialized with Application Default Credentials");
				}

				// Project ID 설정
				if (projectId != null && !projectId.isEmpty()) {
					builder.setProjectId(projectId);
				}

				FirebaseOptions options = builder.build();
				FirebaseApp.initializeApp(options);
				log.info("Firebase initialized successfully");
			} catch (IOException e) {
				log.error("Failed to initialize Firebase", e);
				throw new RuntimeException("Failed to initialize Firebase", e);
			}
		} else {
			log.info("Firebase already initialized");
		}
	}

	@Bean
	public FirebaseAuth firebaseAuth() {
		return FirebaseAuth.getInstance();
	}
}


