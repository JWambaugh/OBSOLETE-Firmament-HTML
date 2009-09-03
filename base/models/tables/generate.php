<?


require_once('/web/firmament/lib/Doctrine.php');

spl_autoload_register(array('Doctrine', 'autoload'));
$manager = Doctrine_Manager::getInstance();
$conn = Doctrine_Manager::connection('mysql://root@localhost/firmament', 'doctrine');
Doctrine::generateModelsFromDb('models', array('doctrine'), array('generateTableClasses' => true));

