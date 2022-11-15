
$(document).on('click', '#all-items', function () {
    $('.custom-control-input').not(this).prop('checked', this.checked);
});

$(document).on('change', '.custom-control-input',function () {
    console.log($('#all-items').prop('checked'));
    if ($('.custom-control-input:checked').length == $('.custom-control-input').length
        ||($('.custom-control-input:checked').length == $('.custom-control-input').length-1 && !$('#all-items').prop('checked'))) {
        $('#all-items').prop('checked', true);
    } else {
        $('#all-items').prop('checked', false);
    }
});

//--->select/unselect all > end

function get_checkbox() {
  let array_checkbox_id = '';
  $('.custom-control-input:checked').each(function() {
    if ($(this).context.id != 'all-items') {
        console.log($(this).context.id);
        array_checkbox_id += $(this).context.id + ",";
    }
  });
  return array_checkbox_id;
}

function action_on_users(select_value) {
    
    const all_active_checkbox = $('.custom-control-input:checked').length;

    $('.modal-title-for-confirm').text('Action on the users');
    $('#del_user, #active, #notactive, #delete').hide();

    if (all_active_checkbox == 0) {
      $('.error').text('You have not selected any items');
      $('.error').show();
      $('#ModalWindowForError').modal('show');
    } else if (!select_value) {
      $('.error').text('You have not selected any checkpoints');
      $('.error').show();
      $('#ModalWindowForError').modal('show');
    } else if (select_value == 1) {
        $('.del_text').text('You are going to set the status to active for the selected users?');
      $('#active').show();
      $('#ModalWindowForConfirm').modal('show');
    } else if (select_value == 2) {
        $('.del_text').text('You are going to set the status to not active for the selected users?');
      $('#notactive').show();
      $('#ModalWindowForConfirm').modal('show');
    } else if (select_value == 3) {
        $('.del_text').text('You are about to delete selected users?');
      $('#delete').show();
      $('#ModalWindowForConfirm').modal('show');
    }
}


$(document).on('click', '.error_all_selected', function () {
    
    const select_value = document.getElementById("user_profile").value;
   
    action_on_users(select_value);

});

$(document).on('click', '.error_all_selected_two', function () {
    
    const select_value = document.getElementById("user_profile_two").value;

    action_on_users(select_value);

});

$(document).on('click', '.openUserModal', function (event) {
    event.preventDefault();
    $('.errormodal').hide();

    let id_user = $(this).data('id');

    if (id_user != undefined) {
       $('.hidden_user_id').val(id_user);
    $.ajax({
        url: 'ajax/get_user.php',
        type: 'GET',
        cache: false,
        data: {
            id_user: id_user,
        },
        dataType: 'json',
        success: function (data) {
            if (data.status) {
                console.log(data.user.status);
                 $('#first_name').val(data.user.first_name);
                 $('#last_name').val(data.user.last_name);
                 $('#status').prop('checked', (data.user.status == 0)?false:true);
                 $('#status').val(data.user.status);
                 $('#role').val((data.user.role=='User')?1:2);
                 $('.modal-title').text('Edit user');
                 $('#add_user').hide();
                 $('#edit_user').show();
                 $('#ModalWindow').modal('show');
                 return false;
            }
            $('#ModalWindow').modal('hide');
            $('.error').text(data.error.message);
            $('.error').show();
            $('#ModalWindowForError').modal('show');
        },
        error: function(request, status, errorT) {
            $('#ModalWindow').modal('hide');
            console.log(request);
            $('.error').text(request.status+' '+request.statusText);
            $('.error').show();
            $('#ModalWindowForError').modal('show');
        }
    });
    } else {
        $('#first_name').val('');
        $('#last_name').val('');
        $('#status').prop('checked', false);
        $('#status').val(0);
        $('#role').val(1);
        $('.modal-title').text('Add user');
        $('#add_user').show();
        $('#edit_user').hide();
        console.log($('#status').val());
        $('#ModalWindow').modal('show');
    }
});

$('#edit_user').click(function () {
    const fname = $('#first_name').val();
    const lname = $('#last_name').val();
    const status = $('#status').val();
    const role = ($('#role').val()==1)?'User':'Admin';
    const id_user = $('#ModalWindow').find('.hidden_user_id').val();

    console.log($(this).data('id'));

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
                const str = document.getElementById('tr-'+id_user);
                str.cells[1].textContent = fname + ' ' + lname;
                str.cells[2].textContent = role;
                if (status == 1) {
                    str.cells[3].innerHTML = '<i class="fa fa-circle active-circle"></i>';
                } else {
                    str.cells[3].innerHTML = '<i class="fa fa-circle" style="color:gray"></i>';
                }
                $('.close').click();
                return false;
            }
            //$('#ModalWindow').modal('hide');
            $('.errormodal').text(data.error.message);
            $('.errormodal').show();
            //$('#ModalWindowForError').modal('show');
        },
         error: function(request, status, errorT) {
            $('#ModalWindow').modal('hide');
            $('.error').text(request.status+' '+request.statusText);
            $('.error').show();
            $('#ModalWindowForError').modal('show');
           }
    })
    console.log('click #edit_user id=' + id_user);
});

$('#add_user').click(function () {
    const fname = $('#first_name').val();
    const lname = $('#last_name').val();
    const status = $('#status').val();
    const role = ($('#role').val()==1)?'User':'Admin';
    const table = document.getElementById('users-table');
    const id_user = Number(table.rows[table.rows.length-1].id.substr(3))+1;
    console.log(id_user);

    $.ajax({
        url: 'ajax/add_user.php',
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
                //Додати строку до таблиці
                const row = table.insertRow();
                row.id = 'tr-'+data.id_user;
                cell = row.insertCell(0);
                cell.innerHTML = '<div '+
              'class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">'+
              '<input type="checkbox" class="custom-control-input" name="items" id="'+id_user+'">'+
              '<label class="custom-control-label" for="'+id_user+'"></label>'+
              '</div>';
                cell.className = 'align-middle';

                if ($('#all-items').prop('checked')) {
                    $('#'+id_user).prop('checked', true);
                }

                cell = row.insertCell(1);
                cell.innerHTML = fname + ' ' + lname;
                cell.className = 'text-nowrap align-middle';

                cell = row.insertCell(2);
                cell.innerHTML = '<span>'+role+'</span>';
                cell.className = 'text-nowrap align-middle';

                cell = row.insertCell(3);
                if (status == 1) {
                    cell.innerHTML = '<i class="fa fa-circle active-circle"></i>';
                } else {
                    cell.innerHTML = '<i class="fa fa-circle" style="color:gray"></i>';
                }
                cell.className = 'text-center align-middle';

                cell = row.insertCell(4);
                cell.innerHTML = '<div class="btn-group align-top">'+
              '<button class="btn btn-sm btn-outline-secondary badge openUserModal" type="button" data-whatever="Change" data-id="'+id_user+'" '+
              'data-target="#user-form-modal">Edit</button>'+
              '<button class="btn btn-sm btn-outline-secondary badge del" type="button" data-whatever="Delete" data-id="'+id_user+'"><i '+
              'class="fa fa-trash"></i></button>'+
              '</div>';
                cell.className = 'text-center align-middle';

                $('.close').click();
                return false;
            }
            //$('#ModalWindow').modal('hide');
            $('.errormodal').text(data.error.message);
            $('.errormodal').show();
            //$('#ModalWindowForError').modal('show');
        },
         error: function(request, status, errorT) {
            $('#ModalWindow').modal('hide');
            $('.error').text(request.status+' '+request.statusText);
            $('.error').show();
            $('#ModalWindowForError').modal('show');
           }
    });
    console.log('click #add_user');
});

$(document).on('click', '.del', function () {
    let id_user = $(this).data('id');
    let row = document.getElementById('tr-'+id_user);
    
    $('#del_user, #active, #notactive, #delete').hide();
    $('.hidden_user_id_confirm').val(id_user);
    $('.modal-title-for-confirm').text('Delete user');
    $('.del_text').text('You really want to delete '+row.cells[1].innerText+'?');
    $('#del_user').show();
    $('#ModalWindowForConfirm').modal('show');
});

$('#del_user').click(function () {
    const id_user = $('#ModalWindowForConfirm').find('.hidden_user_id_confirm').val();

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
                //updateData();
                let row = document.getElementById('tr-'+id_user);
                row.parentNode.removeChild(row);
                $('.close').click();
                return false;
            }
            $('#ModalWindowForConfirm').modal('hide');
            $('.error').text(data.error.message);
            $('.error').show();
            $('#ModalWindowForError').modal('show');
        },
        error: function(request, status, errorT) {
            $('#ModalWindowForConfirm').modal('hide');
            $('.error').text(request.status+' '+request.statusText);
            $('.error').show();
            $('#ModalWindowForError').modal('show');
           }
    });
    console.log('click #del_user id=' + id_user);
});

$('#active').click(function () {
    const checkbox = get_checkbox();
    const status = 1;

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
                const arr_id = data.id.split(',');
                arr_id.forEach(function(id_user) {
                    let str = document.getElementById('tr-'+id_user);
                    $('#'+id_user).prop('checked', false);
                    str.cells[3].innerHTML = '<i class="fa fa-circle active-circle"></i>';
                });
                $('#all-items').prop('checked', false);
                $('.close').click();
                return false;
            }
            $('#ModalWindowForConfirm').modal('hide');
            $('.error').text(data.error.message);
            $('.error').show();
            $('#ModalWindowForError').modal('show');
        },
         error: function(request, status, errorT) {
            $('#ModalWindowForConfirm').modal('hide');
            $('.error').text(request.status+' '+request.statusText);
            $('.error').show();
            $('#ModalWindowForError').modal('show');
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
                const arr_id = data.id.split(',');
                arr_id.forEach(function(id_user) {
                    let str = document.getElementById('tr-'+id_user);
                    $('#'+id_user).prop('checked', false);
                    str.cells[3].innerHTML = '<i class="fa fa-circle" style="color:gray"></i>';
                });
                $('#all-items').prop('checked', false);
                $('.close').click();
                return false;
            }
            $('#ModalWindowForConfirm').modal('hide');
            $('.error').text(data.error.message);
            $('.error').show();
            $('#ModalWindowForError').modal('show');
        },
         error: function(request, status, errorT) {
            $('#ModalWindowForConfirm').modal('hide');
            $('.error').text(request.status+' '+request.statusText);
            $('.error').show();
            $('#ModalWindowForError').modal('show');
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
                const arr_id = data.id.split(',');
                arr_id.forEach(function(id_user) {
                    let row = document.getElementById('tr-'+id_user);
                    $('#'+id_user).prop('checked', false);
                    row.parentNode.removeChild(row);
                });
                $('#all-items').prop('checked', false);
                $('.close').click();
                return false;
            }
            $('#ModalWindowForConfirm').modal('hide');
            $('.error').text(data.error.message);
            $('.error').show();
            $('#ModalWindowForError').modal('show');
        },
         error: function(request, status, errorT) {
            $('#ModalWindowForConfirm').modal('hide');
            $('.error').text(request.status+' '+request.statusText);
            $('.error').show();
            $('#ModalWindowForError').modal('show');
           }
    });
    console.log('click #delete id=' + checkbox);
});

function updateData() {
    $.ajax({
        type: "GET",
        url: 'ajax/all_users_two.php',
        success: function (response) {
            $('#content').html(response);
        },
    });
};

$('input[type="checkbox"]').change(function(){
  $('#status').val(($('#status').val() == 1)?0:1);
  console.log($('#status').val());
});
