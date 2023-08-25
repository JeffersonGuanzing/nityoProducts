<?php 
//Establish Connection 
$servername = "localhost:3307";
$username = "root";
$password = "@JohnWick05";
$dbname = "main_database";	

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
} 

?>
