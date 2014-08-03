<?php
class Cms_User extends WolfDataAbstract{
    protected $preload;

    public $username;
    public $email;
    public $password;

    public function save(){
        parent::save();
    }

    static public function findByName($username){
        $searchTable = self::loadtable();
        foreach ($searchTable as $row){
            if ($row->username == $username){
                return $row;
            }
        }
        return null;
    }

    public function checkPassword($password){
        if ($password == $this->password){
            return TRUE;
        }
        return FALSE;
    }

}