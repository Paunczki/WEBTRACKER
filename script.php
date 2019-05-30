<pre><?php
    /*
    $name = $_POST['name'];
    $email = $_POST['email'];
    
    $dbhost = 'localhost';
    $dbuser = 'root';
    $dbpass = '';
    $conn = mysql_connect($dbhost, $dbsuer, $dbpass);
    if($conn){
        die('Could not conenct: ' .mysql_error());
    }
    $author = $_POST['name'];
    $mousepositions = $_POST['positon'];
    var_dump($author);
    $sql = "INSERT INTO Images (Author, Image) VALUES ('$author','$mousepositions')";
    mysql_select_db('db_to_use');
    $retval = mysql_query($sql, $conn);
    if(!$retval){
        die('Could not enter data: ' .mysql_error());
    }
    echo "Entered data successfully\n";
    mysql_close($conn);
    */
    $servername = "147.126.10.152";
    $database = "sites";
    $username = "root";
    $password = "";
    $conn = mysqli_connect($servername, $username, $password, $database);
    if (!$conn) {
          die("Connection failed: " . mysqli_connect_error());
    }
     
    echo "Connected successfully";
     
    $sql = "INSERT INTO collect (input) VALUES ('hello')";
    if (mysqli_query($conn, $sql)) {
          echo "New record created successfully";
    } else {
          echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
?>
</pre>