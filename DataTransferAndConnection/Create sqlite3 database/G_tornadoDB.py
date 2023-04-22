import sqlite3
import csv

# connect to the database
conn = sqlite3.connect('tornadoP3.sqlite')

# create a new table
cursor = conn.cursor()
cursor.execute('''CREATE TABLE tornado_table2 (yr INTEGER, mag REAL, inj INTEGER, fat INTEGER);''')

# import data from CSV file
with open('1950-2021_torn.csv', 'r') as file:
    reader = csv.reader(file)
    # skip the header row
    next(reader)
    for row in reader:
        # extract the values from the row and convert to the appropriate data types
        yr = int(row[1])
        mag = float(row[11])
        inj = int(row[21])
        fat = int(row[22])
        # insert the values into the table
        cursor.execute('''INSERT INTO tornado_table2 (yr, mag, inj, fat) VALUES (?, ?, ?, ?);''', (yr, mag, inj, fat))

# commit changes and close the connection
conn.commit()
conn.close()









