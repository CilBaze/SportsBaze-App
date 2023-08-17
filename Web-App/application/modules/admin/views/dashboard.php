<?php 
$month = strtotime(date("Y-m-d", strtotime("-1 years")));
$end = strtotime(date("Y-m-d"));
$labels = [];
$fan_chart_series = [];
$coach_chart_series = [];
$club_chart_series = [];
$athlete_chart_series = [];
$posts_chart_series = [];
$pie_chart_graph = array(
    array('name' => 'Fan', 'color' => "#201f27", 'y' => (int) number_format((float)($stats_info->fan/$stats_info->total_user)*100, 2,'.', '')),
    array('name' => 'Coach', 'color' => "#403e4c", 'y' => (int) number_format((float)($stats_info->coach/$stats_info->total_user)*100, 2,'.', '')),
    array('name' => 'Club', 'color' => "#565561", 'y' => (int) number_format((float)($stats_info->club/$stats_info->total_user)*100, 2,'.', '')),
    array('name' => 'Athlete', 'color' => "#797884", 'y' => (int) number_format((float)($stats_info->athlete/$stats_info->total_user)*100, 2,'.', ''))
    );


while($month <= $end)
{
    array_push($labels, date('Y-m', $month));
    array_push($fan_chart_series, 0);
    array_push($coach_chart_series, 0);
    array_push($club_chart_series, 0);
    array_push($athlete_chart_series, 0);
    array_push($posts_chart_series, 0);
    $month = strtotime("+1 month", $month);

}

foreach ($fan_chart_data as $value) {
    $index = array_search($value->label_text, $labels);
    if($index > -1 && $index < count($fan_chart_series))
        $fan_chart_series[$index] = (int) $value->total;
    
}

foreach ($coach_chart_data as $value) {
    $index = array_search($value->label_text, $labels);
    if($index > -1 && $index < count($coach_chart_series))
        $coach_chart_series[$index] = (int) $value->total;
    
}

foreach ($club_chart_data as $value) {
    $index = array_search($value->label_text, $labels);
    if($index > -1 && $index < count($club_chart_series))
        $club_chart_series[$index] = (int) $value->total;
    
}

foreach ($athlete_chart_data as $value) {
    $index = array_search($value->label_text, $labels);
    if($index > -1 && $index < count($athlete_chart_series))
        $athlete_chart_series[$index] = (int) $value->total;
    
}

foreach ($post_chart_data as $value) {
    $index = array_search($value->label_text, $labels);
    if($index > -1 && $index < count($posts_chart_series))
        $posts_chart_series[$index] = (int) $value->total;
    
}

?>
<div class="container-fluid">
                <div class="we-page-title">
                    <div class="row">
                        <div class="col-md-5 align-self-center">
                            <h3 class="we-page-heading">Dashboard</h3> </div>
                        <div class="col-md-7 align-self-center">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                                <li class="breadcrumb-item active">Dashboard</li>
                            </ol>
                        </div>
                    </div>
                </div>

                 <div class="dashboard-section">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="dashboard">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="sp-chart-card">

                                            <div class="sp-chart-body">
                                                <div class="sp-chart-icon">
                                                    <i class="las la-running"></i>
                                                </div>
                                                <h2><?php echo number_format_short($stats_info->athlete);?></h2>
                                                <p>Total Number of Atheletes</p>
                                            </div>
                                            <div class="ds-chart" id="atheletes_graph"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="sp-chart-card">
                                            <div class="sp-chart-body">
                                                <div class="sp-chart-icon">
                                                    <i class="las la-school"></i>
                                                </div>
                                                <h2><?php echo number_format_short($stats_info->club);?></h2>
                                                <p>Total Number of Scouts/Club</p>
                                            </div>
                                            <div class="ds-chart" id="club_graph" ></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="sp-chart-card">
                                            <div class="sp-chart-body">
                                                <div class="sp-chart-icon">
                                                    <i class="las la-users"></i>
                                                </div>
                                                <h2><?php echo number_format_short($stats_info->fan);?></h2>
                                                <p>Total Number of Fan</p>
                                            </div>
                                            <div class="ds-chart" id="fan_graph" ></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="sp-chart-card">
                                            <div class="sp-chart-body">
                                                <div class="sp-chart-icon">
                                                    <i class="las la-user-tie"></i>
                                                </div>
                                                <h2><?php echo number_format_short($stats_info->coach);?></h2>
                                                <p>Total Number of Coach</p>
                                            </div>
                                            <div class="ds-chart" id="coach_graph" ></div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <div class="sp-chart-card">
                                            <div class="sp-chart-body">
                                                <div class="sp-chart-icon">
                                                    <i class="las la-newspaper"></i>
                                                </div>
                                                <h2><?php echo number_format_short($stats_info->posts);?></h2>
                                                <p>Total Number of Posts</p>
                                            </div>
                                            <div class="ds-chart" id="posts_graph" ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="sp-chart-card">
                                <div class="sp-chart-body">
                                    <h2><?php echo number_format_short($stats_info->total_user);?></h2>
                                </div>
                                <div id="pie_chart_graph" ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script type="text/javascript">
                var label_options_data = <?php echo json_encode($labels); ?>;
                var fan_chart_series = <?php echo json_encode($fan_chart_series);?>;
                var coach_chart_series = <?php echo json_encode($coach_chart_series);?>;
                var club_chart_series = <?php echo json_encode($club_chart_series);?>;
                var athlete_chart_series = <?php echo json_encode($athlete_chart_series);?>;
                var posts_chart_series = <?php echo json_encode($posts_chart_series);?>;
                var pie_chart_graph = <?php echo json_encode($pie_chart_graph);?>
            </script>