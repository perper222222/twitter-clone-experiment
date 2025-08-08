<br />

![](/.github/assets/presentation.png)

<p align="center">
  Twitter clone built in Next.js + TypeScript + Tailwind CSS using Cloud Firestore and Storage
</p>

## Preview 🎬

https://user-images.githubusercontent.com/55032197/201472767-9db0177a-79b5-4913-8666-1744102b0ad7.mp4

## Features ✨

- Authentication with Firebase Authentication
- Strongly typed React components with TypeScript
- Users can add tweets, like, retweet, and reply
- Users can delete tweets, add a tweet to bookmarks, and pin their tweet
- Users can add images and GIFs to tweet
- Users can follow and unfollow other users
- Users can see their and other followers and the following list
- Users can see all users and the trending list
- Realtime update likes, retweets, and user profile
- Realtime trending data from Twitter API
- User can edit their profile
- Responsive design for mobile, tablet, and desktop
- Users can customize the site color scheme and color background
- All images uploads are stored on Firebase Cloud Storage

## Tech 🛠

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Firebase](https://firebase.google.com)
- [SWR](https://swr.vercel.app)
- [Headless UI](https://headlessui.com)
- [React Hot Toast](https://react-hot-toast.com)
- [Framer Motion](https://framer.com)

## Development 💻

Here are the steps to run the project locally.

1. Clone the repository

   ```bash
   git clone https://github.com/ccrsxx/twitter-clone.git
   ```

1. Install dependencies

   ```bash
   npm i
   ```

1. Create a Firebase project and select the web app

1. Add your Firebase config to `.env.development`. Note that `NEXT_PUBLIC_MEASUREMENT_ID` is optional

1. Make sure you have enabled the following Firebase services:

   - Authentication. Enable the Google sign-in method.
   - Cloud Firestore. Create a database and set its location to your nearest region.
   - Cloud Storage. Create a storage bucket.

1. Install Firebase CLI globally

   ```bash
   npm i -g firebase-tools
   ```

1. Log in to Firebase

   ```bash
   firebase login
   ```

1. Get your project ID

   ```bash
   firebase projects:list
   ```

1. Select your project ID

   ```bash
   firebase use your-project-id
   ```

1. At this point, you have two choices. Either run this project using the Firebase on the cloud or locally using emulator.

   1. Using the Firebase Cloud Backend:

      1. Deploy Firestore rules, Firestore indexes, and Cloud Storage rules

         ```bash
         firebase deploy --except functions
         ```

      1. Run the project

         ```bash
         npm run dev
         ```

   1. Using Firebase Local Emulator:

      1. Install [Java JDK version 11 or higher](https://jdk.java.net/) before proceeding. This is required to run the emulators.

      1. Set the environment variable `NEXT_PUBLIC_USE_EMULATOR` to `true` in `.env.development`. This will make the app use the emulators instead of the cloud backend.

      1. At this point, you can run the following command to have a fully functional Twitter clone running locally:

         ```bash
         npm run dev:emulators
         ```

> **_Note_**: When you deploy Firestore indexes rules, it might take a few minutes to complete. So before the indexes are enabled, you will get an error when you fetch the data from Firestore.<br><br>You can check the status of your Firestore indexes with the link below, replace `your-project-id` with your project ID: https://console.firebase.google.com/u/0/project/your-project-id/firestore/indexes

Optional:

- If you want to get trending data from Twitter API, you need to create a Twitter developer account and get your API keys. Then add your API keys to `.env.development`. I hope Elon Musk doesn't make this API paid 😅.
- If you want to make the user stats synced with the deleted tweets, you need to enable the Cloud Functions for Firebase. Then deploy the Cloud Functions.


## Modified for experiments — numeric login & export

### What I changed
- Removed Google/GitHub OAuth.
- Added numeric login (enter experiment ID 1–200) on the main login page. The ID will be stored as the username in Firestore.
- Added server API route `/api/export` that exports tweets with counts to CSV. (Requires Firebase admin credentials — see below.)
- Updated README with Vercel deployment steps.

### Environment Variables (on Vercel)
Set these in your Vercel project settings (Environment Variables):

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (optional)

For `/api/export` (server-side) you should provide one of:
- `FIREBASE_SERVICE_ACCOUNT` — the **stringified JSON** of a Firebase service account (best for Vercel).  
  Example: `{"type": "...", "project_id": "...", ...}` (paste the whole JSON as a single ENV value).
- OR `FIREBASE_SERVICE_ACCOUNT_PATH` — path to a service account file in the deployment (less common).

If you don't provide a service account, `/api/export` will attempt to initialize the default admin SDK; on Vercel you must set `GOOGLE_APPLICATION_CREDENTIALS` or `FIREBASE_SERVICE_ACCOUNT`.

### How `/api/export` works
- HTTP GET `/api/export` (authenticated as server via service account) returns a CSV file containing:
  - `id` (tweet id)
  - `authorId`
  - `content`
  - `createdAt` (ISO string)
  - `likes` (count)
  - `comments` (count)

### Deploy to Vercel (one-click)
1. Push this repo to GitHub.
2. From Vercel, import the GitHub repo and set the Environment Variables listed above in the Vercel project settings (Production).
3. Deploy.

