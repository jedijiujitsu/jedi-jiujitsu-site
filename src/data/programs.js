// PROGRAMS data.
// Real copy where it exists on the existing site;
// hasRealCopy: false triggers the red-dashed placeholder block
// prompting Jamie to write fresh copy.
//
// Structure:
//   id / num / name / tag / summary / url / hasRealCopy
//   bio: string[]           → paragraphs of program description
//   sections: [{title, body[]}]  → for programs with subsections (Kids)
//   placeholder: true       → convenience flag for empty programs

const PROGRAMS = [
  {
    id: 'adults',
    num: '01',
    name: 'Adults Jiu-Jitsu',
    tag: 'Adults',
    summary: 'Brazilian Jiu-Jitsu instruction for adult students of every level.',
    url: 'https://www.jjjtulsajiu-jitsu.com/adults',
    hasRealCopy: true,
    bio: [
      "We provide a structured environment for Brazilian Jiu-Jitsu practice that allows for a full scope of what BJJ has to offer. You will find that our students show respect for one another during class and are here for one purpose: To become better people through Jiu-Jitsu.",
      "Our family atmosphere is good at filtering out the meat heads, but we also have lots of students who are talented and train hard for competitions.",
      "Our goal is to teach our students the fundamentals of self-defense through Jiu-Jitsu practice and provide a family setting where our community can flourish. Please join us and become part of our Jiu-Jitsu family!"
    ]
  },
  {
    id: 'kids',
    num: '02',
    name: 'Kids Jiu-Jitsu',
    tag: 'Ages 4+',
    summary: 'Brazilian Jiu-Jitsu for kids ages 4 and up.',
    url: 'https://www.jjjtulsajiu-jitsu.com/kids',
    hasRealCopy: true,
    bio: [
      "Our Kid's program features both self-defense and sports style training."
    ],
    sections: [
      {
        title: 'Self-Defense',
        body: [
          "We will teach your child to use verbal assertiveness to deter bullies and several non-violent self-defense techniques to stay safe if physically assaulted.",
          "We use leverage-based control holds to neutralize threats without violence. The bottom line — we will prepare your child to defend themselves against bullies without turning them into one."
        ]
      },
      {
        title: 'Sports / Tournament Training',
        body: [
          "If you are interested in tournament training, we have professors that have been training champions for over 20 years. We offer some of the best competition training and guidance in the Tulsa area. We have smaller, specialized training sessions offered to our competition team that allows individualized training at a more vigorous pace."
        ]
      }
    ]
  },
  {
    id: 'judo',
    num: '03',
    name: 'Judo',
    tag: 'Kids & Adults',
    summary: 'Judo instruction for both kids and adults.',
    url: 'https://www.jjjtulsajiu-jitsu.com/judo',
    hasRealCopy: true,
    bio: [
      "Learn Judo in a systematic way focusing on physical and technical development. Learn to use your body and strength efficiently to defend against an opponent through throws, pins, strangle and joint locks; all of which can be safely applied in both training exercises and realistic sparring sessions against a resisting opponent."
    ]
  },
  {
    id: 'muaythai',
    num: '04',
    name: 'Muay Thai',
    tag: 'Teen & Adult',
    summary: 'Teen and adult striking instruction.',
    url: 'https://www.jjjtulsajiu-jitsu.com/muaythai',
    hasRealCopy: true,
    bio: [
      "Muay Thai, often called Thai boxing or the Art of Eight Limbs, is a martial art and full-contact combat sport from Thailand. It combines stand-up striking with sweeps and clinch work, using fists, elbows, knees, and shins as weapons."
    ]
  },
  // Interim copy from existing site — Jamie may supply replacements
  {
    id: 'privates',
    num: '05',
    name: 'Private Sessions',
    tag: 'By Appointment',
    summary: 'One-on-one instruction available with any of our coaches.',
    url: 'https://www.jjjtulsajiu-jitsu.com/private-sessions',
    hasRealCopy: true,
    bio: [
      "Private lessons for both youth and adults are available with any of our instructors.",
      "Each lesson that is taken with the Lead Instructor is accompanied with extra amenities you won't find at other gyms."
    ]
  },
  // Interim copy from existing Kids page — Jamie may supply replacements
  {
    id: 'bling',
    num: '06',
    name: 'Kids Competition Training',
    tag: 'Kids · Competitors',
    summary: 'Tournament training and competition team.',
    url: 'https://www.jjjtulsajiu-jitsu.com/tournaments',
    hasRealCopy: true,
    bio: [
      "If you are interested in tournament training, we have professors that have been training champions for over 20 years. We offer some of the best competition training and guidance in the Tulsa area. We have smaller, specialized training sessions offered to our competition team that allows individualized training at a more vigorous pace."
    ]
  }
];
