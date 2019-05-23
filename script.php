<pre><?php
    $downloadLink = 'http://google.com/blablabla';
    $data = my_sql_real_escape_string($_POST['data']);
    $bridge = mysqli_connect('localhost','root','pizza','sites');
    $query = "INSERT INTO information (Data) VALUES ('$data')";
    if($bridge->query($query)){
        echo 'WEW';
    }
?>    
</pre>