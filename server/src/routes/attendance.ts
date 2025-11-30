import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import prisma from '../prisma';

const router = Router();

// Mark attendance for a list of students
router.post('/', authenticateToken, authorizeRoles('TEACHER'), async (req, res) => {
    try {
        const { classId, date, attendanceData } = req.body;
        // attendanceData is an array of { studentId, status }

        const attendanceDate = new Date(date);

        // Use a transaction to ensure all records are created/updated together
        const results = await prisma.$transaction(
            attendanceData.map((record: any) =>
                prisma.attendance.upsert({
                    where: {
                        studentId_date: {
                            studentId: record.studentId,
                            date: attendanceDate
                        }
                    },
                    update: {
                        status: record.status
                    },
                    create: {
                        studentId: record.studentId,
                        date: attendanceDate,
                        status: record.status
                    }
                })
            )
        );

        res.json({ message: 'Attendance marked successfully', count: results.length });
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ error: 'Failed to mark attendance' });
    }
});

// Get attendance for a specific class and date
router.get('/class/:classId/date/:date', authenticateToken, authorizeRoles('TEACHER', 'ADMIN'), async (req, res) => {
    try {
        const { classId, date } = req.params;
        const attendanceDate = new Date(date);

        const attendance = await prisma.attendance.findMany({
            where: {
                student: {
                    classId: classId
                },
                date: attendanceDate
            },
            include: {
                student: {
                    include: {
                        user: {
                            select: {
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            }
        });

        res.json(attendance);
    } catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ error: 'Failed to fetch attendance' });
    }
});

export default router;
