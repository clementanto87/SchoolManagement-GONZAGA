import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Stack,
    Icon,
    Link,
    useColorModeValue,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Badge
} from '@chakra-ui/react';
import { API_URL } from '../config';
import { FiArrowRight, FiSearch, FiCalendar } from 'react-icons/fi';
import PublicHeader from '../components/Layout/PublicHeader';
import PublicFooter from '../components/Layout/PublicFooter';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const NewsCard = ({ date, title, excerpt, index }: { date: string; title: string; excerpt: string, index: number }) => {
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
            borderLeft="4px solid"
            borderLeftColor="blue.500"
            _hover={{ bg: 'gray.50', shadow: 'lg', transform: 'translateY(-2px)' }}
            sx={{ transition: 'all 0.3s ease' }}
        >
            <Box
                as="span"
                display="inline-block"
                bg="blue.50"
                color="blue.600"
                px={3}
                py={1}
                rounded="full"
                fontSize="xs"
                fontWeight="bold"
                mb={3}
            >
                {date}
            </Box>
            <Heading size={'md'} mb={3} color={'gray.800'} lineHeight="shorter">
                {title}
            </Heading>
            <Text fontSize={'sm'} color={'gray.600'} mb={4}>
                {excerpt}
            </Text>
            <Link color={'blue.600'} fontSize={'sm'} fontWeight={'bold'} display={'inline-flex'} alignItems={'center'} _hover={{ textDecoration: 'none', color: 'blue.700' }}>
                Read More <Icon as={FiArrowRight as any} ml={1} />
            </Link>
        </MotionBox>
    );
};

export default function NewsPage() {
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const [newsItems, setNewsItems] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');

    React.useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`${API_URL}/api/news`);
                const data = await response.json();
                setNewsItems(data);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);

    const filteredNews = newsItems.filter(news =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box bg={bgColor} minH="100vh" overflowX="hidden">
            <PublicHeader />

            {/* Hero Section */}
            <Box bg="blue.900" color="white" pt={32} pb={20} position="relative" overflow="hidden">
                <Container maxW="7xl" position="relative" zIndex={1}>
                    <Heading size="2xl" mb={4} textAlign="center">Latest News & Updates</Heading>
                    <Text fontSize="xl" color="blue.100" textAlign="center" maxW="2xl" mx="auto">
                        Stay informed about the latest happenings, announcements, and achievements at Gonzaga.
                    </Text>
                </Container>
            </Box>

            <Container maxW="7xl" py={16}>
                {/* Search and Filter */}
                <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mb={12} justify="space-between">
                    <InputGroup maxW={{ base: 'full', md: '400px' }}>
                        <InputLeftElement pointerEvents="none">
                            <Icon as={FiSearch as any} color="gray.400" />
                        </InputLeftElement>
                        <Input
                            placeholder="Search news..."
                            bg="white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </InputGroup>
                </Stack>

                {/* News Grid */}
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                    {filteredNews.map((news, index) => (
                        <NewsCard
                            key={news.id || index}
                            index={index}
                            date={new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            title={news.title}
                            excerpt={news.excerpt}
                        />
                    ))}
                </SimpleGrid>

                {/* Pagination */}
                <Stack direction="row" spacing={4} justify="center" mt={16}>
                    <Button isDisabled>Previous</Button>
                    <Button colorScheme="blue">1</Button>
                    <Button variant="outline" bg="white">2</Button>
                    <Button variant="outline" bg="white">3</Button>
                    <Button>Next</Button>
                </Stack>
            </Container>

            <PublicFooter />
        </Box>
    );
}
