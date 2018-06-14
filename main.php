<?php

    ## Yu Du
    ## main.php
    ## File to serve up data for the bestreads website.

    # Set up PHP to be whiny andreport all errors
    error_reporting(E_ALL);

    if (isset($_GET["name"])) {
        $name = $_GET["name"];
        header("Content-Type: text/plain");
        $model = get_description($name);
        echo($model);
    } else {
        $error_message = "Error: Please remember to add the " .
                         "name parameter.\n";
        reportError($error_message);
    }
        
    function get_description($name)  {
        $output = "";
        $model = file("info/{$name}.txt", FILE_IGNORE_NEW_LINES);
        foreach ($book as $content) {
            $output = $output . $content;
        }
        return $output;
    }
        
        
    function reportError($error_message) {
        header("HTTP/1.1 400 Invalid Request");
        header('Content-type: text/plain');
        echo $error_message;
    }

?>