$('*[data-toggle="modal"]').on('click', function () {
    var item = $(this).parent().parent()
    var modalText = item.find('[data-modal-text]')[0].innerText;
    var modalTitle = item.find('[data-modal-title]')[0].innerText;    
    var modalImg = item.find('[data-modal-img]')[0];
    
    $('#modal-title').text(modalTitle);
    $('#modal-text').text(modalText);
    $('#modal-img').attr("src", modalImg.src);
    
})

