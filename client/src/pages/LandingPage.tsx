import React from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Text,
    Stack,
    SimpleGrid,
    Icon,
    useColorModeValue,
    Link,
    VStack,
    HStack,
    useBreakpointValue,
    Tag,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiBook, FiUsers, FiMonitor, FiArrowRight, FiCheckCircle, FiBookOpen, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';
import NewsModal from '../components/NewsModal';
import { API_URL } from '../config';
import PublicHeader from '../components/Layout/PublicHeader';
import PublicFooter from '../components/Layout/PublicFooter';

// --- Animation Components ---
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// --- Components ---

const FeatureCard = ({ title, text, icon, index }: { title: string; text: string; icon: any, index: number }) => {
    return (
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            bg={'white'}
            p={8}
            rounded={'2xl'}
            shadow={'lg'}
            borderWidth="1px"
            borderColor="gray.100"
            textAlign={'left'}
            position="relative"
            overflow="hidden"
            _hover={{ shadow: '2xl', transform: 'translateY(-5px)', borderColor: 'blue.200' }}
            sx={{ transition: 'all 0.3s ease' }}
        >
            <Box
                position="absolute"
                top="-20px"
                right="-20px"
                w="100px"
                h="100px"
                bg="blue.50"
                rounded="full"
                opacity={0.5}
            />
            <Flex
                w={14}
                h={14}
                align={'center'}
                justify={'center'}
                rounded={'xl'}
                bgGradient="linear(to-br, blue.400, blue.600)"
                color={'white'}
                mb={6}
                shadow="md"
            >
                <Icon as={icon as any} w={7} h={7} />
            </Flex>
            <Heading size={'md'} mb={3} color={'gray.800'}>
                {title}
            </Heading>
            <Text color={'gray.600'} fontSize={'md'} lineHeight="relaxed">
                {text}
            </Text>
        </MotionBox>
    );
};

const NewsCard = ({ date, title, excerpt, index, onClick }: { date: string; title: string; excerpt: string; index: number; onClick: () => void }) => {
    return (
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            bg={'white'}
            p={6}
            rounded={'xl'}
            shadow={'md'}
            borderWidth="1px"
            borderColor="gray.100"
            _hover={{ shadow: 'xl', transform: 'translateY(-5px)', borderColor: 'blue.100' }}
            cursor="pointer"
            onClick={onClick}
        >
            <Text fontSize={'xs'} fontWeight="bold" color={'blue.500'} mb={2} textTransform="uppercase" letterSpacing="wide">
                {date}
            </Text>
            <Heading size={'md'} mb={3} color={'gray.800'} lineHeight="shorter">
                {title}
            </Heading>
            <Text fontSize={'sm'} color={'gray.600'} mb={4} noOfLines={3}>
                {excerpt}
            </Text>
            <Link color={'blue.600'} fontSize={'sm'} fontWeight={'bold'} display={'inline-flex'} alignItems={'center'} _hover={{ textDecoration: 'none', color: 'blue.700' }}>
                Read More <Icon as={FiArrowRight as any} ml={1} />
            </Link>
        </MotionBox>
    );
};

const EventCard = ({ day, month, title, time, index }: { day: string; month: string; title: string; time: string, index: number }) => {
    return (
        <MotionFlex
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            bg={'white'}
            p={4}
            rounded={'xl'}
            shadow={'md'}
            align={'center'}
            _hover={{ shadow: 'lg' }}
        >
            <Box
                bgGradient="linear(to-b, blue.500, blue.600)"
                rounded={'lg'}
                p={3}
                textAlign={'center'}
                minW={'70px'}
                mr={5}
                color="white"
                shadow="md"
            >
                <Text fontSize={'2xl'} fontWeight={'bold'} lineHeight={1}>
                    {day}
                </Text>
                <Text fontSize={'xs'} fontWeight={'bold'} textTransform={'uppercase'}>
                    {month}
                </Text>
            </Box>
            <Box>
                <Heading size={'sm'} mb={1} color={'gray.800'}>
                    {title}
                </Heading>
                <Text fontSize={'sm'} color={'gray.500'} display="flex" alignItems="center">
                    {time}
                </Text>
            </Box>
        </MotionFlex>
    );
};

// --- New Components ---

const StatCard = ({ label, value, icon }: { label: string; value: string; icon: any }) => {
    return (
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            p={6}
            textAlign={'center'}
            color={'white'}
        >
            <Flex justify={'center'} mb={4}>
                <Icon as={icon} w={10} h={10} color={'blue.200'} />
            </Flex>
            <Heading fontSize={'4xl'} fontWeight={'bold'} mb={2}>
                {value}
            </Heading>
            <Text fontSize={'lg'} opacity={0.8}>
                {label}
            </Text>
        </MotionBox>
    );
};

export default function LandingPage() {
    const navigate = useNavigate();
    const bg = useColorModeValue('white', 'gray.800');
    const [latestNews, setLatestNews] = React.useState<any[]>([]);
    const [upcomingEvents, setUpcomingEvents] = React.useState<any[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedNews, setSelectedNews] = React.useState<any>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [newsRes, eventsRes] = await Promise.all([
                    fetch(`${API_URL}/api/news`),
                    fetch(`${API_URL}/api/events`)
                ]);

                if (newsRes.ok) {
                    const newsData = await newsRes.json();
                    setLatestNews(Array.isArray(newsData) ? newsData.slice(0, 3) : []);
                }

                if (eventsRes.ok) {
                    const eventsData = await eventsRes.json();
                    setUpcomingEvents(Array.isArray(eventsData) ? eventsData.slice(0, 3) : []);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    const handleNewsClick = (news: any) => {
        setSelectedNews(news);
        onOpen();
    };

    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box bg={'gray.50'} minH={'100vh'} fontFamily={'sans-serif'} overflowX="hidden">
            <PublicHeader />

            {/* Hero Section */}
            <Box position={'relative'} height={{ base: '600px', md: '700px' }} overflow={'hidden'}>
                <Box
                    position={'absolute'}
                    top={0}
                    left={0}
                    w={'full'}
                    h={'full'}
                    bgImage={'url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)'}
                    bgSize={'cover'}
                    bgPosition={'center'}
                    transform="scale(1.05)" // Subtle zoom effect
                    transition="transform 10s ease-out"
                >
                    <Image
                        src="/gonzaga-patron.png"
                        alt="Patron Saint"
                        position="absolute"
                        right={{ base: '-10%', lg: '5%' }}
                        bottom={0}
                        h={{ base: '60%', lg: '90%' }}
                        objectFit="contain"
                        opacity={0.6}
                        filter="grayscale(20%)"
                    />
                    <Box
                        position={'absolute'}
                        top={0}
                        left={0}
                        w={'full'}
                        h={'full'}
                        bgGradient={'linear(to-r, blue.900 60%, blue.900)'}
                        opacity={0.85}
                    />
                </Box>

                <Container maxW={'7xl'} height={'full'} position={'relative'} zIndex={1}>
                    <Stack
                        height={'full'}
                        justify={'center'}
                        maxW={'3xl'}
                        spacing={8}
                        pt={{ base: 20, md: 0 }}
                    >
                        <Box
                            bg={{ base: 'blackAlpha.600', md: 'transparent' }}
                            p={{ base: 6, md: 0 }}
                            rounded={'2xl'}
                            backdropFilter={{ base: 'blur(10px)', md: 'none' }}
                        >
                            <MotionHeading
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                fontSize={{ base: '4xl', md: '7xl' }}
                                fontWeight={'extrabold'}
                                lineHeight={'1.1'}
                                color={'white'}
                                letterSpacing={'tight'}
                            >
                                Empowering Future <br />
                                <Text as={'span'} bgGradient="linear(to-r, blue.200, purple.200)" bgClip="text">
                                    Leaders & Innovators
                                </Text>
                            </MotionHeading>
                            <MotionText
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                fontSize={{ base: 'lg', md: '2xl' }}
                                color={'gray.200'}
                                mt={6}
                                maxW={'2xl'}
                                fontWeight="light"
                            >
                                Gonzaga Matric Higher Secondary School provides world-class education with a focus on holistic development, academic excellence, and moral values.
                            </MotionText>
                            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} mt={8}>
                                <Button
                                    size={'lg'}
                                    rounded={'full'}
                                    bg={'blue.500'}
                                    color={'white'}
                                    px={8}
                                    height={'60px'}
                                    fontSize={'lg'}
                                    _hover={{ bg: 'blue.400', transform: 'translateY(-2px)', shadow: 'xl' }}
                                    transition={'all 0.3s ease'}
                                    leftIcon={<Icon as={FiBookOpen as any} />}
                                    onClick={() => navigate('/apply')}
                                >
                                    Apply Now
                                </Button>
                                <Button
                                    size={'lg'}
                                    rounded={'full'}
                                    variant={'outline'}
                                    colorScheme={'whiteAlpha'}
                                    color={'white'}
                                    px={8}
                                    height={'60px'}
                                    fontSize={'lg'}
                                    _hover={{ bg: 'whiteAlpha.200', transform: 'translateY(-2px)' }}
                                    transition={'all 0.3s ease'}
                                    leftIcon={<Icon as={FiBook as any} />}
                                    onClick={() => navigate('/learn-more')}
                                >
                                    Learn More
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box bg={'blue.900'} py={10} borderTop="1px solid" borderColor="whiteAlpha.200">
                <Container maxW={'7xl'}>
                    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
                        <StatCard label={'Students'} value={'1,500+'} icon={FiUsers} />
                        <StatCard label={'Teachers'} value={'100+'} icon={FiUsers} />
                        <StatCard label={'Pass Rate'} value={'100%'} icon={FiCheckCircle} />
                        <StatCard label={'Years of Excellence'} value={'25+'} icon={FiAward} />
                    </SimpleGrid>
                </Container>
            </Box>

            {/* Features Section */}
            <Box py={24} bg={'white'} position="relative">
                <Container maxW={'7xl'}>
                    <VStack spacing={4} mb={16} textAlign={'center'}>
                        <Tag size={'lg'} colorScheme={'blue'} rounded={'full'}>Why Choose Us</Tag>
                        <Heading fontSize={{ base: '3xl', md: '5xl' }} fontWeight={'bold'}>
                            Excellence in Education
                        </Heading>
                        <Text fontSize={'xl'} color={'gray.500'} maxW={'2xl'}>
                            We provide a nurturing environment where students can thrive academically, socially, and emotionally.
                        </Text>
                    </VStack>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                        <FeatureCard
                            index={0}
                            icon={FiAward}
                            title={'Academic Excellence'}
                            text={'Consistently achieving top results with our rigorous curriculum and dedicated faculty members.'}
                        />
                        <FeatureCard
                            index={1}
                            icon={FiUsers}
                            title={'Holistic Development'}
                            text={'Focusing on sports, arts, and character building alongside academics for well-rounded growth.'}
                        />
                        <FeatureCard
                            index={2}
                            icon={FiMonitor}
                            title={'Modern Infrastructure'}
                            text={'State-of-the-art laboratories, smart classrooms, and sports facilities for the best learning experience.'}
                        />
                    </SimpleGrid>
                </Container>
            </Box>

            {/* News & Events Section */}
            <Box py={24} bg={'gray.50'}>
                <Container maxW={'7xl'}>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16}>
                        {/* News */}
                        <Box>
                            <Flex justify="space-between" align="center" mb={8}>
                                <Heading size={'lg'} color={'gray.800'}>Latest News</Heading>
                                <Button variant="link" colorScheme="blue" size="sm" as="a" href="/news">View All</Button>
                            </Flex>
                            <Stack spacing={6}>
                                {latestNews.length === 0 ? (
                                    <Text>No news available at the moment.</Text>
                                ) : (
                                    latestNews.map((news, index) => (
                                        <NewsCard
                                            key={news.id || index}
                                            index={index}
                                            date={new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            title={news.title}
                                            excerpt={news.excerpt}
                                            onClick={() => handleNewsClick(news)}
                                        />
                                    ))
                                )}
                            </Stack>
                        </Box>

                        {/* Events */}
                        <Box>
                            <Flex justify="space-between" align="center" mb={8}>
                                <Heading size={'lg'} color={'gray.800'}>Upcoming Events</Heading>
                                <Button variant="link" colorScheme="blue" size="sm">View Calendar</Button>
                            </Flex>
                            <Stack spacing={4}>
                                {upcomingEvents.length === 0 ? (
                                    <Text>No upcoming events.</Text>
                                ) : (
                                    upcomingEvents.map((event, index) => (
                                        <EventCard
                                            key={event.id || index}
                                            index={index}
                                            day={new Date(event.date).getDate().toString()}
                                            month={new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                                            title={event.title}
                                            time={`${event.time} - ${event.location}`}
                                        />
                                    ))
                                )}
                            </Stack>
                        </Box>
                    </SimpleGrid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box bg={'blue.600'} position={'relative'} overflow={'hidden'}>
                <Container maxW={'7xl'} py={20} position={'relative'} zIndex={1}>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={10} align={'center'} justify={'space-between'}>
                        <Box>
                            <Heading color={'white'} fontSize={'4xl'} mb={4}>
                                Ready to Join Our Community?
                            </Heading>
                            <Text color={'blue.100'} fontSize={'xl'} maxW={'2xl'}>
                                Take the first step towards a bright future. Apply now for the upcoming academic year.
                            </Text>
                        </Box>
                        <Button
                            size={'lg'}
                            height={'60px'}
                            px={8}
                            bg={'white'}
                            color={'blue.600'}
                            fontSize={'lg'}
                            rounded={'full'}
                            _hover={{ bg: 'gray.100', transform: 'scale(1.05)' }}
                            onClick={() => navigate('/apply')}
                        >
                            Start Application
                        </Button>
                    </Stack>
                </Container>
                {/* Decorative circles */}
                <Box position={'absolute'} top={-10} right={-10} w={64} h={64} bg={'whiteAlpha.100'} rounded={'full'} />
                <Box position={'absolute'} bottom={-10} left={-10} w={48} h={48} bg={'whiteAlpha.100'} rounded={'full'} />
            </Box>

            <PublicFooter />
            <NewsModal isOpen={isOpen} onClose={onClose} news={selectedNews} />
        </Box >
    );
}
