import React, { useState, useEffect } from 'react';
import {
    Box,
    SimpleGrid,
    Text,
    Flex,
    Heading,
    Icon,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    HStack,
    VStack,
    Select,
    Input,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Checkbox,
    useColorModeValue,
    Avatar,
    Tooltip as ChakraTooltip,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import {
    FiTrendingUp,
    FiTrendingDown,
    FiMoreVertical,
    FiFilter,
    FiCalendar,
    FiDownload,
    FiPlus,
    FiChevronLeft,
    FiChevronRight,
    FiDollarSign,
    FiAlertCircle,
    FiCheckCircle,
    FiUsers,
} from 'react-icons/fi';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// --- Mock Data for Charts ---
const barData = [
    { name: 'Jan', value: 250000 },
    { name: 'Feb', value: 300000 },
    { name: 'Mar', value: 350000 },
    { name: 'Apr', value: 432120 }, // Highlighted
    { name: 'May', value: 400000 },
    { name: 'Jun', value: 200000 },
    { name: 'Jul', value: 320000 },
    { name: 'Aug', value: 410000 },
];

const pieData = [
    { name: 'Paid', value: 70, color: '#48BB78' }, // Green
    { name: 'Partial', value: 20, color: '#ED8936' }, // Orange
    { name: 'Overdue', value: 10, color: '#F56565' }, // Red
];

// --- Mock Data for Table ---
const transactions = [
    { id: 1, name: 'Liam Johnson', class: 'Class 10-A', invoice: 'INV-2024-001', date: 'Apr 20, 2024', total: '$2,500.00', balance: '$0.00', status: 'Paid', avatar: 'https://bit.ly/dan-abramov' },
    { id: 2, name: 'Olivia Smith', class: 'Class 9-B', invoice: 'INV-2024-002', date: 'Apr 15, 2024', total: '$2,200.00', balance: '$2,200.00', status: 'Overdue', avatar: 'https://bit.ly/code-beast' },
    { id: 3, name: 'Noah Williams', class: 'Class 11-C', invoice: 'INV-2024-003', date: 'Apr 25, 2024', total: '$3,000.00', balance: '$1,500.00', status: 'Partial', avatar: 'https://bit.ly/sage-adebayo' },
    { id: 4, name: 'Emma Brown', class: 'Class 8-A', invoice: 'INV-2024-004', date: 'Apr 20, 2024', total: '$1,800.00', balance: '$0.00', status: 'Paid', avatar: 'https://bit.ly/prosper-baba' },
];

const StatsCard = ({ title, amount, percentage, isPositive, subText, icon, colorScheme }: any) => {
    return (
        <Box
            bg="white"
            p={6}
            rounded="2xl"
            shadow="sm"
            borderWidth="1px"
            borderColor="gray.100"
            transition="all 0.3s"
            _hover={{ shadow: 'lg', transform: 'translateY(-2px)', borderColor: `${colorScheme}.200` }}
            position="relative"
            overflow="hidden"
        >
            <Box position="absolute" top={0} right={0} p={4} opacity={0.1}>
                <Icon as={icon as any} w={20} h={20} color={`${colorScheme}.500`} />
            </Box>
            <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={2} textTransform="uppercase" letterSpacing="wider">
                {title}
            </Text>
            <Heading size="xl" mb={3} color="gray.800" fontWeight="extrabold">
                {amount}
            </Heading>
            <HStack spacing={2}>
                <Badge colorScheme={isPositive ? 'green' : 'red'} rounded="full" px={2}>
                    <HStack spacing={1}>
                        <Icon as={(isPositive ? FiTrendingUp : FiTrendingDown) as any} />
                        <Text>{percentage}%</Text>
                    </HStack>
                </Badge>
                <Text fontSize="xs" color="gray.400" fontWeight="medium">
                    {subText}
                </Text>
            </HStack>
        </Box>
    );
};

export default function DashboardPage() {
    const { user, token } = useAuth();
    // const [stats, setStats] = useState<any>(null); // Unused for now

    // Fetch real stats if needed, but for now we mock the "Fee Management" look
    useEffect(() => {
        // Placeholder for real data fetch
        console.log("User:", user); // Use user to silence warning
        console.log("Token:", token); // Use token
    }, [token, user]);

    return (
        <Box>
            <Flex justify="space-between" align="center" mb={10}>
                <Box>
                    <Heading size="lg" color="gray.800" mb={1}>Fee Collection & Management</Heading>
                    <Text color="gray.500">Overview of financial performance and student fees.</Text>
                </Box>
                <HStack spacing={3}>
                    <Button leftIcon={<Icon as={FiDownload as any} />} variant="outline" bg="white" shadow="sm">Export Report</Button>
                    <Button leftIcon={<Icon as={FiPlus as any} />} colorScheme="blue" shadow="md" bgGradient="linear(to-r, blue.500, blue.600)" _hover={{ bgGradient: "linear(to-r, blue.600, blue.700)" }}>Record Payment</Button>
                </HStack>
            </Flex>

            {/* Stats Grid */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
                <StatsCard
                    title="Total Collected"
                    amount="$150,450"
                    percentage="5.2"
                    isPositive={true}
                    subText="vs last month"
                    icon={FiDollarSign}
                    colorScheme="green"
                />
                <StatsCard
                    title="Outstanding Fees"
                    amount="$32,800"
                    percentage="1.8"
                    isPositive={true}
                    subText="vs last month"
                    icon={FiAlertCircle}
                    colorScheme="orange"
                />
                <StatsCard
                    title="Overdue Students"
                    amount="42"
                    percentage="-2.1"
                    isPositive={false}
                    subText="vs last month"
                    icon={FiUsers}
                    colorScheme="red"
                />
            </SimpleGrid>

            {/* Charts Section */}
            <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8} mb={10}>
                {/* Bar Chart */}
                <Box
                    gridColumn={{ lg: 'span 2' }}
                    bg="white"
                    p={8}
                    rounded="2xl"
                    shadow="sm"
                    borderWidth="1px"
                    borderColor="gray.100"
                >
                    <Flex justify="space-between" align="center" mb={8}>
                        <Box>
                            <Heading size="md" mb={1} color="gray.800">Monthly Collections</Heading>
                            <HStack align="baseline" spacing={4}>
                                <Heading size="lg" color="blue.600">$432,120</Heading>
                                <Badge colorScheme="green" variant="subtle" rounded="full" px={2}>+12.5% This Year</Badge>
                            </HStack>
                        </Box>
                        <Select w="120px" size="sm" defaultValue="Yearly" rounded="lg">
                            <option>Yearly</option>
                            <option>Monthly</option>
                        </Select>
                    </Flex>
                    <Box h="350px">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} barSize={40}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#718096', fontSize: 12, fontWeight: 'medium' }} dy={10} />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: '#EDF2F7', opacity: 0.4 }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px' }}
                                />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                    {barData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.name === 'Apr' ? '#3182CE' : '#CBD5E0'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>

                {/* Donut Chart */}
                <Box
                    bg="white"
                    p={8}
                    rounded="2xl"
                    shadow="sm"
                    borderWidth="1px"
                    borderColor="gray.100"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                >
                    <Box mb={6} textAlign="center">
                        <Heading size="md" mb={2} color="gray.800">Payment Status</Heading>
                        <Text fontSize="sm" color="gray.500">Distribution of 1250 Students</Text>
                    </Box>
                    <Box h="250px" position="relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    cornerRadius={5}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" textAlign="center">
                            <Heading size="lg" color="gray.800">70%</Heading>
                            <Text fontSize="xs" color="gray.500" fontWeight="bold">PAID</Text>
                        </Box>
                    </Box>
                    {/* Legend */}
                    <HStack justify="center" spacing={6} mt={6}>
                        {pieData.map((entry) => (
                            <VStack key={entry.name} spacing={1}>
                                <Box w={3} h={3} rounded="full" bg={entry.color} />
                                <Text fontSize="xs" color="gray.500" fontWeight="bold">{entry.name}</Text>
                            </VStack>
                        ))}
                    </HStack>
                </Box>
            </SimpleGrid>

            {/* Table Section */}
            <Box
                bg="white"
                rounded="2xl"
                shadow="sm"
                borderWidth="1px"
                borderColor="gray.100"
                overflow="hidden"
            >
                <Flex p={6} justify="space-between" align="center" borderBottomWidth="1px" borderColor="gray.100">
                    <HStack spacing={4}>
                        <Heading size="md" color="gray.800">Recent Transactions</Heading>
                        <Badge colorScheme="blue" rounded="full" px={2}>42 New</Badge>
                    </HStack>
                    <HStack spacing={3}>
                        <InputGroup size="sm" w="200px">
                            <InputLeftElement pointerEvents="none"><Icon as={FiFilter as any} color="gray.400" /></InputLeftElement>
                            <Input placeholder="Filter..." rounded="lg" />
                        </InputGroup>
                        <IconButton aria-label="Date" icon={<Icon as={FiCalendar as any} />} size="sm" variant="outline" rounded="lg" />
                    </HStack>
                </Flex>

                <Table variant="simple">
                    <Thead bg="gray.50">
                        <Tr>
                            <Th w="50px" py={4}><Checkbox colorScheme="blue" /></Th>
                            <Th py={4} fontSize="xs" letterSpacing="wider" color="gray.500">Student Name</Th>
                            <Th py={4} fontSize="xs" letterSpacing="wider" color="gray.500">Invoice #</Th>
                            <Th py={4} fontSize="xs" letterSpacing="wider" color="gray.500">Due Date</Th>
                            <Th py={4} fontSize="xs" letterSpacing="wider" color="gray.500">Total</Th>
                            <Th py={4} fontSize="xs" letterSpacing="wider" color="gray.500">Balance</Th>
                            <Th py={4} fontSize="xs" letterSpacing="wider" color="gray.500">Status</Th>
                            <Th py={4}></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {transactions.map((row) => (
                            <Tr key={row.id} _hover={{ bg: 'blue.50', transition: 'all 0.2s' }}>
                                <Td><Checkbox colorScheme="blue" /></Td>
                                <Td>
                                    <HStack spacing={3}>
                                        <Avatar size="sm" src={row.avatar} name={row.name} />
                                        <VStack align="start" spacing={0}>
                                            <Text fontWeight="bold" fontSize="sm" color="gray.800">{row.name}</Text>
                                            <Text fontSize="xs" color="gray.500">{row.class}</Text>
                                        </VStack>
                                    </HStack>
                                </Td>
                                <Td fontSize="sm" color="gray.600" fontFamily="mono">{row.invoice}</Td>
                                <Td fontSize="sm" color="gray.600">{row.date}</Td>
                                <Td fontWeight="bold" fontSize="sm" color="gray.800">{row.total}</Td>
                                <Td fontWeight="bold" fontSize="sm" color={row.balance === '$0.00' ? 'gray.400' : 'red.500'}>{row.balance}</Td>
                                <Td>
                                    <Badge
                                        px={3}
                                        py={1}
                                        rounded="full"
                                        colorScheme={
                                            row.status === 'Paid' ? 'green' :
                                                row.status === 'Overdue' ? 'red' : 'orange'
                                        }
                                        textTransform="uppercase"
                                        fontSize="xx-small"
                                        letterSpacing="wide"
                                        fontWeight="bold"
                                    >
                                        {row.status}
                                    </Badge>
                                </Td>
                                <Td>
                                    <Menu>
                                        <MenuButton as={IconButton} icon={<Icon as={FiMoreVertical as any} />} variant="ghost" size="sm" rounded="full" />
                                        <MenuList shadow="lg" rounded="xl" border="none" p={2}>
                                            <MenuItem icon={<Icon as={FiCheckCircle as any} />} rounded="md">Mark as Paid</MenuItem>
                                            <MenuItem icon={<Icon as={FiDownload as any} />} rounded="md">Download Invoice</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>

                {/* Pagination */}
                <Flex p={4} justify="space-between" align="center" borderTopWidth="1px" borderColor="gray.100" bg="gray.50">
                    <Text fontSize="sm" color="gray.500">Showing 1 to 4 of 42 results</Text>
                    <HStack spacing={2}>
                        <IconButton aria-label="Previous" icon={<Icon as={FiChevronLeft as any} />} size="sm" variant="outline" bg="white" isDisabled rounded="lg" />
                        <Button size="sm" variant="solid" colorScheme="blue" rounded="lg" shadow="md">1</Button>
                        <Button size="sm" variant="outline" bg="white" rounded="lg">2</Button>
                        <Button size="sm" variant="outline" bg="white" rounded="lg">3</Button>
                        <IconButton aria-label="Next" icon={<Icon as={FiChevronRight as any} />} size="sm" variant="outline" bg="white" rounded="lg" />
                    </HStack>
                </Flex>
            </Box>
        </Box>
    );
}
