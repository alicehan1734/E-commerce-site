<?php



$data =" $_GET['image'];" // Your data 'data:image/png;base64,AAAFBfj42Pj4';
echo '<script>console.log($data)</script>';

list($type, $data) = explode(';', $data);
list(, $data)      = explode(',', $data);
$data = base64_decode($data);

file_put_contents('../6Listpage/image/heeyeon.png', $data);
$data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data));

if (preg_match('/^data:image\/(\w+);base64,/', $data, $type)) {
    $data = substr($data, strpos($data, ',') + 1);
    $type = strtolower($type[1]); // jpg, png, gif

    if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
        throw new \Exception('invalid image type');
    }
    $data = str_replace( ' ', '+', $data );
    $data = base64_decode($data);

    if ($data === false) {
        throw new \Exception('base64_decode failed');
    }
} else {
    throw new \Exception('did not match data URI with image data');
}

file_put_contents("img.{$type}", $data);
?>