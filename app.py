import os
import json
import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

# Database Setup
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///USEnergy.sqlite"

db = SQLAlchemy(app)

#engine = create_engine("sqlite:///olympicDataFinal.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
#print(Base.classes.keys())


@app.route("/")
def index():
    results = db.session.query("SELECT * from 'Average Energy Prices'")
    return jsonify(results)
  

if __name__ == "__main__":
    app.run(debug=False)