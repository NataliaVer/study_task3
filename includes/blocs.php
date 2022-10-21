
<div class="container-fluid">
  <div class="container">
    <div class="row justify-content-center align-items-center">
    <nav role ="navigation" class="navbar navbar-expand-lg navbar-light bg-light">

	  <div class="my-2 my-sm-3 my-lg-4 p-3">
	    <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#ModalWindow" data-whatever="Add">Add</button>
      </div>

	  <select class="user_profile" name="user_profile" id="user_profile" required="required">
        <option value="">Please Select</option>
        <option value="1">Set active</option>
        <option value="2">Set not active</option>
        <option value="3">Delete</option>
      </select>

      <div class="my-2 my-sm-3 my-lg-4 p-3">
    	<button class="btn btn-primary error_all_selected" type="button" data-toggle="modal" data-target="#ModalWindow" data-whatever="Action on the user">Ok</button>
      <!-- <button class="btn btn-primary set_active_all_selected" type="button" data-toggle="modal" data-target="#ModalWindow" data-whatever="You are going to set the status to active for the selected users">Ok</button>
      <button class="btn btn-primary set_not_active_all_selected" type="button" data-toggle="modal" data-target="#ModalWindow" data-whatever="You are going to set the status to not active for the selected users">Ok</button>
      <button class="btn btn-primary delete_all_selected" type="button" data-toggle="modal" data-target="#ModalWindow" data-whatever="You are about to delete selected users">Ok</button> -->
        <!-- <div class="block_btn">
          <button type="button" name="btn_ok" class="btn_ok btn btn-success default" data-toggle="modal" data-target="#ModalWindow" data-whatever="Error">Ok</button>
          <button type="button" name="btn_ok" class="btn_ok btn btn-success all_active" data-toggle="modal" data-target="#ModalWindow" data-whatever="You are going to set the status to active for the selected users">Ok</button>
          <button type="button" name="btn_ok" class="btn_ok btn btn-success all_notactive" data-toggle="modal" data-target="#ModalWindow" data-whatever="You are going to set the status to not active for the selected users">Ok</button>
          <button type="button" name="btn_ok" class="btn_ok btn btn-success all_delete" data-toggle="modal" data-target="#ModalWindow" data-whatever="You are about to delete selected users">Ok</button>
        </div> -->
      </div>

    </nav>
  </div>
  </div>
</div>


<?php

?>