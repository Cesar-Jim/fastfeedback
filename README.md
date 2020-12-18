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

- Vercel Site Deployment ✅

  - New project starting from a template:
    - Choose Next.js and follow all instructions
    - Deployed site: https://fastfeedback-one-zeta.vercel.app/
    - Purchase your domain and add your repo to it. You have almost instantly a production ready app!
      - Sets up SSL

- Firebase: User Authorization and GitHub Authentication ✅

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
    - See Firebase lessons learned at the bottom of this readme.

- Configure & Setup Prettier ✅

  - Create a `.prettierrc.js` file and include the right configuration

- Firestore: Database Creation ✅

  - Create the database in test mode first.
  - Create a `/lib/db.js` file for the creation of the db and its main configuration.

- Add [Chakra-UI](https://chakra-ui.com/) as UI Library ✅

  - Create a file `/styles/theme.js` and add a custom theme.
  - Import the `<ThemeProvider theme={theme}>` tag and wrap the application udner `_app.js`.

- Next.js
  - Create a `/pages/_document.js` **Custom Document** file to augment the application's HTML & body tages.
  - Add Absolute Imports & Aliases by creating a `/jsconfig.json` file. This will help to avoid having hyper-nested routs in the imports when the project gets big.

### <a id='notes'></a>Course Notes 🧾

- The stack for this project will be:

  - Framework: **Next.js**
  - Authentication: **Firebase**
  - Database: **Firestore**
  - Styling: **Chakra-UI**
  - Deployment: **Vercel**

- Chakra-UI

  - Is a component library to build React apps
  - It has great APIs and it's easy to use
  - Uses styled system under the hood. _(See [styled-system](https://styled-system.com/))_.

- Domain Name, Design, and Data Fetching
  - The name should be easy to remember
  - Design Process:
    - Use **Excalidraw** for low fidelity markups and wireframes
    - Use **Figma** for high fidelity markups
    - Use **OpenChakra** to turn mockups into real React code with Chakra-UI.It is a visual editor.
- Static Generation
  - Static pages are the base of JAMstack (JavaScript, APIs, & Markup)
  - Generating that HTML at the **Build Time** and then reusing it on each request
  - Static sites are cheaper and promote easier deployments
  - With Next.js if you are not doing any data fetching, it's going to prerender this page by default, so that it gets staticly generated.
  - Your data gets transformed into HTML using `getStaticProps` and `getStaticPaths`
  - We want to generate x number of paths based on some data, this is done with `getStaticPaths`
  - Always Fast, Always Online, and Globally Distributed
- Client-Side Fetching (SWR)
  - Better for private and user-specific pages, where SEO is not important.
  - Pre-render the page without data and show a loading state
  - Then, fetch and display the data client-side
  - **SWR**is a good choice to fetch data client-side securely. It handles caching, revalidation, focus tracking, and more.
- Server-Side Rendering (SSR)
  - Serving new HTML on every request is becoming less necessary with improvements to static generation.
  - SSR is not disappearing but evolving
- Hybrid Approach

  - Allows changing your data-fetching strategy on a per-page basis.
  - Use static generation for most use cases
  - Use CSR with SWR if your data changes frequently
  - Mutate data using API routes

## <a id='documentation'></a>Documentation 🕶️

- [React 2025 Course Documentation][coursedocumentation]
- [JAMstack Documentation][jamstackdocumentation]

## <a id='lessons'></a>Lessons Learned 📚

- Firebase
  - Authentication with GitHub was a problem because Firebase provided the following authorization callback url: `https://.firebaseapp.com/__/auth/handler` for GitHub auth, which should be copied and pasted into the app's configuration in GitHub. Note that the `.` _(period)_ before the word `firebase` needs to be removed, otherwise, authentication was impossible. I spent several hours figuring this out.
    - Make sure to add the following authorized domains:
      - `now.sh` required for preview deploys
      - Production domain: `fastfeedback-one-zeta.vercel.app`
- Vercel
  - Make sure to add environment variables for production and preview environments. Not required for local, as those are added in the `.env` file.
- Chakra-UI
  - While attempting to install Chakra _(not the latest V1 version)_, I was getting a `dependency tree error`. The solution was to install the packages as the following example: `npm install --legacy-peer-deps --save @chakra-ui/core@0.8.0`
  ***
- Useful links:
  - GitHub app's settings: https://github.com/settings/applications/1436151
  - Google APIs app's settings: https://console.developers.google.com/admin/settings?project=fast-feedback-demo-feb34
