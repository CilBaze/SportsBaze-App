<?php 
defined('BASEPATH') or exist('no direct script access allowed');


if ( ! function_exists('create_slug')){

    function create_slug($string,$table,$field='slug',$key=NULL,$value=NULL)
    {
        $t =& get_instance();
        $slug = url_title($string);
        $slug = strtolower($slug);
        $i = 0;
        $params = array ();
        $params[$field] = $slug;
     
        if($key)$params["$key !="] = $value; 
     
        while ($t->db->where($params)->get($table)->num_rows())
        {   
            if (!preg_match ('/-{1}[0-9]+$/', $slug ))
                $slug .= '-' . ++$i;
            else
                $slug = preg_replace ('/[0-9]+$/', ++$i, $slug );
             
            $params [$field] = $slug;
        }   
        return $slug;   
    }
}



if(! function_exists('encrypt_decrypt')){
    
   function encrypt_decrypt($action, $string) {
        $output = false;
        $encrypt_method = "AES-256-CBC";
        $secret_key = 'QAWZERTYU';
        $secret_iv = 'AZSWQAERTY';
        // hash
        $key = hash('sha256', $secret_key);
        
        // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
        $iv = substr(hash('sha256', $secret_iv), 0, 16);
        if ( $action == 'encrypt' ) {
            $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
            $output = base64_encode($output);
        } else if( $action == 'decrypt' ) {
            $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
        }
        return $output;
    }

}

if (!function_exists('get_table_record')) {
    function get_table_record($table,$condition,$field)
    {
        $t =& get_instance();
        $t->db->select($field);
        $t->db->from($table);
        $t->db->where($condition);
        return $t->db->get();
    }
}
if (!function_exists('mask_account_number')) {
    function mask_account_number($number){
        
        $mask_number =  str_repeat("*", strlen($number)-1) . substr($number, -4);
        
        return $mask_number;
    }
}

if (!function_exists('get_user_group')) {
    function get_user_group($user_group){
            $user_group_name = 'Admin';
            if($user_group == '2')
                $user_group_name = 'Fan';
            else if($user_group == '3')
                $user_group_name = 'Coach / Trainer';
            else if($user_group == '4')
                $user_group_name = 'Scout / Club';
            else if($user_group == '5')
                $user_group_name = 'Athlete';
            return $user_group_name;

    }
}
/*Time Elapsed String*/
if (!function_exists('time_elapsed_string')) {
    function time_elapsed_string($datetime, $full = false) {
        $now = new DateTime;
        $ago = new DateTime($datetime);
        $diff = $now->diff($ago);
        $diff->w = floor($diff->d / 7);
        $diff->d -= $diff->w * 7;

        $string = array(
            'y' => 'Year',
            'm' => 'Month',
            'w' => 'Week',
            'd' => 'Day',
            'h' => 'Hour',
            'i' => 'Min',
            's' => 'Sec',
        );
        foreach ($string as $k => &$v) {
            if ($diff->$k) {
                $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
            } else {
                unset($string[$k]);
            }
        }

        if (!$full) $string = array_slice($string, 0, 1);
        return $string ? implode(', ', $string) . ' ago' : 'just now';
    }
}

if (!function_exists('number_format_short')) {
    function number_format_short( $n, $precision = 1 ) {
        if ($n < 900) {
            // 0 - 900
            $n_format = number_format($n, $precision);
            $suffix = '';
        } else if ($n < 900000) {
            // 0.9k-850k
            $n_format = number_format($n / 1000, $precision);
            $suffix = 'K';
        } else if ($n < 900000000) {
            // 0.9m-850m
            $n_format = number_format($n / 1000000, $precision);
            $suffix = 'M';
        } else if ($n < 900000000000) {
            // 0.9b-850b
            $n_format = number_format($n / 1000000000, $precision);
            $suffix = 'B';
        } else {
            // 0.9t+
            $n_format = number_format($n / 1000000000000, $precision);
            $suffix = 'T';
        }

      // Remove unecessary zeroes after decimal. "1.0" -> "1"; "1.00" -> "1"
      // Intentionally does not affect partials, eg "1.50" -> "1.50"
        if ( $precision > 0 ) {
            $dotzero = '.' . str_repeat( '0', $precision );
            $n_format = str_replace( $dotzero, '', $n_format );
        }

        return $n_format . $suffix;
    }
}


if (!function_exists('generate_video_thumbnail')) {
    function generate_video_thumbnail($source_file, $target_file) {
        $ffmpeg= "/usr/bin/ffmpeg";
        //time to take screenshot at
        $interval = 1;

        //screenshot size
        $size = '320x240';
        $cmd = "$ffmpeg -i $source_file -deinterlace -an -ss $interval -f mjpeg -t 1 -r 1 -y -s $size $target_file 2>&1";
        exec($cmd, $output, $retval);
        if ($retval)
        {
            return false;
        }
        else
            return true;
    }
}

if (!function_exists('compress_video_file')) {
    function compress_video_file($source_file, $target_file) {
        $ffmpeg= "/usr/bin/ffmpeg";
        $cmd = "$ffmpeg -i $source_file -b 1000000 $target_file";
        exec($cmd, $output, $retval);
        if ($retval)
        {
            return false;
        }
        else
            return true;
    }
}