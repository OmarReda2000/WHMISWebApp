'''
  This is the current state of the DB for reference

  model Device {
    //Automatic
    id        Int      @id @default(autoincrement())
    createdAt DateTime @default(now())

    //RasberryPi
    name             String?
    location         String?
    occupancy        Int?
    connectedAt      DateTime  @default(now())
    lastUpdateAt     DateTime?
    lastStatusUpdate DateTime?

    //React App
    lastCheckedAt DateTime?
  }

  Fields to be set onCreate:
  - name (temporary name)

  Fields to be set onStartUp but device already exists in DB:
  - connectedAt
'''
from multiprocessing.connection import Connection
import sqlite3
from datetime import datetime
import string
import os.path

def onStartUp(conn: Connection, id: string):
    c = conn.cursor()
    print('\n\n\n',c)
    c.execute("SELECT * FROM Device;".format(id))
    conn.commit()
    r = c.fetchall()
    print('\n\n\n',r)
    # Device already exists
    if len(r):
        print('Device Exists in the DB, updated the connectedAt field!')
        c.execute(
            "UPDATE Device SET connectedAt = '{}' WHERE ID='{}';".format(datetime.now(), id))
        conn.commit()

    # Device DNE
    else:
        print("Devices doesn't already exist, Add device to the DB...")
        c.execute("INSERT INTO Device (id,name) VALUES ('ABCD','New Device');")
        conn.commit()


def onOccupancyUpdate(conn: Connection, id: String, occupancy: int):
    c = conn.cursor()
    print('New occupancy update detected! Updating the occupancy field in the DB...')
    c.execute(
        "UPDATE Device SET occupancy = '{}', lastUpdateAt= '{}'  WHERE ID='{}';".format(occupancy, datetime.now(), id))
    conn.commit()


def main():
    conn = sqlite3.connect('/Users/logan/Documents/GitHub/WHMISWebApp/api/db/dev.db')
    c=conn.cursor()
    c.execute("SELECT name from sqlite_master where type='table';")
    print('/n/n/n/n',c.fetchall())
    # retrieve the id from the pi
    onStartUp(conn, '8')
    # onOccupancyUpdate(conn, 8, 4)
    print("Ending program...")
    conn.close()


if __name__ == "__main__":
    main()
