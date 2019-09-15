## Running the Project

### Steps to setup the dev environment

* Install [yarn](https://yarnpkg.com/lang/en/) 
* Run `yarn install`
* Install [node (v10.16.3)](https://nodejs.org/en/)

### Steps to build website artifacts

* Run `yarn build`
* Artifacts are in the build folder

### Steps to start the development environment

* Run `yarn run serve` to start the node server which only runs the API.
* Run `yarn start` and it will ask tell you that the port has already been taken but should give you the option to start on a new port. Please select this option.
* Navigate to [localhost:3001](localhost:3001)

### Steps to start the production environment

* Follow the steps to build the website artifacts above.
* Run `yarn run serve`
* Navigate to [localhost:3000](localhost:3000)

## Explanation

### Rendering The Application

* Reactjs was used to render the application and handle interactions and animations. I decided against typescript initially to cut down on development time since the scope of the project was very small.

* I used a component based approach for the folder structures which would scale pretty nicely if we wanted to add new components to our chat application.

* To speed up development I used the create-react-app toolchain to scaffold the base parts of the app and add some useful scripts. This is why the development server also has to run while we have our node server running in the background to handle API requests.

* The application is made up of three different components, the Chat Input, Chat List and Chat Comment components. These are responsible for different things in the application and act as standalone components, requiring very little from the outside world. What they do share in common is the need for a store to dispatch events via redux.

### Logic

* Redux was chosen as a way to manage and mutate state from a central location.

* To have certain actions take affect inside of sibling components I needed to create a reducer which handled dispatched events from the Chat Input to the Chat List. For example we have an event that adds a new chat comment to the list from the chat input.

* There are also a series of actions that make it easier for the components to understand how to dispatch events the store in an abstracted way.

* For Networking I decided to use a built in XMLHttpRequest abstraction that comes built into Chrome (42+), FireFox (39+), Edge (39+), and most mobile browsers.

### Improvements if I had more time

* I would have refactored everything to work with Typescript as being typesafe is very desireable because it keeps everything clean and working as expected.

* I had a hard time figuring out where the backside information came from (e.g. "Active since ..."), I would spend more time to actually wire it up to the data because currently it is hardcoded.

* I would suggest to the design team that the hover is conflicting with the links in the chat, and try to  change this UX to potentially on click or to have a delay before the animation.

* Move some of the data manipulation to the backend, such as the logic for figuring out what user belongs to what post in the data.json.

* Broken the components down into smaller chunks. Especially the chat-input, I think I could have abstracted the editable div into a different component to make it more reusable and modular.
