<?php
	require '../data/config.php';
	session_destroy();

	header('Location: index.php');
?>
