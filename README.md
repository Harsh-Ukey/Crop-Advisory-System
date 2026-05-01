# 🌾 Kisan Sahayak - Smart Crop Advisory System

> **Empowering farmers with AI-driven insights for a profitable harvest.**

![Kisan Sahayak Banner](https://images.unsplash.com/photo-1625246333195-5848c42287f3?q=80&w=1200&auto=format&fit=crop)

## 🚀 Overview
**Kisan Sahayak** is a comprehensive digital platform designed to help small and marginal farmers in India make informed decisions. By combining real-time data, scientific crop logic, and AI, we provide personalized advice to maximize yield and income.

## ✨ Key Features

- **🤖 AI Crop Advisor**: Personalized crop recommendations based on soil type, water availability, and season.
    - **Fertilizer Schedule**: Detailed timeline for nutrient application.
    - **Profit Calculator**: Revenue estimates based on real-time market trends.
    - **Agronomic Guide**: In-depth data on market demand, risk factors, and intercropping.
- **💬 Kisan AI Assistant**: A 24/7 dedicated chatbot powered by **Google Gemini** to answer farming queries in local contexts.
- **💰 Live Mandi Prices**: Real-time crop price tracking from nearest mandis using **data.gov.in** (Open Government Data Platform India).
- **🌦️ Real-time Weather**: Accurate weather forecasts to help plan sowing, irrigation, and harvesting.
- **📖 About Us**: Learn about our mission to digitize Indian agriculture.
- **👤 User Profiles**: Personalized dashboard that saves your farm location and preferences.
- **🛡️ High Resilience & Caching**: Smart fallback mechanisms for external APIs ensure the dashboard never breaks, coupled with an in-memory caching system to minimize external requests and reduce latency.
- **🚀 Cloud Native DevOps**: Fully Dockerized components with Kubernetes manifests and Nginx reverse proxies for scalable, robust production deployments.

## 🛠️ Tech Stack

### Frontend
- **React + Vite**: Fast and interactive user interface.
- **TailwindCSS**: Modern, responsive design system.
- **Lucide Icons**: Intuitive iconography.
- **Axios**: Seamless API communication.

### Backend
- **Node.js & Express**: High-performance server architecture.
- **MongoDB**: Scalable database for user and farm data.
- **Google Gemini SDK**: Advanced AI capabilities.
- **OpenWeatherMap API**: Localized weather data.
- **Data.gov.in API**: Official market price feeds.

### DevOps & Infrastructure
- **Docker**: Multi-stage containerization for both frontend and backend.
- **Kubernetes**: Scalable deployment architecture using custom manifests (Deployments, Services, ConfigMaps).
- **Nginx**: High-performance reverse proxy for API routing and static asset serving.
- **GitHub Actions**: Automated CI/CD pipelines for linting, security audits, Docker image building, and pushing to Docker Hub.

## ⚡ Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 3. Backend Setup
```bash
cd be
npm install
```
Create a `.env` file in the `be` directory:
```env
PORT=3000
SECRET_KEY=your_jwt_secret
MONGO_URL=your_mongodb_connection_string
WEATHER_API_KEY=your_openweathermap_api_key
DATA_GOV_API_KEY=your_data_gov_india_api_key
GEMINI_API_KEY=your_google_gemini_api_key
```
Start the server:
```bash
npm run dev
```

### 4. Frontend Setup
```bash
cd ../fe
npm install
npm run dev
```
Visit `http://localhost:5173` to start using the app.

### 5. Docker Deployment
To run the entire stack using Docker Compose:
```bash
docker-compose up -d --build
```
The application will be available at `http://localhost:5173` with Nginx automatically routing `/api` traffic to the backend.

### 6. Kubernetes Deployment
Before applying deployments, create the namespace:
```bash
kubectl apply -f k8s/namespace.yaml
```
Then apply the frontend and backend manifests:
```bash
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
```

### 7. CI/CD & GitHub Actions
To use the automated CI/CD pipeline, ensure the following secrets are configured in your GitHub repository:
- `DOCKERHUB_USERNAME`: Your Docker Hub username.
- `DOCKERHUB_TOKEN`: Your Docker Hub access token.

## 👥 Meet the Team
Built with ❤️ by students passionate about Agritech:
- **Jatin** - Lead Developer
- **Monish** - Frontend Architect
- **Hemant** - Backend Specialist

## 📬 Contact
Have questions or suggestions? Reach out at [yshake1004@gmail.com](mailto:yshake1004@gmail.com).

---
*© 2025 Kisan Sahayak. Jai Jawan, Jai Kisan.* 🇮🇳
