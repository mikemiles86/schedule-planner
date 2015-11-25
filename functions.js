
function planTrip(trip, activities) {
  var schedules = buildSchedules(trip, activities, buildEmptySchedule(trip['dates']));
  alert(schedules.length + " Schedules Created.");
  printSchedules(schedules, activities);
}

function buildEmptySchedule(dates) {
  var schedule = {
    "activities" : {},
    "dates" : {}
  };
  for(var d in dates) {
    schedule["dates"][d] = {"times" : {}, "activities" : []};
    for(var time = dates[d]["start"]; time <= dates[d]["end"]; time += 0.5) {
      schedule['dates'][d]['times'][time] = 0;
    }
  }

  return schedule;
}

function canFit(date, start, length, end, max_per_day) {
  var fit = true;
  
  if (date['activities'].length >= max_per_day) {
    fit = false;
  }
  else {
    for (var time =0; time <= length; time += 0.5) {
      if ((start + time) > end || date['times'][start + time] != 0) {
        fit = false;
        break;
      }
    }
  }

  return fit;
}

function buildSchedules(trip, activities, base) {
  var schedules = [];
  for (var a in activities) {
    var activity = activities[a];
    for (var d in activity['dates']) {
      var date = activity['dates'][d];
      for (var g in date) {
        var group = date[g];
        var start = group['start'] > trip['dates'][d]['start'] ? group['start'] : trip['dates'][d]['start'];
        var end = group['end'] < trip['dates'][d]['end'] ? group['end'] : trip['dates'][d]['end'];
        while (start <= (end - activity['length'])) {
          if (canFit(base['dates'][d], start, activity['length'], end, trip['max_acts_per_day'])) {
            var schedule = addToSchedule(a, start, activity['length'], d, base);
            if (activities.length > 1) {
               // Remove activity.
              sub_activites = activities;
              delete sub_activities[a]; 
              // Build sub_schedules.
              var sub_schedules = buildSchedules(trip, sub_activities, schedule);
              if (sub_schedules.length > 0) {
                schedules.concat(sub_schedules);
              }
            }
          }
          start += 0.5;
        }
      }
    }
  }
  // Remove schedules which do not have th right count of activities.
  if (schedules.count > 0) {
    var return_schedules = [];
    for (var s in schedules) {
      if (schedules[s]['activities'].length >= activities.length) {
        return_schedules.push(schedules[s]);
      }
    }
  }
  
  return schedules;
}

function addToSchedule(activity, start, length, date, schedule) {
  for (var time =0; time <= length; time += 0.5) {
    schedule['dates'][date]['times'][start + time] = activity;
  }
  schedule['activities'].push(activity);
  schedule['dates'][date]['activities'].push(activity);
  return schedule;
}

function printSchedules(schedules, activities) {
  var csvContent = "data:text/csv;charset=utf-8,";
  for (var s in schedules) {
    var schedule = schedules[s];
    var schedule_prep = {
      "time" : []
    };
    for (var d in schedule['dates']) {
      schedule_prep["time"].push(d);
      for (var time in schedule['dates'][d]['times']) {
        if (schedule_prep[time] === 'undefined' || schedule_prep[time] === null) {
          schedule_prep[time] = [];
        }
        schedule_prep[time].push(schedule['dates'][d]['times'][time] == 0 ?  "" : activities[schedule['dates'][d]['times'][time]]["name"]);
      }
    }
    
    for (var r in schedule_prep) {
      csvContent += r + "," + schedule_prep[r].join(",") + "\n";
    }
    
    csvContent += "\n";
  }
  
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_schedules.csv");
  link.click();
}

