<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'db.php';

    $productName = $_POST["product_name"];
    $productUnit = $_POST["product_unit"];
    $productPrice = $_POST["product_price"];
    $expiryDate = $_POST["expiry_date"];
    $inventoryCount = $_POST["inventory_count"];

    $targetDirectory = '../images/';
    $uploadedFileName = $_FILES["product_image"]["name"];
    $cleanedFileName = str_replace(' ', '_', $uploadedFileName);
    $imagePath = $targetDirectory . $cleanedFileName;

    if (move_uploaded_file($_FILES["product_image"]["tmp_name"], $imagePath)) {
        $stmt = $conn->prepare("INSERT INTO products (name, unit, price, expiry_date, inventory, image) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdsss", $productName, $productUnit, $productPrice, $expiryDate, $inventoryCount, $imagePath);

        if ($stmt->execute()) {
            echo "Record saved successfully!";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Error moving the uploaded file.";
    }

    $conn->close();
}
?>
