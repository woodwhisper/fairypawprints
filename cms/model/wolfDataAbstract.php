<?php

abstract class WolfDataAbstract
{
    static private $_database;

    public $id;

    protected function __construct()
    {

    }

    static function create(){
        $tableName = get_called_class();
        if (isset(self::$_database[$tableName])){
            $maxValue = max(array_keys(self::$_database[$tableName]));
            $maxValue++;
            $returnObject = new $tableName();
            $returnObject->id = $maxValue;
            self::$_database[$tableName][$maxValue] = $returnObject;
            return $returnObject;
        } else {
            $returnObject = new $tableName();
            $returnObject->id = 0;
            self::$_database[$tableName][0] = $returnObject;
            return $returnObject;
        }
    }

    static function loadtable()
    {
        $tableName = get_called_class();
        if (isset(self::$_database[$tableName])) {
            return self::$_database[$tableName];
        } else {
            if (file_exists('cms/data/' . $tableName . '.php')) {
                include 'cms/data/' . $tableName . '.php';
            }
            return self::$_database[$tableName];
        }
    }

    static function load($id)
    {
        $tableArray = self::loadtable();
        if (isset($tableArray[$id])) {
            return $tableArray[$id];
        } else {
            return null;
        }
    }

    protected function save()
    {
        var_dump($this);
        $tableName = get_class($this);
        $fileName = 'cms/data/' . $tableName . '.php';
        echo $fileName;
        echo "<br />";
        echo $tableName;
        $serialised = serialize($this);
        if (file_exists($fileName)){
            $string = 'self::$_database["' . $tableName . '"][' . $this->id . '] = unserialize(\'' . $serialised . '\');'."\r\n";
        } else {
            $string = '<?php '."\r\n". 'self::$_database["' . $tableName . '"][' . $this->id . '] = unserialize(\'' . $serialised . '\');'."\r\n";

        }
        file_put_contents($fileName, $string, FILE_APPEND);
    }
}