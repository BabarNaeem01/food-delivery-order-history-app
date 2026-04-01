<?php
require "db.php";
$result = $connection->query("SELECT id, order_code, order_date, total_price, items_summary FROM orders ORDER BY order_date DESC");
$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}
echo json_encode($orders);
?>
