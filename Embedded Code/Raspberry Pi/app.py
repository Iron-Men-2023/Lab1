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



temp=True
while True:
        
    server_button_value=db.child("Lab1/Server_Button").get().val()

    if(server_button_value!=temp):
        if(server_button_value== False):
            ser.write("false\n".encode('utf-8'))
        else:
            ser.write("true\n".encode('utf-8'))

        temp=server_button_value
        
    if (ser.in_waiting > 0):
    
        arduino_message = ser.readline().decode('utf-8').rstrip()

        if(arduino_message=="Switch off"):
            db.child("Lab1").update({"Is_On":False})
            db.child("Lab1").update({"Server_Button":True})
            complete= db.child("Lab1/Temp_History").get().val()+",null"
            db.child("Lab1").update({"Temp_History":complete})
    
        elif(arduino_message=="Disconnected"):
            db.child("Lab1").update({"Is_connected":False})
            complete= db.child("Lab1/Temp_History").get().val()+",null"
            db.child("Lab1").update({"Temp_History":complete})

        elif(arduino_message=="Server off"):
            complete= db.child("Lab1/Temp_History").get().val()+",null"
            db.child("Lab1").update({"Temp_History":complete})

        else:
            db.child("Lab1").update({"Is_connected":True})
            db.child("Lab1").update({"Is_On":True})
            db.child("Lab1").update({"Temperature":arduino_message})
            complete= db.child("Lab1/Temp_History").get().val()+','+arduino_message
            db.child("Lab1").update({"Temp_History":complete})