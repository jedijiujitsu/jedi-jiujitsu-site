// SCHEDULE_DATA — weekly class schedule.
// Edit this file to change class times, add classes, or swap coaches.
//
// Discipline values (used for color-coding and filter buttons):
//   "bjj" | "judo" | "muaythai" | "kids" | "homeschool" | "private"
//
// Special fields:
//   flexTime: true  → shows time in condensed style (e.g. "By appt.")
//   note: string    → italic subheading in the class detail modal
//
// The "coach" field is a display string; the modal auto-links it back
// to the matching coach bio when the name matches a COACHES entry.

const SCHEDULE_DATA = [
  { day:'Monday', short:'Mon', classes:[
    { time:'4:30 PM', name:'Kids Kickboxing',         coach:'Nick Giles',         discipline:'kids' },
    { time:'5:30 PM', name:'Kids Judo',               coach:'Jedi Jiu-Jitsu Staff',   discipline:'kids' },
    { time:'6:30 PM', name:'Adult Judo',              coach:'Jedi Jiu-Jitsu Staff',   discipline:'judo' },
    { time:'6:30 PM', name:'Jiu-Jitsu Fundamentals',  coach:'Jamie Mickle',       discipline:'bjj' },
    { time:'7:30 PM', name:'Adult Jiu-Jitsu',         coach:'Jamie Mickle',       discipline:'bjj' },
  ]},
  { day:'Tuesday', short:'Tue', classes:[
    { time:'11:00 AM', name:'Homeschool Jiu-Jitsu',   coach:'Jamie Mickle',       discipline:'homeschool' },
    { time:'12:00 PM', name:'Adult Jiu-Jitsu',        coach:'Jamie Mickle',       discipline:'bjj' },
    { time:'4:30 PM',  name:'Kids Jiu-Jitsu',         coach:'Jamie Mickle',       discipline:'kids' },
    { time:'6:00 PM',  name:'Kids Jiu-Jitsu',         coach:'Jamie Mickle',       discipline:'kids' },
    { time:'7:00 PM',  name:'Adult Jiu-Jitsu',        coach:'Jamie Mickle',       discipline:'bjj' },
  ]},
  { day:'Wednesday', short:'Wed', classes:[
    { time:'6:00 AM', name:'Adult No-Gi Jiu-Jitsu',   coach:'Jamie Mickle',       discipline:'bjj' },
    { time:'4:30 PM', name:'Kids Kickboxing',         coach:'Nick Giles',         discipline:'kids' },
    { time:'5:30 PM', name:'Muay Thai',               coach:'Lester Phillips',    discipline:'muaythai' },
    { time:'6:30 PM', name:'Adult Judo',              coach:'Jedi Jiu-Jitsu Staff',   discipline:'judo' },
    { time:'7:30 PM', name:'Adult No-Gi Jiu-Jitsu',   coach:'Jamie Mickle',       discipline:'bjj' },
  ]},
  { day:'Thursday', short:'Thu', classes:[
    { time:'11:00 AM', name:'Homeschool Jiu-Jitsu',   coach:'Jamie Mickle',       discipline:'homeschool' },
    { time:'12:00 PM', name:'Adult Jiu-Jitsu',        coach:'Jamie Mickle',       discipline:'bjj' },
    { time:'4:30 PM',  name:'Kids Jiu-Jitsu',         coach:'Jamie Mickle',       discipline:'kids' },
    { time:'6:00 PM',  name:'Kids Jiu-Jitsu',         coach:'Jamie Mickle',       discipline:'kids' },
    { time:'7:00 PM',  name:'Adult Jiu-Jitsu',        coach:'Jamie Mickle',       discipline:'bjj' },
  ]},
  { day:'Friday', short:'Fri', classes:[
    { time:'5:30 PM',  name:'Muay Thai',                 coach:'Lester Phillips',  discipline:'muaythai' },
    { time:'6:30 PM',  name:'Open Mat',                  coach:'All Instructors',  discipline:'bjj' },
    { time:'By appt.', name:'Individual Custom Lessons', coach:'Any Instructor',   discipline:'private', flexTime:true,
      note:'Available before scheduled classes (before 5:30 PM) and after (after 7:30 PM). Book by appointment.' },
  ]},
  { day:'Saturday', short:'Sat', classes:[
    { time:'10:00 AM', name:'No-Gi Jiu-Jitsu',        coach:'Jamie Mickle',       discipline:'bjj' },
    { time:'11:30 AM', name:'Kids Judo',              coach:'Jedi Jiu-Jitsu Staff',   discipline:'kids' },
    { time:'12:30 PM', name:'Adult Judo',             coach:'Jedi Jiu-Jitsu Staff',   discipline:'judo' },
  ]},
  { day:'Sunday', short:'Sun', classes:[
    { time:'11:00 AM', name:'Grapple Chapel',                coach:'Jamie Mickle',     discipline:'bjj',
      note:'A Sunday morning training session at Jedi Jiu-Jitsu. Call the academy for details.' },
    { time:'12:30 PM', name:'Kids Competition Training',     coach:'Jamie Mickle',     discipline:'kids',
      note:'Focused training for kids preparing for tournaments. Call the academy for details.' },
    { time:'By appt.', name:'Individual Custom Lessons',     coach:'Any Instructor',   discipline:'private', flexTime:true },
  ]},
];
