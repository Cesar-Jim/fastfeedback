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

  - Create a `.prettierrc.js` file and include the right configuration.
  - Create a `.prettierignore` file and add .next & node_modules folders.

- Firestore: Database Creation ✅

  - Create the database in test mode first.
  - Create a `/lib/db.js` file for the creation of the db and its main configuration.

- Add [Chakra-UI](https://chakra-ui.com/) as UI Library ✅

  - Create a file `/styles/theme.js` and add a custom theme.
  - Import the `<ThemeProvider theme={theme}>` tag and wrap the application udner `_app.js`.

- Next.js ✅

  - Create a `/pages/_document.js` **Custom Document** file to augment the application's HTML & body tages.
  - Add Absolute Imports & Aliases by creating a `/jsconfig.json` file. This will help to avoid having hyper-nested routs in the imports when the project gets big.

- SVG ✅

  - The SVG logo was initially compressed using [this SVG optimizer](https://jakearchibald.github.io/svgomg/).
  - After optimization, create a new logo key inside of `styles/theme.js` and place the path along with the `wiebox` property.

- [OpenChakra](https://openchakra.app/) Visual Editor ✅

  - Great tool to get the initial layout code for the site.
  - Just build every block, get the generated conde and add it to your app.

- Form using [React Hook Form](https://react-hook-form.com/) ⚠️

  - There were some conflicts related to the version of `Chakra-UI` _(see lessons learned)_.

- Toast Message Creation ✅

  - A toast is a small message that shows up in a box and disappears on its own after a few seconds.
  - Chakra-UI has a toast built into it that we can use

- Hook up Firebase server-side ✅

  - A **Service Account** is required
  - Project Settings > Service Accounts, click on `Generate new private key`. This will create a `json` file that you need to download.
  - Then run in the terminal `npm install firebase-admin`.
  - Create a `/lib/firebase-admin.js` file

- Make First API Route ⚠️

  - Create an `api` folder inside of the `pages` folder
  - Create a `/api/sites` file and add the following: _(note that req is not used, instead an `"_"` is placed for readability)\_

  ```javascript
  export default (_, res) => {
    res.status(200).json({ name: 'Next.js' });
  };
  ```

  - Now the route is ready to fetch some data.
  - Make sure to wrap `FIREBASE_PRIVATE_KEY` with double quotes (" "), inside of the `.env` file.

- Data Fetching with [SWR](https://swr.vercel.app/) ✅

  - Run `npm install swr`
  - For **Local Mutation** use the `mutate` function that comes with SWR:

  ```javascript
  mutate(
    '/api/sites',
    async (data) => {
      return { sites: [...data.sites, newSite] };
    },
    false
  );
  ```

- Date Formating with [date-fns](https://date-fns.org/) ✅

  - Run `npm install date-fns`

- `getStaticProps()` Usage ✅

  - For getting all the feedback from each of the sites `/pages/p/[siteId]`, Next,js will prerender the page at build time using the props returned by `getStaticProps`.
  - If a page has dynamic routes and uses `getStaticProps`, it needs to define a list of paths that have to be rendered to HTML at build time. With `getStaticPaths`, Next,js will statically prerender all the paths specified by `getStaticPaths`.

- API Routes Authentication - JSON Web Token ([JWT](https://jwt.io/)) ✅

  - The main goal is to lock down the API routes and only show the sites for the given user that's logged in
  - Also, redirect the user to the dashboard if he/she is already logged in
  - If I go to the dashboard now, I would be able to see all the feedback for all the sites for all the users. So, start looking at the `/api/sites` file. **Only you can fetch your own sites**

- Redirect to Dashboard when User is Authenticated ✅

  - There is a sample snippet on [Vercel's website](https://vercel.com/blog/simple-auth-with-magic-link-and-nextjs) called magic-link:

  ```javascript
  <script
    dangerouslySetInnerHTML={{
      __html: `
          if (document.cookie && document.cookie.includes('authed')) {
            window.location.href = "/dashboard"
          }
        `
    }}
  />
  ```

  - The above code should be placed inside of `/pages/index.js`

- Setting The Cookie ✅

  - the associated cookie `fast-feedback-auth` should be set inside of `/lib/auth`.
  - For setting a cookie, you can install and use the library `js-cookie`. Then do:

  ```javascript
  cookie.set('fast-feedback-auth', true, {
    expires: 1
  });
  ```

  - For removing the cookie, simply:

  ```javascript
  cookie.remove('fast-feedback-auth');
  ```

- Incremental Static Regeneration ⚠️

  - Essentially allows us to rebuild our app in the background. The cached version of our static site will be updated with the newest version.
  - This is particularly useful for a scenario of Firebase's servers going down, for example. You will never show a broken page!
  - ISR is accomplished by adding the following prop inside of the returned object from `getStaticProps()`: `unstable_revalidate: 1` the "1" means "rebuild every 1 second"
  - We are guaranteed to have a page that is statically served and our users will not never see content
  - **More understanding and practice on this topic is needed**

- [Checkly](https://app.checklyhq.com/) ✅

  - What is Checkly?
    - Monitor the status and performance of your API endpoints & vital site transactions from a single, simple dashboard.
    - An active reliability platform that brings together the best of end-to-end testing and active monitoring.
    - In essence, a browser check is a Node.js script that starts up a Chrome browser, loads a web page and interacts with that web page. The script validates assumptions you have about that web page, for instance:
      - Is my shopping cart visible?
      - Can users add products to the shopping cart?
      - Can users log in to my app?

- Logging with [LogFlare](https://logflare.app) ✅

  - Vercel has a concept of `log drains` and basically all of these logs that filter in can be sent-off to other 3rd party loggers
  - Why do we need loggers?
    - Catch errors
    - See live-streaming logs
    - Get real-time logs
    - Store and query logs
    - Go back in the past to see when something broke
    - Set some kind of alerting for when things break
  - **Logflare** has pretty good integration with **Vercel** and has a very good free tier.
  - Check Vercel's market place and look for integrations with Logflare

- [pino-logflare](https://github.com/Logflare/pino-logflare) ✅

  - Build on top of Logflare and is a module used to forward messages to your Logflare account.
  - To install it just do: `$ npm install pino-logflare`
  - And check the [pino-logger integration with Vercel guide](https://github.com/Logflare/pino-logflare/blob/master/docs/VERCEL.md) to understand how to handle log events for the client and server sides

- [Stripe](https://firebase.google.com/products/extensions/firestore-stripe-subscriptions)- Firebase Extension
  - Find a nice setup walkthrough [here](https://github.com/jaredpalmer/minimum-viable-saas/blob/master/README_FB_STRIPE_POSTINSTALL.md)

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
    - Use **Excalidraw** for low fidelity mockups and wireframes
    - Use **Figma** for high fidelity mockups
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

- Data Fetching with SWR

  - SWR is a package that offers React hooks for remote data fetching
  - Components will get a stream of data updates constantly and automatically. And the UI will be always fast and reactive.
  - One nice things is that the information updates in the background, so, if I navigate off the page, that information will stay up to date.
  - It also allows to have `Local Mutation` (locally mutate cache)

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
  - While attempting to install Chakra _(not the latest V1 version)_, I was getting a `dependency tree error`. The solution was to install the packages as the following example: `npm install --legacy-peer-deps --save @chakra-ui/core@0.8.0`.
- React Hook Form

  - There were some issues related to page scroll on IOS systems. Tho get around this issue I had to install `"body-scroll-lock": "^3.0.3",` and add the following code inside of `package.json`:

  ```javascript
  "resolutions": {
    "body-scroll-lock": "3.0.3"
  }
  ```

---

- Useful links:
  - GitHub app's settings: https://github.com/settings/applications/1436151
  - Google APIs app's settings: https://console.developers.google.com/admin/settings?project=fast-feedback-demo-feb34
  - Code Snippets: https://leerob.io/snippets
