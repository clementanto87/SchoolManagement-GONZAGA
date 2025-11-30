import React, { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    useToast,
    Radio,
    RadioGroup,
    Stack,
    HStack,
    Text,
    useColorModeValue,
    Input,
    FormControl,
    FormLabel,
    Spinner,
    Center
} from '@chakra-ui/react';
import TeacherLayout from '../../components/Layout/TeacherLayout';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';

interface Student {
    id: string;
    admissionNo: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
    };
}

interface ClassItem {
    id: string;
    name: string;
    section: string;
}

export default function TeacherAttendancePage() {
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [students, setStudents] = useState<Student[]>([]);
    const [attendance, setAttendance] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const { token } = useAuth();
    const toast = useToast();
    const bgColor = useColorModeValue('gray.50', 'gray.900');

    // Fetch teacher's classes on mount
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch(`${API_URL}/api/teachers/me/classes`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setClasses(data);
                    if (data.length > 0) setSelectedClass(data[0].id);
                }
            } catch (error) {
                console.error('Failed to fetch classes', error);
            }
        };
        fetchClasses();
    }, [token]);

    // Fetch students and existing attendance when class or date changes
    useEffect(() => {
        if (!selectedClass) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch class details to get students
                const classRes = await fetch(`${API_URL}/api/classes/${selectedClass}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const classData = await classRes.json();

                if (classData.students) {
                    setStudents(classData.students);

                    // Initialize attendance with 'PRESENT' for all students
                    const initialAttendance: { [key: string]: string } = {};
                    classData.students.forEach((s: Student) => {
                        initialAttendance[s.id] = 'PRESENT';
                    });
                    setAttendance(initialAttendance);
                }

                // Fetch existing attendance for this date
                const attendanceRes = await fetch(`${API_URL}/api/attendance/class/${selectedClass}/date/${date}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (attendanceRes.ok) {
                    const attendanceData = await attendanceRes.json();
                    if (attendanceData.length > 0) {
                        const existingAttendance: { [key: string]: string } = {};
                        attendanceData.forEach((record: any) => {
                            existingAttendance[record.studentId] = record.status;
                        });
                        setAttendance(prev => ({ ...prev, ...existingAttendance }));
                    }
                }

            } catch (error) {
                console.error('Failed to fetch data', error);
                toast({
                    title: 'Error fetching data',
                    status: 'error',
                    duration: 3000,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedClass, date, token, toast]);

    const handleAttendanceChange = (studentId: string, status: string) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    const handleSubmit = async () => {
        setIsSaving(true);
        try {
            const attendanceData = Object.entries(attendance).map(([studentId, status]) => ({
                studentId,
                status
            }));

            const response = await fetch(`${API_URL}/api/attendance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    classId: selectedClass,
                    date,
                    attendanceData
                })
            });

            if (response.ok) {
                toast({
                    title: 'Attendance saved successfully',
                    status: 'success',
                    duration: 3000,
                });
            } else {
                throw new Error('Failed to save');
            }
        } catch (error) {
            toast({
                title: 'Error saving attendance',
                status: 'error',
                duration: 3000,
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <TeacherLayout>
            <Box bg={bgColor} minH="calc(100vh - 100px)" p={6}>
                <Heading mb={6} size="lg">Mark Attendance</Heading>

                <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mb={8} bg="white" p={4} rounded="lg" shadow="sm">
                    <FormControl maxW="300px">
                        <FormLabel>Select Class</FormLabel>
                        <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                            {classes.map(cls => (
                                <option key={cls.id} value={cls.id}>{cls.name}-{cls.section}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl maxW="200px">
                        <FormLabel>Date</FormLabel>
                        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </FormControl>
                </Stack>

                {isLoading ? (
                    <Center py={10}>
                        <Spinner size="xl" color="blue.500" />
                    </Center>
                ) : students.length === 0 ? (
                    <Text>No students found in this class.</Text>
                ) : (
                    <Box bg="white" rounded="lg" shadow="md" overflowX="auto">
                        <Table variant="simple">
                            <Thead bg="gray.50">
                                <Tr>
                                    <Th>Roll No</Th>
                                    <Th>Student Name</Th>
                                    <Th>Status</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {students.map((student) => (
                                    <Tr key={student.id}>
                                        <Td>{student.admissionNo}</Td>
                                        <Td fontWeight="medium">{student.user.firstName} {student.user.lastName}</Td>
                                        <Td>
                                            <RadioGroup
                                                onChange={(val) => handleAttendanceChange(student.id, val)}
                                                value={attendance[student.id] || 'PRESENT'}
                                            >
                                                <Stack direction="row" spacing={4}>
                                                    <Radio value="PRESENT" colorScheme="green">Present</Radio>
                                                    <Radio value="ABSENT" colorScheme="red">Absent</Radio>
                                                    <Radio value="LATE" colorScheme="orange">Late</Radio>
                                                </Stack>
                                            </RadioGroup>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                        <Box p={4} borderTop="1px solid" borderColor="gray.100">
                            <Button
                                colorScheme="blue"
                                size="lg"
                                w="full"
                                onClick={handleSubmit}
                                isLoading={isSaving}
                                loadingText="Saving..."
                            >
                                Save Attendance
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </TeacherLayout>
    );
}
