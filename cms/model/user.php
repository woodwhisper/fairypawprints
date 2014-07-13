<?php
class Cms_User extends WolfDataAbstract{
    protected $preload;

    public $username;
    public $email;
    public $password;

    public function save(){
        parent::save();
    }

}