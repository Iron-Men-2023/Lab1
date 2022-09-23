import serial
import time
from firebase import firebase
import pyrebase


fbConfig={
  "apiKey": "AIzaSyCPTlliO-fk-dtoWylXPSLgK5p4KDzs1Do",
  "authDomain": "lab1-43f1f.firebaseapp.com",
  "databaseURL": "https://lab1-43f1f-default-rtdb.firebaseio.com",
  "projectId": "lab1-43f1f",
  "storageBucket": "lab1-43f1f.appspot.com",
  "messagingSenderId": "371857379676",
  "appId": "1:371857379676:web:8c318cd5f78717c44df199",
  "measurementId": "G-S3SDZ11KE4"
}

firebase=pyrebase.initialize_app(fbConfig)
db = firebase.database()




ser = serial.Serial('/dev/ttyACM0',9600)
s = ''
ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
ser.reset_input_buffer()


# def switch_listen(message):
#     oneuh=db.child("Lab1/Is_On").get().val()
#     print(oneuh)

temp=True
while True:
    # Works fine
    
    # ser.flushinput()
        
    test=db.child("Lab1/Server_Button").get().val()

    if(test!=temp):
        if(test== False):
            ser.write("false\n".encode('utf-8'))
        else:
            ser.write("true\n".encode('utf-8'))
        temp=test
        
    if (ser.in_waiting > 0):
    
        line = ser.readline().decode('utf-8').rstrip()

        if(line=="Switch off"):
            db.child("Lab1").update({"Is_On":False})
            db.child("Lab1").update({"Server_Button":True})
    
        elif(line=="Disconnected"):
            db.child("Lab1").update({"Is_connected":False})

        else:
            db.child("Lab1").update({"Is_connected":True})
            db.child("Lab1").update({"Is_On":True})
            db.child("Lab1").update({"Temperature":line})



        


# db.child("Lab1/Is_connected").stream(switch_listen)
    


    
    