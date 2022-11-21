<?php
require '../htdocs/includes/config.php';
$sql = 'SELECT * FROM `users` ORDER BY `id_user` LIMIT 25';
$query = $pdo->query($sql);
?>

 <div class="table-responsive table-lg mt-3">
    <table class="table table-bordered" id="users-table">
      <thead>
        <tr>
          <th class="align-top">
            <div
              class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0">
              <input type="checkbox" class="custom-control-input" name="all-items[]" id="all-items">
              <label class="custom-control-label" for="all-items"></label>
            </div>
          </th>
          <th class="max-width">Name</th>
          <th class="sortable">Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>

        <?php while ($row = $query->fetch(PDO::FETCH_ASSOC)):?>
        <tr id="tr-<?=$row['id_user']?>">
          <td class="align-middle">
            <div
              class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
              <input type="checkbox" class="custom-control-input" name="items" id="<?=$row['id_user']?>">
              <label class="custom-control-label" for="<?=$row['id_user']?>"></label>
            </div>
          </td>
          <td class="text-nowrap align-middle"><?=$row['first_name']." ".$row['last_name']?></td>
          <td class="text-nowrap align-middle"><span><?=$row['role']?></span></td>
          <td class="text-center align-middle"><i class="fa fa-circle <?= $row['status'] ? "active-circle" : ""; ?>"></i></td>
          <td class="text-center align-middle">
            <div class="btn-group align-top">
              <button class="btn btn-sm btn-outline-secondary badge openUserModal" type="button" data-whatever="Change" data-id="<?=$row['id_user']?>" >Edit</button>
              <button class="btn btn-sm btn-outline-secondary badge del" type="button" data-id="<?=$row['id_user']?>"><i
  class="fa fa-trash"></i></button>
            </div>
          </td>
        </tr>
        <?php endwhile;?>
        
      </tbody>
    </table>
  </div>


