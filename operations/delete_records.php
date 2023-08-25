<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Database connection

    include 'db.php';

    // Get the ID of the record to delete
    $recordId = $_POST["record_id"];

    // Prepare and execute the delete query
    $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
    $stmt->bind_param("i", $recordId);
    
    if ($stmt->execute()) {
        echo "Record deleted successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the connection
    $stmt->close();
    $conn->close();
}
?>
