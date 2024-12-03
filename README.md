# 4400-Phase-4


API usage instructions

For DB setup, Go on sql workbench, click users and priviledges, and setup a user account/change a password or whatever.
Make a .env file based on that. 
pip install python-dotenv, make a .env, and use that to store all your passwords and stuff

pip install flask mysql-connector-python

python3 Backend.py (run the file!)

Get Postman to test API 


example...

stored procedure -
POST http://127.0.0.1:5000/api/procedure/add_owner
body, raw -
{
    "ip_username": "jdoe",
    "ip_first_name": "John",
    "ip_last_name": "Doe",
    "ip_address": "123 Elm Street",
    "ip_birthdate": "1980-06-15"
}

view - 
GET http://127.0.0.1:5000/api/procedure/display_driver_view