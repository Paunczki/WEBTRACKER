import java.io.*;
import java.lang.reflect.Array;
import java.util.*;

public class parse{
    static String filepath = "Server/Logs/november20.log";
    static File log = new File(filepath);
    public static void main(String[] args) throws FileNotFoundException{
        Scanner scanner = new Scanner(log);
        HashMap<String, ArrayList<String>> users = new HashMap<>();
        while(scanner.hasNextLine()){
            String line = scanner.nextLine();
            String[] b = line.split(" ");
            try{
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
            }catch(Exception e){
                continue;
            }
        }
        
        HashMap<String, Double> percents = new HashMap<>();
        HashMap<String, ArrayList<Long>> overlaps = new HashMap<>();
        HashMap<String, ArrayList<Integer>> numSites = new HashMap<>();
        for(String user:users.keySet()){
            int countChange = 0;
            int countOverlap = 0;
            boolean overlap = false;
            HashMap<String, String> open = new HashMap<>();
            Long beginLap = 0L;
            Long endLap = 0L;
            // int numWebsitesInOverlap = 0;
            ArrayList<Long> time = new ArrayList<>();
            ArrayList<Integer> sitesPresent = new ArrayList<>();
            for(int i=0; i<users.get(user).size(); i++){
                String[] info = users.get(user).get(i).split(":");
                if(info[2].equals("0")){
                    open.remove(info[1]);
                }
                if(info[2].equals("1")){
                    countChange++;
                    open.put(info[1], "open");
                }
                if(info[2].equals("2")){
                    open.remove(info[1]);
                }
                
                if((open.size()>1) && (overlap == true) && (info[2].equals("1"))){
                    countOverlap++;
                }

                if((open.size()<2) && (overlap == true)){
                    endLap = Long.parseLong(info[0]);
                    overlap = false;
                    time.add(endLap - beginLap);
                    sitesPresent.add(countOverlap);
                }
                if((open.size()>1) && (overlap == false)){
                    beginLap = Long.parseLong(info[0]);
                    overlap = true;
                    countOverlap += 2;
                }
            }
            double percent = (countOverlap*1.0)/countChange;
            percents.put(user, percent);
            overlaps.put(user, time);
            numSites.put(user, sitesPresent);
        }

        /*
        int countZero = 0;
        int countOverlappers = 0;
        double sumPercent = 0;
        for(String user: percents.keySet()){
                // Here I need to do the following overlap information
                //  1) For each user get number of times there were overlapped websites 
                //     (that is, start visiting one website before previous website(s) finished loading)
                //  2) If there is an overlap, see how many websites are in the overlap
                //  3) For each overlap, what is the length of time of the overlap
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
        // System.out.println("Number of sites visited: " + countChange);
        System.out.println("Number of times there were overlaps: " + 0 + "\n\n"); // Need to complete
        */

        for(String user: overlaps.keySet()){
            System.out.println("Number of overlaps for " + user + ": " + overlaps.get(user).size());
            for(int i=0; i<overlaps.get(user).size(); i++){
                //System.out.println("  - Overlap " + (i+1) + " was " + (overlaps.get(user).get(i)/1000.0) + " seconds long");
                //System.out.println("  - With " + numSites.get(user).get(i) + " websites accessed within the overlap");
            }
        }
        // cp to copy to /home/john/
        // scp to save to local computer

        scanner.close();
    }
}