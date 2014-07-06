<?php
class Cms_ContentController extends Cms_AbstractController{

    private $_publishSchedule = 'cms/data/publish.date';
    private $_publishCurrent = 'cms/data/publish.current';

    public function getPDFAction(){
        if (empty($this->_requestParams['pdf'])){
            return "No file found";
        }
        switch ($this->_requestParams['pdf']){
            case 1:
                $fileName = 'Another Bloody Murder in Melbourne.pdf';
                break;
            case 2:
                $fileName = 'Australian Sex Party - A brief history.pdf';
                break;

        }
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header("Content-Type: application/force-download");
        header('Content-Disposition: attachment; filename=' . urlencode(basename($fileName)));
        // header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: ' . 'contentPages/' . filesize($fileName));
        ob_clean();
        flush();
        readfile('contentPages/'.$fileName);
        exit;
    }
    public function getPageByIdAction(){
        
        return "Completed getpage";
    }
    public function getPageByFriendlyURLAction(){
        
        return "Completed getpage";
    }

    /**
     * Takes a list of datetimes and 'publishes' the next one.
     *   Would normally work with a DB but as i've been lazy with this, just going to work with files.
     */
    public function publishContentAction(){
        return true;
        // disabled
        $currentTime = time();
        if (file_exists($this->_publishCurrent)){
            $currentVersion = file_get_contents($this->_publishCurrent);
        } else {
            $currentVersion = 0;
        }
        if (file_exists($this->_publishSchedule)){
            $schedule = file_get_contents($this->_publishSchedule);
        } else {
            $schedule = '';
        }

        ob_flush();
        if (!empty($schedule)){
            $scheduleArray = explode("\n", $schedule);
            var_dump($scheduleArray);
            foreach ($scheduleArray as $index => $updateStamp){
                echo $updateStamp;
                echo "-";
                echo $currentVersion;
                echo " : ";
                if ($updateStamp == $currentVersion){
                    if (isset($scheduleArray[$index + 1])){
                        echo $scheduleArray[$index + 1];
                        echo "<br />".$currentTime."<br />";
                        ob_flush();
                        $nextIndex = $index + 1;
                        if ($currentTime > $scheduleArray[$nextIndex]){
                            // Running publish
                            exec('rm -f contentPages/*');
                            exec('cp -f cms/data/contentPages/'.$scheduleArray[$nextIndex].'/* contentPages/.');
                            exec('rm -f '.$this->_publishCurrent);
                            echo "try writing";
                            ob_flush();
                            file_put_contents($this->_publishCurrent,$scheduleArray[$nextIndex]);
                            return 'Publishing on '.$currentTime." release ".$scheduleArray[$nextIndex];
                        }
                    }
                }
            }
        }
        return "Failed update at ".$currentTime;
    }
}
