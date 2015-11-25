var trip = {
  "dates" : {
    "saturday" : { "start" : 9, "end" : 22},
    "sunday" : {"start": 9, "end" : 22},
    "monday" : {"start": 9, "end" : 22},
    "tuesday" : {"start": 9, "end" : 22},
    "wednesday": {"start": 9, "end" : 22},
    "thursday": {"start": 9, "end" : 22},
    "friday" : {"start": 9, "end" : 22}
  },
  "max_acts_per_day" : 3,
  "buffer" : 1,
}

var activities = {
  "travel_to" : {
    "name" : "Travel",
    "length" : 4,
    "dates" : {
      "saturday" : [{"start" : 10, "end" : 14}]
    }
  },
  "travel_from" : {
    "name" : "Travel",
    "length" : 10,
    "dates" : {
      "saturday" : [{"start" : 12, "end" : 22}]
    }
  },
  "winter_market" : {
    "name" : "Winter Market",
    "length" : 2,
    "dates" : {
      "saturday" : [{ "start" : 10, "end" : 22}],
      "sunday" : [{"start": 10, "end" : 22}],
      "monday" : [{"start": 10, "end" : 22}],
      "tuesday" : [{"start": 10, "end" : 22}],
      "wednesday": [{"start": 10, "end" : 22}],
      "thursday": [{"start": 10, "end" : 22}],
      "friday" : [{"start": 10, "end" : 22}]
    }
  },
  "kerst_fair" : {
    "name" : "Kerst Fair Market",
    "length" : 2,
    "dates" : {
      "sunday" : [{ "start": 12, "end": 18}]
    }
  },
  "coconuts" : {
    "name" : "Coffee & Coconuts",
    "length" : 1.5,
    "dates" : {
      "saturday" : [{ "start" : 9, "end" : 22}],
      "sunday" : [{"start": 9, "end" : 22}],
      "monday" : [{"start": 9, "end" : 22}],
      "tuesday" : [{"start": 9, "end" : 22}],
      "wednesday": [{"start": 9, "end" : 22}],
      "thursday": [{"start": 9, "end" : 22}],
      "friday" : [{"start": 9, "end" : 22}]
    }
  },
  "chocolate" : {
    "name" : "Metropolitan Chocolates",
    "length" : 1,
    "dates" : {
      "saturday" : [{ "start" : 9, "end" : 22}],
      "sunday" : [{"start": 9, "end" : 22}],
      "monday" : [{"start": 9, "end" : 22}],
      "tuesday" : [{"start": 9, "end" : 22}],
      "wednesday": [{"start": 9, "end" : 22}],
      "thursday": [{"start": 9, "end" : 22}],
      "friday" : [{"start": 9, "end" : 22}]
    }
  },
  "raypenaeyr": {
    "name" : "Raypenaeyr Cheese Tasting",
    "length" : 1,
    "dates" : {
      "saturday" : [
        {"start": 15, "end" : 16},
        {"start": 16.5, "end" : 17.5}
      ],
      "sunday" : [
        {"start" : 12, "end" : 13},
        {"start" : 13.5, "end" : 14.5},
        {"start" : 15, "end" : 16},
        {"start" : 16.5, "end" : 17.5}
      ],
      "monday" : [
        {"start" : 13, "end" : 14},
        {"start" : 15, "end" : 16}
      ],
      "tuesday" : [
        {"start" : 13, "end" : 14},
        {"start" : 15, "end" : 16}
      ],
      "wednesday" : [
        {"start" : 12, "end" : 13},
        {"start" : 13.5, "end" : 14.5},
        {"start" : 15, "end" : 16},
        {"start" : 16.5, "end" : 17.5}
      ],
      "thursday" : [
        {"start" : 12, "end" : 13},
        {"start" : 13.5, "end" : 14.5},
        {"start" : 15, "end" : 16},
        {"start" : 16.5, "end" : 17.5}
      ],
      "friday" : [
        {"start" : 12, "end" : 13},
        {"start" : 13.5, "end" : 14.5},
        {"start" : 15, "end" : 16},
        {"start" : 16.5, "end" : 17.5}
      ]
    }
  },
  "canal_tour" : {
    "name" : "Eating Amsterdamn Canal Tour",
    "length" : 4,
    "dates" : {
      "thursday" : [{"start" : 11, "end" : 15}]
    }
  },
  "paradox" : {
    "name" : "Paradox Cafe",
    "length" : 2,
    "dates" : {
      "saturday" : [{"start" : 10, "end" : 20}],
      "sunday" : [{"start" : 10, "end" : 20}],
      "monday" : [{"start" : 10, "end" : 20}],
      "wednesday" : [{"start" : 10, "end" : 20}]
    }
  },
  "illuminade" : {
    "name" : "Illuminade",
    "length" : 3,
    "dates" : {
      "thursday" : [{"start" : 17, "end" : 22}]
    }
  },
  "cheese_museum" : {
    "name" : "Cheese Museum",
    "length" : .5,
    "dates" : {
      "saturday" : [{ "start" : 9, "end" : 20}],
      "sunday" : [{"start": 9, "end" : 20}],
      "monday" : [{"start": 9, "end" : 20}],
      "tuesday" : [{"start": 9, "end" : 20}],
      "wednesday": [{"start": 9, "end" : 20}],
      "thursday": [{"start": 9, "end" : 20}],
      "friday" : [{"start": 9, "end" : 20}]
    }
  },
  "anne_frank" : {
    "name" : "Anne Frank House",
    "length" : 1.5,
    "dates" : {
      "tuesday" : [{"start" : 11.5, "end" : 13}]
    }
  },
  "Rijks" : {
    "name" : "Rijks Museum",
    "length" : 3,
    "dates" : {
      "saturday" : [{ "start" : 9, "end" : 17}],
      "sunday" : [{"start": 9, "end" : 17}],
      "monday" : [{"start": 9, "end" : 17}],
      "tuesday" : [{"start": 9, "end" : 17}],
      "wednesday": [{"start": 9, "end" : 17}],
      "thursday": [{"start": 9, "end" : 17}],
      "friday" : [{"start": 9, "end" : 17}]
    }
  },
  "gogh" : {
    "name" : "Van Gogh Museum",
    "length" : 3,
    "dates" : {
      "saturday" : [{ "start" : 9, "end" : 17}],
      "sunday" : [{"start": 9, "end" : 17}],
      "monday" : [{"start": 9, "end" : 17}],
      "tuesday" : [{"start": 9, "end" : 17}],
      "wednesday": [{"start": 9, "end" : 17}],
      "thursday": [{"start": 9, "end" : 17}],
      "friday" : [{"start": 9, "end" : 17}]
    }
  },
  "micro" : {
    "name" : "Micropia",
    "length" : 1.5,
    "dates" : {
      "saturday" : [{ "start" : 9, "end" : 18}],
      "sunday" : [{"start": 9, "end" : 18}],
      "monday" : [{"start": 9, "end" : 18}],
      "tuesday" : [{"start": 9, "end" : 18}],
      "wednesday": [{"start": 9, "end" : 18}],
      "thursday": [{"start": 9, "end" : 18}],
      "friday" : [{"start": 9, "end" : 18}]
    }
  }
}






