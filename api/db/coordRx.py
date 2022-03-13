

from xmlrpc.client import DateTime
from digi.xbee.devices import XBeeDevice, RemoteXBeeDevice
from digi.xbee.io import IOLine, IOValue, IOMode
from digi.xbee.models.status import NetworkDiscoveryStatus
from digi.xbee.reader import DeviceDiscovered, XBeeEvent
from multiprocessing.connection import Connection
from datetime import datetime
from PIL import Image
import digi.xbee.models.address
import sqlite3, io, time, sys, binascii

def onStartUp(id: str):
    database = '/Users/logan/Documents/GitHub/WHMISWebApp/api/db/dev.db'
    conn = sqlite3.connect(database)
    c = conn.cursor()
    c.execute("SELECT ID FROM Device WHERE ID='{}'".format(str(id)))


    # Device already exists
    if len(c.fetchall()):
        print('Device Exists in the DB, updated the connectedAt field!')
        c.execute("UPDATE Device SET connectedAt = datetime('now') WHERE ID='{}';".format(id))
        conn.commit()

    # Device DNE
    else:
        print("Devices doesn't already exist, Add device to the DB...")
        c.execute("INSERT INTO Device (id,name,createdAt,connectedAt) VALUES ('{}','New Device',datetime('now'),datetime('now'));".format(id))
        conn.commit()

    conn.close()


def onOccupancyUpdate(id: str, occupancy: int):
    database = '/Users/logan/Documents/GitHub/WHMISWebApp/api/db/dev.db'
    conn = sqlite3.connect(database)
    c = conn.cursor()
    print('New occupancy update detected! Updating the occupancy field in the DB...')
    c.execute(
        "UPDATE Device SET occupancy='{}', lastUpdateAt=datetime('now')  WHERE ID='{}';".format(occupancy, id))
    conn.commit()
    conn.close()


def onDoorStatus(id: str, doorOpen: bool):
    database = '/Users/logan/Documents/GitHub/WHMISWebApp/api/db/dev.db'
    conn = sqlite3.connect(database)
    c = conn.cursor()
    print('Door change detected! Updating the door field in the DB...')
    print()
    c.execute(
        "UPDATE Device SET doorOpen = '{}', lastUpdateAt= '{}'  WHERE ID='{}';".format(doorOpen, datetime.now(), id))
    conn.commit()


def onMotionStatus(id: str, motion: bool):
    database = '/Users/logan/Documents/GitHub/WHMISWebApp/api/db/dev.db'
    conn = sqlite3.connect(database)
    c = conn.cursor()
    print('Motion detected! Updating the motion field in the DB...')
    print()
    c.execute(
       "UPDATE Device SET motionDetected = '{}', lastUpdateAt= '{}'  WHERE ID='{}';".format(motion, datetime.now(), id))
    conn.commit()


def storeImage(newData, id):
    global size, image
    if size == 0:
        print("Size data type ", type(size))
        print("newData data type ", type(newData))
        size = int(newData.decode())

        print("Total size: ", size)
    else:
        image.extend(newData)
        print("Size: ",len(image))

    if len(image) == int(size):
        imgString = str(binascii.hexlify(image))[2:-1]
        print(imgString)
        # imgString = ''
        database = '/Users/logan/Documents/GitHub/WHMISWebApp/api/db/dev.db'
        conn = sqlite3.connect(database)
        c = conn.cursor()
        print("INSERT INTO Image (deviceId,data) VALUES ('{}','{}');".format(id, str(imgString)))
        c.execute("INSERT INTO Image (deviceId,data) VALUES ('{}','{}');".format(id, str(imgString)))
        conn.commit()
        print("The image saved!!!")
        image = bytearray(0)
        size = 0



global size, image
size = 0
image = bytearray(0)

def main():
    # Initialize Xbee device and define serial port
    coordinator = XBeeDevice('/dev/tty.usbserial-AG0JYNQ0', 4800, flow_control=1)
    armed = False

    def io_samples_callback(sample, remote, time):
        # print("New sample received from %s - %s - %s" % (remote.get_64bit_addr(), sample, time))
        id = remote.get_64bit_addr()
        database = '/Users/logan/Documents/GitHub/WHMISWebApp/api/db/dev.db'
        conn = sqlite3.connect(database)
        c = conn.cursor()
        c.execute("SELECT doorOpen, motionDetected FROM Device WHERE ID='{}'".format(id))
        result = c.fetchone()
        print(result)
        print(sample)
        if (sample.get_digital_value(IOLine.DIO3_AD3) == IOValue.HIGH) and (result[0] != False):
            print("Door is closed")
            doorOpen = False
            onDoorStatus(id, doorOpen)

        if (sample.get_digital_value(IOLine.DIO3_AD3) == IOValue.LOW) and (result[0] != True):
            print("Door is open")
            doorOpen = True
            onDoorStatus(id, doorOpen)

        if (sample.get_digital_value(IOLine.DIO12) == IOValue.HIGH) and (result[1] != True):
            motion = True
            print("Motion detected")
            onMotionStatus(id, motion)

        if (sample.get_digital_value(IOLine.DIO12) == IOValue.LOW) and (result[1] != False):
            motion = False
            print("No motion detected")
            onMotionStatus(id, motion)

    def data_received_callback(message):
        # MAC address as ID
        id = str(message.remote_device)[:16]
        # data = message.data.decode()
        # print(message.data.decode())
        # if data.startswith("O:"):      # data is occupancy count
        #     print("Occupancy Update: ", message.data.decode(), id)
        #     onOccupancyUpdate(id, 2)

        # else:     # data is portion of image.
        storeImage(message.data, id)

    def device_discovered_callback(remote):
        print("Device discovered: %s" % remote)
        if (str(remote)[:16] != '0013A20041C2F683'):
          onStartUp(str(remote)[:16])


    try:
        # open serial port
        coordinator.open()

        # Get the network.
        xnet = coordinator.get_network()
        xnet.set_discovery_timeout(10)  # 10 seconds.

        # This callback triggers whenever digital IO samples are received
        coordinator.add_io_sample_received_callback(io_samples_callback)

        # This callback triggers whenever a data API frame is received (ie. images or occupancy)
        coordinator.add_data_received_callback(data_received_callback)

        # This callback triggers when discovery process is enabled and detects all connected nodes
        xnet.add_device_discovered_callback(device_discovered_callback)
        xnet.start_discovery_process()

        # Require user input to avoid ending program and keep callbacks active
        input()

    finally:
        if coordinator is not None and coordinator.is_open():
            coordinator.close()


if __name__ == '__main__':
    main()
