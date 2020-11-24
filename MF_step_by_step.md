
## Required software for local development:
- NodeJS and NPM : https://nodejs.org/en/
- n (node version manager) : ```npm install -g n``` see https://www.npmjs.com/package/n
- Visual Code Studio : https://code.visualstudio.com/


## Development steps
1. Create a new repo in github called “openmrs-esm-foo-ext”. You can use a different name if you choose but remember to use this name in all places I reference openmrs-esm-foo-ext

2. Create a directory called openmrs-esm and cd into it (this will/can be the base directory of your openmrs-esm development. Clone the above repo here.

3. Clone https://github.com/openmrs/openmrs-esm-login.git to openmrs-esm directory as well. We are going to use this as a “template” for creating a new extension widget

4. Copy all the code from openmrs-esm-login to your openmrs-esm-...-ext directory: ``` cp -r openmrs-esm-login/* openmrs-esm-...-ext/ ```

5. Open up this folder in Visual Studio Code

6. Update webpack.config.js
- Find and replace "-esm-login" with "-esm-...-ext" (where ... is the name you chose)

7. In your terminal, install the npm modules: 
``` npm install ```
- make sure you are using a relatively recent version of node, LTE is 14.x.x, you can type node -version to find your current version. I would recommend using n to manage your node version: see https://www.npmjs.com/package/n
- make sure you have a .gitignore file which includes node_modules

8. Run ```npm update``` to get updates

9. Rename the file openmrs-esm-login.tsx to openmrs-esm-foo-ext.tsx.

10. Update set-public-path.ts:
replace ```setPublicPath("@openmrs/esm-login-app");``` with ```setPublicPath("@openmrs/esm-foo-ext");```
See https://github.com/jonathandick/openmrs-esm-foo-ext/blob/master/src/set-public-path.ts


10. We are now going to build a very simple React component that will be the extension we add to the patient-chart. To start, delete the file root.component.tsx. Then create a new file with the same name (root.component.tsx). 

11. Copy the following into that file:
```
import React from "react";
import { openmrsRootDecorator } from "@openmrs/esm-context";


const Root: React.FC = () => (
  <div>
    <h1>Hello world</h1>
  </div>
);

export default openmrsRootDecorator({
  featureName: "foo",
  moduleName: "@openmrs/esm-foo-ext",
})(Root);

```
See https://github.com/jonathandick/openmrs-esm-foo-ext/blob/master/src/root.component.tsx


12. Update the index.ts file. 
Delete line 3: ```import * as LocationPickerParcel from "./location-picker-parcel.component";```
Delete ```LocationPickerParcel``` from the ```export``` on/near line 23 
Now replace the existing ```setupOpenMRS()``` function with the following:
```
function setupOpenMRS() {
  return {
    extensions: [
      {
        name: "foo-ext",
        load: () => import("./openmrs-esm-foo-ext"),
      }
    ],
  };
}
```
See https://github.com/jonathandick/openmrs-esm-foo-ext/blob/master/src/index.ts

13. Remove the following directories from your src directory: choose-location, loading, location-picker, login

14. Create a new file at the root level called ```babel.config.json```
Copy the following to this file: 
```
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties"
  ]
}
```
See https://github.com/jonathandick/openmrs-esm-foo-ext/blob/master/babel.config.json


15. Update the package.json file : Search for "login" and replace with "foo-ext" in all places. 
See https://github.com/jonathandick/openmrs-esm-foo-ext/blob/master/package.json

16. From the terminal, run ```npm run start -- --importmap="https://spa-modules.nyc3.digitaloceanspaces.com/import-map.json"``` . This will build the package and locally serve it. The default is to use the openmrs instance running on the demo server at openmrs-spa.org. We're going to specifically tell it to use the latest import-map. Also note, that if you're feeling bold you can test this against your own version of openmrs by adding a ```--backend="url-to-your-backend"```

17. Congratulations, you now have a local development environment set up with your first extension 

18. To see and manage the import-map, enter your browser console and type ```localStorage.setItem("openmrs:devtools",true)```. You should see a small gray square now in the bottom right corner. This allows you to manage your import map. More to follow on how to use this tool.

19. If you logged in as admin (which is a System Develope role in OpenMRS), you will have access to the implmenter tools via a small lavendar colored square in the right corner. This gives you access to the configurations for a distribution.

20. Make sure you are now at /openmrs/spa/home. You should see a panel of buttons. Open up the implementer tools and look for the configuration for ```@openmrs/esm-home-app```. You should see this:
```
@openmrs/esm-home-app:
extensions:
   home-page-buttons:
      add: []
      remove: []
      order: []
```

21. Click on the array next to add which will reveal a text input. Type into the input ```{"extension":"foo-ext"}```. Such that the json now should look like this:
```
@openmrs/esm-home-app:
extensions:
   home-page-buttons:
      add: [{"extension":"foo-ext"}]
      remove: []
      order: []
```
This will automatically cause the foo-ext extension to load and you've now successfully created a new distribution of OpenMRS>

## Building and deploying a distribution
(forthcoming)

## Key files 
- root level 
  - webpack.config.js
  - tsconfig.json
  - package.json
  - package-lock.json
- src
  - index.ts
  - set-public-path.ts
  - root.component.tsx
  - openmrs-esm-foo-ext.tsx
  - root.component.tsx
  - types.ts
  - openmrs-backend-dependencies.ts
  
