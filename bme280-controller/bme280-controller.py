import time

from smbus2 import SMBus

from bme280 import BME280

print(
    """all-values.py - Read temperature, pressure, and humidity

Press Ctrl+C to exit!

"""
)

# Initialise the BME280
bus = SMBus(1)
bme280 = BME280(i2c_dev=bus)

while True:
    temperature = bme280.get_temperature()
    pressure = bme280.get_pressure()
    humidity = bme280.get_humidity()
    print(f"Temp - {temperature:05.2f}°C | Pressure - {pressure:05.2f}hPa | Humi {humidity:05.2f}%")
    time.sleep(1)