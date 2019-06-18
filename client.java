import java.io.*;
import java.net.*;
import java.io.FileWriter;
import java.io.BufferedWriter;
import java.io.File;

public class client {
	public static void main(String[] args) {
		try {
			InetAddress localhost = InetAddress.getByName("localhost");
			Socket s = new Socket(localhost, 9000);
			BufferedReader in = new BufferedReader(new InputStreamReader(s.getInputStream()));
			BufferedWriter writer = new BufferedWriter(new FileWriter("objectlist.txt",true));
			System.out.println("Receiving from Python");
			String object = in.readLine();
			System.out.println("Got: " + object);
			writer.write(object + "\n");
		} catch (Exception e) {
			System.err.println("error");
			e.printStackTrace();
		}
	}
}
