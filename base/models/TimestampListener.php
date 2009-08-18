<?
class TimestampListener extends Doctrine_Record_Listener
{
    public function preInsert(Doctrine_Event $event)
    {
        $event->getInvoker()->created = date('Y-m-d H:i:s', time());
        $event->getInvoker()->updated = date('Y-m-d H:i:s', time());
    }
    public function preUpdate(Doctrine_Event $event)
    {
        //$event->getInvoker()->created = date('Y-m-d H:i:s', time());
        $event->getInvoker()->updated = date('Y-m-d H:i:s', time());
    }
}
?>