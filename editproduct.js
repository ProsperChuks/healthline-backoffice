let params = new URLSearchParams(window.location.search);
let id = params.get('id');

if (id) {
    document.getElementById('dele').style.display = 'block'
    let form = document.getElementById('addProduct');
    fetch('https://prosperc40.pythonanywhere.com/products/' + id)
    .then(response => response.json())
    .then(product => {
        console.log(product.indications);
        document.getElementById('imagePreview').src = product.image;
        document.getElementById('imagePreview').style.display = 'block';
        document.getElementById('drug_name').value = product.drug_name;
        document.getElementById('drug_des').value = product.drug_desc;
        document.getElementById('price').value = product.price;
        document.getElementById('cate').value = product.category;
        document.getElementById('presen').value = product.presentation;
        document.getElementById('compos').value = product.composition;
        document.getElementById('indica').value = product.indications;
    })
    .catch(error => console.error('Error:', error));

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // Call your function to send a POST request
        const indications = $(this).find('textarea[name="indications"]').val();
        const indicationsArray = indications.split(',').map(item => item.trim());
        const formData2 = new FormData();
        
        fetch(document.getElementById('imagePreview').src)
            .then((res) => res.blob())
            .then((myBlob) => {
            const myFile = new File([myBlob], 'image.jpeg', {type: myBlob.type});

            formData2.append('image', $('#file-input')[0].files[0] || myFile); 
            formData2.append('drug_name', $(this).find('input[name="drug_name"]').val()); 
            formData2.append('drug_desc', $(this).find('textarea[name="desc"]').val());
            formData2.append('price', $(this).find('input[name="price"]').val());
            formData2.append('category', $(this).find('input[name="category"]').val());
            formData2.append('presentation', $(this).find('input[name="presentation"]').val());
            formData2.append('composition', $(this).find('textarea[name="composition"]').val());
            formData2.append('indications', JSON.stringify(indicationsArray));

            // Send AJAX request
            $.ajax({
                url: `https://prosperc40.pythonanywhere.com/products/${id}`,
                method: "PUT",
                headers: {
                    'Authorization': 'Token ' + token
                },
                data: formData2,
                processData: false,
                contentType: false,
                success: function(response) {
                    window.location.href = 'products.html'; 
                },
                error: function(jqXHR, textStatus, errorThrown) { // Enhanced error handling
                    console.log('Error: ', jqXHR, textStatus, errorThrown);
                    $('#resultMessage').html('Failed to Edit.');
                }
            });
        });
    });

    document.getElementById('dele').addEventListener('click', function() {
        $.ajax({
            url: `https://prosperc40.pythonanywhere.com/products/${id}`,
            method: "DELETE",
            headers: {
                'Authorization': 'Token ' + token
            },
            success: function(response) {
                window.location.href = 'products.html'; 
            },
            error: function(jqXHR, textStatus, errorThrown) { // Enhanced error handling
                console.log('Error: ', jqXHR, textStatus, errorThrown);
                $('#resultMessage').html('Failed to Delete.');
            }
        });
    })
} else {
    isEditing = false;
    console.log('No ID present in the URL');
}
