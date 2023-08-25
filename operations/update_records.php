<?php

include 'db.php'

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $product_id = $_POST["id"];
    $name = $_POST["name"];
    $unit = $_POST["unit"];
    $price = $_POST["price"];
    $expiry_date = $_POST["expiry_date"];
    $inventory = $_POST["inventory"];

    $sql = "UPDATE products SET name = ?, unit = ?, price = ?, expiry_date = ?, inventory = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdssi", $name, $unit, $price, $expiry_date, $inventory, $product_id);

    if ($stmt->execute()) {
        echo 'success'
    } else {
       echo 'fail'
    }

    $stmt->close();
    $conn->close();
}
?>
