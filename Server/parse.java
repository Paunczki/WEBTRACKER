/*
*   Here is a list of functions that works to show us results from the logs 
*
*   All static and main for simplicity
*/

import java.io.*;
// import java.lang.reflect.Array;
import java.util.*;
import java.lang.Math;

public class parse{
    // Change this filepath variable to log you want to use
    static String filepath = "Server/Logs/run.log";
    static File log = new File(filepath);
    public static void main(String[] args) throws FileNotFoundException{
        Scanner scanner = new Scanner(log);

        /*
        *   This while loop begins by going through each line of the log being used
        *   It identifies what lines are POST requests to the WebTracker server
        *   
        *   It then saves all sitevisited infrmation to each unique user in Hashmap "users"
        */
        HashMap<String, ArrayList<String>> users = new HashMap<>();
        while(scanner.hasNextLine()){
            String line = scanner.nextLine();
            String[] b = line.split(" ");
            // - - [01/Dec/2019:23:55:43 +0000] "POST /WebTracker/1575244543769:d387fed5acc1226:3:drive.google.com:1 HTTP/1.1" ...
            // 0 1            2            3      4                                    5                                6      ...      
            try{
                if(b[4].equals("\"POST")){
                    String[] c = b[5].split("/");
                    //   /WebTracker/1575244543769:d387fed5acc1226:3:drive.google.com:1
                    // 0       1                             2
                    String[] d = c[2].split(":");
                    // 1575244543769:d387fed5acc1226:3:drive.google.com:1
                    //       0              1        2         3        4
                    if(!users.containsKey(d[1])){ // d[1] is the unique ID
                        ArrayList<String> a = new ArrayList<>();
                        users.put(d[1], a);
                    }
                    if(users.containsKey(d[1])){
                        // now to store info of sites visited with all information
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
        
        /*
        *   This part is to gather all information (percents, overlaps, number of sites visited, and most visited sites)
        *   The outer loop iterates through each unique user encountered
        *   Read the inner loop for better understanding
        */
        HashMap<String, Double> percents = new HashMap<>();
        HashMap<String, ArrayList<Long>> overlaps = new HashMap<>();
        HashMap<String, ArrayList<Integer>> numSites = new HashMap<>();
        HashMap<String, HashMap<String, Integer>> top_sites = new HashMap<>();
        HashMap<String, String> downloadTime = new HashMap<>();
        for(String user:users.keySet()){
            // Initialization of variables for run through
            top_sites.put(user, new HashMap<String, Integer>());
            int countChange = 0;
            int countOverlap = 0;
            boolean overlap = false;
            HashMap<String, Double> open = new HashMap<>();
            Long beginLap = 0L;
            Long endLap = 0L;
            ArrayList<Long> time = new ArrayList<>();
            ArrayList<Integer> sitesPresent = new ArrayList<>();
            Double totalDownloadTime = 0.0;
            ArrayList<Double> medDownloadTime = new ArrayList<>();
            Double numDownloads = 0.0;
            /*
            *   This loop will iterate through all website visited information
            */
            for(int i=0; i<users.get(user).size(); i++){
                String[] info = users.get(user).get(i).split(":");
                //       timestamp     tabID       progress     website
                //          0            1            2            3
                if(info[2].equals("0")){ 
                    open.remove(info[1]); // site was closed/changed so no need to track
                }
                if(info.length < 4){ // an error check
                    continue;
                }

                if((open.size()>1) && (overlap == true) && (info[2].equals("1"))){
                    countOverlap++; 
                    // checks to see if two sites are "ON" at the same time
                }
                
                if((overlap == true) && (open.size()>1) && (Long.parseLong(info[0]) > (beginLap + 20000)) && (countOverlap == 2)){
                    overlap = false;
                    countOverlap = 0;
                    open.clear();
                    // Removes all overlap counting since one site was never Loaded
                }

                if((info[3].equals("www.google.com")) && (info[2].equals("1"))){
                    // google.com never sends a "Loaded" request so this is a way around now counting it
                    // makes sense since google.com loads quickly
                    if(!top_sites.get(user).containsKey(info[3])){
                        top_sites.get(user).put(info[3], 1);
                    }
                    else{
                        int temp = top_sites.get(user).get(info[3]) + 1;
                        top_sites.get(user).put(info[3], temp);
                    }
                    // System.out.println(open);
                    open.remove(info[1]);
                    countChange++;
                    continue;
                }

                if((info[3].equals("duckduckgo.com")) && (info[2].equals("1"))){
                    // duckduckgo.com also neversend a "Loaded" request
                    if(!top_sites.get(user).containsKey(info[3])){
                        top_sites.get(user).put(info[3], 1);
                    }
                    else{
                        int temp = top_sites.get(user).get(info[3]) + 1;
                        top_sites.get(user).put(info[3], temp);
                    }
                    open.remove(info[1]);
                    countChange++;
                    continue;
                }
                
                if(info[2].equals("1")){
                    if(!top_sites.get(user).containsKey(info[3])){
                        // First time a site was visited for the unique ID
                        top_sites.get(user).put(info[3], 1);
                    }
                    else{
                        // Increment times a certain site was visited for the unique ID
                        int temp = top_sites.get(user).get(info[3]) + 1;
                        top_sites.get(user).put(info[3], temp);
                    }
                    countChange++;
                    open.put(info[1], Double.parseDouble(info[0]));
                    // Puts this site as active (to see for overlap)
                }
                if(info[2].equals("2")){
                    try{
                        Double dt = Double.parseDouble(info[0]) - open.get(info[1]);
                        if(dt > 20000){
                            
                        }
                        else{
                            totalDownloadTime += dt;
                            medDownloadTime.add(dt/1000.0);
                            numDownloads++;
                        }
                    }
                    catch(Exception e){}
                    open.remove(info[1]);
                    // removes site from active
                }

                if((open.size()<2) && (overlap == true)){
                    // See that there is no longer an overlap
                    // Will now store information
                    endLap = Long.parseLong(info[0]);
                    overlap = false;
                    if ((endLap - beginLap) > 20000){
                        countOverlap = 0;
                        open.clear();
                        continue;
                    }
                    time.add(endLap - beginLap);
                    sitesPresent.add(countOverlap);
                    // System.out.println(sitesPresent);
                    countOverlap = 0;
                    continue;
                }
                if((open.size()>1) && (overlap == false)){
                    // See an overlap is present and turns overlap to true
                    beginLap = Long.parseLong(info[0]);
                    overlap = true;
                    countOverlap += 2;
                }
            }
            // Now to save certain measurements to each unique user 
            // meant so I can print in the end
            overlaps.put(user, time);
            double percent = ((overlaps.get(user).size())*100.0)/countChange;
            percents.put(user, percent);
            numSites.put(user, sitesPresent);
            Double adt = (totalDownloadTime / numDownloads) / 1000.0;
            Collections.sort(medDownloadTime);
            String stringADT = "Average Site Download time: " + adt + "\n";
            String stringMDT =  "Median Site Download time: " + medDownloadTime.get(medDownloadTime.size()/2) + "\n";
            double stand = 0.0;
            for(int z=0; z<medDownloadTime.size(); z++){
                // Do standard deviation
                stand += Math.pow(medDownloadTime.get(z) - adt, 2);
            }
            double sdt = Math.sqrt(stand / medDownloadTime.size());
            String stringSDDT = "Standard Deviation Site Download time: " + sdt;
            String toPut = stringADT + stringMDT + stringSDDT;
            downloadTime.put(user, toPut);
        }
        System.out.println("");

        /*
        *   This loop loops over all the stored length of overlaps
        */
        for(String user: overlaps.keySet()){
            System.out.println("Number of overlaps for " + user + ": " + overlaps.get(user).size());
            // This is just the number of overlaps recorded for that unique ID
            // System.out.println(overlaps.get(user));

            // all that follows finds the average, median, percent and standard deviation of length 
            // of overlaps
            double tot_time = 0;
            int num_overlaps = 0;
            ArrayList<Double> for_median = new ArrayList<>();
            for(int i=0; i<overlaps.get(user).size(); i++){
                num_overlaps++;
                tot_time += overlaps.get(user).get(i) / 1000.0;
                double temp = overlaps.get(user).get(i) / 1000.0;
                for_median.add(temp);
            }
            double avg_time = tot_time / num_overlaps;
            System.out.println("Average Time of overlaps was " + avg_time + " seconds");

            Collections.sort(for_median);
            try{
                double median = for_median.get(for_median.size() / 2);
                System.out.println("Median Time of overlaps was " + median + " seconds");
            }
            catch(Exception e){}

            double tot_site_overlap = 0.0;
            for(int j=0; j<numSites.get(user).size(); j++){
                tot_site_overlap += numSites.get(user).get(j);
            }
            double avg_sites_per_overlap = tot_site_overlap / num_overlaps;
            System.out.println("Average Number of sites in an overlap was " + avg_sites_per_overlap);

            System.out.println("Percent of visits being overlaps " + percents.get(user) + "%");

            // Standard Deviation
            double tot_x = 0;
            for(int x=0; x<overlaps.get(user).size(); x++){
                double temp = (overlaps.get(user).get(x)/1000.0) - avg_time;
                tot_x += temp * temp;
            }
            double std_dev = Math.sqrt(tot_x / (overlaps.get(user).size()-1));
            System.out.println("Standard Deviation of time was " + std_dev);

            int tot_visits = 0;
            for(String site: top_sites.get(user).keySet()){
                tot_visits += top_sites.get(user).get(site);
            }
            System.out.println("Number of total site visits: " + tot_visits);
            System.out.println("Total number of different sites visited by user: " + top_sites.get(user).size());
            
            // Need to order site by views
            ArrayList<String> site_name = new ArrayList<>();
            ArrayList<Integer> site_times = new ArrayList<>();
            for(String site: top_sites.get(user).keySet()){
                if(site_times.size() == 0){
                    String a = site + ": " + top_sites.get(user).get(site);
                    site_name.add(a);
                    site_times.add(top_sites.get(user).get(site));
                }
                int current_occur = top_sites.get(user).get(site);
                boolean changed = true;
                for(int i=0; i< site_times.size(); i++){
                    if((current_occur > site_times.get(i)) && changed){
                        String a = site + ": " + top_sites.get(user).get(site);
                        site_name.add(i, a);
                        site_times.add(i, top_sites.get(user).get(site));
                        changed = false;
                    }
                }
                if(changed){
                    String a = site + ": " + top_sites.get(user).get(site);
                    if(site_name.contains(a)){
                        continue;
                    }
                    site_name.add(a);
                    site_times.add(top_sites.get(user).get(site));
                }
            }
            System.out.println("Sites by number of visits: " + site_name);

            System.out.println(downloadTime.get(user));

            System.out.println("");
        }
        
        scanner.close();
    }
}
