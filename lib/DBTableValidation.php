<?php
interface DBTableValidation {
    public static function isValid($vars);
    public function getErrorCodes();
}
?>