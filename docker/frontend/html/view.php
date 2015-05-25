<!DOCTYPE html>
<html>
<head>
	<title>Random generator</title>

	<script src="microajax.js"></script>
</head>
<body>

	<p>Server ip : <?= $serverIp ?></p>

<script>
microAjax("/rand", function(res) {
	console.log(res);
	// alert(res);
});
</script>
</body>
</html>