# Testing

The following is a breakdown of the testing done to ensure that the Nomad Narratives app behaves as intended and without any errors.

## Manual Testing
Below is a breakdown of the tests performed to ensure that users can see and interact with assets correctly based on their logged in status. The tests for the API apps were executed through the default interface created by the Django Rest Framework. The apps were retested once the front end functionality was implemented. The front end functionality was also tested. These tests were based on the user stories and acceptance criteria [here](https://github.com/users/maevecrossan/projects/5).

These tests are broken down by frontend and backend API, and then by app.


### Backend API Tests

#### Comments API

| Test Case                                       | Expected Outcome | Passed |
| :---------------------------------------------- | :--------------: | :----: |
| Logged in users can add a comment to a post.    |        Yes       |    ✔   |
| Comment data is accurately updated.             |        Yes       |    ✔   |
| Comment data is accurately deleted.             |        Yes       |    ✔   |
| Logged out users can add a comment to a post.   |        No        |    ✔   |
| Logged out users can edit other users comments. |        No        |    ✔   |
| Logged in users can edit other users comments.  |        No        |    ✔   |

#### Followers API

| Test Case                                              | Expected Outcome | Passed |
| :----------------------------------------------------- | :--------------: | :----: |
| Logged in users can follow another user                |        Yes       |    ✔   |
| Logged in users can unfollow a user they are following |        Yes       |    ✔   |
| Logged out users can follow another user               |        No        |    ✔   |
| Logged out users can unfollow another user             |        No        |    ✔   |
| Logged in users can follow themselves                  |        No        |    ✔   |

#### Likes API

| Test Case                                               | Expected Outcome | Passed |
| :------------------------------------------------------ | :--------------: | :----: |
| Logged in users can like a post by another user         |        Yes       |    ✔   |
| Logged in users can unlike a post they previously liked |        Yes       |    ✔   |
| Logged in users can like a post they previously liked   |        No        |    ✔   |
| Logged out users can like/unlike posts                  |        No        |    ✔   |

#### Posts API

| Test Case                                                                   | Expected Outcome | Passed |
| :-------------------------------------------------------------------------- | :--------------: | :----: |
| Posts can be retrieved with a valid ID.                                     |        Yes       |    ✔   |
| Posts can be retrieved with an invalid ID.                                  |        No        |    ✔   |
| A logged out user can see all posts                                         |        No        |    ✔   |
| A logged in user can see all posts                                          |        Yes       |    ✔   |
| A logged out user can create a post                                         |        No        |    ✔   |
| A logged in user can create a post                                          |        Yes       |    ✔   |
| A logged out user can edit a post                                           |        No        |    ✔   |
| A logged in user can edit a post they own                                   |        Yes       |    ✔   |
| A logged in user can edit a post they DON'T own.                            |        No        |    ✔   |
| A logged out user can delete a post                                         |        No        |    ✔   |
| A logged in user can delete a post they own                                 |        Yes       |    ✔   |
| A logged in user can delete a post they DON'T own.                          |        No        |    ✔   |
| A logged in user can submit a form with an empty field.                     |        No        |    ✔   |
| A logged in user can add an image exceeding the sizing criteria.            |        No        |    ✔   |
| A logged in user can add trip details (location, number of travellers, etc) |        Yes       |    ✔   |

#### Profiles API

| Test Case                                                                 | Expected Outcome | Passed |
| :------------------------------------------------------------------------ | :--------------: | :----: |
| A logged out user can create a profile by signing up.                     |        Yes       |    ✔   |
| Logged in users can update their own profile picture.                     |        Yes       |    ✔   |
| Logged in users can add a profile description.                            |        Yes       |    ✔   |
| Logged in users can edit and update their own profile description.        |        Yes       |    ✔   |
| Users (logged in or out) can edit profile picture of other users          |        No        |    ✔   |
| Users (logged in or out) can edit the profile descriptions of other users |        No        |    ✔   |
| Users can reset their password.                                           |        Yes       |    ✔   |

#### Contact API

| Test Case                                                   | Expected Outcome | Passed |
| :---------------------------------------------------------- | :--------------: | :----: |
| A logged out user I can send a message to admin.            |        Yes       |    ✔   |
| A logged in user I can send a message to admin.             |        Yes       |    ✔   |
| A user I can send a message to admin with missing fields.   |        No        |    ✔   |
| A user I can send a message to admin with invalid fields.   |        No        |    ✔   |
| A user I can get a message indicating invalid/empty fields. |        Yes       |    ✔   |


### Frontend Tests

#### Comments UI

| Test Case                                                                     | Expected Outcome | Passed |
| :---------------------------------------------------------------------------- | :--------------: | :----: |
| Logged in users can see comments under a post.                                |        Yes       |    ✔   |
| Logged in users can see their comment under a post instantly.                 |        Yes       |    ✔   |
| Logged in users can edit/update their comment.                                |        Yes       |    ✔   |
| Logged in users can delete their comment.                                     |        Yes       |    ✔   |
| Logged out users can see comments under a post.                               |        No        |    ✔   |
| Users can see the username and profile image belonging to the comment writer. |        Yes       |    ✔   |
| When attempting to delete a comment, a user will see a confirmation dialog.   |        Yes       |    ✔   |

#### Followers UI

| Test Case                                                                                                            | Expected Outcome | Passed |
| :------------------------------------------------------------------------------------------------------------------- | :--------------: | :----: |
| Logged in users can see how many followers they have                                                                 |        Yes       |    ✔   |
| Logged in users can see how many followers another user has                                                          |        Yes       |    ✔   |
| A user's follower and following count is instantly updated if a change is made (i.e. someone is followed/unfollowed) |        Yes       |    ✔   |

#### Likes UI

| Test Case                                                                         | Expected Outcome | Passed |
| :-------------------------------------------------------------------------------- | :--------------: | :----: |
| Logged in users can like a post by another user on the feed/explore/likes pages   |        Yes       |    ✔   |
| Logged in users can like a post by another user on the post page                  |        Yes       |    ✔   |
| Logged in users can unlike a post by another user on the feed/explore/likes pages |        Yes       |    ✔   |
| Logged in users can unlike a post by another user on the post page                |        Yes       |    ✔   |

#### Posts UI

| Test Case                                                                                                   | Expected Outcome | Passed |
| :---------------------------------------------------------------------------------------------------------- | :--------------: | :----: |
| A logged in user can cancel creating a post and be redirected.                                              |        Yes       |    ✔   |
| A logged in user can cancel editing a post they own and any changes are reverted.                           |        Yes       |    ✔   |
| When attempting to delete a post, a user will see a confirmation dialog.                                    |        Yes       |    ✔   |
| A logged in user can add an image meeting the sizing criteria.                                              |        Yes       |    ✔   |
| A logged in user can see an error message when attempting to upload an image exceeding the sizing criteria. |        Yes       |    ✔   |
| Users can see comments made under posts.                                                                    |        Yes       |    ✔   |
| Posts appear in searches if their title is a match.                                                         |        Yes       |    ✔   |
| Posts appear in searches if their country is a match.                                                       |        Yes       |    ✔   |
| Posts appear in searches if their city is a match.                                                          |        Yes       |    ✔   |

#### Profiles UI

| Test Case                                                                        | Expected Outcome | Passed |
| :------------------------------------------------------------------------------- | :--------------: | :----: |
| Users can upload a personal profile picture.                                     |        Yes       |    ✔   |
| Users can see their own followers (who follows them).                            |        Yes       |    ✔   |
| Users can see other users' followers (who follows another user).                 |        Yes       |    ✔   |
| Users appear in searches if their username is a match.                           |        Yes       |    ✔   |
| Users can access a dropdown to access profile-editing features.                  |        Yes       |    ✔   |
| Users can change their profile picture.                                          |        Yes       |    ✔   |
| If a user cancels changing their profile picture, the previous one will be kept. |        Yes       |    ✔   |

#### User Redirection UI

| Test Case                                                                                                                               | Expected Outcome | Passed |
| :-------------------------------------------------------------------------------------------------------------------------------------- | :--------------: | :----: |
| A logged out user I can view the welcome page, sign in, sign up and contact forms.                                                      |        Yes       |    ✔   |
| A logged in user I can view the welcome page, sign in, sign up and contact forms.                                                       |        Yes       |    ✔   |
| If their token expires, a logged in user can be redirected to the page they were on when logging in again.                              |        Yes       |    ✔   |
| A logged out user will be redirected to the homepage when trying to access user exclusive pages (new post, feed, likes, comments, etc). |        Yes       |    ✔   |



## Validator Testing

### WAVE Validation

The following report contains the results, screenshots and explanations from the WAVE validation:

[WAVE Validation Report](documentation/validation/nn-wave-validation.pdf)

### Lighthouse Validation

The following report contains the lighthouse scores for the respective pages users can visit.

[Lighthouse Validation Report](documentation/validation/nn-lighthouse-validation.pdf)

### HTML W3C Validation

The HMTL used in this validation report was copied from the rendered HTML in devtools. Each page was copied and pasted in individually.

[W3C HTML Validation](documentation/validation/nn-html-validation.pdf)

### CSS W3C Validation

The following is a consolidated report of screenshots from W3C CSS validator. All files passed with no errors.

[CSS W3C Validation](documentation/validation/nn-css-validation.pdf)


### JS Validation (ESLint)

For my JavaScript testing, I chose to use ESLint rather JSHint due to its JSX support. When trying to use JSHint initially, it was throwing syntax errors. 

ESLint was installed as a VSCODE extension. Any issues it identified would show in the 'problems' tab below the code for the relevant file (an example of this has been included in the report). JSHint was used as a reference tool, but the warnings it displayed were caused by the JSX. Other warnings were the `only available` ones warning about features available in certain JS versions.

[ESLint Validation Report](documentation/validation/nn-eslint-validation.pdf)

### Python Validation

Pylint and Flake8 were used throughout development. 
 - Only one error occured which required a pylint comment (`# pylint: disable=no-member`) to be added when `.objects` was used to prevent the false positive.

 - The `AUTH_PASSWORD_VALIDATORS` in the `settings.py` file exceeds PEP8's line-length recommendation due to Django's predefined configuration. This was left as is as it does not affect code functionality

The below results are from the CI Python Linter into which I copied and pasted my code. 

[Python Validation Report](documentation/validation/nn-pep8.pdf)


### Responsiveness Testing

The following is a report of the responsiveness of each page. These screenshots were taken using [Am I Responsive?](https://ui.dev/amiresponsive), but additional tests were done on real devices as well as in Chrome devtools.

Devices used for testing were:

* iPhone 14 Pro Max
* iPad 12.9"
* Macbook Pro 15"
* BenQ EL287OU 28"

[View Full Responsiveness Report](documentation/responsiveness/nn-am-i-responsive.pdf)

## Bugs and Fixes

| Bug | Fix |
| :--- | :--- |
| Region, country and city fields appearing but not editable. | Django-cities-light database table not populated. `python manage.py cities_light` command was used to populate data, allowing users to make a selection. |
| Django-cities-light 'city' category was too detailed as it included city, subregion, and country. I wasn't able to extract just the cities out of it, nor was I able to dynamically load the city based on the user's selected country. I'm hoping to add this more user-friendly feature on the front end with React. | I was able to dynamically load the city based on the country via the front end post form. I was also able to only target the city, making UX better. |
| Failed Heroku Deployment |  • There was an issue (`error: subprocess-exited-with-error`) building `wheel` so I tried downgrading Pillow from 10.1.0 to 10.0.0. This however, didn't work when trying to redeploy. Next, I explicitly installed `wheel==0.36.2`, which resulted in the same error and failed deployment. <br> • After a bit of research, I found the problem was with Homebrew on my MAC. After installing it, I was able to successfully downgrade to Pillow 8.2.0. I also specified the python version in a .python-version file as per the Heroku documents recommendation. Another issue that arose was a duplicate installed app in settings, which was fixed by removing it.|
| Sign Up Form Submission Resulting in 500 error. | Readded 'sender' argument into `create_profile` (profiles/models.py) function so that the User model can be referenced. |
| Refreshing page logs a user out. | 'DEV' setting on Heroku enabled therefore causing database confusion. Setting removed to allow one sqlite for development and postgres for production. |
| Heroku app alternating between deployin but app not opening and build succeeding but failing to deploy. | Static file settings were causing conflicts. I ended up copying static file settings from an old Django project and then redeploying. It was successfully built and deployed. |
| Posts submission failing. | The fix for this was intricate as I first identified that the perform_method wasn't being called, nor were the 'details' being accessed correctly. |
| 400 error when trying to submit Trip Post form. | My serializer wasn't processing the data correctly. I had accidentally created two sets of logic, one in the serializer and one in the views, which was causing a city duplicate error. The request owner wasn't correctly being compared to the authorised user, and so wasn't allowing the post to be authenticated (as they can only be made by an authenticated user). |
| Profile image not displaying. | Changed Avatar component to properly destructure props (src, height, text) from props object by adding missing curly brackets. |
| 'Details' section of edit form not prepopulating. | The fetched data wasn’t properly updating the state for the 'details' fields, leaving those them empty. Additionally, the city dropdown wasn’t updating correctly when a country was selected, since the `selectedCountry` state wasn’t being initialized properly. To fix this, I made sure the `selectedCountry` and `selectedCity` values were set when fetching post data, allowing the city list to update dynamically. Now, the form pre-fills correctly, and the city dropdown updates as expected. |
| "This field is required" error when trying to post a comment. | The backend was expecting a field named 'post' in the request payload, but the frontend needed to send tripPost instead. I updated the  API request to use `post: tripPost` so that the comment could be posted successfully. |
| Likes and comment counters swapped. | Initially when liking or commenting, the counters beside the appropriate icons would increment and decrement as expected. However, if I left the page and returned, or refreshed it, the values would get swapped. If I originally had two likes and one comment, I would have one like and two comments. I had unknowingly assigned the incorrect sources to the views for the respective fields, accidentally assigning likes to comments, and vice versa. |
| Profile image, post count, followers count and following count not appearing. | I first checked th API response through console logs which showed the correct profile data being retrieved, but it wasn't being stored properly. I first corrected the count retrieval logic to display 0 by default if nothing is returned. I updated `setProfileData()` to store `profilePage` directly instead of wrapping it in a results object as the Moments walkthrough content suggested. I also changed how I accessed the profile from context, making sure to use `const profile = profilePage || {};` instead of destructuring from an empty array. |
| Post deletion working on backend but needed refresh to appear on client side. | My `setTripPosts` was passed as and needed to be referenced to as `setTripPost` in `TripPostPage.js`. |
| WAVE evaluation: multiple inputs labels. | I had defined a form label and added an ARIA label. Both conflicted with each other, resulting in multiple input labels. I opted to replace the labels with normal paragraphs and keep the aria labels. |
| On the feed/explore/likes view of a post, the like and unlike functionality works as expected. However, if the users is reading the full article on the post page, the like button will not update as it should when liked/unliked. | The issue was that `setTripPosts` wasn't being passed correctly and therefore was inaccessible. When destructured inside the handleLike function, everything worked as expected again. |
| Improper form field validation causing confusing UX and lacking of direction. | A simple change of the button types allowed error messages to appear correctly. I also changed the number input fields to be selects for better UX and form validation. |