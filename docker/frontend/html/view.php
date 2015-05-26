<!DOCTYPE html>
<html>
<head>
	<title>Random generator</title>

	<script src="microajax.js"></script>
</head>
<body>
	<p>Server ip : <?= $serverIp ?></p>

<pre>
	<?php print_r($_SERVER); ?>
</pre>

<script>
microAjax("http://<?= trim($VMIp);?>:3000/rand", function(res) {
	console.log(res);
	// alert(res);
});
</script>
</body>
</html>