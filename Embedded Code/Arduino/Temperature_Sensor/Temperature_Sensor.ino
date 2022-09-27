#include <OneWire.h>
#include <DallasTemperature.h>
#include <LiquidCrystal.h>
#define ONE_WIRE_BUS 3



LiquidCrystal lcd(8, 9, 4, 5, 6, 7);
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

String celsius_temp = "";
String farenheit_temp = "";

int switch_value = 0;
const int switch_pin = 10;

int button_value = 0;
const int button_pin = 11;

int sensor_value = 0;
const int sensor_pin = 3;

String switch_fb = "true";

void setup(void) {
  lcd.display();
  //for switch
  pinMode(switch_pin, INPUT);
  //for button
  pinMode(button_pin, INPUT);
  lcd.begin(16, 2);
  lcd.clear();
  Serial.begin(9600);
}

void loop(void) {

  switch_value = digitalRead(switch_pin);
  button_value = digitalRead(button_pin);
  sensor_value = digitalRead(sensor_pin);

  // Sends the command to get temperatures
  sensors.requestTemperatures();
  double temp_celsius = sensors.getTempCByIndex(0);
  double temp_farenheit = (temp_celsius * 9.0) / 5.0 + 32.0;




  //Reading pi data.
  if (Serial.available() > 0) {
    switch_fb = Serial.readStringUntil('\n');
    delay(30);
  }

  if (switch_fb == "true") {

    if (temp_celsius != -127) {

      if (switch_value == HIGH) {
        // Send a value to pi to start up data in firebase
        // And start listening to arduino for temp

        Serial.println(temp_celsius);
        if (button_value == HIGH) {
          //Dislays and gets data from the sensor
          lcd.setCursor(0, 0);
          celsius_temp = "Celsius:" + String(temp_celsius) + "C";
          farenheit_temp = "Farenheit:" + String(temp_farenheit) + "F";
          lcd.print(celsius_temp);
          lcd.setCursor(0, 1);
          lcd.print(farenheit_temp);

        } else {
          lcd.clear();
        }
      } else {
        lcd.clear();
        Serial.println("Switch off");
      }

    } else {
      //stop sending value to pi
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Disconnected");
      delay(500);
      Serial.println("Disconnected");
    }
  } else {
    if (switch_value == LOW) {
      switch_fb = "true";
      Serial.println("Switch off");
    }
  }
  Serial.flush();
}