import java.io.*;
import java.util.*;

public class removeUndefined{
    public static void main(String[] args){
        try{
            String filepath = "Server/Logs/all_results.log";
            File file = new File(filepath);
            Scanner scanner = new Scanner(file);
            String writepath = "Server/Logs/run.log";
            File filebuff = new File(writepath);
            FileWriter buff = new FileWriter(filebuff, false);
            buff.write("");
            buff.close();
            FileWriter fbuff = new FileWriter(filebuff, true);
            BufferedWriter bf = new BufferedWriter(fbuff);
            while(scanner.hasNextLine()){
                String line = scanner.nextLine();
                try{
                    String[] b = line.split(" ");
                    String[] c = b[5].split("/");
                    String[] d = c[2].split(":");
                    if(!d[3].equals("undefined")){
                        bf.write(line + "\n");
                    }
                }
                catch(Exception e){
                    bf.write(line + "\n");
                    continue;
                }
            }

            bf.close();
            scanner.close();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
}