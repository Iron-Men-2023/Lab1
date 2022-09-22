#include <OneWire.h>
#include <DallasTemperature.h>
#include <LiquidCrystal.h>
#define ONE_WIRE_BUS 3



LiquidCrystal lcd(8, 9, 4, 5, 6, 7);
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

String celsius_temp="";
String farenheit_temp="";

int switch_value = 0;
const int switch_pin = 10;

int button_value = 0;
const int button_pin = 11;

int sensor_value = 0;
const int senor_pin = 3;

void setup(void)
{
  lcd.display();
  //for switch
  pinMode(switch_pin, INPUT);
  //for button
  pinMode(button_pin, INPUT);
  lcd.begin(16, 2);
  lcd.clear();
  Serial.begin(9600);
}

void loop(void)
{

  switch_value = digitalRead(10);
  button_value = digitalRead(11);
  sensor_value = digitalRead(3);

  // Sends the command to get temperatures
  sensors.requestTemperatures();
  double temp_celsius = sensors.getTempCByIndex(0);
  double temp_farenheit = (temp_celsius * 9.0) / 5.0 + 32.0;

  if (switch_value == HIGH)
  {
    // Send a value to pi to start up data in firebase
    // And start listening to arduino for temp

    if (button_value == HIGH)
    {
      if (temp_celsius == -127)
      {
        lcd.setCursor(0, 0);
        lcd.print("Disconnected");
        
      }
      else {
        //Dislays and gets data from the sensor
        lcd.setCursor(0, 0);
        celsius_temp="Celsius:"+String(temp_celsius)+"C";
        farenheit_temp="Farenheit:"+String(temp_farenheit)+"F";
        lcd.print(celsius_temp);
        lcd.setCursor(0, 1);
        lcd.print(farenheit_temp);
      }
    }
    else
    {
      lcd.clear();
    }
    button_value = 0;
  }

  else {
    //stop sending value to pi

  }



}