[coursewebsite]: https://react2025.com/
[coursedocumentation]: https://docs.react2025.com/
[jamstackdocumentation]: https://jamstack.org/

### React 2025

### Course: **Modern Applications with the Jamstack**

<br />
<img src='https://react2025.com/logo.svg' id='thumbnail' width='10%' height='10%' />

## Sections in this Readme 📓

- [React 2025 Course's Website][coursewebsite]
- [The Process](#process)
- [Course Notes](#notes)
- [Documentation](#documentation)
- [Lessons Learned](#lessons)

### <a id='process'></a>The Process ⚙️

- Vercel _(deploys right away the site!)_

  - New project starting from a template:
    - Choose Next.js and follow all instructions
    - Deployed site: https://fastfeedback-one-zeta.vercel.app/ ✅
    - Purchase your domain and add your repo to it. You have almost instantly a production ready app!
      - Sets up SSL

- Firebase for User Auth and storing info to the database

  - Create a new project and choose `web` _(</>)_ as the type of app.
  - install Firebase as a dependency: `npm install firebase`.
  - Create a project in Firebase and get the proper keys.
  - Create a `.env.local` file to store environment variables and add firebase keys:
    - `NEXT_PUBLIC_FIREBASE_API_KEY`
    - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - Create a lib folder and add `firebase.js` as the file that will initialize Firebase.
  - Place Firebase keys into `firebase.js`.
  - About the auth code & firebase
    - Use `react context`, which allows to access shared state, not going through the hassle of doing it in a component-by-component fashion.
    - On top of `react context` create a custom React hook, in order to encapsulate functionality.
    - See how Firebase auth is setup for GitHub: https://firebase.google.com/docs/auth/web/github-auth
    - The app needs to get registered on GitHub here: https://github.com/settings/applications/new
    - The callback url that Github asks for is provided by firebase when setting up OAuth for Github.
    - Paste the Client ID and Client Secret keys inside of Firebase
    - Once `authContext` is created, this should wrap the Next.js `Custom App`.
    - Create a Next.js `Custom App` file `/pages/_app.js`. It is a specific Next.js file that wraps your application so that you can provide shared layout, providers, or logic.
    - Wrap the custom app component like `<ProvideAuth><Component {...pageProps} /></ProvideAuth>`, so that app has now access to the OAuth context.
    -

- Configure & Setup Prettier
  - Create a `.prettierrc.js` file and include the right configuration

### <a id='notes'></a>Course Notes 🧾

- The stack for this project will be:

  - Framework: **Next.js**
  - Authentication: **Firebase**
  - Database: **Firestore**
  - Styling: **Chakra-UI**
  - Deployment: **Vercel**

- Chakra-UI
  - Uses styled system under the hood. _(See [styled-system](https://styled-system.com/))_

## <a id='documentation'></a>Documentation 🕶️

- [React 2025 Course Documentation][coursedocumentation]
- [JAMstack Documentation][jamstackdocumentation]

## <a id='lessons'></a>Lessons Learned 📚

- Firebase
  - Authentication with GitHub was a problem because Firebase provided the following authorization callback url: `https://.firebaseapp.com/__/auth/handler` for GitHub auth, which should be copied and pasted into the app's configuration in GitHub. Note that the `.` _(period)_ before the word `firebase` needs to be removed, otherwise, authentication was impossible. I spent several hours figuring this out.
  - Useful links:
    - GitHub app's settings: https://github.com/settings/applications/1436151
    - Google APIs app's settings: https://console.developers.google.com/admin/settings?project=fast-feedback-demo-feb34
