<!DOCTYPE html>
<html>
    <body>
        <pre>
            <?php
            // Read JSON file
            $json = file_get_contents('./data/accountinfo.json');

            //Decode JSON
            $json_data = json_decode($json,true);

            $username = "jeff";
            $password = "uuesi";

            $username_found = false;

            // Traverse array and get the data
            foreach ($json_data as $key => $value)
            {
                if ($json_data[$key]["username"] == $username)
                {
                    if($json_data[$key]["password"] == $password)
                    {
                        print_r($json_data[$key]);
                    }

                    $username_found = true;
                }
            }

            if ($username_found == false)
            {
                print_r("username not found");
            }
            ?>
        </pre>
    </body>
</html>
