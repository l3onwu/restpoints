# restpoints
This is the repository for the REST-API builder web app, Restpoints. A tool to help developers plan endpoints and routes for their backend applications using an elegant UI. It can be found at https://restpoints.vercel.app/

<kbd>
  <img width="1000" alt="rp" src="https://user-images.githubusercontent.com/85681107/159162691-458c2b9a-e8a2-4c78-af5b-b29857b17a83.png">
</kbd>

## Architecture
The frontend is built in **Javascript** with **React** and the create-react-app framework.

Deployment is handled by **Vercel.**

The backend is **Firebase**, a popular NoSQL service for rapid development.

## Development
You will need Node and `npm` installed, to run the code and manage packages. After cloning the repo, use `npm install` to get the required node modules.

### Local env
The only other piece of setup is setting a development Firebase backend. You can create a free Firebase account at https://firebase.google.com/

Create a new project, and set up firestore and google authentication.

Then create a `.env` file in the project root directory. Refer to `.env.template` for the required variables.

```
REACT_APP_FIREBASE_API_KEY = ""
REACT_APP_FIREBASE_AUTH_DOMAIN = ""
REACT_APP_FIREBASE_PROJECT_ID = ""
REACT_APP_FIREBASE_STORAGE_BUCKET = ""
REACT_APP_FIREBASE_SENDER_ID = ""
REACT_APP_FIREBASE_APP_ID = ""
REACT_APP_FIREBASE_MEASUREMENT_ID = ""
```

## Frontend deep-dive
This repo represents the app's frontend. Run `npm start` in development to view the app locally. As long as node modules are installed, and `.env` is set up, the app will run.

### Styles
The app uses **Chakra-UI** as a style framework with style props, an implementation of CSS-in-JS. While the app is intended to be responsive, the current design benefits from a larger display.

### State 
State is handled with React's inbuilt `useState`, along with custom hooks which are given scope with React's context API. The philosophy behind this is to simplify the app's design, reflecting the ethos of 'rapid production' and avoid using an external library like Redux. 

The core state management is implemented in the hooks `useUser`, `useProjects`, and `useCurrentProject`. These hooks retrieve data from Firebase, provide access to the user object, an array of the user's projects, and arrays of a selected project's groups and endpoints. In future, it would be wise to add caching to these hooks, to reduce API calls. 

Prop drilling is avoided through the context API, and importing a custom provider hook in the component you want to use the state in.

```
export const useUserProvider = () => {
  return useContext(UserContext);
};
```

```
const { userHook } = useUserProvider();
```

The local state is parsed into functions that generate the correct arrays to map `EndpointGroupBox` components in the JSX. The display and management of these components represents the app's core functionality. 

Refer to `src/helpers/hooks` to see the implementation of the custom hooks.

### Authentication
Authentication is handled with Firebase and its SDK. The user object is retrieved and stored into `localStorage` until logged out.

## Backend deep-dive
The backend is managed by Firebase, using Firestore and Firebase Authentication.

Data is modelled into three collections - `project`, `groups`, and `endpoints`. They are connected in an abstract way with each other's document ids. The basic idea behind this is to emulate the normalization of a relational database while providing the flexibility and speed of a NoSQl database.

