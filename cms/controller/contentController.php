<?php
class Cms_ContentController extends Cms_AbstractController{
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
}
