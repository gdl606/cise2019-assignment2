<?php
  // Resume an existing session to be able to free all its variables
  session_start();
	session_unset();
	header('Location: ../');
?>
