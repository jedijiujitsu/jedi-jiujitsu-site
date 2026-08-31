// COACHES data — real bios from the existing site.
// When adding a new coach, keep the same shape:
//   id / name / role / badge? / head? / url / bio[] / creds[] / images[]
//
// The `head: true` flag applies the red gradient card treatment.
// The `badge` string (e.g. "Lead") shows as a small tag in the corner.
// images[] — paths relative to the src/ root, primary photo first.
//   Empty array = no photos yet; gradient placeholder renders in tile + modal.
//   All paths are listed; rendering code slices to MAX_CAROUSEL_PHOTOS (see scripts.js).

const COACHES = [
  { id:'jamie', name:'Jamie Mickle', role:'Head Instructor & Owner', badge:'Lead', head:true,
    url:'https://www.jjjtulsajiu-jitsu.com/jamie-mickle-bjj',
    bio:[
      "Jamie Mickle has over 30 years of experience in practicing martial arts. He has a BA in Mass Communications and has been a martial arts instructor for over 20 years. He is currently an affiliate of Carlos Machado and attends regular continuing education classes twice per year.",
      "He also conducts seminars and participates regularly in seminars from peer professors, furthering his education in the art of Brazilian Jiu-Jitsu. His instruction provides services for self-care, self-defense, Brazilian jiu-jitsu and life coaching.",
      "He provides an environment that allows everyone to progress at their own pacing and to reach their individual goals."
    ],
    creds:["2nd Degree Blackbelt Brazilian Jiu-Jitsu","2nd Degree Blackbelt Karate","4th Degree Blackbelt Ketsugo Jiu-Jitsu"],
    // NOTE: array order is deliberate — jamie-03 is first because it is the tile/primary photo.
    // Do NOT re-sort these by filename. images[0] = tile photo.
    images:[
      "images/coaches/jamie/jamie-03.jpg",
      "images/coaches/jamie/jamie-01.jpg",
      "images/coaches/jamie/jamie-02.jpg",
      "images/coaches/jamie/jamie-04.jpg",
      "images/coaches/jamie/jamie-05.jpg"
    ]
  },
  { id:'greg', name:'Greg Hoyle', role:'Professor · BJJ Instructor',
    url:'https://www.jjjtulsajiu-jitsu.com/gregory-hoyle-bjj',
    bio:[
      "Professor Greg Hoyle is a Computer Engineer who enjoys gaming and Martial Arts.",
      "He has been practicing Martial Arts for over 30 years. His journey began with Kung Fu (4yrs), transitioned to Karate (2yrs), Judo (1yr), Muay Thai (2yrs), and Brazilian Jiu-Jitsu (21yrs). He is a first degree blackbelt in BJJ. Professor Greg's BJJ knowledge is vast and he lends his expertise during the classes that he teaches and attends. When training, he enjoys finding new and inventive ways to overcome larger opponents. He offers private sessions for those who are interested in these tactics. His wife, Patsy, also trains and is a brown belt.",
      "There is only one thing you need to remember with Professor Greg — Where there's a wrist, there's a lock."
    ],
    creds:["1st Degree Black Belt in Brazilian Jiu-Jitsu"],
    images:[
      "images/coaches/greg/greg-hoyle-01.jpg",
      "images/coaches/greg/greg-hoyle-02.jpg",
      "images/coaches/greg/greg-hoyle-03.jpg",
      "images/coaches/greg/greg-hoyle-04.jpg"
    ]
  },
  { id:'shane', name:'Shane Branstetter', role:'BJJ Instructor',
    url:'https://www.jjjtulsajiu-jitsu.com/shane-branstetter',
    bio:[
      "Shane Branstetter has been an admirer of martial arts his entire life. Because of health issues, he felt he was not able to participate in martial arts. After he was diagnosed with a life-threatening condition, he made the decision to begin a new journey in his life. He began exercising regularly and changed his eating habits. In 2018, he joined Jedi Jiu-Jitsu and became a practitioner of Brazilian Jiu-Jitsu. Since then, he has lost over 200 lbs, and has been training consistently for seven years.",
      "He trains at least 5 days a week and instructs at least 2 days a week. Because of his tremendous amount of dedication, focus, and hard work, he has achieved the rank of black belt in less time than most practitioners.",
      "Like all instructors at Jedi Jiu-Jitsu, he incorporates a wealth of knowledge, passion, and camaraderie to his classes. He also offers private sessions to students."
    ],
    creds:["Black Belt in Brazilian Jiu-Jitsu"],
    images:[...Array(11)].map((_,i)=>`images/coaches/shane/shane-branstetter-${String(i+1).padStart(2,'0')}.jpg`)
  },
  { id:'robert', name:'Robert Hale', role:'BJJ Instructor',
    url:'https://www.jjjtulsajiu-jitsu.com/robert-hale',
    bio:[
      "Robert Hale has 25 years of experience in practicing martial arts and 20 years of teaching. He is a manager at a fortune 500 company that services over 6.7 million customers. He participates regularly in seminars from peer professors and participates in affiliate training."
    ],
    creds:["Black Belt in Brazilian Jiu-Jitsu","2nd Degree Black Belt in Karate","3rd Degree Black Belt in Ketsugo Jiu-Jitsu"],
    images:[]
  },
  { id:'lester', name:'Lester Phillips', role:'Muay Thai Head Coach',
    url:'https://www.jjjtulsajiu-jitsu.com/muaythai',
    bio:[
      "Coach Lester is a lifetime Martial Artist with a lifetime of experience. He is a 3x World Kickboxing Champion across two different weight classes. His style of teaching combines building a strong foundation along with utilizing superior footwork and striking. His classes are perfect for a beginner all the way to world class striker.",
      "Additionally, he holds a degree in sports physiology and is a premier personal trainer along with recovery specialist."
    ],
    creds:["3x World Kickboxing Champion (two weight classes)","Degree in Sports Physiology","Personal Trainer & Recovery Specialist"],
    images:[
      "images/coaches/lester/lester-phillips-01.jpg",
      "images/coaches/lester/lester-phillips-02.jpg",
      "images/coaches/lester/lester-phillips-03.jpg",
      "images/coaches/lester/lester-phillips-04.jpg",
      "images/coaches/lester/lester-phillips-05.jpg"
    ]
  },
  { id:'patrick', name:'Patrick Sharp', role:'Dr. · BJJ Instructor',
    url:'https://www.jjjtulsajiu-jitsu.com/patrick-sharp',
    bio:[
      "Dr. Patrick Sharp has over 30 years of experience in practicing martial arts and over 20 years of teaching. He is the Senior physician and owns Cenegenics Tulsa. He participates regularly in seminars from peer professors and participates in affiliate training. He also provides medical support for XFN."
    ],
    creds:["Black Belt in Brazilian Jiu-Jitsu","4th Degree Black Belt in Karate","3rd Degree Black Belt in Ketsugo Jiu-Jitsu"],
    images:[]
  },
  { id:'nick', name:'Nick Giles', role:'Kids Kickboxing',
    url:'https://www.jjjtulsajiu-jitsu.com/nickgiles',
    bio:[
      "Coach Nick heads up our exciting new Kids Kickboxing program. With the experience of running a Martial Arts school, having fought multiple kickboxing matches — Coach Nick brings an exciting element to the program.",
      "Kids will learn discipline, respect and the best techniques from Muay Thai, American Boxing, Kids Kickboxing, Karate and Tae Kwon Do."
    ],
    creds:["4th Degree Black Belt in Karate and Tae Kwon Do","University of Tulsa graduate · B.S. in Sociology","ISSA and NASM certified personal trainer","Currently a Systems Engineer"],
    images:[
      "images/coaches/nick/nick-giles-01.jpg",
      "images/coaches/nick/nick-giles-02.jpg",
      "images/coaches/nick/nick-giles-03.jpg",
      "images/coaches/nick/nick-giles-04.jpg"
    ]
  },
  { id:'tim', name:'Tim Webster', role:'BJJ Instructor',
    bio:[
      "Tim Webster is a mechanical engineer who has been studying Brazilian Jiu-Jitsu since 2013 when he began training in Gracie Jiu-Jitsu. In 2018 he began teaching as a certified instructor and he received his black belt in 2023. In 2025 he joined the Carlos Machado Jiu-Jitsu association as an instructor at Jedi Jiu-Jitsu, where he enjoys helping kids and adults to learn the art of Brazilian Jiu-Jitsu. As someone who started Jiu-Jitsu in his early 40s, Tim especially enjoys helping people who think that they are not young enough, strong enough, or in good enough shape to learn martial arts.",
      "When he is not on the mats teaching, Tim can be found either working as the Chief Operating Officer for XRG Technologies, an engineering company specializing in combustion and heater transfer solutions for the refining and chemical industry, or spending time with his wife Crystal, daughter Holly and two poorly behaved rescue dogs, Arlo and Lola. He enjoys reading, swimming, watching movies, traveling and teaching wrist locks to everyone."
    ],
    creds:["Black Belt in Brazilian Jiu-Jitsu (2023)","Certified instructor since 2018","Training since 2013"],
    // NOTE: tim-00.jpg filename is intentional — do not rename to tim-01 to "fix" the numbering.
    images:["images/coaches/tim/tim-00.jpg"]
  },
  { id:'cortez', name:'Cortez Edwards', role:'BJJ Instructor',
    bio:[
      "Cortez Edwards is a dedicated mental health professional and youth athletics coach with 15 years of experience specializing in supporting youth aged 6 to 19.",
      "Born in Tulsa, Oklahoma, and a graduate of Union High School, Cortez earned his bachelor's degrees in Sociology and Criminal Justice from Northeastern State University. Driven by a lifelong commitment to empowering youth and strengthening families, he is currently advancing his expertise by pursuing a Master of Social Work (MSW).",
      "Beyond his clinical work, Cortez has spent the last two decades mentoring young men and women and young athletes, coaching youth football, soccer, wrestling, and Brazilian Jiu-Jitsu (BJJ). His deep understanding of athletic discipline stems from his own experience competing in amateur kickboxing, Taekwondo, and Goju Ryu Karate and Brazilian Jiu Jitsu.",
      "Cortez lives by the personal motto: \"If your mind can conceive it and you firmly believe it, then you can achieve it.\" He resides in Oklahoma with his wife, Danna. They have three children—Destiny (26), Isaiah (23), and Jase (18)—and a 7-year-old granddaughter, Alecia, and their 7 year old pit bull Justice."
    ],
    creds:["B.A. Sociology and Criminal Justice, Northeastern State University","Pursuing Master of Social Work (MSW)","15 years coaching youth athletics"],
    images:["images/coaches/cortez/cortez-01.jpg"]
  },
  { id:'tommy', name:'Tommy Ganem', role:'BJJ Instructor',
    bio:[
      "Tommy Ganem is a devoted Christian, husband, and father who believes that faith, family, and service are the foundation of a meaningful life. He has been married to his wife for 16 years, and together they are raising their two children. Those same values of integrity, humility, discipline, and respect are the foundation of his approach to teaching and leadership.",
      "Tommy has been training in Brazilian Jiu-Jitsu since 2019 and is passionate about helping students grow both on and off the mats. His love for Jiu-Jitsu extends beyond the academy, as his wife and children have also trained in Brazilian Jiu-Jitsu, making it a true family pursuit. He believes Brazilian Jiu-Jitsu is more than a martial art—it is a lifelong journey that builds confidence, resilience, self-discipline, and the ability to overcome adversity. His instruction emphasizes strong fundamentals, technical precision, and creating a welcoming environment where students of all ages and skill levels can thrive.",
      "In addition to his martial arts background, Tommy has more than 25 years of firearms training and experience. He is an NRA Certified Firearms Instructor and NRA Certified Range Safety Officer with extensive experience across multiple weapon platforms. As a competitive shooter, he has competed with pistols, rifles, and shotguns, always emphasizing safety, responsibility, and disciplined marksmanship.",
      "Outside of the academy, Tommy is a successful business owner who is committed to serving others through leadership and mentorship. Whether teaching Brazilian Jiu-Jitsu or firearms, his mission is to equip students with the skills, confidence, and character to succeed while fostering a culture of respect, accountability, and continuous improvement."
    ],
    creds:["NRA Certified Firearms Instructor","NRA Certified Range Safety Officer","Training in Brazilian Jiu-Jitsu since 2019"],
    images:[
      "images/coaches/tommy/tommy-ganem-01.jpg",
      "images/coaches/tommy/tommy-ganem-02.jpg",
      "images/coaches/tommy/tommy-ganem-03.jpg",
      "images/coaches/tommy/tommy-ganem-04.jpg",
      "images/coaches/tommy/tommy-ganem-05.jpg",
      "images/coaches/tommy/tommy-ganem-06.jpg"
    ]
  }
];
