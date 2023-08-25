<?php
    include 'db.php';

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $result = $conn->query("SELECT * FROM products");

    $products = array(); 

    while ($row = $result->fetch_assoc()) {
        $inventoryCost = $row['inventory'] * $row['price']; 
        $product = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'unit' => $row['unit'],
            'price' => $row['price'],
            'expiry_date' => $row['expiry_date'],
            'inventory' => $row['inventory'],
            'inventory_cost' => $inventoryCost,
            'image' => $row['image'] 
        );

        array_push($products, $product);
    }

    $conn->close();

    header('Content-Type: application/json');
    echo json_encode($products);
?>
