// COACHES data — real bios from the existing site.
// When adding a new coach, keep the same shape:
//   id / name / role / badge? / head? / url / bio[] / creds[]
//
// The `head: true` flag applies the red gradient card treatment.
// The `badge` string (e.g. "Lead") shows as a small tag in the corner.

const COACHES = [
  { id:'jamie', name:'Jamie Mickle', role:'Head Instructor & Owner', badge:'Lead', head:true,
    url:'https://www.jjjtulsajiu-jitsu.com/jamie-mickle-bjj',
    bio:[
      "Jamie Mickle has over 30 years of experience in practicing martial arts. He has a BA in Mass Communications and has been a martial arts instructor for over 20 years. He is currently an affiliate of Carlos Machado and attends regular continuing education classes twice per year.",
      "He also conducts seminars and participates regularly in seminars from peer professors, furthering his education in the art of Brazilian Jiu-Jitsu. His instruction provides services for self-care, self-defense, Brazilian jiu-jitsu and life coaching.",
      "He provides an environment that allows everyone to progress at their own pacing and to reach their individual goals."
    ],
    creds:["2nd Degree Blackbelt Brazilian Jiu-Jitsu","2nd Degree Blackbelt Karate","4th Degree Blackbelt Ketsugo Jiu-Jitsu"]
  },
  { id:'greg', name:'Greg Hoyle', role:'Professor · BJJ Instructor',
    url:'https://www.jjjtulsajiu-jitsu.com/gregory-hoyle-bjj',
    bio:[
      "Professor Greg Hoyle is a Computer Engineer who enjoys gaming and Martial Arts.",
      "He has been practicing Martial Arts for over 30 years. His journey began with Kung Fu (4yrs), transitioned to Karate (2yrs), Judo (1yr), Muay Thai (2yrs), and Brazilian Jiu-Jitsu (21yrs). He is a first degree blackbelt in BJJ. Professor Greg's BJJ knowledge is vast and he lends his expertise during the classes that he teaches and attends. When training, he enjoys finding new and inventive ways to overcome larger opponents. He offers private sessions for those who are interested in these tactics. His wife, Patsy, also trains and is a brown belt.",
      "There is only one thing you need to remember with Professor Greg — Where there's a wrist, there's a lock."
    ],
    creds:["1st Degree Black Belt in Brazilian Jiu-Jitsu"]
  },
  { id:'shane', name:'Shane Branstetter', role:'BJJ Instructor',
    url:'https://www.jjjtulsajiu-jitsu.com/shane-branstetter',
    bio:[
      "Shane Branstetter has been an admirer of martial arts his entire life. Because of health issues, he felt he was not able to participate in martial arts. After he was diagnosed with a life-threatening condition, he made the decision to begin a new journey in his life. He began exercising regularly and changed his eating habits. In 2018, he joined Jedi Jiu-Jitsu and became a practitioner of Brazilian Jiu-Jitsu. Since then, he has lost over 200 lbs, and has been training consistently for seven years.",
      "He trains at least 5 days a week and instructs at least 2 days a week. Because of his tremendous amount of dedication, focus, and hard work, he has achieved the rank of black belt in less time than most practitioners.",
      "Like all instructors at Jedi Jiu-Jitsu, he incorporates a wealth of knowledge, passion, and camaraderie to his classes. He also offers private sessions to students."
    ],
    creds:["Black Belt in Brazilian Jiu-Jitsu"]
  },
  { id:'robert', name:'Robert Hale', role:'BJJ Instructor',
    url:'https://www.jjjtulsajiu-jitsu.com/robert-hale',
    bio:[
      "Robert Hale has 25 years of experience in practicing martial arts and 20 years of teaching. He is a manager at a fortune 500 company that services over 6.7 million customers. He participates regularly in seminars from peer professors and participates in affiliate training."
    ],
    creds:["Black Belt in Brazilian Jiu-Jitsu","2nd Degree Black Belt in Karate","3rd Degree Black Belt in Ketsugo Jiu-Jitsu"]
  },
  { id:'lester', name:'Lester Phillips', role:'Muay Thai Head Coach',
    url:'https://www.jjjtulsajiu-jitsu.com/muaythai',
    bio:[
      "Coach Lester is a lifetime Martial Artist with a lifetime of experience. He is a 3x World Kickboxing Champion across two different weight classes. His style of teaching combines building a strong foundation along with utilizing superior footwork and striking. His classes are perfect for a beginner all the way to world class striker.",
      "Additionally, he holds a degree in sports physiology and is a premier personal trainer along with recovery specialist."
    ],
    creds:["3x World Kickboxing Champion (two weight classes)","Degree in Sports Physiology","Personal Trainer & Recovery Specialist"]
  },
  { id:'patrick', name:'Patrick Sharp', role:'Dr. · BJJ Instructor',
    url:'https://www.jjjtulsajiu-jitsu.com/patrick-sharp',
    bio:[
      "Dr. Patrick Sharp has over 30 years of experience in practicing martial arts and over 20 years of teaching. He is the Senior physician and owns Cenegenics Tulsa. He participates regularly in seminars from peer professors and participates in affiliate training. He also provides medical support for XFN."
    ],
    creds:["Black Belt in Brazilian Jiu-Jitsu","4th Degree Black Belt in Karate","3rd Degree Black Belt in Ketsugo Jiu-Jitsu"]
  },
  { id:'nick', name:'Nick Giles', role:'Kids Kickboxing',
    url:'https://www.jjjtulsajiu-jitsu.com/nickgiles',
    bio:[
      "Coach Nick heads up our exciting new Kids Kickboxing program. With the experience of running a Martial Arts school, having fought multiple kickboxing matches — Coach Nick brings an exciting element to the program.",
      "Kids will learn discipline, respect and the best techniques from Muay Thai, American Boxing, Kids Kickboxing, Karate and Tae Kwon Do."
    ],
    creds:["4th Degree Black Belt in Karate and Tae Kwon Do","University of Tulsa graduate · B.S. in Sociology","ISSA and NASM certified personal trainer","Currently a Systems Engineer"]
  },
  { id:'tim', name:'Tim Webster', role:'BJJ Instructor',
    bio:["[BIO COMING SOON — do not publish until replaced]"],
    creds:[]
  },
  { id:'cortez', name:'Cortez Edwards', role:'BJJ Instructor',
    bio:["[BIO COMING SOON — do not publish until replaced]"],
    creds:[]
  }
];
