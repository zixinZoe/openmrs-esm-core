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

10. We are now going to build a very simple React conmponent that will be the extension we add to the patient-chart. To start, delete the file root.component.tsx. Then create a new file with the same name (root.component.tsx). 

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

12. Update the index.ts file. 
Delete line 3: ```import * as LocationPickerParcel from "./location-picker-parcel.component";```
Delete ```LocationPickerParcel``` from the ```export``` on/near line 23 


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

14. From the terminal, run ```npm run debug``` . This will package and locally serve this es6 module. We will next incoporate it into the patient chart.



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
  
