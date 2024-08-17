import serial
import asyncio
import websockets


serial_port = '/dev/ttyUSB0'  #this will have to change when everything is connected to pi
baud_rate = 921600
connected_clients = set()
serial_buffer = []

async def read_from_serial():
    try:
        ser = serial.Serial(serial_port, baud_rate, timeout=1)
        print(f"Connected to serial port {serial_port} at {baud_rate} baud rate")
    except Exception as e:
        print(f"Failed to connect to serial port: {e}")
        return

    try:
        while True:
            if ser.in_waiting > 0:
                line = ser.readline().decode('utf-8').rstrip()
                serial_buffer.append(line)

                await asyncio.sleep(0.01)
    except Exception as e:
        print(f"Error reading from serial port: {e}")
    finally:
        ser.close()
        print("Serial port closed")

async def process_serial_buffer():
    while True:
        if serial_buffer:
            line = serial_buffer.pop(0)
            # Broadcast the message to all connected WebSocket clients
            if connected_clients:
                print(f"Broadcasting to {len(connected_clients)} clients: {line}")
                await asyncio.gather(*[client.send(line) for client in connected_clients])
        await asyncio.sleep(0.01)

async def handle_client(websocket, path):
    print("New client connected")
    # Register the new client connection
    connected_clients.add(websocket)
    try:
        await websocket.wait_closed()
    except Exception as e:
        print(f"Error with client connection: {e}")
    finally:
        # Unregister the client connection
        connected_clients.remove(websocket)
        print("Client disconnected")

async def main():
    print("Starting WebSocket server...")
    try:
        websocket_server = await websockets.serve(handle_client, '0.0.0.0', 5000)
        print("WebSocket server started and listening on port 5000")
    except Exception as e:
        print(f"Failed to start WebSocket server: {e}")
        return

    try:
        await asyncio.gather(
            websocket_server.wait_closed(),  
            read_from_serial(),
            process_serial_buffer()
        )
    except Exception as e:
        print(f"Error in asyncio.gather: {e}")

# Start the main coroutine
asyncio.run(main())