<?php
//if(isSet($_POST['data'])){
    $data = $_POST['data'];
    $bridge = mysqli_connect('localhost','root','pizza','sites');
    $stmt = mysqli_prepare($bridge, 'INSERT INTO collect (input) VALUES ($data)');
    mysqli_stmt_binf_param('$stmt', 's', $_POST['data']);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($bridge);
    
    
    //$query = "INSERT INTO collect (input) VALUES ('$data')";
    
    
    mysqli_close($bridge);
//}



/*
    if(isSet($_POST['url'])){
        $con = mysqli_connect('localhost', 'root', 'my_pw', 'my_db');
        // ...
        $stmt = mysqli_prepare($con, 'INSERT INTO urlHistory (URLs) VALUES (?)');
        mysqli_stmt_bind_param($stmt, 's', $_POST['url']);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        mysqli_close($con);
    }
*/

?>