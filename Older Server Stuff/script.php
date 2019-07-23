<pre><?php
    $servername = "localhost";
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