import java.io.*;
import java.util.*;

public class parse{
    static String filepath = "Server/Logs/log_test.txt";
    static File log = new File(filepath);
    public static void main(String[] args) throws FileNotFoundException{
        Scanner scanner = new Scanner(log);
        HashMap<String, ArrayList<String>> users = new HashMap<>();
        while(scanner.hasNextLine()){
            String line = scanner.nextLine();
            String[] b = line.split(" ");
            if(b[4].equals("\"POST")){
                String[] c = b[5].split("/");
                String[] d = c[2].split(":");
                if(!users.containsKey(d[1])){
                    ArrayList<String> a = new ArrayList<>();
                    users.put(d[1], a);
                }
                if(users.containsKey(d[1])){
                    String e = d[0] + ":" + d[2] + ":" + d[4] + ":" + d[3];
                    //       timestamp     tabID       progress     website
                    //          0            1            2            3
                    users.get(d[1]).add(e);
                }
            }
        }
        
        HashMap<String, Double> percents = new HashMap<>();
        for(String user:users.keySet()){
            String tabID = "";
            int countChange = 0;
            int countOverlap = 0;
            HashMap<String, String> open = new HashMap<>();
            for(int i=0; i<users.get(user).size(); i++){
                String[] info = users.get(user).get(i).split(":");
                if(i == 0){
                    tabID = info[1];
                }
                if(info[2].equals("0")){
                    open.put(info[1], "closed");
                }
                if(info[2].equals("1")){
                    countChange++;
                    open.put(info[1], "open");
                }
                if(info[2].equals("2")){
                    open.put(info[1], "open");
                }
                if((open.get(tabID).equals("open"))&&(!tabID.equals(info[1]))){
                    // See if overlap
                    countOverlap++;
                }
                if(!info[2].equals("0")){
                    // Update tabID
                    tabID = info[1];
                }
            }
            double percent = (countOverlap*1.0)/countChange;
            percents.put(user, percent);
        }

        int countZero = 0;
        int countOverlappers = 0;
        double sumPercent = 0;
        for(String user: percents.keySet()){
            if(percents.get(user) == 0.0){
                countZero++;
            }
            if((percents.get(user)>0.0) && (percents.get(user)<1.0)){
                countOverlappers++;
                sumPercent += percents.get(user);
            }
        }
        // countZero is the number of people who do not overlap
        // countOverlappers is the number of people who overlap sites
        if(countOverlappers != 0){
            double averagePercent = sumPercent / countOverlappers;
            System.out.println(averagePercent);
        }
        System.out.println((countOverlappers*1.0) / (countOverlappers+countZero));
        scanner.close();



        /*
            1) For each user get number of website visits and number of times there were overlapped websites 
               (that is, start visiting one website before previous website(s) finished loading)
            2) If there is an overlap, see how many websites are in the overlap
            3) For each overlap, what is the length of time of the overlap
        */
    }
}