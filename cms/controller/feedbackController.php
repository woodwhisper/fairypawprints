<?php
class Cms_FeedbackController extends Cms_AbstractController{
    public function storeAction(){
        $subject = "FPP Feedback from ".$this->_requestParams['name'];
        $message = "Name ".$this->_requestParams['name']."\n";
        $message .= "Email ".$this->_requestParams['email']."\n";
        $message .= "Phone ".$this->_requestParams['phone']."\n";
        $message .= "Feedback \n ".$this->_requestParams['feedback']."\n";
        
        mail('woodwhisperoz@gmail.com',$subject,$message,null,"-f webForm@digitaltapestries.com");
        return "Feedback Submitted successfully.";
    }
}
