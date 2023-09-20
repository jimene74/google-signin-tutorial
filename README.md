# google-signin-tutorial

to run on ios simulator: 
```npx expo run:ios```

i followed this awesome tutorial: https://www.youtube.com/watch?v=BDeKTPQzvR4&ab_channel=CodewithBeto

# steps:

create app:
```npx create-expo-app tutorial-google```

install dependencies:
```npx expo install expo-auth-session expo-crypto expo-web-browser react-native-web react-dom @expo/webpack/config @react-native-async-storage/async-storage```

create clients:

navigate to console.cloud.google.com,
create new project.
navigate to apis and services -> credentials.
configure consent screen.

create oauth client id.
select web application.
get uri for web client:
```npx expo start --web --https``` localhost.
save client id.
create oauth client id.
select ios.
get bundle identifier.
```npx expo prebuild```
save client id.
create oauth client id.
select android.
bundle should be same (check app.json).
get fingerprint.
```expo credentials:manager```
update generate new keystore.

test web:
```npx expo start --web --https```

add scheme in app.json (can be whatever).
test ios:
```npx expo run:ios```

test android:
```npx expo run:android```

some issues i ran into... make sure xcode is up to date!