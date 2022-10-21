$('.set_active_all_selected, .set_not_active_all_selected, .delete_all_selected').hide();

//--->select/unselect all > start

$(document).on('click', '#all-items', function () {
    $('.custom-control-input').not(this).prop('checked', this.checked);
});
$(document).on('change', '.custom-control-input',function () {
    if ($('.custom-control-input:checked').length == $('.custom-control-input').length) {
        $('#all-items').prop('checked', true);
    } else {
        $('#all-items').prop('checked', false);
    };
});

//--->select/unselect all > end

//--->edit one user > start
function reply_click()
{
    alert(event.target.id);
};

//--->edit one user > end

$('#ModalWindow').on('show.bs.modal', function (event) {
  $('.form-group, .error, .result, #notcheck, #add_user, #edit_user, #del_user, .add_text, .edit_text, .del_text, .set_default, .set_active, .set_notactive, .set_delete, #active, #notactive, #delete').hide();
  const button = $(event.relatedTarget); // Button that triggered the modal
  const recipient = button.data('whatever'); // Extract info from data-* attributes
  const all_active_checkbox = $('.custom-control-input:checked').length;
  const select_value = document.getElementById("user_profile").value;
  let id_user = button.data('id');

  if (!id_user) id_user = 'modal';
  $(this).find('.hidden').val(id_user);
  $(this).find('.modal-title').text(recipient);

  if (recipient == 'Add') {
    $('.form-group, #add_user, .add_text').show();
    $('#first_name').val('');
    $('#last_name').val('');
    $('#status').is(function () {
        $(this).val(0);
        if ($(this).val() == 0) {
            $(this).prop('checked', false);
        } else {
            $(this).prop('checked', true);
        }
    });
    $('#role').val(1);
  };

   if (recipient == 'Change') {
    $('.form-group, #edit_user, .edit_text').show();

    $.ajax({
        url: 'ajax/get_user.php',
        type: 'GET',
        cache: false,
        data: {
            id_user: id_user,
        },
        dataType: 'json',
        success: function (data) {
             //$.getJSON("ajax/get_user.php?id_user=" + id_user, function (data) {
                 const first_name = data.user.first_name;
                 const last_name = data.user.last_name;
                 const status = data.user.status;
                 const role = data.user.role;
                $('#first_name').val(first_name);
                 $('#last_name').val(last_name);
                 $('#status').is(function () {
                     $(this).val(status);
                     if (status == 0) $(this).prop('checked', false);
                     else $(this).prop('checked', true);
                 });
                 $('#role').val((role=='User')?1:2);
             //});
        },
        error: function(request, status, errorT) {
             console.log(errorT);
        }
    });
  };

  if (recipient == 'Delete') {
    $('.del_text, #del_user').show();
  };

  if (recipient == 'Action on the user') {
    if (!select_value) {
      $('#notcheck, .error').show();
    } else if (all_active_checkbox == 0) {
      $('#set_default, .error').show();
    } else if (select_value == 1) {
      $('.set_active, #active').show();
    } else if (select_value == 2) {
      $('.set_notactive, #notactive').show();
    } else if (select_value == 3) {
      $('.set_delete, #delete').show();
    };
  };

  //console.log($('.custom-control-input:checked'));
});

function get_checkbox() {
  let array_checkbox_id = Array();
  $('.custom-control-input:checked').each(function() {
    //console.log($(this).context.id)});
    array_checkbox_id.push($(this).context.id);
  });
  return array_checkbox_id;
};

$('#edit_user').click(function () {
    const fname = $('#first_name').val();
    const lname = $('#last_name').val();
    const status = $('#status').val();
    const role = ($('#role').val()==1)?'User':'Admin';
    const id_user = $('#ModalWindow').find('.hidden').val();

    $.ajax({
        url: 'ajax/edit_user.php',
        type: 'POST',
        cache: false,
        data: {
            id_user: id_user,
            first_name: fname,
            last_name: lname,
            status: status,
            role: role,
        },
        dataType: 'json',
        success: function (data) {
            if (data.status) {
                $('.result')
                    .show()
                    .text('You have successfully edited the user');
                $('.error, .form-group, #edit_user, .edit_text').hide();
                updateData();
                return false;
            }
            $('.result').hide();
            $('.error').show(function () {
                $(this).text(data.error.message);
                console.log('error');
            });
        },
         error: function(request, status, errorT) {
             console.log(errorT);
           }
    });
    console.log('click #edit_user id=' + id_user);
});

$('#add_user').click(function () {
    const fname = $('#first_name').val();
    const lname = $('#last_name').val();
    const status = $('#status').val();
    const role = ($('#role').val()==1)?'User':'Admin';

    console.log(fname, lname, status, role);

    $.ajax({
        url: 'ajax/add_user.php',
        type: 'POST',
        cache: false,
        data: {
            first_name: fname,
            last_name: lname,
            status: status,
            role: role,
        },
        dataType: 'json',
        success: function (data) {
            if (data.status) {
                $('.result')
                    .show()
                    .text('You have successfully added a user');
                $('.error, .form-group, #add_user, .add_text').hide();
                updateData();
                return false;
            }
            $('.result').hide();
            $('.error').show(function () {
                $(this).text(data.error);
                console.log('error');
            });
        },
         error: function(request, status, errorT) {
             console.log(errorT);
           }
    });
    console.log('click #add_user');
});

$('#del_user').click(function () {
    const id_user = $('#ModalWindow').find('.hidden').val();

    $.ajax({
        url: 'ajax/delete_user.php',
        type: 'POST',
        cache: false,
        data: {
            id_user: id_user,
        },
        dataType: 'json',
        success: function (data) {
          console.log(data);
            if (data.status) {
                $('.result')
                    .show()
                    .text('You have successfully deleted the user');
                $('.error, #del_user, .del_text').hide();
                updateData();
                return false;
            }
            $('.result').hide();
            $('.error').show(function () {
                $(this).text(data.error);
                console.log('error');
            });
        },
        error: function(request, status, errorT) {
             console.log(errorT);
           }
    });
    console.log('click #del_user id=' + id_user);
});

$('#active').click(function () {
    const checkbox = get_checkbox();
    const status = 1;
    console.log(checkbox);

    $.ajax({
        url: 'ajax/set_status.php',
        type: 'POST',
        cache: false,
        data: {
            checkbox: checkbox,
            status: status
        },
        dataType: 'json',
        success: function (data) {
            if (data.status) {
                $('.result')
                    .show()
                    .text('You have successfully set the status to active for selected users');
                $('.error, #active, .set_active').hide();
                updateData();
                return false;
            }
            $('.result').hide();
            $('.error').show(function () {
                $(this).text(data.error);
                console.log('error');
            });
        },
         error: function(request, status, errorT) {
             console.log(errorT);
           }
    });
    console.log('click #active id=' + checkbox);
});

$('#notactive').click(function () {
    const checkbox = get_checkbox();
    const status = 0;
    console.log(checkbox);

    $.ajax({
        url: 'ajax/set_status.php',
        type: 'POST',
        cache: false,
        data: {
            checkbox: checkbox,
            status: status
        },
        dataType: 'json',
        success: function (data) {
            if (data.status) {
                $('.result')
                    .show()
                    .text('You have successfully set the status to not active for selected users');
                $('.error, #notactive, .set_notactive').hide();
                updateData();
                return false;
            }
            $('.result').hide();
            $('.error').show(function () {
                $(this).text(data.error);
                console.log('error');
            });
        },
         error: function(request, status, errorT) {
             console.log(errorT);
           }
    });
    console.log('click #notactive id=' + checkbox);
});

$('#delete').click(function () {
    const checkbox = get_checkbox();
    const status = 0;
    console.log(checkbox);

    $.ajax({
        url: 'ajax/set_delete.php',
        type: 'POST',
        cache: false,
        data: {
            checkbox: checkbox
        },
        dataType: 'json',
        success: function (data) {
            if (data.status) {
                $('.result')
                    .show()
                    .text('You have successfully deleted the selected users');
                $('.error, #delete, .set_delete').hide();
                updateData();
                return false;
            }
            $('.result').hide();
            $('.error').show(function () {
                $(this).text(data.error);
                console.log('error');
            });
        },
         error: function(request, status, errorT) {
             console.log(errorT);
           }
    });
    console.log('click #delete id=' + checkbox);
});

function updateData() {
    $.ajax({
        type: "GET",
        url: 'ajax/all_users.php',
        success: function (response) {
            $('#content').html(response);
        },
    });
};

$('input[type="checkbox"]').change(function(){
  $('#status').val(($('#status').val() == 1)?0:1);
});

$('select.user_profile').click(function () {
    const selected = $(this).children('option:selected').val();

    $('select.user_profile').not(this).val(selected);

    console.log(selected);

    });