# Google Maps API Key Generation Guide

To generate a Google Maps API key for this project, follow these steps on the Google Cloud Console:

## 1. Access the Platform
Go to the [Google Maps Platform Onboarding](https://console.cloud.google.com/google/maps-apis/onboard;step=just_ask;flow=enable-billing-flow).

## 2. Create or Select a Project
- If you don't have a project, you'll be prompted to create one.
- If you have an existing project, select it from the dropdown.

## 3. Enable Billing
- Google Maps APIs require a billing account. Even if you stay within the free tier, you must enable billing.
- Follow the prompts to attach a billing account to your project.

## 4. Enable APIs
For an Uber-like clone, you typically need the following APIs:
- **Maps SDK for Javascript** (Front-end display)
- **Places API** (Location searching/autocomplete)
- **Distance Matrix API** (Calculating ride fares/time)
- **Directions API** (Pathfinding for driver/user)

## 5. Generate API Key
- Navigate to **APIs & Services > Credentials** in the left sidebar.
- Click **+ CREATE CREDENTIALS** and select **API key**.
- Your new API key will be displayed.

## 6. Secure Your Key (Recommended)
- Click on the newly created key to edit its settings.
- Under **API restrictions**, restrict the key to only the APIs listed above.
- Under **Application restrictions**, add your local/production URLs (e.g., `http://localhost:5173/*`) to prevent unauthorized usage.

## 7. Configuration
Add the key to your `.env` file in the `Backend` and `frontend` folders:
```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here\

```
## 8.click on the enable api in the google cloud
## 9. then click on the preview api
