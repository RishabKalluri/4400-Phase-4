from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})



db_config = {
    "host": os.getenv("DB_HOST"),
    "port": int(os.getenv("DB_PORT")),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME")
}


def connect_to_db():
    return mysql.connector.connect(**db_config)
@app.route('/api/procedure/add_owner', methods=['OPTIONS'])
def options():
    response = jsonify({"message": "CORS preflight success"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response
@app.route('/api/procedure/add_owner', methods=['OPTIONS'])
def add_owner_options():
    response = jsonify({"message": "CORS preflight success"})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response
@app.route('/api/procedure/add_employee', methods=['OPTIONS'])
def add_employee_options():
    response = jsonify({"message": "CORS preflight success"})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

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

@app.route('/api/procedure/add_owner', methods=['POST'])
def add_owner():
    # Your code to handle adding an owner
    data = request.json or {}
    # Example stored procedure call
    response = call_stored_procedure('add_owner', list(data.values()))
    return jsonify(response)

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

@app.route('/api/procedure/<proc_name>', methods=['POST'])
def execute_procedure(proc_name):
    data = request.json or {}
    params = list(data.values()) 
    response = call_stored_procedure(proc_name, params)
    return jsonify(response)

@app.route('/api/view/<view_name>', methods=['GET'])
def query_view(view_name):
    query = f"SELECT * FROM {view_name}"
    response = execute_query(query)
    return jsonify(response)

@app.errorhandler(400)
def bad_request(error):
    return jsonify({"success": False, "error": "Bad Request", "message": str(error)}), 400

@app.errorhandler(404)
def not_found(error):
    return jsonify({"success": False, "error": "Not Found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
