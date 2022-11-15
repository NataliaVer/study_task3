<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Users table</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.1/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.1/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>

  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
  <link href="css/styles.css" rel="stylesheet">

  <?php require_once "includes/blocs.php" ?>

  <!--ModalWindow-->
  <?php require "includes/modal.php" ?>
  <!--ModalWindow-->

 

  <div class="container">
    <div class="row flex-lg-nowrap">
      <div class="col">
        <div class="row flex-lg-nowrap">
          <div class="col mb-3">
            <div class="e-panel card">
              <div class="card-body">
                <div class="card-title">
                  <h6 class="mr-2"><span>Users</span></h6>
                </div>
                <div class="e-table" id="content">
                   <!--all-users-->
                   <?php require_once "ajax/all_users.php" ?>
                   <!--all-users-->
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- User Form Modal -->
        

    </div>
  </div>
</div>


  <?php require_once "includes/blocs_two.php" ?>
  
    <script>
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
</script>

  <script src="js/main.js"></script>

</body>
</html>