<?php
class Cms_AbstractController{
    
    protected $_requestParams = array();
    
    public function __construct($params){
        //store excess GET variables
        
        $i = 2; //Skip the controller/action stuff.
        while (isset($params[$i])){
            $this->_requestParams[$params[$i]] = $params[$i+1];
            $i = $i + 2;
        }

        if (count($_POST) > 0){
            $this->_requestParams = array_merge($this->_requestParams,$_POST);
        }
    }
}
