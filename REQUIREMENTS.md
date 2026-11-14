# WeMeet — Requirements

**Pitch:** *Find people and things to do near you.*

## Phase 0 — Foundation
1. **Run on current Node** — replace `jsonwebtoken` with `jose`.
2. **Secure authentication** — verify the JWT on every protected route, take the user ID from the token only, use the `Authorization: Bearer` header.
3. **API tests** — Jest + Supertest, run automatically on GitHub Actions.

## Phase 1 — Fixes
4. **Bug fixes**
   - A wrong password returns `401`.
   - An invalid token returns `401`, not `500`.
   - An unknown user returns `404`.
   - Remove unused dependencies.
5. **Logout** — clear stored login data, disconnect the socket, redirect to the landing page.

## Phase 2 — Core features
6. **Private chat**
   - Authenticated socket connection.
   - Messages saved in MongoDB, with history loading.
   - Real-time delivery.
   - Conversation list with unread counts.
7. **Images in posts** — upload with type and size checks, store in Cloudinary or S3, preview before posting.
8. **Events**
   - **Create:** title, description, category, location, date and time, optional max attendees and photo.
   - **Discover:** events in the feed, plus a "nearby" search using MongoDB geo queries, filtered by date, distance and category.
   - **Join / leave:** "8/10 going" count with attendee avatars. Capacity is enforced safely when two people try to take the last spot at the same time.
   - **Group chat:** joining an event adds you to its group chat (reuses the chat system from item 6).
   - **Manage:** the creator can edit or cancel; "My events" tab on the profile; past events list.
9. **Notifications** — new message, new follower, someone joined your event, event reminder (one hour before), event cancelled. Delivered in real time and saved; bell icon with unread count and mark as read.

## Phase 3 — Extras
10. **Map**
    - Shows nearby events and opted-in users.
    - Locations are approximate (city level).
    - Built with Leaflet + OpenStreetMap.
    - Map picker when creating an event.
11. **Google OAuth** — "Continue with Google", linking accounts that share an email.
12. **Spellcheck** — browser spellcheck on post and event forms.
13. **AI "Improve my post"** *(optional)* — server-side LLM call with per-user rate limiting and a spending cap.

## Phase 4 — Ship it
14. **Deploy with a live demo link** — server on Render or Railway, client on Vercel, database on MongoDB Atlas. Add screenshots and the pitch to the README.

## Defaults (can change)
- Events are **public**; anyone can join.
- Joining is **instant**, with no approval step.
- **Posts and events both stay** in the feed.
