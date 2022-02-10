from digi.xbee.devices import XBeeDevice
import sqlite3

def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn
    
def main():
    
    database = r"C:\sqlite\db\pythonsqlite.db"

    # create a database connection
    conn = create_connection(database)
    #create cursor to execute SQL tasks
    cur = conn.cursor()
    
    #Initialize Xbee device and define serial port
    coordinator = XBeeDevice('/dev/ttyUSB0', 9600)
    try:
        #open serial port
        coordinator.open()

        #define MAC address fo reach node
        thermalNode = '0013A2004198CD77'
        visionNode = ''
        pirNode = '0013A20041D16AD5'
    
        while True:
            #read any data incoming
            rx_message = coordinator.read_data()    
        
            if rx_message is not None:
                #get packet info
                data = rx_message.data
                source = rx_message.remote_device
                timestamp = rx_message.timestamp
                
                if source == pirNode:
                    print("Motions data: ",data)
                    #insert SQL querry into execute()
                    cur.execute("SQL querry")
                    conn.commit()
                    
                if str(source)[:16] == thermalNode:
                    print("Thermal data: ",data)
                    cur.execute("")
                    conn.commit()
   
    finally:
        if coordinator is not None and coordinator.is_open():
           coordinator.close()
    

if __name__ == '__main__':
    main()