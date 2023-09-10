# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```
React
├─ .env.local
├─ .env.production
├─ .gitignore
├─ Dockerfile
├─ nginx
│  └─ nginx.conf
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ icon6.png
│  ├─ icon6_192.png
│  ├─ index.html
│  ├─ manifest.json
│  └─ robots.txt
├─ README.md
└─ src
   ├─ actions
   │  ├─ actions.js
   │  └─ actionTypes.js
   ├─ App.js
   ├─ App.test.js
   ├─ assets
   │  ├─ Cake.png
   │  ├─ clap
   │  │  └─ clap2.wav
   │  ├─ Frame_21.png
   │  ├─ googleplay.png
   │  ├─ icon.png
   │  ├─ icon2.png
   │  ├─ icon3.png
   │  ├─ icon5.png
   │  ├─ icon6.png
   │  ├─ kakao_login.svg
   │  ├─ kakao_login_large_narrow.png
   │  ├─ LOGO3.png
   │  ├─ molru.webp
   │  ├─ music
   │  │  ├─ birthday1.mp3
   │  │  └─ birthday3.mp3
   │  ├─ Sticky-Note-01-Yellow.png
   │  ├─ Sticky-Note-02-Green.png
   │  ├─ Sticky-Note-02-Pink.png
   │  ├─ Sticky-Note-03-Orange.png
   │  ├─ Sticky-Note-04-Purple.png
   │  └─ TempBg.png
   ├─ components
   │  ├─ firework.jsx
   │  ├─ firework2.jsx
   │  ├─ firework3.jsx
   │  ├─ FollowTabs.jsx
   │  ├─ KakaoCallback.jsx
   │  ├─ LivePage
   │  │  ├─ BrithdayMusic.jsx
   │  │  ├─ ButtonGroups.jsx
   │  │  ├─ ChatBox.jsx
   │  │  ├─ ClapEmoji.jsx
   │  │  ├─ HappyFace.jsx
   │  │  ├─ JoinCheck.jsx
   │  │  └─ ViewersCarousel.jsx
   │  ├─ Loading.jsx
   │  ├─ MessageBoard.jsx
   │  ├─ MessageBoard_Before.jsx
   │  ├─ MessageDetail.jsx
   │  ├─ MessageDetailText.jsx
   │  ├─ MessageModal.jsx
   │  ├─ MessageOnBoard.jsx
   │  ├─ ModalText.jsx
   │  ├─ NavBar.jsx
   │  ├─ openvidu
   │  │  ├─ OvVideo.js
   │  │  ├─ UserVideo.css
   │  │  └─ UserVideoComponent.js
   │  ├─ Route
   │  │  └─ PrivateRoute.jsx
   │  ├─ SearchFriend.jsx
   │  ├─ StickyNote
   │  │  ├─ StickyNoteG.jsx
   │  │  ├─ StickyNoteO.jsx
   │  │  ├─ StickyNotePink.jsx
   │  │  ├─ StickyNotePurple.jsx
   │  │  └─ StickyNoteY.jsx
   │  ├─ Timmer.jsx
   │  ├─ UserFollowButton.jsx
   │  └─ YearChip.jsx
   ├─ css
   │  ├─ BirthdayInput.css
   │  ├─ ClapEmoji.css
   │  ├─ FollowTabsStyles.css
   │  ├─ GlobalFont.css
   │  ├─ LogInPage.css
   │  ├─ MemoBoard.css
   │  ├─ Openvidu.css
   │  └─ UserPage.css
   ├─ fonts
   │  └─ Nikumaru.otf
   ├─ index.js
   ├─ pages
   │  ├─ BirthdayInput.jsx
   │  ├─ LivePage.jsx
   │  ├─ LogInPage.jsx
   │  ├─ LogInPage_Dark.jsx
   │  ├─ MyFriend.jsx
   │  ├─ NotFound404.jsx
   │  ├─ ProfileSetting.jsx
   │  └─ UserPage.jsx
   ├─ reducers
   │  ├─ authReducer.js
   │  ├─ messagesDataReducer.js
   │  ├─ modalDataReducer.js
   │  └─ rootReducer.js
   ├─ reportWebVitals.js
   ├─ setupTests.js
   └─ store
      └─ store.js

```
