export const courses = ([
	{
		name: "Theory of Knowledge",
		id: "tok",
		group: 0,
		homework: 0,
		difficulty: 2
	},
	{
		name: "English A Language & Literature SL",
		id: "engsl",
		level: "s",
		group: 1,
		homework: 30,
		difficulty: 4
	},
	{
		name: "English A Literature HL",
		id: "enghl",
		level: "h",
		group: 1,
		homework: 2 * 60,
		difficulty: 5
	},
	{
		name: "French B SL",
		id: "frsl",
		level: "s",
		group: 2,
		homework: 60,
		difficulty: 5
	},
	{
		name: "French B HL",
		id: "frhl",
		level: "h",
		group: 2,
		homework: 60,
		difficulty: 7
	},
	{
		name: "Spanish Ab Initio",
		id: "spanabi",
		level: "s",
		group: 2,
		homework: 15,
		difficulty: 3
	},
	{
		name: "Psychology SL",
		id: "psychsl",
		level: "s",
		group: 3,
		homework: 20,
		difficulty: 5,
		tag: "psych"
	},
	{
		name: "Psychology HL",
		id: "psychhl",
		level: "h",
		group: 3,
		homework: 30,
		difficulty: 6,
		tag: "psych"
	},
	{
		name: "Global Politics SL",
		id: "gloposl",
		level: "s",
		group: 3,
		homework: 40,
		difficulty: 5,
		tag: "glopo"
	},
	{
		name: "Global Politics HL",
		id: "glopohl",
		level: "h",
		group: 3,
		homework: 50,
		difficulty: 6,
		tag: "glopo"
	},
	{
		name: "Chemistry SL",
		id: "chemsl",
		level: "s",
		group: 4,
		homework: 40,
		difficulty: 7,
		tag: "chem"
	},
	{
		name: "Chemistry HL",
		id: "chemhl",
		level: "h",
		group: 4,
		homework: 40,
		difficulty: 8,
		tag: "chem"
	},
	{
		name: "Physics SL",
		id: "physsl",
		level: "s",
		group: 4,
		homework: 45,
		difficulty: 8,
		tag: "phys"
	},
	{
		name: "Physics HL",
		id: "physhl",
		level: "h",
		group: 4,
		homework: 45,
		difficulty: 9,
		tag: "phys"
	},
	{
		name: "Biology SL",
		id: "biosl",
		level: "s",
		group: 4,
		homework: 100,
		difficulty: 6,
		tag: "bio"
	},
	{
		name: "Biology HL",
		id: "biohl",
		level: "h",
		group: 4,
		homework: 120,
		difficulty: 8,
		tag: "bio"
	},
	{
		name: "Math AA SL",
		id: "aasl",
		level: "s",
		group: 5,
		homework: 15,
		difficulty: 3
	},
	{
		name: "Math AA HL",
		id: "aahl",
		level: "h",
		group: 5,
		homework: 20,
		difficulty: 5
	},
	{
		name: "Math AI SL",
		id: "aisl",
		level: "s",
		group: 5,
		homework: 15,
		difficulty: 2
	},
	{
		name: "Math AI HL",
		id: "aihl",
		level: "h",
		group: 5,
		homework: 20,
		difficulty: 4
	},
	{
		name: "Spare",
		id: "spare",
		level: "s",
		group: 0,
		homework: 0,
		difficulty: 0
	},


] as const).map(x => ({ ...x, energy: x.homework * 25 + 5 * x.difficulty })) 

export const courseMap = Object.fromEntries(courses.map(x => [x.id, x]))