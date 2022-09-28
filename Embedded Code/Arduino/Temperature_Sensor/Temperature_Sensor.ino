#include <OneWire.h>
#include <DallasTemperature.h>
#include <LiquidCrystal.h>
#define ONE_WIRE_BUS 3


int pin4 = A0;
int pin5 = A1;
int pin6 = A2;
int pin7 = A3;

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

String server_button = "true";

void setup(void) {
  lcd.display();

  pinMode(switch_pin, INPUT);
  pinMode(button_pin, INPUT);

  lcd.begin(16, 2);
  lcd.clear();
  Serial.begin(9600);
}

void loop(void) {

  switch_value = digitalRead(switch_pin);
  button_value = digitalRead(button_pin);
  sensor_value = digitalRead(sensor_pin);


  sensors.requestTemperatures();
  double temp_celsius = sensors.getTempCByIndex(0);
  double temp_farenheit = (temp_celsius * 9.0) / 5.0 + 32.0;

  //Reading pi data.
  if (Serial.available() > 0) {
    server_button = Serial.readStringUntil('\n');
    Serial.flush();
  }


  if (server_button == "true") {

    if (temp_celsius != -127) {

      if (switch_value == LOW) {

        Serial.println(temp_celsius);
        Serial.flush();

        if (button_value == HIGH) {

          lcd.setCursor(0,0);
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
        Serial.flush();
      }

    } else {

      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Disconnected");
      delay(500);
      Serial.println("Disconnected");
      Serial.flush();
    }
  } else {
    if (switch_value == HIGH) {
      server_button = "true";
      Serial.println("Switch off");
      Serial.flush();
    }

    Serial.println("Server off");
    Serial.flush();
    
  }

  Serial.flush();
}