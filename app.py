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

engine = create_engine("sqlite:///USEnergy.sqlite")
inspector = inspect(engine)
inspector.get_table_names()

#Available Routes
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

#Returns a list of prices based on the year selected
@app.route("/prices/<year>")
def prices(year):
    price = pd.read_sql_query("SELECT * from 'Average Energy Prices'",con = engine)
    year_df = price.loc[price['index'] == year]
    return year_df.to_json()

#Returns a list of prices based on the state selected
@app.route("/state_price/<state>")
def state_price(state):
    df = pd.read_sql_query("SELECT * from 'Average Energy Prices'",con = engine)
    df.set_index("index",inplace =True)
    state_df = df.loc[:,state]
    return state_df.to_json()

#Returns a list of energy generation based on the state selected
@app.route("/state_gen/<state>")
def state_gen(state):
    df = pd.read_sql_query(f"SELECT * from '{state} Generation'", con=engine)
    df.set_index("index",inplace =True)
    return df.to_json()

#Returns all of the price data
@app.route("/price_data")
def price_data():
    df = pd.read_sql_query("SELECT * from 'Average Energy Prices'",con = engine)
    df.set_index("index",inplace =True)
    return df.to_json()

#Returns all of the user end consumption data
@app.route("/user")
def user():
    total_df = pd.read_sql_query("SELECT * from 'End User Consumption'",con = engine)
    total_df.set_index("index",inplace=True)
    df=total_df.T
    
    df["Coal"] = list(map(lambda x: x[1:-2], df["Coal"].values))
    df['Coal'] = pd.to_numeric(df.Coal)
    df["Naturalgas"] = list(map(lambda x: x[1:-2], df["Naturalgas"].values))
    df['Naturalgas'] = pd.to_numeric(df.Naturalgas)
    df["Petroleum"] = list(map(lambda x: x[1:-2], df["Petroleum"].values))
    df['Petroleum'] = pd.to_numeric(df.Petroleum)
    df["Renewableenergy"] = list(map(lambda x: x[1:-2], df["Renewableenergy"].values))
    df['Renewableenergy'] = pd.to_numeric(df.Renewableenergy)
    df["Electricity"] = list(map(lambda x: x[1:-2], df["Electricity"].values))
    df['Electricity'] = pd.to_numeric(df.Electricity)

    return df.to_json()

#Returns all of the electrical consumption data
@app.route("/electricity")
def electricity():
    total_df = pd.read_sql_query("SELECT * from 'Electric Power Consumption'",con = engine)
    total_df.set_index("index",inplace=True)
    df=total_df.T
    df["Coal"] = list(map(lambda x: x[1:-2], df["Coal"].values))
    df['Coal'] = pd.to_numeric(df.Coal)
    df["Naturalgas"] = list(map(lambda x: x[1:-2], df["Naturalgas"].values))
    df['Naturalgas'] = pd.to_numeric(df.Naturalgas)
    df["Petroleum"] = list(map(lambda x: x[1:-2], df["Petroleum"].values))
    df['Petroleum'] = pd.to_numeric(df.Petroleum)
    df["Renewableenergy"] = list(map(lambda x: x[1:-2], df["Renewableenergy"].values))
    df['Renewableenergy'] = pd.to_numeric(df.Renewableenergy)
    df["Nuclearpower"] = list(map(lambda x: x[1:-2], df["Nuclearpower"].values))
    df['Nuclearpower'] = pd.to_numeric(df.Nuclearpower)

    return df.to_json()

if __name__ == "__main__":
    app.run(debug=False)