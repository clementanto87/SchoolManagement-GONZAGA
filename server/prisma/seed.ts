import { PrismaClient, UserRole, Gender } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Admin
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@school.com' },
        update: {},
        create: {
            email: 'admin@school.com',
            password: hashedPassword,
            firstName: 'Super',
            lastName: 'Admin',
            role: UserRole.ADMIN,
            admin: {
                create: {
                    designation: 'Principal',
                },
            },
        },
    });
    console.log({ adminUser });

    // Seed Events
    // Seed Events
    try {
        await prisma.event.createMany({
            data: [
                {
                    title: 'Veterans Day Assembly',
                    date: new Date('2023-11-10'),
                    time: '9:00 AM',
                    location: 'School Auditorium',
                    description: 'Honoring our veterans with a special assembly featuring guest speakers and student performances.',
                },
                {
                    title: 'Parent-Teacher Conferences',
                    date: new Date('2023-11-15'),
                    time: 'All Day',
                    location: 'Various Locations',
                    description: 'An opportunity for parents to meet with teachers to discuss student progress.',
                },
                {
                    title: 'Thanksgiving Break Begins',
                    date: new Date('2023-11-22'),
                    time: '12:00 PM',
                    location: 'Campus Wide',
                    description: 'School closes at noon for the Thanksgiving holiday break.',
                },
            ],
        });
    } catch (e) {
        console.log('Skipping event seeding due to client issue', e);
    }

    // Create Teacher
    const teacherUser = await prisma.user.upsert({
        where: { email: 'teacher@school.com' },
        update: {},
        create: {
            email: 'teacher@school.com',
            password: hashedPassword,
            firstName: 'John',
            lastName: 'Doe',
            role: UserRole.TEACHER,
            teacher: {
                create: {
                    hireDate: new Date(),
                    specialization: 'Mathematics',
                },
            },
        },
    });
    console.log({ teacherUser });

    // Create Student
    const studentUser = await prisma.user.upsert({
        where: { email: 'student@school.com' },
        update: {},
        create: {
            email: 'student@school.com',
            password: hashedPassword,
            firstName: 'Jane',
            lastName: 'Smith',
            role: UserRole.STUDENT,
            student: {
                create: {
                    admissionNo: 'ADM001',
                    dob: new Date('2010-01-01'),
                    gender: Gender.FEMALE,
                    grade: '10',
                    section: 'A',
                },
            },
        },
    });
    console.log({ studentUser });

    // Create News
    const news1 = await prisma.news.create({
        data: {
            title: 'Annual Science Fair Winners Announced',
            excerpt: 'Congratulations to all participants and winners of this year\'s science fair. The projects showcased remarkable creativity...',
            content: 'Full content about the science fair winners...',
            date: new Date('2023-10-26'),
            author: 'Admin',
        }
    });

    const news2 = await prisma.news.create({
        data: {
            title: 'Parent-Teacher Conference Schedule',
            excerpt: 'The upcoming parent-teacher conferences are scheduled for November 15th-17th. Please log in to the portal to book...',
            content: 'Full content about the conference schedule...',
            date: new Date('2023-10-24'),
            author: 'Admin',
        }
    });

    const news3 = await prisma.news.create({
        data: {
            title: 'School Sports Team Tryouts',
            excerpt: 'Tryouts for the winter sports season will begin next week. Check the athletics page for detailed schedules...',
            content: 'Full content about sports tryouts...',
            date: new Date('2023-10-20'),
            author: 'Admin',
        }
    });
    console.log({ news1, news2, news3 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
