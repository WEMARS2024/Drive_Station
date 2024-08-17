import serial
import websocket
import asyncio

async def read_can_serial():
    ser = serial.Serial('/dev/ttyUSB0', 9600)

    try:
        while True:
            if ser.in_waiting > 0:
                line = ser.readline().decode('utf-8').rstrip()
                await websocket.send(line)
            await asyncio.sleep(0.01)
    except Exception as e:
        ser.close()
    
server = websocket.server(read_can_serial, "0.0.0.0", 7005)

asyncio.get_event_loop().run_until_complete(server)
asyncio.get_event_loop().run_forever()
