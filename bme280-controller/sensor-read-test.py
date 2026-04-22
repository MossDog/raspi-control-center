import serial
import time
from smbus2 import SMBus
from bme280 import BME280

print("""
sensor-read-test.py - Read CO2, temperature, pressure, and humidity

Press Ctrl+C to exit!
""")

# Setup serial for CO2 sensor
ser = serial.Serial("/dev/serial0", 9600, timeout=1)
co2_cmd = bytearray([0xFF, 0x01, 0x86, 0, 0, 0, 0, 0, 0x79])

# Setup I2C for BME280
bus = SMBus(1)
bme280 = BME280(i2c_dev=bus)

while True:
    # Read CO2 sensor
    ser.write(co2_cmd)
    time.sleep(0.1)
    resp = ser.read(9)
    if len(resp) == 9 and resp[0] == 0xFF and resp[1] == 0x86:
        co2 = resp[2] * 256 + resp[3]
        co2_str = f"CO2: {co2} ppm"
    else:
        co2_str = f"Invalid CO2 frame: {resp}"

    # Read BME280 sensor
    temperature = bme280.get_temperature()
    pressure = bme280.get_pressure()
    humidity = bme280.get_humidity()
    bme_str = f"Temp: {temperature:05.2f}°C | Pressure: {pressure:05.2f}hPa | Humi: {humidity:05.2f}%"

    print(f"{co2_str} | {bme_str}")
    time.sleep(2)
