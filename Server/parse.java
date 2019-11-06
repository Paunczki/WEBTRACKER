import java.io.*;
import java.util.*;

public class parse{
    static String filepath = "Server/Logs/log_test.txt";
    static File log = new File(filepath);
    public static void main(String[] args) throws FileNotFoundException{
        Scanner scanner = new Scanner(log);
        System.out.println(log);
        while(scanner.hasNextLine()){
            String line = scanner.nextLine();
            String[] b = line.split(" ");
            if(b[4].equals("\"POST")){
                // b[5] is the information
                String[] c = b[5].split("/");
                System.out.println(c[2]);
                // c[2] is the information we want
            }
        }
        scanner.close();
    }
}