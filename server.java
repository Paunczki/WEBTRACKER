import java.io.File;
import java.io.PrintWriter;
import java.io.FileWriter;
import java.io.*;
import java.net.*;

public class server {
	public static void main(String[] args) {
		try {
			ServerSocket s = new ServerSocket(9000);
			System.out.println("Server is open on port 9000");

			Socket connected = s.accept();
			System.out.println("The client " + connected.getInetAddress() + ":" + connected.getPort() + " is connected");

			BufferedReader in = new BufferedReader(new InputStreamReader(connected.getInputStream()));
			PrintWriter  writer = new PrintWriter(new FileWriter("objectlist.txt", true));
			boolean check = true;
			while (check) {
				String fromClient = in.readLine();
				if(fromClient != null) {
					System.out.println("Receiving from Python");
					System.out.println("Got:" + fromClient + " \n");
					writer.println(fromClient);
					writer.flush();
				} else {
					check = false;
					break;
				}
			}
		} catch (Exception e) {
			System.err.println("error");
			e.printStackTrace();
		}
	}
}

