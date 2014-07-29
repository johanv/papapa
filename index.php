<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8" />
<link rel="stylesheet" type="text/css" href="main.css" />
<title>Pa pa pa</title>


</head>

<body>

<table id="scoreblad">
<caption>Scoreblad</caption>
<thead>
<tr><th>Spel</th><th>Scr</th><th>DVL</th><th>DTL</th><th>DLB</th><th>Png</th></tr>
</thead>
<tbody>
<tr>
	<td>start</td>
	<td>0</td>
	<td>0</td>
	<td>0</td>
	<td>0</td>
	<td>0</td>
</tr>
<tr>
	<td>vraag&nbsp;&amp;&nbsp;mee</td>
	<td>-2</td>
	<td>-2</td>
	<td>0</td>
	<td>2</td>
	<td>2</td>
</tr>
<tr>
	<td>miserie*</td>
	<td>8</td>
	<td>8</td>
	<td>-30</td>
	<td>2</td>
	<td>12</td>
</tr>
<tr>
	<td>abi&nbsp;troef</td>
	<td>3</td>
	<td>3</td>
	<td>-15</td>
	<td>-3</td>
	<td>12</td>
</tr>

</tbody>

<script>
var headertext = [];
var headers = document.querySelectorAll("#scoreblad th"),
tablerows = document.querySelectorAll("#scoreblad th"),
tablebody = document.querySelector("#scoreblad tbody");

for(var i = 0; i < headers.length; i++) {
	var current = headers[i];
	headertext.push( current.textContent.replace( /\r?\n|\r/,"") );
}

for (var i = 0, row; row = tablebody.rows[i]; i++) {
	for (var j = 0, col; col = row.cells[j]; j++) {
		col.setAttribute("data-th", headertext[j]);
} }
</script>

</body>
</html>
