<?php

// Sample PHP file to produce errors for testing the logwatcher

// PHP Warning:  include(nonexistent.php):
include("nonexistent.php");

// PHP Notice:  Undefined variable:
echo $undefined;

$array = array();

// PHP Notice:  Undefined offset: 0
echo $array[0];