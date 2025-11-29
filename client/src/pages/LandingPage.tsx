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

const NewsModal = ({ isOpen, onClose, news }: { isOpen: boolean; onClose: () => void; news: any }) => {
    if (!news) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered scrollBehavior="inside">
            <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.600" />
            <ModalContent rounded="2xl" overflow="hidden" shadow="2xl">
                <ModalHeader
                    bgGradient="linear(to-r, blue.600, purple.600)"
                    color="white"
                    py={8}
                    px={8}
                    position="relative"
                >
                    <Box position="absolute" top={0} right={0} opacity={0.1}>
                        <Icon as={FiAward as any} w={40} h={40} transform="rotate(15deg) translate(20px, -20px)" />
                    </Box>
                    <VStack align="start" spacing={3} position="relative" zIndex={1}>
                        <Tag size="md" variant="solid" colorScheme="whiteAlpha" rounded="full">
                            {new Date(news.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </Tag>
                        <Heading size="xl" lineHeight="tight">
                            {news.title}
                        </Heading>
                    </VStack>
                </ModalHeader>
                <ModalCloseButton color="white" size="lg" mt={2} mr={2} _hover={{ bg: 'whiteAlpha.200' }} />
                <ModalBody py={8} px={8}>
                    <Text fontSize="lg" lineHeight="1.8" color="gray.700" whiteSpace="pre-wrap" sx={{ columnCount: { base: 1, md: 1 }, columnGap: 8 }}>
                        {news.content || news.excerpt}
                    </Text>
                    {news.author && (
                        <Flex mt={8} align="center" borderTopWidth={1} borderColor="gray.100" pt={6}>
                            <Box w={10} h={10} rounded="full" bgGradient="linear(to-br, orange.400, red.500)" color="white" display="flex" alignItems="center" justifyContent="center" mr={3} fontSize="sm" fontWeight="bold" shadow="md">
                                {news.author.charAt(0).toUpperCase()}
                            </Box>
                            <Box>
                                <Text fontSize="sm" fontWeight="bold" color="gray.800">Posted by {news.author}</Text>
                                <Text fontSize="xs" color="gray.500">School Administrator</Text>
                            </Box>
                        </Flex>
                    )}
                </ModalBody>
                <ModalFooter bg="gray.50" py={4} px={8}>
                    <Button onClick={onClose} size="lg" w="full" colorScheme="gray">
                        Close Article
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
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
                    fetch('http://localhost:5001/api/news'),
                    fetch('http://localhost:5001/api/events')
                ]);

                const newsData = await newsRes.json();
                const eventsData = await eventsRes.json();

                setLatestNews(newsData.slice(0, 3));
                setUpcomingEvents(eventsData.slice(0, 3));
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
            <Box position={'relative'} height={'600px'} overflow={'hidden'}>
                <Box
                    position={'absolute'}
                    top={0}
                    left={0}
                    w={'full'}
                    h={'full'}
                    bgImage={'url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)'}
                    bgSize={'cover'}
                    bgPosition={'center'}
                >
                    <Box
                        position={'absolute'}
                        top={0}
                        left={0}
                        w={'full'}
                        h={'full'}
                        bgGradient={'linear(to-r, blue.900, blue.800, transparent)'}
                        opacity={0.9}
                    />
                </Box>

                <Container maxW={'7xl'} height={'full'} position={'relative'} zIndex={1}>
                    <Stack
                        height={'full'}
                        justify={'center'}
                        maxW={'2xl'}
                        spacing={8}
                    >
                        <MotionHeading
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            fontSize={{ base: '4xl', md: '6xl' }}
                            fontWeight={'bold'}
                            lineHeight={'1.1'}
                            color={'white'}
                        >
                            Empowering Future <br />
                            <Text as={'span'} color={'blue.200'}>
                                Leaders & Innovators
                            </Text>
                        </MotionHeading>
                        <MotionText
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            fontSize={'xl'}
                            color={'gray.200'}
                        >
                            Gonzaga Matric Higher Secondary School provides world-class education with a focus on holistic development, academic excellence, and moral values.
                        </MotionText>
                        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                            <Button
                                size={'lg'}
                                rounded={'full'}
                                colorScheme={'blue'}
                                bg={'blue.400'}
                                _hover={{ bg: 'blue.500' }}
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
                                _hover={{ bg: 'whiteAlpha.200' }}
                                leftIcon={<Icon as={FiBook as any} />}
                                onClick={() => navigate('/learn-more')}
                            >
                                Learn More
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            {/* Features Section */}
            <Box py={20} bg={'white'}>
                <Container maxW={'7xl'}>
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

            <PublicFooter />
            <NewsModal isOpen={isOpen} onClose={onClose} news={selectedNews} />
        </Box >
    );
}
