var start_time;

function planTrip(trip, activities) {
  start_time = Date.now();
  printMessage("Calculating...", 0);
  var base = buildEmptySchedule(trip['dates']);
  var sub_activities = JSON.parse(JSON.stringify(activities));
  var schedules = buildSchedules(trip, sub_activities, base, 0);
  schedules = trimSchedules(schedules, countActivities(sub_activities));
  schedules = removeDuplicates(schedules);
  printMessage("Schedules with " + countActivities(activities) + " activities: " + schedules.length, 0);
  if (schedules.length > 0) {
    if (trip['max_options'] && schedules.length > trip['max_options']) {
      schedules = shuffle(schedules);
      schedules = schedules.slice(0, trip['max_options']);
    }
    printSchedules(schedules, activities);
  }
  printMessage("Time taken: " + ((Date.now() - start_time)/1000) + " seconds.", 0);
}

function countActivities(activities) {
  var count = 0;

  for (var a in activities) {
    if(activities[a]['name'].length > 0) {
      count++;
    }
  }

  return count;
}

function trimSchedules(schedules, act_count) {
  var trimmed = [];
  for(var s in schedules) {
    if (schedules[s]['activities'].length < act_count) {
    }else {
      trimmed.push(schedules[s]);
    }
  }
  schedules = trimmed;
  return schedules;
}

function removeDuplicates(a) {
  if (a.length > 1) {
    var seen = {}
    var out = [];

    for (var i = 0; i < a.length; i++) {
      var seen_item = createActivityHash(a[i]);
      if (seen[seen_item] !== 1) {
        seen[seen_item] = 1;
        out.push(a[i]);
      }
    }
  }
  else {
    var out = a;
  }

  return out;
}

function createActivityHash(schedule) {
  var data = [];

  for (var d in schedule['dates']) {
    data.push(schedule['dates'][d]['times']);
  }

  return createHash(JSON.stringify(data));
}

function createHash(str) {
  var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return "s" + Math.abs(hash);
}

function buildEmptySchedule(dates) {
  var schedule = {
    "activities" : [],
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

function copySchedule(schedule) {
  return JSON.parse(JSON.stringify(schedule));
}

function canFit(date, start, length, end, max_per_day) {

  if (date['activities'].length >= max_per_day) {
    return false;
  }
  else {
    for (var time =0; time <= length; time += 0.5) {
      if ((start + time) > end || date['times'][start + time] != 0) {
        return false;
      }
    }
  }

  return true;
}


function buildSchedules(trip, activities, base, level) {
  var schedules = [];

  for (var a in activities) {
    var activity = activities[a];
    var act_length = activity['length'];
    // Loop through all available days.
    for (var d in activity['dates']) {
      // Make sure day is not already full.
      if (base['dates'][d]['activities'].length < trip['max_acts_per_day']) {
        //printMessage("^" + d, level);
        // Loop through all time groups.
        for (var g in activity['dates'][d]) {
          // Get start time.
          var start = activity['dates'][d][g]['start'];
          start = start < (trip['dates'][d]['start']+1) ? (trip['dates'][d]['start']+1) : start;
          // Get end time.
          var end = activity['dates'][d][g]['end'];
          end = end > (trip['dates'][d]['end']-1) ? trip['dates'][d]['end'] - 1 : end;
          // Get max start time.
          var max_start = end - act_length;
          //printMessage("START: " + start + ", END: " + end + ", Max: " + max_start, level);
          // Loop from start to max start.
          while (start <= max_start) {
            // Check that activity can fit in this time slot.
            if (activityCanFit(base['dates'][d]['times'], start, act_length+trip['buffer'])) {
              printMessage("> " + a + " on " + d + " @ " + calcAmPm(start*10), level);
              // Create a new schedule to act as base for subs.
              var schedule = copySchedule(base);
              // Add activity to schedule.
              addActivityToSchedule(schedule, a, d, start, act_length);
              // Add a buffer after activity.
              addBufferToSchedule(schedule, d, start+act_length, trip['buffer']);
              
              // Create array of sub activities.
              var sub_activities = removeActivity(activities, a);
              // Have sub activities?
              if (countActivities(sub_activities) > 0) {
                // Create sub_schedules.
                var sub_schedules = buildSchedules(trip, sub_activities, schedule, level+1);
                // Sub schedules created?
                if (sub_schedules.length > 0) {
                  // Add them to schedules array.
                  schedules = schedules.concat(sub_schedules);
                }
              } else {
                //printMessage("^NO SUBS", level);
                schedules.push(schedule);
              }
            }
            start += trip['adjust_by'];
          }
        }
      }
    }
    activities = removeActivity(activities, a);
  }
  schedules = trimSchedules(schedules, countActivities(activities));
  return schedules;
}


function activityCanFit(times, start, length) {
  var fit = true;

  for (var t=0; t<length; t+=0.5) {
    if (times[start + t] != 0) {
      fit = false;
      break;
    }
  }

  return fit;
}

function addActivityToSchedule(schedule, activity, date, start, length) {
  for (var t=0; t < length; t+=0.5 ) {
    schedule['dates'][date]['times'][start + t] = activity;
  }
  schedule['dates'][date]['activities'].push(activity);
  schedule['activities'].push(activity);
}

function removeActivity(activities, activity) {
  var new_activities = JSON.parse(JSON.stringify(activities));
  delete new_activities[activity];
  return new_activities;
}

function removeActivities(activities, remove_acts) {
  var new_activities = JSON.parse(JSON.stringify(activities));
  for (var a in remove_acts) {
    if (new_activities.hasOwnProperty(remove_acts[a])) {
      delete new_activities[remove_acts[a]];
    }
  }
  return new_activities;
} 

function addBufferToSchedule(schedule, date, start, length) {
  for (var t=0; t<length; t += 0.5) {
    if (schedule['dates'][date]['times'].hasOwnProperty(start + t)) {
      schedule['dates'][date]['times'][start + t] = 1;
    }
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function printSchedules(schedules, activities) {
  var csvContent = "data:text/csv;charset=utf-8,";
  // Loop through each schedule.
  for (var s in schedules) {
    // build a prep object.
    var schedule_prep = {
      "0" : []
    }

    // Loop through all the days.
    for(var d in schedules[s]['dates']) {
      // Push day to the time row.
      schedule_prep["0"].push(d);
      // Loop through all of the times.
      for (var t in schedules[s]['dates'][d]['times']) {
        // Get AMPM of time.
        var ampm = t*10;//calcAmPm(t);
        // Create row if not exists.
        if (!schedule_prep.hasOwnProperty(ampm)) {
          schedule_prep[ampm] = [];
        }
        var time = schedules[s]['dates'][d]['times'][t];
        // Empty time?
        if (time === 0 || time === 1) {
          schedule_prep[ampm].push(" ");
        }
        else {
          // Add activitiy name.
          schedule_prep[ampm].push(activities[time]["name"]);
        }
      }
    }
    // Build rows.
    for (var r in schedule_prep) {
      csvContent += (r=="0" ? "time" : calcAmPm(r)) + "," + schedule_prep[r].join(",") + "\n";
    }
    
    csvContent += "\n";
  }

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_schedules.csv");
  link.click();
}

function calcAmPm(time) {
  var h = parseInt(time/10);
  var m = time%10;

  return (h > 12 ? h-12 : h) + ':' + (m ? '30' : '00') + (h>=12 ? 'p' : 'a') + 'm';
}

function printMessage(message, level) {
  var print = true;

  if (print) {
    var prefix = "";
    for(var i=0; i<level;i++) {
      prefix +="-";
    }
    if (prefix) {
      message = prefix + message;
    }

    //console.log(message);
    var txt = document.createTextNode(message);
    var br = document.createElement("br");
    document.getElementById("log").appendChild(txt);  
    document.getElementById("log").appendChild(br);  
  }
}
