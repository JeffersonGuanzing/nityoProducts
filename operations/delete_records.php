<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    include 'db.php';

    $recordId = $_POST["record_id"];

    $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
    $stmt->bind_param("i", $recordId);
    
    if ($stmt->execute()) {
        echo "Record deleted successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
