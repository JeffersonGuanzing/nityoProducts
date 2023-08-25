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
            dataType: "json", 
            
            success: function(data) {
                console.log(data);
                var productContainer = $("#product-row");
    
                productContainer.empty(); 
    
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
    
                    productContainer.append(productCard); 
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


$(document).on("click", ".update-btn", function() {
    var product_id = $(this).data("record-id");

    $.ajax({
        url: "operations/get_product.php",
        type: "GET",
        data: { id: product_id },
        dataType: "json",
        success: function(product) {
            $("#update-product-name").val(product.name);
            $("#update-product-unit").val(product.unit);
            $("#update-product-price").val(product.price);
            $("#update-expiry-date").val(product.expiry_date);
            $("#update-inventory-count").val(product.inventory);

            $("#update-modal-submit").data("product-id", product_id);

            $("#updateModal").modal("show");
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
});

$(document).ready(function() {
    $("#update-modal-submit").click(function(e) {
        e.preventDefault(); 

        var product_id = $(this).data("product-id");

        var updatedData = {
            id: product_id,
            name: $("#update-product-name").val(),
            unit: $("#update-product-unit").val(),
            price: $("#update-product-price").val(),
            expiry_date: $("#update-expiry-date").val(),
            inventory: $("#update-inventory-count").val()
        };

        console.log(updatedData)
        
        $.ajax({
            url: "operations/update_records.php",
            type: "POST",
            data: updatedData,
            dataType: "json",
            success: function(response) {
                console.log(response);
                $("#updateModal").modal("hide");
                loadRecords();
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    });
});

