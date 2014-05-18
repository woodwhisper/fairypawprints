<?php
/**
 * At some point this will go into a prebuilt framework, but for the moment I'm keeping it simple as 
 *   I want to have the website up and running.
 */

    // This is a constant to be removed from the uri. if it isn't found generate an error.
$base_uri = '/cms';
ini_set("display_errors",1);
try{
    ob_start();
    include_once('cms/controller/abstractController.php');
    $request_url = $_SERVER['REQUEST_URI'];
    
    if ($base_uri !== substr($request_url, 0, strlen($base_uri))){
        throw new Exception('Invalid request');
    }
    $remaining_uri = substr($request_url, strlen($base_uri) + 1);
    $breakout = explode('/',$remaining_uri);
    
    if (count($breakout) < 2){
        throw new Exception('Invalid request');
    }
    
    $controller = 'Cms_'.ucfirst($breakout[0]).'Controller';
    $controllerFile = 'cms/controller/'.$breakout[0].'Controller.php';
    $actionMethod = $breakout[1].'Action';
    
    if (!file_exists($controllerFile)){
        throw new Exception('Missing controller file. Cannot run.');
    }
    include_once($controllerFile);
    $controller = new $controller($breakout);
    if (!method_exists($controller,$actionMethod)){
        throw new Exception('Missing action function. Cannot run.');
    }
    $return = $controller->$actionMethod();
    ob_end_clean();
} catch(Exception $e){
    ob_end_clean();
    echo json_encode(array('http'=>400,'error'=>$e->getMessage()));
    exit;
}

echo json_encode(array('http'=>200,'return'=>$return));
exit;