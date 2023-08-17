$(document).ready(function() {
	$(document).on('click', '.btnaction', function () {
            var action = $(this).attr('data-original-title');
            var id = $(this).attr('id');
            if (action == 'edit' || action == "view") {
                $.ajax({
                    type: 'post',
                    url: base_url+'admin/get_service_request',
                    data: "id=" + id,
                    success: function (data) {
                        $("#confirm").modal("show");
                        $("#response").html(data);
                    }
                });
            }
            if (action == 'delete') {
                $('#confirmdel')
                        .modal('show', {backdrop: 'static', keyboard: false})
                        .one('click', '#delete', function (e) {
                            $.ajax({
                                type: 'post',
                                url: base_url+'admin/users/delete',
                                data: "user_id=" + id,
                                success: function () {
                                    $('.hiderow' + id).closest('tr').hide();
                                }
                            });
                        });
            }
        });
            $('[data-gallery=manual]').click(function (e) {

                  e.preventDefault();

                  var items = [],
                    // get index of element clicked
                    options = {
                      index: $(this).index()
                    };

                  // looping to create images array
                  $('[data-gallery=manual]').each(function () {
                    let src = $(this).attr('href');
                    items.push({
                      src: src
                    });
                  });

                  new PhotoViewer(items, options);

                });

});