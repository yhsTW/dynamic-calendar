import { getDummyEvents } from "./dummyEvents";

export const events = [
	{
		id: 0,
		title: "event1",
		start: new Date("2019-08-01"),
		end: new Date("2019-08-05"),
		allDay : true
	},
	{
		id: 1,
		title: "event2",
		start: new Date("2019-08-20"),
		end: new Date("2019-08-31"),
		allDay : true
	},
	{
		id: 2,
		title: "event3",
		start: new Date("2019-08-15"),
		end: new Date("2019-08-15"),
		allDay : true
	},
	{
		id: 3,
		title: "event4",
		start: new Date("2019-08-07"),
		end: new Date("2019-08-09"),
		allDay : true
	},
	{
		id: 4,
		title: "event5",
		start: new Date("2019-07-15"),
		end: new Date("2019-08-10"),
		allDay : true
	},
	{
		id: 5,
		title: "event6",
		start: new Date("2019-08-25"),
		end: new Date("2019-09-10"),
		allDay : true
	},
	{
		id: 6,
		title: "event7",
		start: new Date("2019-08-01"),
		end: new Date("2019-08-31"),
		allDay : true
	},
	{
		id : 7,
		title : 'event8',
		start : new Date('2019-12-31'),
		end : new Date('2020-01-01'),
		allDay : true
	},
	{
		id : 8,
		title : 'event9',
		start : new Date('2019-12-30'),
		end : new Date('2020-01-05'),
		allDay : true
	},
	{
		id : 9,
		title : 'event10',
		start : new Date('2019-12-31'),
		end : new Date('2020-01-10'),
		allDay : true
	},
	{
		id : 10,
		title : 'event11',
		start : new Date('2020-01-01'),
		end : new Date('2020-01-05'),
		allDay : true
	},
	{
		id : 11,
		title : 'event12',
		start : new Date('2019-07-28'),
		end : new Date('2019-07-29'),
		allDay : true
	},
	{
		id : 12,
		title : 'event13',
		start : new Date('2019-12-20'),
		end : new Date('2019-12-30'),
		allDay : true
	},
	{
		id : 13,
		title : 'event14',
		start : new Date('2019-12-20'),
		end : new Date('2020-02-20'),
		allDay : true
	},
	{
		id : 14,
		title : 'event15',
		start : new Date('2019-08-23'),
		end : new Date('2019-08-23'),
		allDay : true
	},
	{
		id : 15,
		title : 'event16',
		start : new Date('2019-08-10'),
		end : new Date('2019-08-26'),
		allDay : true
	},
	{
		id : 16,
		title : 'event17',
		start : new Date('2019-12-23'),
		end : new Date('2020-01-01'),
		allDay : true
	},
	{
		id : 17,
		title : 'event18',
		start : new Date('2019-09-15'),
		end : new Date('2019-09-21'),
		allDay : true
	},
	{
		id : 18,
		title : 'event19',
		start : new Date('2019-09-25'),
		end : new Date('2019-09-25'),
		allDay : true
	},
	{
		id : 19,
		title : 'event20',
		start : new Date('2019-09-01'),
		end : new Date('2019-09-05'),
		allDay : true
	},
	{
		id : 20,
		title : 'event21',
		start : new Date('2019-09-12'),
		end : new Date('2019-09-12'),
		allDay : true
	},
	{
		id : 21,
		title : 'event22',
		start : new Date('2019-09-12'),
		end : new Date('2019-09-12'),
		allDay : true
	},
	{
		id : 22,
		title : 'event23',
		start : new Date('2019-09-12'),
		end : new Date('2019-09-12'),
		allDay : true
	},
	{
		id : 23,
		title : 'event24',
		start : new Date('2019-09-12'),
		end : new Date('2019-09-12'),
		allDay : true
	},
	{
		id : 24,
		title : 'event25',
		start : new Date('2019-09-12'),
		end : new Date('2019-09-12'),
		allDay : true
	},
	{
		id : 25,
		title : 'event26',
		start : new Date('2019-09-12'),
		end : new Date('2019-09-12'),
		allDay : true
	},
	{
		id : 26,
		title : 'event27',
		start : new Date('2019-09-12'),
		end : new Date('2019-09-12'),
		allDay : true
	},
	{
		id : 27,
		title : '종일 일정',
		start : new Date('2019-10-11'),
		end : new Date('2019-10-11'),
		allDay : true
	},
	{
		id : 28,
		title : '종일 일정2',
		start : new Date('2019-10-11'),
		end : new Date('2019-10-12'),
		allDay : true
	},
	{
		id : 29,
		title : '당일 일정',
		start : new Date('2019-10-07 14:00'),
		end : new Date('2019-10-07 16:00'),
		allDay : false
	},
	{
		id : 30,
		title : '종일 일정3',
		start : new Date('2019-10-11'),
		end : new Date('2019-10-11'),
		allDay : true
	},
	{
		id : 31,
		title : '종일 일정4',
		start : new Date('2019-10-11'),
		end : new Date('2019-10-20'),
		allDay : true
	},
	{
		id : 32,
		title : '종일 일정5',
		start : new Date('2019-10-14'),
		end : new Date('2019-10-14'),
		allDay : true
	},
	{
		id : 33,
		title : '당일 일정6',
		start : new Date('2019-10-18 13:00'),
		end : new Date('2019-10-18 16:00'),
		allDay : false
	},
	{
		id : 34,
		title : '당일 일정7',
		start : new Date('2019-10-15 14:00'),
		end : new Date('2019-10-15 14:30'),
		allDay : false
	},
	{
		id : 35,
		title : '당일 일정8',
		start : new Date('2019-10-13 8:00'),
		end : new Date('2019-10-13 18:30'),
		allDay : false
	},
	{
		id : 36,
		title : '당일 일정9',
		start : new Date('2019-10-14 10:00'),
		end : new Date('2019-10-14 12:00'),
		allDay : false
	},
	{
		id : 37,
		title : '당일 일정10',
		start : new Date('2019-10-16 3:00'),
		end : new Date('2019-10-16 6:00'),
		allDay : false
	},
	{
		id : 38,
		title : '당일 일정11',
		start : new Date('2019-10-13 12:00'),
		end : new Date('2019-10-13 14:00'),
		allDay : false
	},
	{
		id : 39,
		title : '당일 일정12',
		start : new Date('2019-10-13 1:00'),
		end : new Date('2019-10-13 2:00'),
		allDay : false
	},
	{
		id : 40,
		title : '장기 일정',
		start : new Date('2019-10-13 12:00'),
		end : new Date('2019-10-16 14:00'),
		allDay : false
	},
	{
		id : 41,
		title : '4',
		start : new Date('2019-10-20 13:00'),
		end : new Date('2019-10-20 14:00'),
		allDay : false
	},
	{
		id : 42,
		title : '1',
		start : new Date('2019-10-20 8:00'),
		end : new Date('2019-10-20 19:00'),
		allDay : false
	},
	{
		id : 43,
		title : '2',
		start : new Date('2019-10-20 10:00'),
		end : new Date('2019-10-20 16:00'),
		allDay : false
	},
	{
		id : 44,
		title : '3',
		start : new Date('2019-10-20 11:00'),
		end : new Date('2019-10-20 13:30'),
		allDay : false
	},
	{
		id : 45,
		title : '5',
		start : new Date('2019-10-20 12:00'),
		end : new Date('2019-10-20 20:30'),
		allDay : false
	},
	{
		id : 46,
		title : '6',
		start : new Date('2019-10-20 3:00'),
		end : new Date('2019-10-20 5:30'),
		allDay : false
	},
	{
		id : 47,
		title : '1',
		start : new Date('2019-10-22 3:00'),
		end : new Date('2019-10-22 5:30'),
		allDay : false
	},
	{
		id : 48,
		title : '2',
		start : new Date('2019-10-22 12:00'),
		end : new Date('2019-10-22 13:00'),
		allDay : false
	},
	{
		id : 49,
		title : '3',
		start : new Date('2019-10-22 13:00'),
		end : new Date('2019-10-22 15:00'),
		allDay : false
	},
	{
		id : 50,
		title : '4',
		start : new Date('2019-10-22 20:00'),
		end : new Date('2019-10-22 21:00'),
		allDay : false
	},
	{
		id : 51,
		title : '5',
		start : new Date('2019-10-22 10:00'),
		end : new Date('2019-10-22 13:00'),
		allDay : false
	},
	{
		id : 52,
		title : '6',
		start : new Date('2019-10-22 19:00'),
		end : new Date('2019-10-22 21:00'),
		allDay : false
	},
	{
		id : 53,
		title : '7',
		start : new Date('2019-10-22 22:00'),
		end : new Date('2019-10-22 23:00'),
		allDay : false
	},
	{
		id : 54,
		title : '1',
		start : new Date('2019-10-24 6:00'),
		end : new Date('2019-10-24 8:00'),
		allDay : false
	},
	{
		id : 55,
		title : '2',
		start : new Date('2019-10-24 8:00'),
		end : new Date('2019-10-24 10:00'),
		allDay : false
	},
	{
		id : 56,
		title : '3',
		start : new Date('2019-10-24 7:00'),
		end : new Date('2019-10-24 9:00'),
		allDay : false
	},
	{
		id : 57,
		title : '1',
		start : new Date('2019-10-26 10:00'),
		end : new Date('2019-10-26 20:00'),
		allDay : false
	},
	{
		id : 58,
		title : '3',
		start : new Date('2019-10-26 12:00'),
		end : new Date('2019-10-26 14:00'),
		allDay : false
	},
	{
		id : 59,
		title : '2',
		start : new Date('2019-10-26 16:00'),
		end : new Date('2019-10-26 18:00'),
		allDay : false
	},
	{
		id : 60,
		title : '4',
		start : new Date('2019-10-26 13:00'),
		end : new Date('2019-10-26 15:00'),
		allDay : false
	},
	{
		id : 61,
		title : '5',
		start : new Date('2019-10-25 3:00'),
		end : new Date('2019-10-25 5:00'),
		allDay : false
	},
	{
		id : 62,
		title : '6',
		start : new Date('2019-10-25 3:00'),
		end : new Date('2019-10-25 5:00'),
		allDay : false
	},
	{
		id : 63,
		title : '7',
		start : new Date('2019-10-25 3:00'),
		end : new Date('2019-10-25 5:00'),
		allDay : false
	},
	{
		id : 64,
		title : '8',
		start : new Date('2019-10-25 13:00'),
		end : new Date('2019-10-25 18:00'),
		allDay : false
	},
	{
		id : 65,
		title : '9',
		start : new Date('2019-10-25 14:00'),
		end : new Date('2019-10-25 16:00'),
		allDay : false
	},
	{
		id : 66,
		title : '10',
		start : new Date('2019-10-25 17:00'),
		end : new Date('2019-10-25 18:00'),
		allDay : false
	},
	{
		id : 67,
		title : '11',
		start : new Date('2019-10-25 16:00'),
		end : new Date('2019-10-25 17:00'),
		allDay : false
	},
	{
		id : 68,
		title : '11',
		start : new Date('2019-10-25 17:00'),
		end : new Date('2019-10-25 18:00'),
		allDay : false
	},
	{
		id : 69,
		title : '당일 종일 일정',
		start : new Date('2019-10-13'),
		end : new Date('2019-10-13'),
		allDay : true
	},
	{
		id : 70,
		title : '당일 종일 일정2',
		start : new Date('2019-10-13 13:00'),
		end : new Date('2019-10-13 14:00'),
		allDay : true
	},
	{
		id : 71,
		title : '당일 종일 일정3',
		start : new Date('2019-10-17 13:00'),
		end : new Date('2019-10-17 14:00'),
		allDay : true
	},
	{
		id : 72,
		title : '일정',
		start : new Date('2019-10-22 13:00'),
		end : new Date('2019-10-22 14:00'),
		allDay : false
	},
	{
		id : 79,
		title : '일정2',
		start : new Date('2019-10-20 13:00'),
		end : new Date('2019-10-30 14:00'),
		allDay : false
	},
	{
		id : 80,
		title : '장기 일정',
		start : new Date('2019-10-23'),
		end : new Date('2019-10-30'),
		allDay : false
	},
	{
		id : 81,
		title : '21일',
		start : new Date('2019-10-21 10:00'),
		end : new Date('2019-10-21 10:30'),
		allDay : false
	},
	{
		id : 82,
		title : '완전긴이름일정ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
		start : new Date('2019-12-30 10:00'),
		end : new Date('2019-12-30 10:30'),
		allDay : false
	},
	{
		id : 83,
		title : '연말 일정',
		start : new Date('2019-12-29 10:00'),
		end : new Date('2020-1-4 10:30'),
		allDay : false
	},
	{
		id : 84,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 85,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 86,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 87,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 88,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 89,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 90,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 91,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 92,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 93,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 94,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 95,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 96,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 97,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 98,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 99,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 100,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 101,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 102,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 103,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 104,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 105,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 106,
		title : '연말 종일 일정',
		start : new Date('2019-12-30'),
		end : new Date('2020-1-1'),
		allDay : true
	},
	{
		id : 107,
		title : '12월 1월 일정',
		start : new Date('2019-11-26 13:00'),
		end : new Date('2020-1-2 14:00'),
		allDay : true
	},
	{
		id : 108,
		title : '1월 일정',
		start : new Date('2020-1-10 13:00'),
		end : new Date('2020-1-14 14:00'),
		allDay : true
	},
	{
		id : 109,
		title : '12월 29일 일정',
		start : new Date('2019-12-28 13:00'),
		end : new Date('2020-1-7 14:00'),
		allDay : true
	},
	{
		id : 110,
		title : '12월 29일 당일 일정',
		start : new Date('2019-12-29 13:00'),
		end : new Date('2019-12-29 14:00'),
		allDay : false
	},
	{
		id : 111,
		title : '1월 3일 당일 일정',
		start : new Date('2020-1-3 13:00'),
		end : new Date('2020-1-3 14:00'),
		allDay : true
	},
	{
		id : 112,
		title : '1월 3일 장기 일정',
		start : new Date('2020-1-3 13:00'),
		end : new Date('2020-3-3 14:00'),
		allDay : false
	},
	{
		id : 113,
		title : '1월 3일 장기 일정',
		start : new Date('2020-1-3 13:00'),
		end : new Date('2020-3-3 14:00'),
		allDay : false
	},
	{
		id : 114,
		title : '1월 3일',
		start : new Date('2020-1-5 13:15'),
		end : new Date('2020-1-5 15:00'),
		allDay : false
	},
	{
		id : 115,
		title : '1월 28일',
		start : new Date('2020-1-28 13:15'),
		end : new Date('2020-1-28 15:00'),
		allDay : false
	},
	{
		id : 116,
		title : '같은 날 같은 시간',
		start : new Date('2020-2-19 15:00'),
		end : new Date('2020-2-19 15:00'),
		allDay : false
	},
	{
		id : 117,
		title : '11월 20일',
		start : new Date('2019-11-20 15:00'),
		end : new Date('2019-11-20 15:10'),
		allDay : false
	},
	{
		id : 118,
		title : '2월 19일',
		start : new Date('2020-2-19 11:30'),
		end : new Date('2020-2-19 13:00'),
		allDay : false
	},
	{
		id : 119,
		title : '2월 19일',
		start : new Date('2020-2-19 8:00'),
		end : new Date('2020-2-19 9:00'),
		allDay : false
	},
	{
		id : 120,
		title : '2월 19일',
		start : new Date('2020-2-19 10:00'),
		end : new Date('2020-2-19 10:30'),
		allDay : false
	},
	{
		id : 121,
		title : '2월 19일',
		start : new Date('2020-2-19 14:00'),
		end : new Date('2020-2-19 16:00'),
		allDay : false
	},
	{
		id : 122,
		title : '미쳤다고 하겠지',
		start : new Date('2020-02-17'),
		end : new Date('2020-02-20'),
		allDay : true
	},
	{
		id : 123,
		title : '나는 심장이 없어',
		start : new Date('2020-02-17'),
		end : new Date('2020-02-17'),
		allDay : true
	},
	{
		id : 124,
		title : '아프다고 말하면',
		start : new Date('2020-02-17 18:00'),
		end : new Date('2020-03-17 19:00'),
		allDay : false
	},
	{
		id : 125,
		title : '정말 아플것 같아서',
		start : new Date('2020-02-17 18:00'),
		end : new Date('2020-02-21 19:00'),
		allDay : false
	},
	{
		id : 126,
		title : '친구와 프로젝트에서 만든 태스크크',
		start : new Date(1582106400000),
		end : new Date(1582146000000),
		allDay : false
	},
	{
		id : 127,
		title : '내 프로젝트에서 만든 태스크크',
		start : new Date(1582106400000),
		end : new Date(1582146000000),
		allDay : false
	},
	{
		id : 128,
		title : '내 프로젝트에서 만든 태스크크',
		start : new Date(1582020000000),
		end : new Date(1582059600000),
		allDay : false
	},
	{
		id : 129,
		title : 'aaaaa',
		start : new Date(1581912000000),
		end : new Date(1582002000000),
		allDay : false
	},
	{
		id : 129,
		title : 'aaaaaa',
		start : new Date(1582102800000),
		end : new Date(1582149600000),
		allDay : false
	},
	{
		id : 130,
		title : 'wwefwefwefwefwefwefwefwef',
		start : new Date(1577073600000),
		end : new Date(1577077200000),
		allDay : false
	},
	{
		id : 131,
		title : '반복일정 수정',
		start : new Date('2020.02.21 13:00'),
		end : new Date('2020.02.21 14:00'),
		allDay : false
	},
	{
		id : 132,
		title : '매주 일요일 수정2',
		start : new Date('2020.02.16 13:00'),
		end : new Date('2020.02.16 14:00'),
		allDay : false
	},
	{
		id : 133,
		title : 'aaaaaaaaaaaa',
		start : new Date('2020.02.17 17:00'),
		end : new Date('2020.02.17 18:00'),
		allDay : false
	},
	{
		id : 134,
		title : '반복있는 일정 수정',
		start : new Date('2020.02.19 17:00'),
		end : new Date('2020.02.19 18:00'),
		allDay : false
	},
	{
		id : 135,
		title : 'ㅇㅌㄹㄴㅇㄹsdfdsfsdfdsfdsfdfㄹㄴㅇㄹㅇㄴㄹㅇㄴㄹㄴㅇㄹㄴ',
		start : new Date('2020.02.18 13:00'),
		end : new Date('2020.02.18 14:00'),
		allDay : false
	},
	{
		id : 136,
		title : '반복일정 테스트 수정2',
		start : new Date('2020.02.18 13:00'),
		end : new Date('2020.02.18 14:00'),
		allDay : false
	},
	{
		id : 137,
		title : '일정일정',
		start : new Date(1582171200000),
		end : new Date(1582174800000),
		allDay : false
	},
	{
		id : 138,
		title : '태스크태슼',
		start : new Date(1582257600000),
		end : new Date(1582261200000),
		allDay : false
	},
	{
		id : 139,
		title : '이름 없는 카드',
		start : new Date(1581825600000),
		end : new Date(1581829200000),
		allDay : false
	},
	{
		id : 140,
		title : '주간 달력에서 등록',
		start : new Date(1582011000000),
		end : new Date(1582016400000),
		allDay : false
	},
	{
		id : 141,
		title : 'ㅁㅁㅁㅁ',
		start : new Date(1582084800000),
		end : new Date(1582088400000),
		allDay : false
	},
	{
		id : 142,
		title : 'gggggggg',
		start : new Date(1582084800000),
		end : new Date(1582088400000),
		allDay : false
	},
	{
		id : 143,
		title : '시작날짜가 종료 날짜보다 뒤에 있는 일정',
		start : new Date('2020.02.26'),
		end : new Date('2020.01.27'),
		allDay : false
	},
];
console.log('events length : ', events.length)