<?php
	if(isset($_POST['register'])) {
    $errMsg = '';

    // Get data from FROM
    $firstname = $_POST['first-name'];
    $lastname = $_POST['last-name'];
    $postaddress = $_POST['post-address'];
    $deliveryaddress = $_POST['delivery-address'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    if($email == '')
      $errMsg = 'Enter email';
    if($username == '')
      $errMsg = 'Enter username';
    if($password == '')
      $errMsg = 'Enter password';
    
    if($errMsg == '') {
      $string = file_get_contents('../data/accounts.json');
      if ($string == false) {
        $errMsg = "Hey, you're our first customer!";
      }

      $json_array = json_decode($string, true);
      if ($json_array == null) {
        $errMsg = 'Something went wrong. Please try again.';
      }

      $found = false;
      foreach ($json_array as $i => $value) {
        if ($username == $value['username']) {
          $errMsg = 'Username already taken. Did you want to <a href="login.php">login</a>?';
          $found = true;
          break;
        }
        elseif ($email == $value['email']) {
          $errMsg = 'An account already exists under that email.';
          $found = true;
          break;
        }
      }

      if (!$found) {
        $account = array(
          'username' => $username,
          'password' => $password,
          'first-name' => $firstname,
          'last-name' => $lastname,
          'email' => $email,
          'post-address' => $postaddress,
          'delivery-address' => $deliveryaddress,
          'phone' => $phone
        );

        array_push($json_array, $account);
        $encoded_json = json_encode($json_array);
        file_put_contents('../data/accounts.json', $encoded_json);

        header('Location: register.php?action=joined');
      }
    }
  }

	if (isset($_GET['action']) && $_GET['action'] == 'joined') {
		$errMsg = 'Registration successfull. Now you can <a href="login.php">login</a>';
	}
?>

<html>
<head><title>Register</title></head>
	<style>
	html, body {
		margin: 1px;
		border: 0;
	}
	</style>
<body>
	<div align="center">
		<div style=" border: solid 1px #006D9C; " align="left">
			<?php
				if(isset($errMsg)){
					echo '<div style="color:#FF0000;text-align:center;font-size:17px;">'.$errMsg.'</div>';
				}
			?>
			<div style="background-color:#006D9C; color:#FFFFFF; padding:10px;"><b>Register</b></div>
			<div style="margin: 15px">
				<form action="" method="post">
					<input type="text" name="first-name" placeholder="First Name" value="<?php if(isset($_POST['first-name'])) echo $_POST['first-name'] ?>" autocomplete="off" class="box"/><br /><br />
					<input type="text" name="last-name" placeholder="Last Name" value="<?php if(isset($_POST['last-name'])) echo $_POST['last-name'] ?>" autocomplete="off" class="box"/><br /><br />
					<input type="text" name="post-address" placeholder="Postal Address" value="<?php if(isset($_POST['post-address'])) echo $_POST['post-address'] ?>" autocomplete="off" class="box"/><br /><br />
					<input type="text" name="delivery-address" placeholder="Delivery Address" value="<?php if(isset($_POST['delivery-address'])) echo $_POST['delivery-address'] ?>" autocomplete="off" class="box"/><br /><br />
					<input type="email" name="email" placeholder="Email*" value="<?php if(isset($_POST['email'])) echo $_POST['email'] ?>" autocomplete="off" class="box" required/><br /><br />
					<input type="text" name="phone" placeholder="Phone" value="<?php if(isset($_POST['phone'])) echo $_POST['phone'] ?>" autocomplete="off" class="box"/><br /><br />
					<input type="text" name="username" placeholder="Username*" value="<?php if(isset($_POST['username'])) echo $_POST['username'] ?>" autocomplete="off" class="box" required/><br /><br />
					<input type="password" name="password" placeholder="Password*" value="<?php if(isset($_POST['password'])) echo $_POST['password'] ?>" class="box" required/><br/><br />
          <!--TODO: Confirm Password text field-->
					<input type="submit" name='register' value="Register" class='submit'/><br />
				</form>
			</div>
		</div>
	</div>
</body>
</html>

