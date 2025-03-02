# Testing: API

The following is a breakdown of the testing done to ensure that the 'nomadnarrativesapi' behaves as intended and without any errors.

## Manual Testing
Below is a breakdown of the tests performed to ensure that users can see and interact with assets correctly based on their logged in status. The tests for the API apps were executed through the default interface created by the Django Rest Framework.


### Comments Tests

| Test Case | Expected Outcome | Passed |
| :--- | :---: | :---: |
| Logged in users can add a comment to a post. | Yes |  |
| Logged in users can edit/update their comment. | Yes |  |
| Logged in users can delete their comment. | Yes |  |
| Logged out users can add a comment to a post. | No |  |
| Logged out users can edit other users comments. | No |  |
| Logged in users can edit other users comments. | No |  |
| Users can see the username and profile image belonging to the comment writer. | Yes |  |


### Followers Tests

| Test Case | Expected Outcome | Passed |
| :--- | :---: | :---: |
| Logged in users can follow another user | Yes |  |
| Logged in users can unfollow a user they are following | Yes |  |
| Logged out users can follow another user | No |  |
| Logged out users can unfollow another user | No |  |
| Logged in users can follow themselves | No |  |
| Logged in users can see how many followers they have | Yes |  |
| Logged in users can see how many followers another user has | Yes |  |
| A user's follower and following count is instantly reflected if a change is made (i.e. someone is followed/unfollowed) | Yes |  |


### Likes Tests

| Test Case | Expected Outcome | Passed |
| :--- | :---: | :---: |
| Logged in users can like a post by another user | Yes |  |
| Logged in users can unlike a post they previously liked | Yes |  |
| Logged in users can like a post they previously liked | No |  |
| Logged out users can like/unlike posts | No |  |


### Posts Tests

| Test Case | Expected Outcome | Passed |
| :--- | :---: | :---: |
| Posts can be retrieved with a valid ID. | Yes |  |
| Posts can be retrieved with an invalid ID. | No |  |
| A logged out user see all posts | Yes |  |
| A logged in user see all posts | Yes |  |
| A logged out user can create a post | No |  |
| A logged in user can create a post | Yes |  |
| A logged out user can edit a post | No |  |
| A logged in user can edit a post they own | Yes |  |
| A logged in user can edit a post they DON'T own. | No |  |
| A logged out user can delete a post | No |  |
| A logged in user can delete a post they own | Yes |  |
| A logged in user can delete a post they DON'T own. | No |  |
| A logged in user can add an image meeting the sizing criteria. | Yes |  |
| A logged in user can add an image exceeding the sizing criteria. | No |  |
| A logged in user can see an error message when attempting to upload an image exceeding the sizing criteria. | Yes |  |
| A logged in user can add trip details (location, number of travellers, etc) | Yes |  |
| Users can see comments made under posts. | Yes |  |
| Posts appear in searches if their title is a match. | Yes |  |
| Posts appear in searches if their continent is a match. | Yes |  |
| Posts appear in searches if their country is a match. | Yes |  |
| Posts appear in searches if their city is a match. | Yes |  |


### Profiles Tests

| Test Case | Expected Outcome | Passed |
| :--- | :---: | :---: |
| A logged out user can create a profile | Yes |  |
| Users can upload a personal profile picture | Yes |  |
| Logged in users can edit their own profile picture | Yes |  |
| Users (logged in or out) can edit profile picture of other users | No |  |
| Logged in users can add a profile description | Yes |  |
| Logged in users can edit their own profile description | Yes |  |
| Users (logged in or out) can edit the profile descriptions of other users | No |  |
| Users can see their own followers (who follows them). | Yes |  |
| Users can see other users' followers (who follows another user). | Yes |  |
| Users appear in searches if their username is a match. | Yes |  |


## Bugs and Fixes

| Bug | Fix |
| :--- | :--- |
| Region, country and city fields appearing but not editable. | Django-cities-light database table not populated. `python manage.py cities_light` command was used to populate data, allowing users to make a selection. |
| Django-cities-light 'city' category was too detailed as it included city, subregion, and country. I wasn't able to extract just the cities out of it, nor was I able to dynamically load the city based on the user's selected country. I'm hoping to add this more user-friendly feature on the front end with React. |  |
|  |  |