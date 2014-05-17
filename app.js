;(function(){

	var http   = require('http');
	var spawn  = require('child_process').spawn;
	var colors = require("colors");
	var fs 	   = require("fs");


	var errorCat = "General";
	var replies = JSON.parse( fs.readFileSync('./errors.json') );

	var getResponse = function( errorCat, msg, type ){
		var r = new RegExp( errorCat + ":\\s+(.*)" );
		console.log(msg);
		output = r.exec(msg)[1];

		for ( var prop in replies[type][errorCat] ){

			if ( msg.match(prop) ) output = prop + " : " + replies[type][errorCat][prop]["definition"];

		}

		return output;
	}

	var tail_child = spawn('tail', ['-f', '/var/log/apache2/error_log']);
		tail_child
			.stdout.on('data', function(data) {

				var output = data.toString(); // data.length, data.parent, data.offset
					output = output.match(/^\[([^\]]*)\]\s+\[([^\]]*)\]\s+(.*)/);
				var time   = output[1];
				var type   = output[2];
				var msg    = output[3];

				// CHECK ERROR CATEGORY
				if ( type === "notice" ){

					errorRes = "notice";

				} else if ( type === "warning" ) {

					errorRes = "warning";

				} else if ( type === "error" ) {

					errorCat = msg.match(/PHP Parse error|PHP Warning|PHP Notice|PHP Fatal error|File does not exist|PHP Deprecated/);
					errorRes = getResponse( errorCat, msg, type );

				} else if ( type === "crit" ) {

					errorRes = "crit";

				}

				// CHOOSE type CONSOLE COLOR FOR ( notice | error | warn )
				switch(type){
					case "notice":
						typeColor = "yellow";
						break;
					case "error":
						typeColor = "red";
						break;
					case "warn":
						typeColor = "red";
						break;
					default:
						typeColor = "white";
						break;
				}

				console.log( "Time: ".white.bold + time.bold.grey);
				console.log( "Type: ".white.bold + type[typeColor] );
				console.log( "Message: ".white.bold + msg.bold.cyan );
				console.log( "Error Category: ".white.bold + String(errorCat).yellow );
				console.log( "Error Response: ".white.bold + errorRes.bold );
				console.log( "\r\n" );

			});

})(this);