# near-earth-object

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

## Structure

### Routes

There are three routes:

- Login: Only accepted login with Google account.
- Home: View that request all Near Earth Objects based in "Start Date" and "End Date".
- Favorites: View that show all favorites Near Earth Objects stored in Firestore.

### Store

The store (Vuex) have four main structures:

- "filters": Object with all filters used to load records in NASA API.
- "nearEarthObjects": Object with list of records loaded in NASA API.
- "message": Object used to show errors alerts.
- "loading": Used to show overlay "div" during requests to API.

### Layouts

- LayoutApp.vue
- LayoutLogin.vue

### Components

- AppBar.vue: Navbar of application.
- Filters.vue: Date filters used in "Home" route.
- NavingationDrawer.vue: Side menu.
- NearEathObject.vue: Form to show date of Near Earth Object and add/remove from favorites.
- Overlay.vue: Component to block application (float div).
- Snackbar.vue: Component to show error messages.
- TableNearEarthObjects.vue: Component to show list of near earth objects.

### Cloud

Public URL: https://near-earth-object.web.app/

Cloud Host: Firebase (Firestore and Hosting)
