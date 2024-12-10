from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os
from flask_cors import CORS

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Database configuration
db_config = {
    "host": os.getenv("DB_HOST"),
    "port": int(os.getenv("DB_PORT")),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME")
}


def connect_to_db():
    return mysql.connector.connect(**db_config)


# Utility function to call stored procedures
def call_stored_procedure(proc_name, params):
    connection = None
    try:
        connection = connect_to_db()
        cursor = connection.cursor()
        cursor.callproc(proc_name, params)

        results = []
        for result in cursor.stored_results():
            results.append(result.fetchall())

        connection.commit()
        return {"success": True, "data": results}

    except Error as e:
        return {"success": False, "error": str(e)}

    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()


# Utility function to execute queries
def execute_query(query):
    connection = None
    try:
        connection = connect_to_db()
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        result = cursor.fetchall()
        return {"success": True, "data": result}

    except Error as e:
        return {"success": False, "error": str(e)}

    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()


# Route to handle adding an owner (example)
@app.route('/api/procedure/add_owner', methods=['POST'])
def add_owner():
    data = request.json or {}
    response = call_stored_procedure('add_owner', list(data.values()))
    return jsonify(response)


# Generic route to execute any stored procedure
@app.route('/api/procedure/<proc_name>', methods=['POST'])
def execute_procedure(proc_name):
    data = request.json or {}
    params = list(data.values())
    response = call_stored_procedure(proc_name, params)
    return jsonify(response)


# Generic route to query any view
@app.route('/api/view/<view_name>', methods=['GET'])
def query_view(view_name):
    query = f"SELECT * FROM {view_name}"
    response = execute_query(query)
    return jsonify(response)


# Error handler for 400
@app.errorhandler(400)
def bad_request(error):
    return jsonify({"success": False, "error": "Bad Request", "message": str(error)}), 400


# Error handler for 404
@app.errorhandler(404)
def not_found(error):
    return jsonify({"success": False, "error": "Not Found"}), 404


if __name__ == "__main__":
    app.run(debug=True)

