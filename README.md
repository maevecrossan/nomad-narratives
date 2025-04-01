![Nomad Narratives Logo](./documentation/features/nn-logo-brown.png)

# Nomad Narratives

## Project Introduction

Welcome to Nomad Narratives - a vibrant travel community where adventurers from around the globe can share their unique travel stories, insights, and experiences. Whether you're a seasoned traveler or just beginning to explore the world, this platform is designed for YOU to connect, inspire, and learn from fellow wanderers.

At Nomad Narratives, we believe that every journey is special, and each story holds the power to inspire others. Through our easy-to-use platform, you can share your own travel tales, discover hidden gems, offer travel tips, and connect with like-minded explorers.

Sign up to gain full access to this community-driven space. Once you’re a member, you can contribute your travel stories, engage with others through comments and interact with other users!

## Planning

### Agile Development
The details of my agile development can be found [here](AGILE.md).

### Strategy
#### Site aims

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

### NavBar
The navigation bar component sits at the top of the window for each page. It is fully responsive and collapses to a burger menu on smaller screens where the links will stack vertically. The logo remains in the top left for all screens and acts as a route back to the welcome page.

The navigation bar links render conditionally based on the users authentication status. If they are logged out, they cannot make or view posts, comments or likes. The will only see links for the welcome page, about us and community guidelines sections, sign in and sign up links, and the contact us form.

However, if a user is logged in, they can view all of these links (bar the sign in and sign up pages) as well as the new post, explore, my feed, my likes and sign out links. If a logged out user tried to access these pages, they would be redirected to the homepage.

### Welcome Page
The welcome page is effectively split into four sections: the hero, about us, gallery row, and community guidelines.

The hero welcomes to user to the website and hooks them in with the 'Where will your next story take you?' question. The background image is of a dark, foggy forest.

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
The contact page is in the same style as the sign in and sign up pages. It is accessible for all users (logged in or out) and requires users to enter in their name, email and a message. The valid submitted data will be sent to and visible in the admin panel by staff users. 

### New Post Page
The new post page is accessible only to authorised users. Should unauthorised users attempt to access it, they will be redirected back to the welcome page.

The new post page houses a form through which users can create their own posts. This form has several fields, all of which are required. The form inputs are:
    - image upload: a clickable icon housed to the left of the main form where users can upload a valid image. An error message will appear should they try to upload an image that is too big.
    - title: A small text field.
    - content: a larger text field.
    - Country: a dropdown list of countries.
    - City: a dropdown list of cities.
    - Traveller number: a field that accepts postive numbers above zero.
    - Relevant for: a dropdown list of predetermined options.
    - Duration value: a field that accepts postive numbers above zero.
    - Duration Unit: a dropdown list of predetermined options.
    - Image description: A small text field.

Above the country select field is a message in which is a link to the contact us page. Users are asked to send admin a message if they notice a missing country, city, or experience another error.

Should the user choose to not create a post, they can click 'cancel' to be redirected to the previous page they were on. If users submit a post form with valid details, they will be redirected to the post page where they can see their full published post.

### Explore
The explore page is accessible only to authorised users. Should unauthorised users attempt to access it, they will be redirected back to the welcome page.

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
The features of this page remain exactly the same, however on this page is only posts created by the users the (currently logged in) user follows.

See 'explore page' for a full list of features.

### My Likes
The features of this page remain exactly the same, however on this page are the posts the (currently logged in) user has liked.

See 'explore page' for a full list of features.

### Post Page
The post page is visible when clicking a 'read more' link. If the user is the owner of the post, they will be able to see a three-dot dropdown menu where they can edit or delete a post. 
If they chose to edit a post, it will redirect them to the post creation page where they form will be prepopulated with their post content. 
If they chose to delete their post, a modal will appear so the user can confirm they want to delete it in case the click was a mistake.

All users will be able to see comments made by other users too.

### Sign Out
This is not a page but a model that appears when the user clicks the sign out nav link. The user can dismiss the model by clicking the 'x', the 'cancel' button, or by clickin outside the modal. If the user confirms they want to sign out, they will be redirected to the welcome page.

## Deployment

### API Heroku Deployment

#### Configuring Heroku

1. Navigate to your app's Settings tab on the Heroku dashboard.

2. Under Config Vars, add the following variables:


    `SECRET_KEY`: Create a new secret key (do not reuse the one from settings.py).


    `CLOUDINARY_URL`: Copy your Cloudinary URL from env.py (without quotation marks).


3. Ensure you have four config vars set up in total.

#### Deploying to Heroku

1. Open the **Deploy** tab in Heroku.

2. In the **Deployment method** section, select **Connect to GitHub**.

3. Search for your repository and click **Connect**.

4. (Optional) Enable **Automatic Deploys** to redeploy whenever new code is pushed. I personally opted for manual deploys.

5. Since all changes are already in GitHub, scroll to the **Manual Deploy** section and click **Deploy Branch** to start the build process.

6. Once deployment is complete, click **Open App** to verify it is running.

#### Verifying Deployment
* Your app should display a JSON welcome message on the home screen.

* To check the superuser profile, append `/profiles/` to your root URL.

* If the JSON response is not formatted properly, consider using a Chrome extension like JSON Formatter.

#### Removing Unused Postgres Add-on

Heroku may automatically assign a paid Postgres database add-on. To avoid charges:

1. Go to the **Resources** tab in your Heroku dashboard.

2. Locate **Heroku Postgres** and click the chevron icon on the right.

3. Select **Delete Add-on** and confirm by entering your app name, then click **Remove Add-on**.


#### Updating ALLOWED_HOST for Deployment

To ensure compatibility with the React project, we need to set `ALLOWED_HOST` as an environment variable instead of hardcoding it. This allows multiple API instances to be deployed to different URLs.

##### Part 1: Adding `ALLOWED_HOST`

1. In settings.py, locate the `ALLOWED_HOSTS` list and copy your Heroku app URL.

    ALLOWED_HOSTS = [
        '... .herokuapp.com',
        'localhost',
        '127.0.0.1',
    ]

2. Log in to Heroku and select your API application.

3. Navigate to the Settings tab and click Reveal Config Vars.

4. Add a new key:
    * Key: `ALLOWED_HOST`
    * Value: Your Heroku app URL (without quotes).

5. Back in `settings.py`, update `ALLOWED_HOSTS` to reference the environment variable:

    ALLOWED_HOSTS = [
        os.environ.get('ALLOWED_HOST'),
        'localhost',
        '127.0.0.1'
    ]

##### Part 2: Pushing Changes and Redeploying

1. Add, commit, and push the changes to GitHub:

        git add settings.py  
        git commit -m "Set ALLOWED_HOST as environment variable"  
        git push origin main  

2. In your Heroku dashboard, go to your API project.

3. Open the **Deploy** tab.

4. Scroll to **Manual Deploy** and click **Deploy Branch**.


## Future Developments

## Credits

### Tech Used

### Resources