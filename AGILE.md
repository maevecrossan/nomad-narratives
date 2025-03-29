# **Agile Development Process**
## **Overview** 

To stay on track throughout development, I followed agile methodologies and made use of sprints and epics.

Below is an outline of the spint timelines that I outlined during my planning. The end column shows whether the sprints were completed by the outlined date or not.

| Sprint Number | Duration | Completed |
| :--------: | :-------: | :-------: |
| # | dd/mm/yyyy |  |
| 1 | 20/02/2025 - 20/02/2025 | On Time |
| 2 | 20/02/2025 - 21/02/2025 | On Time |
| 3 | 23/02/2025 - 04/03/2025 | On Time |
| 4 | 05/03/2025 - 07/03/2025 | On Time |
| 5 | 08/03/2025 - 13/03/2025 | On Time |
| 6 | 14/03/2025 - 19/03/2025 | Late |
| 7 | 21/03/2025 - 27/03/2025 | On Time |
| 8 | 28/03/2025 - 01/03/2025 | On Time |

*Any errors spoken about below will be included in the 'Bugs and Fixes' section of the TESTING.md file*

## **Sprints: The Finer Details**

### Sprint 1
During this sprint, I:

* Installed Django Rest Framework for API development.
* Installed Cloudinary for media file handling.
* Created the Profiles app and made it functional in the admin panel.
* Set up User authentication models (if not already handled).
* Configured CORS headers for API accessibility.
* Initialized project settings (database setup, installed apps, middleware configuration).

*This sprint was completed on time.*

----

### Sprint 2
During this sprint, I:

* Created the Post app and added it to the admin panel.
* Created the Comments app and enabled functionality for linking comments to posts.
* Created the Likes app and implemented the like/unlike functionality.
* Set up Post API endpoints for creation, retrieval, updating, and deletion.
* Defined serializer classes for Posts, Comments, and Likes to handle API responses.
* Completed basic unit testing for these apps to ensure core functionality.

*This sprint was completed on time.*

----

### Sprint 3
During this sprint, I:

* Created the Followers app and made it functional in the admin panel.
* Implemented follow/unfollow functionality through API endpoints.
* Added filtering functionality for posts (e.g., filter by user, date, likes).
* Implemented pagination for posts to improve performance.
* Performed initial manual testing on the back end before starting front-end development.
* Refactored models and serializers for better efficiency.

*This sprint was completed on time.*

----

### Sprint 4
During this sprint, I:

* Created my React app and set up the project structure.
* Installed necessary requirements (e.g., Axios for API calls, React Router, Bootstrap for styling).
* Integrated Django Allauth for authentication.
* Completed settings setup for connecting React to the back end.
* Built the NavBar component with conditional rendering based on authentication status.
* Set up basic routing for key pages (e.g., home, profile, login, register).
* Ensured API communication was functioning correctly between the front and back ends.

*This sprint was completed on time.*

----

### Sprint 5
During this sprint, I:

* Set up API calls for authentication.
* Implemented user registration and login/logout functionality.
* Created authentication context for managing user sessions.
* Added protected routes to restrict access based on authentication status.
* Implemented initial styling improvements for better UI consistency.


*This sprint was completed on time.*

----

### Sprint 6
During this sprint, I:

* Created the Post feed with API integration.
* Added functionality for users to create and delete posts.
* Integrated Likes and Comments API functionality on the front end.
* Set up infinite scrolling for improved user experience.
* Performed additional testing to ensure CRUD operations worked correctly.

*This sprint was NOT completed on time due to a bug. Two days were added to this sprint in order to fix the bug as development couldn't continue otherwise.*

----

### Sprint 7
During this sprint, I:

* Implemented user profile pages displaying user-specific posts and info.
* Allowed users to update profile details (bio, profile picture, etc.).
* Added follow/unfollow functionality with API integration.
* Conducted UI refinements based on feedback.
* Fixed bugs identified during testing and refined overall performance.


*This sprint was completed on time.*

----

### Sprint 8
During this sprint, I:

* Conducted full testing phase for front-end and back-end integration.
* Identified and fixed critical bugs and performance issues.
* Refined UI/UX elements based on testing feedback.
* Created final documentation for the project.
* Deployed the application for final review.


*This sprint was completed on time.*

----