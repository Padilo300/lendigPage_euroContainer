<?php


    if((isset($_POST['phone'])&&$_POST['phone']!="")){

        $name       = $_POST['name'];
        $to         = 'info@1100.one' ;
        $subject    = 'Обратный звонок с сайта 1100.one'   ;
        $phone      = $_POST['phone'];

        $message='
            <html>
                <head>
                    <title>'.$subject.'</title>
                </head>
                <body>
                    <p>Телефон: '.$phone.'</p>
                    <p>Имя: '.$name.'</p>
                    
                </body>
            </html>';
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        $headers .= "From: info@padilo.pro\r\n";

        if (mail($to, $subject, $message, $headers)){ 
            mail('7302595@gmail.com', $subject, $message, $headers);            
            
            return true;
        } else { 
            return $message  ;
            
        }
    }        
