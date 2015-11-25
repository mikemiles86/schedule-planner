
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

function buildSchedule()

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
