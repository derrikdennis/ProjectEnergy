import os
import json
import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

# Database Setup
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///USEnergy.sqlite"

#db = SQLAlchemy(app)

engine = create_engine("sqlite:///USEnergy.sqlite")
inspector = inspect(engine)
inspector.get_table_names()

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
#Base.prepare(db.engine, reflect=True)

# Save references to each table
#print(Base.classes.keys())

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/energy")
def energy():
    return render_template("energy.html")

@app.route("/electrical")
def electrical():
    return render_template("electrical.html")

#Returns a list of all 48 states
@app.route("/states")
def states():
    columns = inspector.get_columns('Average Energy Prices')
    states = []
    for column in columns:
        states.append(column["name"])
    return jsonify(states[1:])

#Returns a list of all years
@app.route("/year")
def years():
    prices = pd.read_sql_query("SELECT * from 'Average Energy Prices'",con = engine)
    years = prices["index"]
    years_list = years.tolist()
    return jsonify(years_list)

@app.route("/prices/<year>")
def prices(year):
    price = pd.read_sql_query("SELECT * from 'Average Energy Prices'",con = engine)
    year_df = price.loc[price['index'] == year]
    return year_df.to_json()

@app.route("/state_price/<state>")
def state_price(state):
    df = pd.read_sql_query("SELECT * from 'Average Energy Prices'",con = engine)
    df.set_index("index",inplace =True)
    state_df = df.loc[:,state]
    return state_df.to_json()

@app.route("/price_data")
def price_data():
    df = pd.read_sql_query("SELECT * from 'Average Energy Prices'",con = engine)
    df.set_index("index",inplace =True)
    return df.to_json()

if __name__ == "__main__":
    app.run(debug=False)