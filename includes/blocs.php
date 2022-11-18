
<div class="container-fluid">
  <div class="container">
    <div class="row justify-content-center align-items-center">
    <nav role ="navigation" class="navbar navbar-expand-lg navbar-light bg-light">

    <div class="my-2 my-sm-3 my-lg-4 p-3">
      <button class="btn btn-primary openUserModal" type="button" data-whatever="Add">Add</button>
      </div>

    <select class="user_profile" name="user_profile" id="<?=$user_profile?>" required="required">
        <option value="">Please Select</option>
        <option value="1">Set active</option>
        <option value="2">Set not active</option>
        <option value="3">Delete</option>
      </select>

      <div class="my-2 my-sm-3 my-lg-4 p-3" id="<?=$id_ok?>">
      <button class="btn btn-primary error_all_selected" type="button" data-whatever="Action on the user">Ok</button>
      </div>

    </nav>
  </div>
  </div>
</div>
