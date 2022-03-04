
from xmlrpc.client import DateTime
from digi.xbee.devices import XBeeDevice, RemoteXBeeDevice
from digi.xbee.io import IOLine, IOValue, IOMode
from digi.xbee.models.status import NetworkDiscoveryStatus
from digi.xbee.reader import DeviceDiscovered, XBeeEvent
from multiprocessing.connection import Connection
from datetime import datetime
from PIL import Image
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


def onDoorStatus(conn: Connection, id: str, doorOpen: bool):
    #c = conn.cursor()
    print('Door change detected! Updating the door field in the DB...')
    print()
    # c.execute(
    #     "UPDATE Device SET doorOpen = '{}', lastUpdateAt= '{}'  WHERE ID='{}';".format(doorOpen, datetime.now(), id))
    # conn.commit()


def onMotionStatus(conn: Connection, id: str, motion: bool):
    # c = conn.cursor()
    print('Motion detected! Updating the motion field in the DB...')
    print()
    # c.execute(
    #    "UPDATE Device SET motion = '{}', lastUpdateAt= '{}'  WHERE ID='{}';".format(motion, datetime.now(), id))
    # conn.commit()


def concatImage(newData, image):
    imgDest = '/Users/logan/Desktop'
    size = 0

    if image == bytearray():
        size = newData
        print("Total size: ", size)

    image.extend(newData)
    print("Size: ",sys.getsizeof(image))

    if sys.getsizeof(image) == size:
        imageSave = Image.open(io.BytesIO(image))
        imageSave.save(imgDest)
        print("The image fricken saved!!!")
        del image




def main():

    image = bytearray(0)

    # define MAC address for reach node: host MAC is 0013A20041C2F683
    thermalNode = '0013A2004198CD77'
    visionNode = ''
    pirNode = '0013A20041D16AD5'

    # create a database connection and cursor
    # conn = sqlite3.connect(database)
    # c = conn.cursor()
    # retrieve the id from the pi id should be in string form and use MAC address

    # Initialize Xbee device and define serial port
    coordinator = XBeeDevice('/dev/tty.usbserial-AG0JYNQ0', 9600)

    # def io_samples_callback(sample, remote, time):
    #     # print("New sample received from %s - %s - %s" % (remote.get_64bit_addr(), sample, time))
    #     id = remote.get_64bit_addr()
    #     c = conn.cursor()
    #     c.execute("SELECT doorOpen FROM Device WHERE ID='{}'".format(id))
    #     result = c.fetchone()
    #     if (sample.get_digital_value(IOLine.DIO3_AD3) == IOValue.HIGH) and (result[0] != False):
    #         print("Door is closed")
    #         print(result)
    #         doorOpen = False
    #         onDoorStatus(conn, id, doorOpen)
    #
    #     if (sample.get_digital_value(IOLine.DIO3_AD3) == IOValue.LOW) and (result[0] != True):
    #         print("Door is open")
    #         doorOpen = True
    #         onDoorStatus(conn, id, doorOpen)
    #
    #     # if sample.get_digital_value(IOLine.DIO12) == IOValue.HIGH:
    #     #     motion = True
    #     #     print("Motion detected")
    #     #     onMotionStatus(conn, id, motion)

    def data_received_callback(message):
        #print("Occupancy Update: ", message.data.decode())
        # MAC address as ID
        id = str(message.remote_device)[:16]
        #data = message.data.decode()
        # if data.startswith("O:"):      # data is occupancy count
        #     print("Occupancy Update: ", message.data.decode(), id)
        onOccupancyUpdate(id, 2)

        # else:     # data is portion of image.
        # image = Image.frombytes("I;16", size, data, decoder_name="raw")
        #concatImage(message.data, image)

    #alternatively use this in transparent mode
   # def packet_received_callback(message):

    def device_discovered_callback(remote):
        print("Device discovered: %s" % remote)
        onStartUp(str(remote)[:16])


    try:
        # open serial port
        coordinator.open()

        # Get the network.
        xnet = coordinator.get_network()
        xnet.set_discovery_timeout(6)  # 15 seconds.

        # This callback triggers whenever digital IO samples are received
        # coordinator.add_io_sample_received_callback(io_samples_callback)

        # This callback triggers whenever a data API frame is received (ie. images or occupancy)
        coordinator.add_data_received_callback(data_received_callback)
        # coordinator.add_packet_received_callback(packet_received_callback)

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
