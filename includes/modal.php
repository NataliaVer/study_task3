<!--ModalWindow-->

<link href="../css/modal.css" rel="stylesheet">

<div class="modal" id="ModalWindow" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="tittleModalLabel">Add user</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <form method="post" class="post">
      <input type="hidden" name="user_id" class="hidden" value="">

      <div class="modal-body">

        <div class="form-group">
          <label for="first_name">First Name</label>
          <input type="name" name="first_name" class="form-control" id="first_name" placeholder="First Name">
        </div>
        <div class="form-group">
          <label for="last_name">Last Name</label>
          <input type="name" name="last_name" class="form-control" id="last_name" placeholder="Last Name">
        </div>

        <div class="form-group">
          <label for="switchLabel">Status</label>
          <label name="status_s" class="switch">
            <input type="checkbox" name="status" id="status" value="0">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="form-group">
          <label for="roleLabel">Role</label>
          <select name="role" id="role" required="required">
          <option value="1">User</option>
          <option value="2">Admin</option>
      </select>
        </div>

        <div class="del_text">
          You really want to delete this user?
        </div>
        <div class="set_active">
          You are going to set the status to active for the selected users?
        </div>
        <div class="set_notactive">
          You are going to set the status to not active for the selected users?
        </div>
        <div class="set_delete">
          You are about to delete selected users?
        </div>
        <div class="error">
          <p id="set_default">
            You have not selected any items
          </p>

          <p id="notcheck">
            You have not selected any checkpoints
          </p>
        </div>
        <div class="result"></div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="close">Close</button>
        <button type="button" class="btn btn-primary add_text" id="add_user">Save</button>
        <button type="button" class="btn btn-primary adit_text" id="edit_user">Save changes</button>
        <button type="button" class="btn btn-danger del_text" id="del_user">Yes</button>
        <button type="button" class="btn btn-primary set_active" id="active">Yes</button>
        <button type="button" class="btn btn-primary set_notactive" id="notactive">Yes</button>
        <button type="button" class="btn btn-danger set_delete" id="delete">Yes</button>
      </div>
    </form>
    </div>
  </div>
</div>
<?php

?>