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
                    String e = d[0] + ":" + d[2] + ":" + d[4];
                    //       timestamp     tabID       progress
                    //          0            1            2
                    users.get(d[1]).add(e);
                }
            }
        }
        
        for(String user:users.keySet()){
            String tabID = users.get(user).get(0);
            boolean siteChange = false;
            int countChange = 0;
            int countOverlap = 0;
            for(int i=0; i<users.get(user).size(); i++){
                String[] info = users.get(user).get(i).split(":");
                if(i == 0){tabID = info[1];}
                if(info[2].equals("1")){
                    countChange++;
                    siteChange = true;
                }
                System.out.println((!info[1].equals(tabID))&&(siteChange == true));
                if((!info[1].equals(tabID))&&(siteChange == true)){
                    countOverlap++;
                    tabID = info[1];
                }
                if(info[2].equals("0")){
                    siteChange = false;
                }
            }
            System.out.println(countOverlap + " / " + countChange);
        }
        scanner.close();
    }
}

/*
    Want to first see if we can see if an overlap is detected, and as an added bonus try to make it efficient as possible

    We want to do this by sorting each section by a unique ID, which each user has
        - First create an HashMap of user as key and value being ArrayList<String> of all activity (include the whole info string)
        - This iterates through logs and now we only need to iterte through our structure

        - Create a new HashMap of key as UserID and value a percentage placeholder
        - Iterating through the datastructure
            - We want to count overlaps, to do this we should have a running variable
            - The variable will be an int for the tabID
            - We want to check for every value within the datastructure to see if it is a 0, meaning the tabID was closed
            - If the tabID was not closed and another tabID has information passed, then we know an overlap has occurred
            - Increase a counter variable for each UserID by one for each overlap
            - Additionally for every 1 encountered increase another counter by 1
        - Once we have iterated through each UserID's ArrayList, save to another datastructure the percent, 
            - percent calculated by dividing the number of overlaps by the number of site changes
    - We can then get an overall average percentage by iterating through each user, or doing it directly
*/
