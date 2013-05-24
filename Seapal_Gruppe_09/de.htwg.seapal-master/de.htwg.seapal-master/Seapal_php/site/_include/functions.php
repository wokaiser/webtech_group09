<?php
  // Convert dd.mm.yyyy -> sql
  function convert_date_to_sql($date) {
    $array = explode(".",$date);
    if(is_array($array) && count($array) > 1)
        return $array[2].'-'.$array[1].'-'.$array[0];
    return $date;
  }
 
  // Convert sql -> dd.mm.yyyy
  function convert_date_from_sql($date) {
    $array = explode("-",$date);
    if(is_array($array) && count($array) > 1)
        return $array[2].'.'.$array[1].'.'.$array[0];
    return $date;
  }
?>