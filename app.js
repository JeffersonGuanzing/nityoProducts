$(document).ready(function() {
    loadRecords();
    function getMonthName(monthNumber) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[monthNumber - 1];
    }
    function loadRecords() {
        $.ajax({
            url: "operations/read_records.php",
            type: "GET",
            processData: false,
            dataType: "json", // Expecting JSON data
            
            success: function(data) {
                console.log(data);
                var productContainer = $("#product-row");
    
                productContainer.empty(); // Clear the container
    
                // Loop through the products and populate the HTML
                $.each(data, function(index, product) {

                    const expiryDate = new Date(product.expiry_date);
                    const formattedExpiryDate = `${getMonthName(expiryDate.getMonth() + 1)} ${expiryDate.getDate()}  ${expiryDate.getFullYear()}`;

                    var productCard = `
                        <div class=" col-md-4 col-sm-12">
                            <div class="card product-card">
                                <img src="images/${product.image}" alt="${product.name}" class="card-img-top" style="height: 250px;"/>
                                <div class="card-body">
                                    <h5 class="card-title">${product.name}</h5>
                                    <p class="card-text">Unit: ${product.unit}</p>
                                    <p class="card-text">Price: ${product.price}</p>
                                    <p class="card-text">Expiry Date: ${formattedExpiryDate}</p>
                                    <p class="card-text">Inventory: ${product.inventory}</p>
                                    <p class="card-text">Inventory Cost: ${product.inventory_cost}</p>
                                    <button class="btn btn-danger delete-btn mr-2" data-record-id="${product.id}">Delete</button>
                                    <button class="btn btn-primary update-btn mr-2" data-record-id="${product.id}" data-bs-toggle="modal" data-bs-target="#updateModal">Update</button>
                                </div>
                            </div>
                        </div>
                    `;
    
                    productContainer.append(productCard); // Use append() to add each product card
                });
            }
        });
    }
    

    $("#product-list").on("click", ".delete-btn", function() {
        var recordId = $(this).data("record-id");

        $.ajax({
            url: "operations/delete_records.php",
            type: "POST",
            data: { record_id: recordId },
            success: function(response) {
                loadRecords();
            }
        });
    });

    $("#product-form").submit(function(e) {
        e.preventDefault();

        var formData = new FormData(this);

        $.ajax({
            url: "operations/save_record.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                loadRecords();
                $("#product-form")[0].reset();

                var alertContainer = $("#alert-container");
                alertContainer.html('<div class="alert alert-success" role="alert">Record added successfully!</div>');

                setTimeout(function() {
                    alertContainer.empty();
                }, 3000); 
            }
        });
    });
});


// Event delegation for dynamically created elements
$(document).on("click", ".update-btn", function() {
    var row_id = $(this).data("record-id");
    $("#updateModal").modal("show");
    console.log("After modal show");
});

$("#update-modal-submit").click(function() {
    var product_id = $(this).data("product-id");

    // Collect updated data from modal fields
    var updatedData = {
        id: product_id,
        name: $("#update-product-name").val(),
        unit: $("#update-unit").val(),
        price: $("#update-price").val(),
        // Collect other fields similarly
    };

    // Send the updated data to the server for processing
    $.ajax({
        url: "operations/update_product.php", // Replace with the appropriate URL to update the product
        type: "POST",
        data: updatedData,
        dataType: "json",
        success: function(response) {
            // Handle success or update UI as needed
            // Close the modal if the update was successful
            $("#updateModal").modal("hide");
            // Refresh the records display
            loadRecords();
        }
    });
});
