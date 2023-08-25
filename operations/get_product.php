<?php
include 'db.php';

if (isset($_GET['id'])) {
    $productId = $_GET['id'];
    $sql = "SELECT * FROM products WHERE id = $productId";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $product = $result->fetch_assoc();
        echo json_encode($product);
    }
}

$conn->close();
?>
