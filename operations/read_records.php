<?php
    // Database connection
    include 'db.php';

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Fetch product records
    $result = $conn->query("SELECT * FROM products");

    $products = array(); // Array to hold product data

    while ($row = $result->fetch_assoc()) {
        $inventoryCost = $row['inventory'] * $row['price']; // Calculate inventory cost

        $product = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'unit' => $row['unit'],
            'price' => $row['price'],
            'expiry_date' => $row['expiry_date'],
            'inventory' => $row['inventory'],
            'inventory_cost' => $inventoryCost,
            'image' => $row['image'] // Add the image filename to the product array
        );

        array_push($products, $product);
    }

    // Close the connection
    $conn->close();

    // Return the products array as JSON
    header('Content-Type: application/json');
    echo json_encode($products);
?>
