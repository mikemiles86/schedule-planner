
function buildBaseSchedule(trip, activities) {
  var schedule = buildEmptySchedule(trip.dates);

  for (var a in activities) {
    if (activities[a]["dates"].length == 1) {
      for (var d in activities[a]["dates"]) {
        if (activities[a]["dates"][d].length == 1) {
          schedule['activities'][] = a;
          schedule['dates'][d]['activities'][] = a;
          for(var t = activities[a]["dates"][d][0]["start"]; t <= activities[a]["dates"][d][0]["end"]; t += 0.5) {
            schedule['dates'][d]['times'][t] = a;
          }
        }
      }
    }
  }

  return schedule;
}

function buildEmptySchedule(dates) {
  var schedule = {};
  for(var d in dates) {
    for(var time = dates[d]["start"]; time <= dates[d]["end"]; time += 0.5) {
      schedule['dates'][d]['times'][time] = 0;
    }
  }

  return schedule;
}

function canFit(times, start, length, max) {
  var fit = true;

  for (var t = 0; t <= length; t += 0.5) {
    if ((start + t) > max || times[start + t] != 0) {
      fit = false;
      break(2);
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
          var schedule = base;
          if (canFit(schedule['dates'][d], start, activity['length'], end)) {
            schedule = addToSchedule(schedule, d, start, activity['length'], a);
            // Recurse.
          }
          start += 0.5;
        }
      }
    }
  }
  
  return schedules;
}




