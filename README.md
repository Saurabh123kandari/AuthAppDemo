# AuthAppDemo

## Authentication features

- **Login Screen**
  - Email and password fields with validation.
  - Error messages for invalid email format and incorrect credentials.
  - Navigation to the Signup screen.

- **Signup Screen**
  - Name, email, and password fields with validation:
    - All fields required.
    - Email must be valid.
    - Password must be at least 6 characters.
  - Error messages for missing/invalid fields.
  - Navigation back to the Login screen.

- **Home Screen**
  - Displays the logged-in user&apos;s name and email.
  - Logout button to clear auth state and return to Login.

- **Auth State Management**
  - Uses React Context (`AuthContext`) to store `user`, errors, and auth actions.
  - `login`, `signup`, and `logout` functions exposed via context.
  - Optional persistence via `AsyncStorage` so the user can remain logged in between app launches.

- **UI/UX**
  - Modern, card-like layout with consistent spacing and typography.
  - Reusable components:
    - `ScreenContainer` for safe area, scrolling, and keyboard handling.
    - `AppTextInput` with labels and inline error text.
    - `PrimaryButton` for primary actions with loading state.
    - `ErrorText` for consistent error styling.
  - Password visibility toggle on both Login and Signup password fields.

## Running the app

Follow the Getting Started steps above:

1. Install dependencies:

```sh
npm install
```

2. Install native dependencies for iOS (first time or after changing native deps):

```sh
bundle install
bundle exec pod install
```

3. Start Metro:

```sh
npm start
```

4. Run on a device or emulator:

```sh
# Android
npm run android

# iOS
npm run ios
```

