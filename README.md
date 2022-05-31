# Django-Login-System with React Material UI

## Backend

- Creating a Virtual Environment
  - Install <kbd>virtualenv</kbd> if not installed already
  
        pip3 install virtualenv
  - Create the Virtual Environment
  
        virtualenv venv1
  - Activate the Virtual Environment
  
        source venv1/bin/activate
        
- Installing Django in the Virtual Environment

      pip3 install django

- What are Migrations in Django?
  - Migrations are Django's way of propagating changes you make to your models (adding a field, deleting a model, etc.) into your database schema. They're designed to be mostly automatic, but you'll need to know when to make migrations, when to run them, and the common problems you might run into.

- CORS Settings in Django (Very Important)
  - Install Django CORS Headers in your Virtual Environment
   
        pip3 install django-cors-headers
  - In settings.py

        INSTALLED_APPS = [
            ...,
            "corsheaders",
            ...,
        ]
        MIDDLEWARE = [
        ...,
        "corsheaders.middleware.CorsMiddleware",
        "django.middleware.common.CommonMiddleware",
        ...,
        ]
  - Add allowed origins which can access your api
  
        CORS_ALLOWED_ORIGINS = [
            "http://localhost:3000" #There is only one in my case
        ]
- Add CRSF Exempt (in case of CRSF errors)
  - In views.py

        from django.views.decorators.csrf import csrf_exempt
        ... #other imports
        @csrf_exempt
        #The view for which crsf-token is to be exempted
        
- Install all the required modules:
  
      pip3 install django-environ arrow
      
- How to start/create a new app in Django?

      python3 manage.py startapp APPNAME
- How to makemigrations?

      python3 manage.py makemigrations
      python3 manage.py migrate
  Additionally, you might get an error when applying migrations. Most common solution : Delete migration history files along with the .sqlite3 file
- How to start the APP:
  - First start the Python Virtual Environment
    
        source ./backend/venv1/bin/activate
  - Go to backend/backend and from there open up terminal and type the command:
   
        python3 manage.py runserver 5000
  - Next go to the frontend folder and type the commands:
   
        yarn build
        serve build --listen 3000

## Frontend

### Made using React Material UI

- To start the Frontend server

        yarn build
        serve build --listen 3000
        
- List of Timezones available in Django

      countries = [
      {'timezones': ['Europe/Paris'], 'code': 'FR', 'continent': 'Europe', 'name': 'France', 'capital': 'Paris'}
      {'timezones': ['Africa/Kampala'], 'code': 'UG', 'continent': 'Africa', 'name': 'Uganda', 'capital': 'Kampala'},
      {'timezones': ['Asia/Colombo'], 'code': 'LK', 'continent': 'Asia', 'name': 'Sri Lanka', 'capital': 'Sri Jayewardenepura Kotte'},
      {'timezones': ['Asia/Riyadh'], 'code': 'SA', 'continent': 'Asia', 'name': 'Saudi Arabia', 'capital': 'Riyadh'},
      {'timezones': ['Africa/Luanda'], 'code': 'AO', 'continent': 'Africa', 'name': 'Angola', 'capital': 'Luanda'},    
      {'timezones': ['Europe/Vienna'], 'code': 'AT', 'continent': 'Europe', 'name': 'Austria', 'capital': 'Vienna'},
      {'timezones': ['Asia/Calcutta'], 'code': 'IN', 'continent': 'Asia', 'name': 'India', 'capital': 'New Delhi'},
      {'timezones': ['Asia/Dubai'], 'code': 'AE', 'continent': 'Asia', 'name': 'United Arab Emirates', 'capital': 'Abu Dhabi'},
      {'timezones': ['Europe/London'], 'code': 'GB', 'continent': 'Europe', 'name': 'United Kingdom', 'capital': 'London'},
      ]
You can edit these in <b>settings.py</b>
