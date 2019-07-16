/*
import java.io.File;
import java.io.PrintWriter;
import java.io.FileWriter;
import java.io.*;
import java.net.*;

public class server {
	public static void main(String[] args) {
		try {
			ServerSocket s = new ServerSocket(8123);
			System.out.println("Server is open on port 8123");

			Socket connected = s.accept();
			System.out.println("The client " + connected.getInetAddress() + ":" + connected.getPort() + " is connected");

			BufferedReader in = new BufferedReader(new InputStreamReader(connected.getInputStream()));
			PrintWriter  writer = new PrintWriter(new FileWriter("defaultWrite.txt", true));
			boolean check = true;
			while (check) {
				String fromClient = in.readLine();
				if(fromClient != null) {
					System.out.println("Receiving from WebTracker");
					System.out.println("Got:" + fromClient + " \n");
					writer.println(fromClient);
					writer.flush();
				} else {
					check = false;
					break;
				}
			}
			writer.close();
			s.close();
		} catch (Exception e) {
			System.err.println("error");
			e.printStackTrace();
		}
	}
}

*/





// code pulled from https://github.com/TooTallNate/Java-WebSocket/blob/master/src/main/example/ChatServer.java

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.nio.ByteBuffer;

import org.java_websocket.WebSocket;
import org.java_websocket.WebSocketImpl;
import org.java_websocket.framing.Framedata;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class server extends WebSocketServer {

	public server( int port ) throws UnknownHostException {
		super( new InetSocketAddress( port ) );
	}

	public server( InetSocketAddress address ) {
		super( address );
	}

	@Override
	public void onOpen( WebSocket conn, ClientHandshake handshake ) {
		conn.send("Welcome to the server!"); //This method sends a message to the new client
		broadcast( "new connection: " + handshake.getResourceDescriptor() ); //This method sends a message to all clients connected
		System.out.println( conn.getRemoteSocketAddress().getAddress().getHostAddress() + " entered the room!" );
	}

	@Override
	public void onClose( WebSocket conn, int code, String reason, boolean remote ) {
		broadcast( conn + " has left the room!" );
		System.out.println( conn + " has left the room!" );
	}

	@Override
	public void onMessage( WebSocket conn, String message ) {
		broadcast( message );
		System.out.println( conn + ": " + message );
	}
	@Override
	public void onMessage( WebSocket conn, ByteBuffer message ) {
		broadcast( message.array() );
		System.out.println( conn + ": " + message );
	}


	public static void main( String[] args ) throws InterruptedException , IOException {
		int port = 8123; // 843 flash policy port
		try {
			port = Integer.parseInt( args[ 0 ] );
		} catch ( Exception ex ) {
		}
		ChatServer s = new ChatServer( port );
		s.start();
		System.out.println( "ChatServer started on port: " + s.getPort() );

		BufferedReader sysin = new BufferedReader( new InputStreamReader( System.in ) );
		while ( true ) {
			String in = sysin.readLine();
			s.broadcast( in );
			if( in.equals( "exit" ) ) {
				s.stop(1000);
				break;
			}
		}
	}
	@Override
	public void onError( WebSocket conn, Exception ex ) {
		ex.printStackTrace();
		if( conn != null ) {
			// some errors like port binding failed may not be assignable to a specific websocket
		}
	}

	@Override
	public void onStart() {
		System.out.println("Server started!");
		setConnectionLostTimeout(0);
		setConnectionLostTimeout(100);
	}

}