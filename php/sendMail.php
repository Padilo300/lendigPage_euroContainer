<?php
    if((isset($_POST['name'])&&$_POST['phone']!="")){

        $name   = $_POST['name'];
        $phone  = $_POST['phone'];

        $to         = 'info@1100.one' ;
        $subject    = 'Обратная связь с сайта 1100.one'   ;

        $message='
            <html>
                <head>
                    <title>'.$subject.'</title>
                </head>
                <body>
                    <p>Имя: '.$name.'</p>
                    <p>Телефон: '.$phone.'</p>
                </body>
            </html>';
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        $headers .= "From: mail@padilo.pro\r\n";

        if (mail($to, $subject, $message, $headers)){ 
            mail('7302595@gmail.com', $subject, $message, $headers);
            return true;
        } else { 
            return $message  ;
            
        }
    }        
