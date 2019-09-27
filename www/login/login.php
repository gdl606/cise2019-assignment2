<?php
  // Placing at the top of the page to suppress any warnings
  session_start();

	if(isset($_POST['login'])) {
		$errMsg = '';

		// Get data from FORM
		$username = $_POST['username'];
		$password = $_POST['password'];

		if($username == '')
			$errMsg = 'Enter username';
		if($password == '')
			$errMsg = 'Enter password';

		if($errMsg == '') {
      // Get all users from the JSON data to search for this user
      $string = file_get_contents("../data/accounts.json");
      if ($string == false) {
        $errMsg = "User $username not found.";
      }
      else {
        $json_array = json_decode($string, true);
        if ($json_array === null) {
          $errMsg = "Failed to read data. Please try again.";
        }

        $match = false;
        foreach ($json_array as $i => $value) {
          if ($json_array[$i]['username'] == $username) {
            if ($json_array[$i]['password'] == $password) {
              $match = true;
              $_SESSION['username'] = $json_array[$i]['username'];
              $_SESSION['first-name'] = $json_array[$i]['first-name'];
              $_SESSION['email'] = $json_array[$i]['email'];
              $_SESSION['post-address'] = $json_array[$i]['post-address'];
              $_SESSION['delivery-address'] = $json_array[$i]['delivery-address'];
              break;
            }
            else {
              $errMsg = 'Password is incorrect';
            }
          }
        }

        if ($match) {
          header('Location: ../');
        }
        else {
          $errMsg = "User $username not found.";
        }
      }
		}
	}
?>

<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Tree Shop - Login</title>

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
      <a href="logout.php"><h1><b>Logout</b></h1></a>
    <?php
      } else {
    ?>
      <h1><b>Login</b></h1>
      <div style="margin: 15px">
        <form action="" method="post">
          <input type="text" name="username" value="<?php if(isset($_POST['username'])) echo $_POST['username'] ?>" autocomplete="off" class="box"/><br /><br />
          <input type="password" name="password" value="<?php if(isset($_POST['password'])) echo $_POST['password'] ?>" autocomplete="off" class="box" /><br/><br />
          <input type="submit" name='login' value="Login" class='submit'/><br />
        </form>
      </div>
    <?php
      }
    ?>
	</div>
</body>

</html>
