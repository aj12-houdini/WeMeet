# WeMeet (OurApp) — refactored version

A small social media app: users sign up, write posts, follow each other, see a
feed of posts from the people they follow, and search for other users. A
real-time private chat is started but not finished.

This is the **`after-refactor`** branch. It has the same behaviour as the
`before-refactor` branch, but the code has been restructured to improve its
design (see [Refactoring](#refactoring) below).

## Features

- Sign up and log in (passwords hashed with bcrypt, login token as a JWT)
- Create and delete posts
- Follow and unfollow other users
- Feed with posts from the people you follow
- Profile pages with posts, followers and following
- Search users by username
- Private chat over Socket.io *(work in progress)*

## Tech stack

| Part | Technologies |
|---|---|
| Client | React 18, React Router, Material UI, React Bootstrap, Sass |
| Server | Node.js, Express 4, Socket.io |
| Database | MongoDB with Mongoose |
| Auth | bcrypt, JSON Web Tokens |

## Getting started

### Requirements

- **Node.js 22** (LTS). The server does not start on Node 25 or newer, because
  a library used by `jsonwebtoken` relies on a Node feature that was removed.
- A running **MongoDB** instance (for example a local one on port 27017).

### 1. Install dependencies

```bash
cd server && npm install
```

```bash
cd client && npm install
```

### 2. Configure the server

Create `server/.env`:

```
CONNECTION_STRING=mongodb://127.0.0.1:27017/wemeet
SECRET=any-long-random-string
JWT_KEY=another-long-random-string
SALT_ROUNDS=10
```

### 3. Start both parts

Server (port 8000), from the `server` folder:

```bash
npm start
```

Client (port 3000), from the `client` folder, in a second terminal:

```bash
npm start
```

Then open http://localhost:3000.

The server address is set once on each side and must match:
`API_BASE_URL` in `client/src/js/config.js`, and `PORT` / `CLIENT_ORIGIN` in
`server/app.js`.

## Project structure

```
server/
├── app.js                      Express + Socket.io setup, registers routes and the error handler
├── router/
│   ├── apiRoutes.js            All API routes
│   └── dashboardRoutes.js      Login check route
├── controller/                 HTTP only: read the request, call a service, send the response
│   ├── authController.js
│   ├── postController.js
│   └── userController.js
├── services/                   Database only: all Mongoose queries live here
│   ├── UserService.js
│   └── PostService.js
├── models/                     Mongoose schemas
│   ├── User.js
│   └── Post.js
├── errors/
│   └── ApiError.js             ApiError → ValidationError / AuthError / NotFoundError
├── middleware/
│   ├── asyncHandler.js         Passes errors from async handlers to Express
│   ├── errorHandler.js         Turns ApiErrors into responses
│   └── isUserAuthenticated.js
└── validators/
    └── requestValidators.js    express-validator rules

client/src/
├── App.js                      Routes
├── js/
│   ├── config.js               API_BASE_URL
│   ├── api/                    All server calls
│   │   ├── ApiClient.js        Base class: builds the URL, sends the request, reads JSON
│   │   ├── AuthApi.js          login, isLoggedIn
│   │   ├── PostApi.js          getFeed, getUserPosts, create, delete
│   │   └── UserApi.js          getUser, getFollowInfo, follow
│   ├── searchUsers.js          Cancellable, cached user search (axios)
│   └── formatDate.js
├── hooks/
│   ├── useRequireLogin.js      Redirects to the landing page when not logged in
│   ├── useProfilePosts.js
│   └── useFollowInfo.js
└── Components/
    ├── Landing/                Landing page and sign-up form
    ├── Common/                 Navbars, post accordion, user search, footer
    ├── Dashboard/              Feed, create-post page, profile (header + tabs)
    └── UserProfile/            Other users' profiles, chat
```

## Refactoring

The goal was to improve the design **without changing behaviour**. Each step
is a separate commit on this branch; compare with `before-refactor` to see
everything:

```bash
git diff -M30% before-refactor after-refactor
```

### 1. Naming
Variables, functions, components and files renamed so the name says what the
code does, for example `showTimelinePost` → `fetchFeed`, `userFlag` →
`isOwnProfile`, `PostHeader` → `PostItem`, `controller.js` →
`router/apiRoutes.js`, `usermodel.js` → `models/User.js`. Two different
components both called `NavBar` became `LandingNavBar` and `DashboardNavBar`.

### 2. Dead code
Removed unused Express apps (with their CORS, body-parser and session setup)
in six server files, unused state and imports in the client, and leftover
debug logging (including logging of passwords). Client lint warnings dropped
from 18 to 4.

### 3. Code clones
- The server address was hard-coded 12 times in the client; it is now one
  `API_BASE_URL` constant.
- The same login check was copied into three pages; it is now the
  `useRequireLogin` hook.
- Nine places built their own `fetch` request. They now go through an
  `ApiClient` base class with `AuthApi`, `PostApi` and `UserApi` subclasses.

### 4. Long functions
- `ProfileBody` (186 lines, five jobs) was split into the `useProfilePosts` and
  `useFollowInfo` hooks and the `ProfileHeader` and `ProfileTabs` components;
  it is now 40 lines.
- `createPost` mixed `await` with nested `.then()` callbacks; it is now three
  straight `await` steps.
- `getFollowInfo` moved its database loops into `UserService`.

### 5. Layered server with service classes and error classes
- `UserService` and `PostService` hold every database query. Controllers no
  longer import the models; they only deal with HTTP.
- An `ApiError` class hierarchy plus one `errorHandler` middleware replaces
  hand-built error responses in sign-up and sign-in.

### How behaviour was checked
- **Server:** every controller function on this branch was run side by side
  with its `before-refactor` version against the same database, comparing
  responses and the resulting database state. All routes were also called
  over HTTP.
- **Client:** built after each step, then clicked through in the browser
  (sign in, feed, search, profiles, follow/unfollow, create and delete a post,
  logged-out redirect), checking the method, URL and headers of each request.

### Intentional behaviour change
`GET /dashboard` without a token now answers `401 { "message": "Not logged in " }`
instead of `200 { "message": "Unsucesfull" }`. The client still works, because
it treats any message other than `"succesfull"` as logged out.

### Known issues kept on purpose
These existed before the refactoring and were left unchanged so that behaviour
stays the same:

- Logging in with a wrong password never gets a response.
- `GET /get/posts` for an unknown user logs an error and returns an empty list.
- `GET /get/users/:id` for an unknown user returns status 200 with
  `{ "user": "Not found" }` (`NotFoundError` exists for a later fix).
- An invalid (rather than missing) token makes `/dashboard` return Express's
  default 500 page.

## Future work

- Fix the known issues above and use proper status codes (`NotFoundError`,
  `AuthError`).
- Finish the private chat and move the Socket.io handler out of `app.js`.
- Like and comment on posts, editable profiles with pictures.
