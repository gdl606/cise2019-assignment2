<?php
  // Placing at the top of the page to suppress any warnings
  session_start();

  function locationGiven() {
    return isset($_GET['location']) && $_GET['location'] != '';
  }

  function locationValid() {
    return strpos($_GET['location'], 'http') === false
      && strpos($_GET['location'], 'www') === false;
      # For the top level domain.
      # FIXME && preg_match('\\.\w{,24}/', $_GET['location']) == false;
  }

	if(isset($_POST['login'])) {
		$errMsg = '';

		// Get data from FORM
		$username = $_POST['username'];
		$password = $_POST['password'];

		if($username == '') {
			$errMsg = 'Enter username';
    } else if($password == '') {
			$errMsg = 'Enter password';
    }

		if($errMsg == '') {
      // Get all users from the JSON data to search for this user
      $string = file_get_contents("../data/accounts.json");
      if ($string == false) {
        $errMsg = "User $username not found. Would you like to <a href=\"register.php\">register</a>?";
      }
      else {
        $json_array = json_decode($string, true);
        if ($json_array === null) {
          $errMsg = "Failed to read data. Please try again.";
        }

        $match = false;
        foreach ($json_array as $i => $value) {
          if ($json_array[$i]['username'] == $username) {
            $match = true;
            if ($json_array[$i]['password'] == $password) {
              $_SESSION['username'] = $json_array[$i]['username'];
              $_SESSION['first-name'] = $json_array[$i]['first-name'];
              $_SESSION['email'] = $json_array[$i]['email'];
              $_SESSION['post-address'] = $json_array[$i]['post-address'];
              $_SESSION['delivery-address'] = $json_array[$i]['delivery-address'];
              break;
            }
            else {
              # Error message should be 'Either the username or password is incorrect.' everywhere.
              $errMsg = "$username, the password you entered is incorrect.";
            }
          }
        }

        if ($match) {
          if (locationGiven() && locationValid()) {
            header('Location: ' . $_GET['location']);
          } else {
            header('Location: /');
          }
        }
        else {
          $errMsg = "User $username not found. Would you like to <a href=\"register.php\">register</a>?";
        }
      }
		}
	}
?>

<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <title>Login | Plant A Tree</title>

  <!-- Bootstrap core CSS -->
  <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom fonts for this template -->
  <link href="../vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
  <link href='https://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
  <link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>
    
  <!-- Agency theme core CSS -->
  <link href="../css/agency.css" rel="stylesheet">
</head>
<body id="page-top">
  <div align="center">
    <?php
      if(isset($errMsg)){
        echo '<div style="color:#FF0000;text-align:center;font-size:17px;">'.$errMsg.'</div>';
      }
    ?>
        
    <?php
      if (isset($_SESSION['username'])) {
    ?>
      <a class="btn btn-outline-warning" href=<?php echo "logout.php?location=" . $_GET['location'] ?>><h1><b>Logout</b></h1></a>
    <?php
      } else {
    ?>
      <h1><b>Login</b></h1>
      <div style="margin: 15px">
        <form method="post">
          <input type="text" class="form-control" name="username" placeholder="Username"/>
          <input type="password" class="form-control" name="password" placeholder="Password" autocomplete="off"/>
          <input class="form-control" type="submit" name="login" value="Login" class='submit'/>
        </form>
      </div>
      <p>Not a member? <a href="register.php">Register now!</a></p>
      <a href="forgot.php">Forgot your password?</a>
    <?php
      }
    ?>
  </div>

  <!-- Bootstrap core JavaScript -->
  <script src="../vendor/jquery/jquery.min.js"></script>
  <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- Plugin JavaScript -->
  <script src="../vendor/jquery-easing/jquery.easing.min.js"></script>
  <!-- Contact form JavaScript -->
  <script src="../js/jqBootstrapValidation.js"></script>
  <script src="../js/contact_me.js"></script>
  <!-- Custom scripts for this template -->
  <script src="../js/agency.min.js"></script>
</body>
</html>

