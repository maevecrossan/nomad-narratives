![Nomad Narratives Logo](./documentation/features/nn-logo-brown.png)

# Nomad Narratives

## Project Introduction

Welcome to Nomad Narratives - a vibrant travel community where adventurers from around the globe can share their unique travel stories, insights, and experiences. Whether you're a seasoned traveler or just beginning to explore the world, this platform is designed for YOU to connect, inspire, and learn from fellow wanderers.

At Nomad Narratives, we believe that every journey is special, and each story holds the power to inspire others. Through our easy-to-use platform, you can share your own travel tales, discover hidden gems, offer travel tips, and connect with like-minded explorers.

Sign up to gain full access to this community-driven space. Once you’re a member, you can contribute your travel stories, engage with others through comments and interact with other users!

## Planning

### Agile Development

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

### Sign In Page



### Sign Up Page


### Contact Us Page


### New Post Page


### Explore


### My Feed


### My Likes


### Sign Out


## Deployment
## Future Developments

## Credits

### Tech Used

### Resources