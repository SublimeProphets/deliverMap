<?php

/*************************
CAUTION / WARNING / DANGER

This file is not protected against any type of Injections, in an non-development, productive environment it can produce real harm.
Ensure to secure the inputs as well as provide any authentification between the main app and this pseudo-interface
*************************/

switch($_POST['type']) {
    case "file":

        
        $info = pathinfo($_FILES['uploadFile']['name']);
        $imageFileType = $info['extension']; // get the extension of the file
        
        $target = 'assets/icons/stores/'.$_POST["filename"].'_'.$_POST['size'].'.'.$imageFileType;
        
        // Allow certain file formats
        if($imageFileType != "png" && $imageFileType != "svg") {
            echo '{"error": "Nur .PNG und .SVG erlaubt"}';
            $uploadOk = 0;
        } else {

            // Check if file already exists, if yes delete the old one
            if (file_exists($target_file)) {
                unlink($file);
            }   

            if (move_uploaded_file($_FILES["uploadFile"]["tmp_name"], $target)) {
                // echo "The file ". basename( $_FILES["uploadFile"]["name"]). " has been uploaded.";
                echo '{"fileurl": "'.$target.'"}';
            } else {
                echo '{"error": "Hochladen des Bilder fehlgeschlagen"}';
            }
        }
    break;
    
    default:
    	echo '{"error": "Type nicht erkannt"}';
    break;
}


?>