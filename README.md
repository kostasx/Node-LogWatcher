Node-LogWatcher
===============

Node.JS is a utility **(under development)** that parses log files.

In order to use *growlnotify*, [download](http://growl.info/downloads#generaldownloads) and install it, then set __growl__ variable to true.

**errors.json** is a sample file that contains PHP error log messages and possible respones.

Usage:

1. Set the **log** variable to the correct log file path, e.g. **/var/log/apache2/error_log**.
2. Start the app.
3. Test.

```bash
node app.js
curl http://localhost/server.php
```
______

### CHANGES

* Added support for GrowlNotify (Mac)
