<?php
require_once '../includes/config.php';
$sql = 'SELECT * FROM `users` ORDER BY `id_user` LIMIT 10';
$query = $pdo->query($sql);
?>

 <div class="table-responsive table-lg mt-3">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th class="align-top">
                            <div
                              class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0">
                              <input type="checkbox" class="custom-control-input" name="all-items" id="all-items">
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
                        <tr>
                          <td class="align-middle">
                            <div
                              class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                              <input type="checkbox" class="custom-control-input" name="items" id="<?=$row['id_user']?>">
                              <label class="custom-control-label" for="<?=$row['id_user']?>"></label>
                            </div>
                          </td>
                          <td class="text-nowrap align-middle"><?=$row['first_name']." ".$row['last_name']?></td>
                          <td class="text-nowrap align-middle"><span><?=$row['role']?></span></td>
                          <td class="text-center align-middle"><?php if($row['status']==1): ?>
                            <i class="fa fa-circle active-circle"></i></td>
                            <?php else:?>
                              <i class="fa fa-circle not-active-circle"></i></td>
                              <?php endif;?>
                          <td class="text-center align-middle">
                            <div class="btn-group align-top">
                              <button class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#ModalWindow" data-whatever="Change" data-id="<?=$row['id_user']?>" 
                                data-target="#user-form-modal">Edit</button>
                              <button class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#ModalWindow" data-whatever="Delete" data-id="<?=$row['id_user']?>"><i
                                  class="fa fa-trash"></i></button>
                            </div>
                          </td>
                        </tr>
                        <?php endwhile;?>
                        
                      </tbody>
                    </table>
                  </div>


