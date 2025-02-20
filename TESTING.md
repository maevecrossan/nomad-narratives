# Testing: API

The following is a breakdown of the testing done to ensure that the 'nomadnarrativesapi' behaves as intended and without any errors.

## Manual Testing
Below is a breakdown of the tests performed to ensure that users can see and interact with based on their logged in status.

### Profile Tests

| Test Case | Expected Outcome | Final Outcome |
|  |  |
| A logged out user can create a profile | Yes |  |
| Users can upload a personal profile picture | Yes |  |
| Logged in users can edit their own profile picture | Yes |  |
| Users (logged in or out) can edit profile picture of other users | No |  |
| Logged in users can add a profile description | Yes |  |
| Logged in users can edit their own profile description | Yes |  |
| Users (logged in or out) can edit the profile descriptions of other users| No |  |



### Post Tests

| Test Case | Expected Outcome | Final Outcome |
|  |  |
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
| A logged in user see an error message when attempting to upload an image exceeding the sizing criteria. | Yes |  |


### Comment Tests

| Test Case | Expected Outcome | Final Outcome |
|  |  |
|  |  |