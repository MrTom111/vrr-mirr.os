<?php

$vvs_startId = getConfigValue('vvs_startId');
$vvs_startName = getConfigValue('vvs_startName');
$vvs_bus = getConfigValue('vvs_bus');
$vvs_ubahn = getConfigValue('vvs_ubahn');
$vvs_sbahn = getConfigValue('vvs_sbahn');
$vvs_zuege = getConfigValue('vvs_zuege');

?>

<div class="ui-widget">
  <h6><?php echo _('vvs_start'); ?></h6>
  <input id="vvs_start" value="<?php echo $vvs_startName; ?>"/>
  <p></p>
  <h6><?php echo _('vvs_bus'); ?></h6>
  <input type="checkbox" id="vvs_bus" <?php if ($vvs_bus == "true") {
    echo "checked";
  }  ?> />
  <h6><?php echo _('vvs_ubahn'); ?></h6>
  <input type="checkbox" id="vvs_ubahn" <?php if ($vvs_ubahn == "true") {
    echo "checked";
  } ?> />
  <h6><?php echo _('vvs_sbahn'); ?></h6>
  <input type="checkbox" id="vvs_sbahn" <?php if ($vvs_sbahn == "true") {
    echo "checked";
  } ?> />
  <h6><?php echo _('vvs_zuege'); ?></h6>
  <input type="checkbox" id="vvs_zuege" <?php if ($vvs_zuege == "true") {
    echo "checked";
  } ?> />
</div>

<div id="vvs_error" style="color:red"></div>
<div id="vvs_ok" style="color:green"></div><br />

<div class="block__add" id="vvs__edit">
	<button class="vvs__edit--button" href="#">
		<span><?php echo _('save'); ?></span>
	</button>
</div>
