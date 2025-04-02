# Deployment

Below are the steps taken to deploy both the back and front end.

## API Heroku Deployment

### Configuring Heroku

1. Navigate to your app's Settings tab on the Heroku dashboard.

2. Under Config Vars, add the following variables:


    `SECRET_KEY`: Create a new secret key (do not reuse the one from settings.py).


    `CLOUDINARY_URL`: Copy your Cloudinary URL from env.py (without quotation marks).


3. Ensure you have four config vars set up in total.

### Deploying to Heroku

1. Open the **Deploy** tab in Heroku.

2. In the **Deployment method** section, select **Connect to GitHub**.

3. Search for your repository and click **Connect**.

4. (Optional) Enable **Automatic Deploys** to redeploy whenever new code is pushed. I personally opted for manual deploys.

5. Since all changes are already in GitHub, scroll to the **Manual Deploy** section and click **Deploy Branch** to start the build process.

6. Once deployment is complete, click **Open App** to verify it is running.

## Verifying Deployment
* Your app should display a JSON welcome message on the home screen.

* To check the superuser profile, append `/profiles/` to your root URL.

* If the JSON response is not formatted properly, consider using a Chrome extension like JSON Formatter.

### Removing Unused Postgres Add-on

Heroku may automatically assign a paid Postgres database add-on. To avoid charges:

1. Go to the **Resources** tab in your Heroku dashboard.

2. Locate **Heroku Postgres** and click the chevron icon on the right.

3. Select **Delete Add-on** and confirm by entering your app name, then click **Remove Add-on**.


### Updating ALLOWED_HOST for Deployment

To ensure compatibility with the React project, we need to set `ALLOWED_HOST` as an environment variable instead of hardcoding it. This allows multiple API instances to be deployed to different URLs.

#### Part 1: Adding `ALLOWED_HOST`

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


## Unified Project Deployment (front and back end)

The steps I followed to deploy a combined React front-end and a Django API back-end were outlined by the Code Institute and can be found in the file below. These steps work off the assumption you have completed the deployment steps above. I have included both a link to the original file I used, as well as a summary of the steps I followed.

[Advanced Front End: Deployment of both applications by the Code Institute](https://code-institute-students.github.io/advfe-unified-workspace/deployment/00-deployment)

### Setting up WhiteNoise for Static Files 

The React portion of the project contains static files, so we need to configure WhiteNoise to manage them. WhiteNoise will also handle static files for the Django Admin panel, ensuring they are accessible from the deployed URL.  

#### Installing WhiteNoise  

1. Ensure your terminal is in the project’s root directory, then run:  

        pip3 install whitenoise==6.4.0

2. Add this dependency to requirements.txt:

        pip3 freeze > requirements.txt

3. Create an empty staticfiles folder in the root directory:

    mkdir staticfiles

#### Updating `settings.py`

1. Modify `INSTALLED_APPS`:

    Ensure that `'cloudinary_storage'` is listed below `'django.contrib.staticfiles'` to allow WhiteNoise to manage static files.

2. Modify `MIDDLEWARE`:

    Add WhiteNoise below `SecurityMiddleware` and above `SessionMiddleware`:
    `'whitenoise.middleware.WhiteNoiseMiddleware',`

3. Update `TEMPLATES`  

    In the `TEMPLATES` section, update the `DIRS` key to tell Django and WhiteNoise where to locate React’s `index.html` file during deployment:  
        
        DIRS: [os.path.join(BASE_DIR, 'staticfiles', 'build')],

4. Configure Static Files

    In the static files section of `settings.py`, add the following variables to define where Django and WhiteNoise should look for static files:

        STATIC_ROOT = BASE_DIR / 'staticfiles'
        WHITENOISE_ROOT = BASE_DIR / 'staticfiles' / 'build'

These settings ensure that both the React app and Django’s admin panel can correctly serve static files in production.

### Configuring Routes for React and Django API  

To ensure the React front end is served correctly while keeping the Django API functional, we need to:  
- Serve the React app from the root URL.  
- Redirect 404 errors to React for handling via `react-router-dom`.  
- Prefix all API routes with `/api/` to avoid conflicts with React routes.  

#### Updating `urls.py` in Django  

1. Remove the `root_route` import from `.views`.  

2. Import `TemplateView` from Django’s generic views:  
        
        from django.views.generic import TemplateView

3. Update `urlpatterns` to serve the React app from the root URL:

        path('', TemplateView.as_view(template_name='index.html')),
    
    Before:

        path('', root_route),

    After:

        path('', TemplateView.as_view(template_name='index.html')),

4. Handle 404 errors by redirecting them to React:

        handler404 = TemplateView.as_view(template_name='index.html')

5. Prefix API routes with `/api/`, excluding the home page and admin panel.

#### Updating axiosDefaults.js in React
1. Since the API now resides under `/api/`, update the `axios.defaults.baseURL` in `axiosDefaults.js`:

        axios.defaults.baseURL = "/api";

2. Commit and push these changes to GitHub:

        git add .
        git commit -m "Updated routing for React and Django API"
        git push origin main

----

### Compiling Static Files

Once the static file settings are configured, we need to compile all the static files from both Django and React into the staticfiles folder for deployment.

#### Collecting Django Admin and DRF Static Files
Run the following command in the terminal:

        python3 manage.py collectstatic

#### Compiling React Static Files
1. Navigate to the frontend directory:

        cd frontend

2. Ensure Node.js v16 is installed and selected.

3. Build and move React files:

    If using PowerShell in VS Code:

        npm run build
        mv build ../staticfiles/.
    
    Otherwise, run a single command:

        npm run build && mv build ../staticfiles/.

4. ***Re-run these steps whenever deploying changes to static files, including React updates.***

#### Replacing Old Build Files

If changes are made to the React front end, delete the old build folder and replace it with the new one:

    PowerShell Users:

        npm run build
        rm "../staticfiles/build" -Recurse -Force
        mv build ../staticfiles/.

Other Terminals:

        npm run build && rm -rf ../staticfiles/build && mv build ../staticfiles/.

Now, your staticfiles directory should contain all required files for deployment.

#### Adding runtime.txt

To ensure Heroku uses the correct Python version, create a `runtime.txt` file in the root directory:
        
        echo "python-3.12.8" > runtime.txt

Alternatively, as I did, you can create a `.python-version` file which Heroku advised using instead.

#### Reverting psycopg2-binary to psycopg2

Since psycopg2-binary is used for development but not recommended for production, update requirements.txt before final deployment:

1. Locate the following line in requirements.txt:

        psycopg2-binary==2.x.x

2. Manually change it to:

        psycopg2==2.x.x

3. Save the file.


#### Final Steps

Commit and push these changes to GitHub:

        git add .
        git commit -m "Configured WhiteNoise, compiled static files, updated psycopg2"
        git push origin main


### Testing the Build  

Now that all the settings are in place, we can test whether both parts of the project—Django and React—are running together on the same server port.  

1. Stop Any Running Servers  

    Ensure that all running servers are terminated by pressing **Ctrl+C** in any active terminal.  

2. Update `env.py`  

    In your `env.py` file, **comment out** both the `DEBUG` and `DEV` environment variables:  

            # DEBUG = True
            # DEV = True

3. Start the Django Server
    
    Run the following command in the terminal:

        python3 manage.py runserver

4. Verify the Application
    
    To check that the application is running, open it in a browser by **CTRL+clicking (Windows)** or **CMD+clicking (MacOS)** on the localhost URL displayed in the terminal.

    At this stage, the React server should **not be running** - this test ensures that Django is correctly serving the React static files.

5. Final Commit Before Deployment
    
    Once confirmed, commit and push your changes to GitHub:

        git add .
        git commit -m "Tested build, ready for deployment"
        git push origin main

### Preparing Your Existing Heroku App for Deployment  

#### 1. Update Heroku Config Vars  

1. Log in to [Heroku](https://www.heroku.com) and open the **dashboard** for your Django REST Framework (DRF) application.  
2. Navigate to the **Settings** tab and click **Reveal Config Vars**.  
3. Ensure the following environment variables are correctly set:  

   - **`ALLOWED_HOST`** → Set this to the **URL of your combined project**  
     - _Remove_ `https://` at the beginning.  
     - _Remove_ the trailing `/` at the end.  

   - **`CLIENT_ORIGIN`** → Set this to the **URL of your combined project**  
     - _Keep_ `https://` at the beginning.  
     - _Remove_ the trailing `/` at the end.  

4. If you previously had a `CLIENT_ORIGIN` value for your separate React deployment, **update** it to reflect the new combined project URL.  
5. If `CLIENT_ORIGIN_DEV` is present, **delete it** by clicking the **"X"** icon next to it.  
   - This was previously used for connecting the local React app to a separately deployed DRF API. Since React and the API are now combined, it is no longer needed.  

---

#### 2. Ensure Your Code is Ready  

- **Double-check** that all required settings from the **Deployment** section of the Django REST Framework module are in place.  
- **Commit and push** any recent changes to GitHub:  

        git add .
        git commit -m "Final deployment setup"
        git push origin main

---

#### 3. Deploy to Heroku
1. Open the **Deploy tab** in your Heroku dashboard.
2. Deploy your application either manually or by enabling Automatic Deploys.