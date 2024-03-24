# ME_TO_ME
A shared clipboard between devices connected via server

# TCP Communication between Devices (Node.js)

This project facilitates TCP communication between two devices on the same network, allowing you to transfer data between them. It's implemented using Node.js for both server-side and client-side functionality.

## Key Features

- **TCP Connection:** Utilizes the TCP protocol for reliable data exchange.
- **Webpage Interface:** Offers a user-friendly interface for interacting with the server and client through HTTP servers within each JS file.
- **Device-to-Device Communication:** Enables seamless data transfer between devices owned by the same user.

## Why This Was Created

This project was developed to address a specific scenario where you might need to share data between two devices in a controlled environment. It provides a flexible solution for targeted data transfer within your network.

## How to Use

**Prerequisites:**

- Node.js and npm (or yarn) installed on both devices.

**Setup:**

1. Clone or download the repository to both devices.

**Server-Side (Host Machine):**

1. Open a terminal in the project directory on the host machine.
2. Install dependencies:
    ```bash
    npm install  # or yarn install
    ```
3. Start the server:
    ```bash
    node server.js
    ```

**Client-Side (Other Device):**

1. Open a terminal in the project directory on the other device.
2. Install dependencies:
    ```bash
    npm install  # or yarn install
    ```
3. **Edit `client.js`:** Change the `host` value to the actual IP address of the host machine.
4. Start the client:
    ```bash
    node client.js
    ```

## Important Notes

- **Port Usage:** Ensure that the ports used by the Express servers in `server.js` and `client.js` are not already in use by other applications. You might need to adjust these port numbers if necessary.
- **Security Considerations:** This project focuses on basic functionality. Be cautious when exposing your application to external networks due to potential security risks. Consider implementing authentication and data encryption mechanisms for robust communication in future versions.

## Additional Information

- Refer to the `server.js` and `client.js` files for detailed implementation.

## DEMO
https://github.com/IAMSUPERBOY/ME_TO_ME/assets/117973059/fe9d26be-f836-49d8-a7b0-c02c6b11b51c

