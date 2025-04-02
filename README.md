![Nomad Narratives Logo](./documentation/features/nn-logo-brown.png)

# Nomad Narratives

## Project Introduction

Welcome to Nomad Narratives - a vibrant travel community where adventurers from around the globe can share their unique travel stories, insights, and experiences. Whether you're a seasoned traveler or just beginning to explore the world, this platform is designed for YOU to connect, inspire, and learn from fellow wanderers.

At Nomad Narratives, we believe that every journey is special, and each story holds the power to inspire others. Through our easy-to-use platform, you can share your own travel tales, discover hidden gems, offer travel tips, and connect with like-minded explorers.

Sign up to gain full access to this community-driven space. Once you’re a member, you can contribute your travel stories, engage with others through comments and interact with other users!

## Planning

### Project Inspiration

The idea for this project was born from my own experience while searching for information on multiple locations at once. Just before COVID hit, I decided to travel and live abroad for a year or two. With no specific destination in mind, I began my research. However, I quickly realized that travel content was scattered across various individual websites, making the process incredibly time-consuming.

This challenge was a major factor in my decision to start coding. As someone with a passion for travel who couldn’t justify creating a personal website, I saw a real need for a platform that centralized this type of information created by casual content creators.

### Agile Development
The details of my agile development can be found [here](AGILE.md).

### Strategy
#### Site aims

- **Encourage User Engagement**  
  - Enable users to view and leave comments on posts.  
  - Allow users to like and follow other users.  
  - Provide a way for users to edit and delete their own content.  

- **Content Creation & Sharing**  
  - Allow logged-in users to create, edit, and delete posts.  
  - Support adding images and trip details to posts.  
  - Ensure content moderation by restricting post edits and deletions to their owners.

- **Search & Discovery**  
  - Enable users to find posts based on title, country, or city.
  - Provide a structured search system to enhance content discoverability.  

- **User Access & Permissions**  
  - Restrict content creation and interaction (comments, likes, follows) to logged-in users.  
  - Ensure logged-out users are redirected when attempting to access exclusive pages.  
  - Prevent users from editing or deleting content that is not their own.  

- **Administrator Control**  
  - Allow admin users to manage posts, comments, likes, users, and locations.  
  - Ensure admins can receive and respond to user inquiries.

- **Seamless Navigation & User Experience**  
  - Provide a welcoming homepage for logged-out users.  
  - Redirect users appropriately based on their login status.
  - Instantly update follower and like counts for real-time interaction.

#### Opportunities

### Scope

### Structure

### Skeleton
#### Wireframes

#### Database

### Surface

## UX
### Target Audience

### User Stories

#### Nomad Narratives User
| # | User Story |
| :-- | :-- |
| 1. | As a logged in user, I can see comments under a post so that I can engage with the content and see others’ opinions. |
| 2. | As a logged in user, I can add a comment to a post so that I can participate in the discussion. |
| 3. | As a logged in user, I can edit or update my comment so that I can correct or improve my response. |
| 4. | As a logged in user, I can delete my comment so that I can remove it if I no longer wish to participate in the conversation. |
| 5. | As a logged out user, I cannot add a comment to a post so that content creation is reserved for logged in users. |
| 6. | As a logged out user, I cannot see comments under a post so that I am prompted to log in to engage with content. |
| 7. | As a logged out user, I cannot edit another user's comment so that only the original author can modify their own contributions. |
| 8. | As a logged in user, I cannot edit another user's comment so that content moderation is properly managed. |
| 9. | As a logged in user, I can see the username and profile image of the person who wrote the comment so that I can identify them. |
| 10. | As a logged in user, I can follow another user so that I can keep track of their posts and updates. |
| 11. | As a logged in user, I can unfollow a user so that I can stop receiving updates from them. |
| 12. | As a logged out user, I cannot follow another user so that following is reserved for logged in users. |
| 13. | As a logged out user, I cannot unfollow another user so that following management is exclusive to logged in users. |
| 14. | As a logged in user, I cannot follow myself so that there is no redundancy in following actions. |
| 15. | As a logged in user, I can see how many followers I have so that I can track my community.|
| 16. | As a logged in user, I can see how many followers another user has so that I can compare community sizes.|
| 17. | As a logged in user, my follower and following counts are updated instantly when someone follows or unfollows me so that my profile reflects the most current information.|
| 18. | As a logged in user, I can like a post by another user so that I can show appreciation for their content.|
| 19. | As a logged in user, I can unlike a post I previously liked so that I can change my opinion. |
| 20. | As a logged in user, I cannot like a post I previously liked again so that the system only allows one like per post. |
| 21. | As a logged out user, I cannot like or unlike posts so that interacting with content is restricted to logged in users. |
| 22. | As a logged in user, I can view all posts so that I can browse the content freely.|
| 23. | As a logged out user, I cannot see all posts so that access to posts is restricted to logged in users.|
| 24. | As a logged in user, I can create a post so that I can contribute to the platform’s content. |
| 25. | As a logged out user, I cannot create a post so that post creation is reserved for logged in users. |
| 26. | As a logged in user, I can edit a post I own so that I can update or improve my content.|
| 27. | As a logged in user, I cannot edit a post I don’t own so that post editing is restricted to the author.|
| 28. | As a logged out user, I cannot edit a post so that only logged in users can make changes to posts.|
| 29. | As a logged in user, I can delete a post I own so that I can remove content I no longer want to share.|
| 30. | As a logged in user, I cannot delete a post I don’t own so that content removal is reserved for the author.|
| 31. | As a logged in user, I can add an image to a post as long as it meets the size criteria so that I can enrich my post with media.|
| 32. | As a logged in user, I cannot add an image exceeding the size limit so that I comply with upload restrictions.|
| 33. | As a logged in user, I can see an error message if I attempt to upload an image exceeding the size limit so that I am informed of the issue.|
| 34. | As a logged in user, I can add trip details to my post so that my audience understands the context and specifics of my content.|
| 35. | As a logged in user, I can see comments made under posts to engage with other users' feedback.|
| 36. | As a logged in user, I can find posts in search results if their title matches my query so that I can easily find relevant content.|
| 37. | As a logged in user, I can find posts in search results if their country matches my query so that I can find location-specific posts.|
| 38. | As a logged in user, I can find posts in search results if their city matches my query so that I can find city-specific content.|

#### Administrator 
| # | User Story |
| :-- | :-- |
| 1. | As an admin user, I can receive messages from both logged in and logged out users so that I can address their inquiries or concerns. |
| 2. | As an admin I can control what cities and countries are available to users. |
| 3. | As an admin user, I can add cities and countries to the database to fill in any gaps. |
| 4. | As an admin user, I can edit, delete and create posts. |
| 5. | As an admin user, I can edit, delete and create comments. |
| 6. | As an admin user, I can delete and create likes. |
| 7. | As an admin user, I can see all registered users. |
| 7. | As an admin user, I can see, edit, delete and create user profiles. |

#### User Redirection 
| # | User Story |
| :-- | :-- |
| 1. | As a logged out user, I can view the welcome page, sign in, sign up, and contact forms so that I can start engaging with the platform. |
| 2. | As a logged in user, I can view the welcome page, sign in, sign up, and contact forms so that I can interact with the platform easily. |
| 3. | As a logged in user, once loged in, I cannot view the sign in and sign up so that I can stay signed in. |
| 4. | As a logged out user, I am redirected to the homepage when trying to access user-exclusive pages (e.g. new post, feed, likes, comments) so that content is restricted to logged in users. |


## Testing
The details for my testing can be found [here](TESTING.md).

## Features

The following is a breakdown of the features of each page of the project.

### NavBar Component
The navigation bar component sits at the top of the window for each page. It is fully responsive and collapses to a burger menu on smaller screens where the links will stack vertically. The logo remains in the top left for all screens and acts as a route back to the welcome page.

The navigation bar links render conditionally based on the users authentication status. If they are logged out, they cannot make or view posts, comments or likes. The will only see links for the welcome page, about us and community guidelines sections, sign in and sign up links, and the contact us form.

However, if a user is logged in, they can view all of these links (bar the sign in and sign up pages) as well as the new post, explore, my feed, my likes and sign out links. If a logged out user tried to access these pages, they would be redirected to the homepage.

### Welcome Page
The welcome page is effectively split into four sections: the hero, about us, gallery row, and community guidelines.

The hero welcomes to user to the website and hooks them in with the 'Where will your next story take you?' question. The background image is of a dark, foggy forest.

If a user clicks on the 'about us' or 'community guidelines' navlinks, they will be automatically scrolled down to that section. This action will happen if clicking those navlinks from any page.

The 'about us' section gives a brief but concise explanation of the website's purpose. It also houses a link to the sign up page should the user choose to do so.

Next is the gallery row which, on larger screens, houses three images (one vertical, two stacked horizontally). On smaller screens, the larger vertical image is hidden so users can easily access the community guidelines section without needing to scroll too long.

The community guidelines section outlines the community values and expectations for users.

The about us and community guidelines sections are accessible via the navbar for logged out users. When users click the link, they will be automatically brought to that section.

### Sign Up Page
The sign up page is very minimal in order to not visually overload the user. The for fields are positioned over a photograph. 

Users are expected to enter a username and a password (twice). They will receive an error if any of the three fields are contain no or invalid information. Users are also expected to agree to adhere to the community guidelines and can only submit the form if they agree by checking the box. There is a link below the agreement that users can visit to view the community guidelines. It opens in a new tab so users don't lose progress. Once the submit button is pressed (and the form contains valid information), users will be redirected to the sign in page.

This page is not accessible by authorised/logged in users.

### Sign In Page
The sign in page looks like the sign up page but the image is different. There is a username and password field which will only accept valid inputs. There is a sign in button below which is a prompt to sign up if the user has not created an account.

### Contact Us Page
The contact page is in the same style as the sign in and sign up pages. It is accessible for all users (logged in or out) and requires users to enter in their name, email and a message. The valid submitted data will be sent to and visible in the admin panel by staff users. A success message will appear when a form is successfully submitted.

### New Post Page
The new post page is accessible only to authorised users. Should unauthorised users attempt to access it, they will be redirected back to the welcome page.

The new post page houses a form through which users can create their own posts. This form has several fields, all of which are required. The form inputs are:
    - image upload: a clickable icon housed to the left of the main form where users can upload a valid image. An error message will appear should they try to upload an image that is too big.
    - title: A small text field.
    - content: a larger text field.
    - Country: a dropdown list of countries.
    - City: a dropdown list of cities.
    - Traveller number: a dropdown list of numbers up to 10.
    - Relevant for: a dropdown list of predetermined options.
    - Duration value: a dropdown list of numbers up to 10.
    - Duration Unit: a dropdown list of predetermined options.
    - Image description: A small text field.

Above the country select field is a message in which is a link to the contact us page. Users are asked to send admin a message if they notice a missing country, city, or experience another error.

Duration value and unit both have tooltips which can be seen when hovering over the '!' icon to explain what the fields expect.

Should the user choose to not create a post, they can click 'cancel' to be redirected to the previous page they were on. If users submit a post form with valid details, they will be redirected to the post page where they can see their full published post.

### Explore
The explore page is accessible only to authorised users. Should unauthorised users attempt to access it, they will be redirected back to the welcome page. Below the search bar, it has a message detailing what posts are being displayed.

The explore page shows articles by all users, with the most recent at the top. Above the articles is a search bar that users can make use of if they are looking for a certain post, user or destination.

Only a preview of the articles are shown on this page for a smoother user experience. The users can scroll infinitely and see all the details about a post at a glance:
    - User/author
    - Post title
    - Location
    - Date published
    - Traveller number
    - Relevant for
    - Duration
    - Content preview.
    - Likes count
    - Comments count

Should a user choose to read the full blog post, they can click the 'read more' link under the preview. The user can see if they have liked the post as the heart will be red if they have liked it, or grey and white if they haven't. By clicking on the comment bubbles, the user will be brought to the comments section for that particular post.
To the right of the posts is a popular profiles section. This shows the top 10 users by follower-based popularity.

These styles remain the same across the explore, my feed and my likes page.

### My Feed
The features of this page remain exactly the same, however on this page is only posts created by the users the (currently logged in) user follows. Below the search bar, it has a message detailing what posts are being displayed.

If the user is following no users, the will see the 'no results' asset which says 'Hmm... no results for that. Please try another search term, or try following a user and refresh this page!'.

See 'explore page' for a full list of features.

### My Likes
The features of this page remain exactly the same, however on this page are the posts the (currently logged in) user has liked. Below the search bar, it has a message detailing what posts are being displayed. 

If the user has not yet liked any posts, the will see the 'no results' asset which says 'Hmm... no results for that. Please try another search term or try liking a post.'.

See 'explore page' for a full list of features.

### Post Page
The post page is visible when clicking a 'read more' link. If the user is the owner of the post, they will be able to see a three-dot dropdown menu where they can edit or delete a post. The three dots are only visible here intentionally. My thought process was the user should view the full article before they edit it. This also means the user will be redirected to the article so they can see the changes they make in full, rather than having to access the post and scroll down to view the update.

If they chose to edit a post, it will redirect them to the post creation page where they form will be prepopulated with their post content. 
If they chose to delete their post, a modal will appear so the user can confirm they want to delete it in case the click was a mistake.

To the left of the three dots is the date at which the post was created (created_at). If a user edits it, it will update to that date (updated_at).

All users will be able to see comments made by other users too.

### Sign Out
This is not a page but a model that appears when the user clicks the sign out nav link. The user can dismiss the model by clicking the 'x', the 'cancel' button, or by clickin outside the modal. If the user confirms they want to sign out, they will be redirected to the welcome page.

## Deployment

Steps followed for deployment can be found [here](DEPLOYMENT.md).

## Future Developments

Below is a list of future developments I noted down during planning and over the course of development.

| **Future Developments** |
| :----------------------------------------------------------------------------- |
| **Rich text editor** to allow users to have more control over how their content looks. Allow them to select a blog post cover photo and then add additional photos throughout the article for visual aids. |
| **Clickable links** on details to allow users to filter content based on the number of travellers, 'relevant for' group, location, etc. |
| **Tags** to help users further identify what categories, locations, etc. are associated with their blog post. |
| **Create a new detail category** to allow users to quickly demonstrate to readers what type of holiday it is. For example, a city break, backpacking, family trip, girls trip, wedding, etc. |
| **Allow users to save a post** to a folder. This would allow users to organise their favourite posts so that they can refer to them again at a later date. |
| **Create a dropdown in the nav menu** that displays predefined categories through which users can find content. For example, continent, country, city, number of travellers, etc. |
| Create a library of profile images that a user can choose from if they don't have one of their own. |
| **Create a 'helpful tips' page** that gives users guidance on how to write a good, helpful article. |
| **Enable post collaborations** so multiple users can contribute to the same blog post, sharing insights from different perspectives. |
| **Add social media sharing buttons** so users can easily share posts on platforms like Facebook, Twitter, Instagram, etc. |
| **Implement a comment moderation system** so users can report inappropriate comments and ensure a friendly, respectful community. |
| **Add a multi-language option** so users can view content in various languages, making the platform accessible to a global audience. |
| **Add a dark-mode colour scheme** so that users reading in low light can continue to enjoy content. |


## Credits

### Resources

#### Tech Used

Below is a list of the tech used in this project.

##### Requirements

| **Package**                | **Description**                                                                 |
| -------------------------- | ------------------------------------------------------------------------------- |
| `asgiref`                  | Provides support for ASGI (Asynchronous Server Gateway Interface) applications, handling the interface between web servers and Django apps. |
| `astroid`                  | A library that provides static code analysis of Python code and is used by tools like pylint for linting. |
| `bleach`                   | A library for sanitizing and cleaning HTML, ensuring that content is safe to display on a webpage. |
| `certifi`                  | A collection of Root Certificates for validating the trustworthiness of SSL certificates, used in HTTP requests. |
| `cffi`                     | Provides a Foreign Function Interface for Python to interact with C libraries. |
| `charset-normalizer`       | Helps in detecting and normalizing the character encoding of text to ensure compatibility across different platforms. |
| `cloudinary`               | A cloud-based service for managing and delivering images, videos, and other media files. |
| `cryptography`             | Provides cryptographic recipes and primitives to encrypt and secure data in Python applications. |
| `defusedxml`               | Helps protect against XML vulnerabilities, like XML External Entity (XXE) attacks, by safely parsing XML. |
| `dill`                     | Extends Python's `pickle` module to allow more complex objects to be serialized and deserialized. |
| `dj-database-url`         | A utility to help configure the database URL in Django projects, typically used for deployment in cloud environments. |
| `dj-rest-auth`             | Provides authentication and registration endpoints for Django REST Framework APIs, enabling user login, registration, and password reset functionality. |
| `Django`                   | A high-level Python web framework that enables rapid development of secure and maintainable websites. |
| `django-allauth`           | A Django app for handling authentication, registration, and account management (including social login). |
| `django-autoslug`          | Generates URL slugs automatically for Django models based on their fields. |
| `django-cities-light`      | A Django app that provides geographical data like cities, countries, and time zones. |
| `django-cloudinary-storage`| Integrates Cloudinary with Django for managing media files with Cloudinary's cloud storage service. |
| `django-cors-headers`      | Handles Cross-Origin Resource Sharing (CORS) headers in Django applications, allowing resources to be shared across different origins. |
| `django-filter`            | A Django app for simplifying filtering in Django REST Framework API views. |
| `djangorestframework`      | A powerful and flexible toolkit for building Web APIs in Django. |
| `djangorestframework-simplejwt` | A simple JWT authentication system for Django REST Framework, used for token-based authentication. |
| `gunicorn`                 | A Python WSGI HTTP server for deploying Django applications in production. |
| `idna`                     | A library for Internationalized Domain Names (IDN), supporting domain names with non-ASCII characters. |
| `isort`                    | A Python utility for sorting imports in a consistent and clean manner in your code. |
| `mccabe`                   | A complexity checker for Python programs, used by pylint to measure the complexity of Python functions. |
| `oauthlib`                 | A library for implementing OAuth1 and OAuth2 protocols, commonly used for integrating with third-party authentication providers. |
| `packaging`                | Provides tools for dealing with Python package versioning and distribution. |
| `Pillow`                   | A Python Imaging Library (PIL) fork, used for opening, manipulating, and saving image files in various formats. |
| `platformdirs`             | A small utility to return platform-specific directories, such as user data directories. |
| `progressbar2`             | A simple library for creating progress bars in Python applications, often used in long-running operations. |
| `psycopg2`                 | A PostgreSQL database adapter for Python, enabling communication with PostgreSQL databases. |
| `pycparser`                | A library that parses C code into an Abstract Syntax Tree (AST), commonly used in tools that analyze C code. |
| `PyJWT`                    | A library for encoding and decoding JSON Web Tokens (JWT), typically used for authentication in APIs. |
| `pylint`                   | A static code analysis tool for Python, used to enforce coding standards and find errors in code. |
| `pylint-django`            | A plugin for pylint to check Django-specific code issues. |
| `pylint-plugin-utils`      | A set of utilities for developing pylint plugins. |
| `python-dotenv`            | A library for reading environment variables from `.env` files, commonly used to manage secret keys and configuration settings. |
| `python-utils`             | A collection of useful utility functions for Python development. |
| `python3-openid`           | A library that implements OpenID authentication, enabling users to sign in with their OpenID credentials. |
| `pytz`                     | A library for working with time zones in Python, used to handle date and time in different time zones correctly. |
| `requests`                 | A simple HTTP library for Python, commonly used to send HTTP requests and interact with APIs. |
| `requests-oauthlib`        | OAuth support for the `requests` library, allowing easy integration with OAuth2 for authentication. |
| `setuptools`               | A package development and distribution library for Python, used to package and distribute Python projects. |
| `six`                      | A Python 2 and 3 compatibility library, helping you write code that works across both versions of Python. |
| `sqlparse`                 | A library for parsing SQL queries, often used to format SQL strings in a readable way. |
| `tomlkit`                  | A library for parsing and writing TOML files, often used in configuration files. |
| `typing_extensions`        | Backports of type hinting extensions for earlier Python versions that don't natively support them. |
| `Unidecode`                | A library for converting Unicode text into ASCII, removing accents and special characters. |
| `urllib3`                  | A powerful HTTP library used for making HTTP requests and handling various network issues. |
| `webencodings`             | A library for encoding/decoding text in web-safe encodings like UTF-8, ISO-8859-1, etc. |
| `whitenoise`               | A Django app that serves static files directly from the application, simplifying static file management in production environments. |

#### Other Helpful Tech

| **Name**                | **Description**                                                                 |
| -------------------------- | ------------------------------------------------------------------------------- |
| [`React Boostrap`]()| Used to assist in styling JSX components. |
| [`Cloudinary`](https://cloudinary.com/)| Used to host and store static files. |
| [`Heroku`](https://www.heroku.com/)| Used to deploy and host the project. |
| [`Adobe Lightroom`](https://www.adobe.com/ie/products/photoshop-lightroom/campaign/pricing.html?mv=search&mv=search&mv2=paidsearch&sdid=3JZYB8N8&ef_id=Cj0KCQjwna6_BhCbARIsALId2Z3boddrAwUQvguSmILX8mpbmnSCVW2KXhg_UX2wdzpJLmAZr0_0jbIaAukKEALw_wcB:G:s&s_kwcid=AL!3085!3!700425653223!e!!g!!adobe%20lightroom!1423511177!58810487274&gad_source=1&gclid=Cj0KCQjwna6_BhCbARIsALId2Z3boddrAwUQvguSmILX8mpbmnSCVW2KXhg_UX2wdzpJLmAZr0_0jbIaAukKEALw_wcB)| Used to reduce the size of images and export them. |
| [`Canva`](https://www.canva.com/)| Used to Create the favicon and logos. |
| [`FontAwesome`](https://fontawesome.com/search?q=x&o=r)| Provided the icons used throughout this project. |
| [`WAVE Evaluation Tool`](https://chromewebstore.google.com/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh?hl=en-GB&utm_source=ext_sidebar)| A chrome extensions used to evaluate the functionality and accessibilty of the app.|
| [`Google Fonts`](https://fonts.google.com/) | Used to source the two fonts used in this project: [`DM Serif Display`](https://fonts.google.com/specimen/DM+Serif+Display) and [`Roboto`](https://fonts.google.com/specimen/Roboto). |
| [`Code Institute Template`](https://github.com/Code-Institute-Org/gitpod-full-template) | - |
| Code Institute Postgres Database server | |

#### Miscellaneous Resources

| **Name** | **Description**   |
| -------------------------- | ---------------------------------------------- |
| **Project Inspiration** | This project was heavily inspired and used the boilerplate code from the Code Institute [Moments Walkthrough Project](https://github.com/Code-Institute-Solutions/moments). |
| **Post Images** | The images used in this project are my own personal images. |
| **User Avatars** | The user avatars were sourced from google and saved locally in order to replicated a realistic user experience. |
| **Post Content** | ChatGPT was used to generate the post content. |