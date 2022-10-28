
//--->select/unselect all > start

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
    };
});

//--->select/unselect all > end

function get_checkbox() {
  let array_checkbox_id = Array();
  $('.custom-control-input:checked').each(function() {
    //console.log($(this).context.id)});
    array_checkbox_id.push($(this).context.id);
  });
  return array_checkbox_id;
};

$('#ModalWindow').on('hidden.bs.modal', function (event) {
    $('#first_name').val("");
    $('#last_name').val("");
    //$('#status').prop('checked', false);
    $('#status').val(0);
    $('#role').val(1);
    $('.error').text("");
});

$(document).on('click', '.error_all_selected', function () {
    $('.form-group, .error, .result, #notcheck, #add_user, #edit_user, #del_user, .add_text, .edit_text, .del_text, .set_default, .set_active, .set_notactive, .set_delete, #active, #notactive, #delete').hide();
    
    const select_value = document.getElementById("user_profile").value;
    const all_active_checkbox = $('.custom-control-input:checked').length;
    $('.modal-title').text('Action on the users');
    if (all_active_checkbox == 0) {
      $('.modal-title').text('Test');
      $('.error').text('You have not selected any items');
      $('.error').show();
    } else if (!select_value) {
      $('.error').text('You have not selected any checkpoints');
      $('.error').show();
    } else if (select_value == 1) {
      $('.set_active, #active').show();
    } else if (select_value == 2) {
      $('.set_notactive, #notactive').show();
    } else if (select_value == 3) {
      $('.set_delete, #delete').show();
    };
    $('#ModalWindow').modal();
});

$(document).on('click', '.error_all_selected_two', function () {
    $('.form-group, .error, .result, #notcheck, #add_user, #edit_user, #del_user, .add_text, .edit_text, .del_text, .set_default, .set_active, .set_notactive, .set_delete, #active, #notactive, #delete').hide();

    const select_value = document.getElementById("user_profile_two").value;
    const all_active_checkbox = $('.custom-control-input:checked').length;
    $('.modal-title').text('Action on the users');
    if (all_active_checkbox == 0) {
      $('.error').text('You have not selected any items');
      $('.error').show();
    } else if (!select_value) {
      $('.error').text('You have not selected any checkpoints');
      $('.error').show();
    } else if (select_value == 1) {
      $('.set_active, #active').show();
    } else if (select_value == 2) {
      $('.set_notactive, #notactive').show();
    } else if (select_value == 3) {
      $('.set_delete, #delete').show();
    };
    $('#ModalWindow').modal();
});

$(document).on('click', '.openUserModal', function () {
    event.preventDefault();
    $('.form-group, .error, .result, #notcheck, #add_user, #edit_user, #del_user, .add_text, .edit_text, .del_text, .set_default, .set_active, .set_notactive, .set_delete, #active, #notactive, #delete').hide();
    let id_user = $(this).data('id');
    $('.hidden_user_id').val(id_user);

    console.log(id_user);

    if (id_user != undefined) {
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
                 $('#first_name').val(data.user.first_name);
                 $('#last_name').val(data.user.last_name);
                 $('#status').prop('checked', (data.user.status == 0)?false:true);
                 $('#role').val((data.user.role=='User')?1:2);
                 $('.modal-title').text('Edit user');
                 $('.form-group, #edit_user, .edit_text').show();
                 return false;
            }
            $('.form-group, #edit_user, .edit_text').hide();
            $('.error').text(data.error.message);
            $('.error').show();
        },
        error: function(request, status, errorT) {
             console.log(errorT);
        }
    });
    } else {
        $('#first_name').val('');
        $('#last_name').val('');
        //$('#status').prop('checked', false);
        $('#status').val(0);
        $('#role').val(1);
        $('.modal-title').text('Add user');
        $('.form-group, #add_user, .add_text').show();
        console.log($('#status').val());
    }

    $('#ModalWindow').modal();
});

$('#edit_user').click(function () {
    const fname = $('#first_name').val();
    const lname = $('#last_name').val();
    const status = $('#status').val();
    const role = ($('#role').val()==1)?'User':'Admin';
    const id_user = $('#ModalWindow').find('.hidden_user_id').val();

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
                console.log(str);
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
            $('.result').hide();
            $('.error').text(data.error.message);
            $('.error').show();
            console.log(data.error.message);
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
    const table = document.getElementById('users-table');
    //last_row = Number(table.rows[table.rows.length-1].id.substr(3))+1;
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
              '<button class="btn btn-sm btn-outline-secondary badge del" type="button" data-toggle="modal" data-target="#ModalWindow" data-whatever="Delete" data-id="'+id_user+'"><i '+
              'class="fa fa-trash"></i></button>'+
              '</div>';
                cell.className = 'text-center align-middle';

                $('.close').click();
                return false;
            }
            $('.result').hide();
            $('.error').text(data.error.message);
            $('.error').show();
            console.log(data.error.message);
        },
         error: function(request, status, errorT) {
             console.log(errorT);
           }
    });
    console.log('click #add_user');
});

$(document).on('click', '.del', function () {
    $('.form-group, .error, .result, #notcheck, #add_user, #edit_user, #del_user, .add_text, .edit_text, .del_text, .set_default, .set_active, .set_notactive, .set_delete, #active, #notactive, #delete').hide();
    let id_user = $(this).data('id');
    console.log(id_user);
    $('.hidden_user_id').val(id_user);
    $('.modal-title').text('Delete user');
    $('.del_text, #del_user').show();
    $('#ModalWindow').modal();
});

$('#del_user').click(function () {
    const id_user = $('#ModalWindow').find('.hidden_user_id').val();

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
                updateData();
                $('.close').click();
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
                updateData();
                $('.close').click();
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
                updateData();
                $('.close').click();
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

// $('select.user_profile').click(function () {
//     const selected = $(this).children('option:selected').val();

//     $('select.user_profile').not(this).val(selected);

//     console.log(selected);

//     });