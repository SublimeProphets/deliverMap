<?php

switch($_POST['type']) {
    case "file":

        $info = pathinfo($_FILES['userFile']['name']);
        $ext = $info['extension']; // get the extension of the file
        $newname = "newname.".$ext; 

        $target = 'images/'.$newname;
        move_uploaded_file( $_FILES['userFile']['tmp_name'], $target);

        echo "200";

    break;

}


?>