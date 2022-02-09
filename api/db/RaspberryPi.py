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


def onStartUp(conn: Connection, id: int):
    c = conn.cursor()
    c.execute("SELECT ID FROM Device WHERE ID='{}'".format(id))
    conn.commit()

    # Device already exists
    if len(c.fetchall()):
        print('Device Exists in the DB, updated the connectedAt field!')
        c.execute(
            "UPDATE Device SET connectedAt = '{}' WHERE ID='{}';".format(datetime.now(), id))
        conn.commit()

    # Device DNE
    else:
        print("Devices doesn't already exist, Add device to the DB...")
        c.execute("INSERT INTO Device (name) VALUES ('New Device') RETURNING ID")
        # Currently nothing happens with the ID, but in later stages of the production
        # the id should be stored on the RaspberryPi
        id = c.fetchall()[0][0]
        print("ID assigned for the new created device: ", id)
        conn.commit()


def onOccupancyUpdate(conn: Connection, id: int, occupancy: int):
    c = conn.cursor()
    print('New occupancy update detected! Updating the occupancy field in the DB...')
    c.execute(
        "UPDATE Device SET occupancy = '{}', lastUpdateAt= '{}'  WHERE ID='{}';".format(occupancy, datetime.now(), id))
    conn.commit()


def main():
    conn = sqlite3.connect('dev.db')
    # retrieve the id from the pi
    onStartUp(conn, 8)
    onOccupancyUpdate(conn, 8, 4)
    print("Ending program...")
    conn.close()


if __name__ == "__main__":
    main()
