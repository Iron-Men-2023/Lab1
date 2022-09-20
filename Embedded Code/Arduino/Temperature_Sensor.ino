#include <OneWire.h>
#include <DallasTemperature.h>
#include <LiquidCrystal.h>
#define ONE_WIRE_BUS 2


LiquidCrystal lcd(8, 9, 4, 5, 6, 7);  


OneWire oneWire(ONE_WIRE_BUS);  

DallasTemperature sensors(&oneWire);

void setup(void)
{
  lcd.begin(16,2);
   lcd.clear();
//  sensors.begin();  // Start up the library
  Serial.begin(9600);
}

void loop(void)
{ 

  // Send the command to get temperatures
  sensors.requestTemperatures(); 
  double temp_celsius= sensors.getTempCByIndex(0);
  double temp_farenheit= (temp_celsius * 9.0) / 5.0 + 32.0;

  
  Serial.print("Temperature: ");
  Serial.print(temp_celsius);
  Serial.print("°C  |  ");
  Serial.print(temp_farenheit);
  Serial.println("°F");

  lcd.setCursor(0,0);
  lcd.print("Celsius:");
  lcd.print(temp_celsius);
  lcd.print("C");
  lcd.setCursor(0,1);
  lcd.print("Farenheit:");
  lcd.print(temp_farenheit);
//  lcd.print(temp_farenheit);
  lcd.print("F");

  delay(1000);

//  lcd.clear();
}
