# Nexus BackEnd

The core backend service for the Nexus ecosystem, providing Atlassian OAuth2 integration and Jira project management capabilities.

## 🚀 Features

- **Atlassian OAuth2 Integration**: Secure login flow using Atlassian's OAuth2 provider.
- **Jira API Integration**: Fetch accessible resources and detailed project information.
- **Secure RestClient**: Pre-configured `RestClient` with automatic bearer token injection for Atlassian API calls.
- **Modern Tech Stack**: Built with Java 21 and Spring Boot 4.

## 🛠 Tech Stack

- **Language**: Java 21
- **Framework**: [Spring Boot 4.0.3](https://spring.io/projects/spring-boot)
- **Security**: [Spring Security](https://spring.io/projects/spring-security) (OAuth2 Client)
- **Database**: [Spring Data MongoDB](https://spring.io/projects/spring-data-mongodb)
- **Utilities**: [Lombok](https://projectlombok.org/)

## 📂 Project Structure

```text
src/main/java/com/nexus/backend/
├── config/             # Security and RestClient configurations
├── controller/         # API endpoints (Auth, Projects)
├── models/             # Data models for API responses
├── services/           # Business logic for Atlassian API calls
└── BackEndApplication  # Main Spring Boot entry point
```

## 🛣 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/logged/user` | Returns the currently authenticated user's profile attributes. |
| `GET` | `/atlassian/resources` | Lists accessible Atlassian resources (sites/cloudIds). |
| `GET` | `/atlassian/projects` | Fetches Jira projects for a given `cloudId` parameter. |

## 🔒 Security

Authentication is handled via Atlassian OAuth2. Unauthenticated requests to protected endpoints will be redirected to the Atlassian login page. CORS is pre-configured to allow requests from cross-origin clients (useful for frontend development).

---
Developed as part of the Nexus Project.
