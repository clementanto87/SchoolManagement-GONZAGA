import React, { ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import {
  FiGrid,
  FiFileText,
  FiUsers,
  FiBook,
  FiBarChart2,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiSearch,
  FiInfo,
  FiHelpCircle,
  FiCalendar,
  FiMail,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

const LinkItems: LinkItemProps[] = [
  // { name: 'Dashboard', icon: FiGrid, path: '/dashboard' },
  // { name: 'Fee Management', icon: FiFileText, path: '/dashboard/fees' },
  // { name: 'Student Info', icon: FiUsers, path: '/dashboard/students' },
  // { name: 'Academics', icon: FiBook, path: '/dashboard/academics' },
  // { name: 'Reports', icon: FiBarChart2, path: '/dashboard/reports' },
  { name: 'Manage News', icon: FiFileText, path: '/admin/news' },
  { name: 'Manage Events', icon: FiCalendar, path: '/admin/events' },
  { name: 'Admissions', icon: FiUsers, path: '/admin/admissions' },
  { name: 'Messages', icon: FiMail, path: '/admin/messages' },
];

export default function AppLayout({ children }: { children?: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useAuth();
  const [applicationCount, setApplicationCount] = React.useState(0);
  const [messageCount, setMessageCount] = React.useState(0);

  React.useEffect(() => {
    const fetchStats = async () => {
      if (!token) return;
      try {
        const [appRes, contactRes] = await Promise.all([
          fetch('http://localhost:5001/api/applications/stats', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('http://localhost:5001/api/contact/stats', { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        const appData = await appRes.json();
        const contactData = await contactRes.json();

        setApplicationCount(appData.pendingCount || 0);
        setMessageCount(contactData.pendingCount || 0);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        applicationCount={applicationCount}
        messageCount={messageCount}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            applicationCount={applicationCount}
            messageCount={messageCount}
          />
        </DrawerContent>
      </Drawer>
      {/* MobileNav */}
      <MobileNav onOpen={onOpen} totalCount={applicationCount + messageCount} />
      <Box ml={{ base: 0, md: 72 }} p="6" transition="all 0.3s">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  applicationCount?: number;
  messageCount?: number;
}

const SidebarContent = ({ onClose, applicationCount = 0, messageCount = 0, ...rest }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.100', 'gray.700')}
      w={{ base: 'full', md: 72 }}
      pos="fixed"
      h="full"
      boxShadow="sm"
      {...rest}
    >
      <Flex h="24" alignItems="center" mx="8" justifyContent="space-between">
        <HStack spacing={3}>
          <Flex
            w={10}
            h={10}
            align={'center'}
            justify={'center'}
            rounded={'xl'}
            bgGradient="linear(to-br, blue.500, purple.600)"
            color={'white'}
            shadow="lg"
          >
            <Icon as={FiBook as any} w={5} h={5} />
          </Flex>
          <Box>
            <Text fontSize="lg" fontWeight="extrabold" letterSpacing="tight" bgGradient="linear(to-r, blue.600, purple.600)" bgClip="text">
              GONZAGA
            </Text>
            <Text fontSize="xs" color="gray.500" fontWeight="medium">Admin Portal</Text>
          </Box>
        </HStack>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <VStack align="stretch" spacing={2} px={4} mt={4}>
        <Text px={4} fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase" letterSpacing="wider" mb={2}>
          Main Menu
        </Text>
        {LinkItems.map((link) => {
          let badgeCount = 0;
          if (link.name === 'Admissions') badgeCount = applicationCount;
          if (link.name === 'Messages') badgeCount = messageCount;

          return (
            <NavItem
              key={link.name}
              icon={link.icon}
              path={link.path}
              isActive={location.pathname === link.path}
              onClick={() => navigate(link.path)}
              badge={badgeCount}
            >
              {link.name}
            </NavItem>
          );
        })}
      </VStack>

      {/* Hidden for now
      <Box position="absolute" bottom={8} w="full" px={4}>
        <Text px={4} fontSize="xs" fontWeight="bold" color="gray.400" textTransform="uppercase" letterSpacing="wider" mb={2}>
          Support
        </Text>
        <VStack align="stretch" spacing={2}>
          <NavItem icon={FiSettings} path="/settings">Settings</NavItem>
          <NavItem icon={FiHelpCircle} path="/help">Help Center</NavItem>
        </VStack>
      </Box>
      */}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  path?: string;
  isActive?: boolean;
  badge?: number;
}

const NavItem = ({ icon, children, isActive, badge, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="3"
        mx="2"
        borderRadius="xl"
        role="group"
        cursor="pointer"
        bg={isActive ? 'blue.50' : 'transparent'}
        color={isActive ? 'blue.700' : 'gray.600'}
        fontWeight={isActive ? 'bold' : 'medium'}
        transition="all 0.2s"
        _hover={{
          bg: isActive ? 'blue.50' : 'gray.50',
          color: isActive ? 'blue.700' : 'blue.600',
          transform: 'translateX(2px)'
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="18"
            color={isActive ? 'blue.600' : 'gray.400'}
            _groupHover={{
              color: 'blue.600',
            }}
            as={icon as any}
          />
        )}
        {children}
        {badge !== undefined && badge > 0 && (
          <Flex
            ml="auto"
            bg="red.500"
            color="white"
            w={5}
            h={5}
            rounded="full"
            align="center"
            justify="center"
            fontSize="xs"
            fontWeight="bold"
            shadow="md"
          >
            {badge}
          </Flex>
        )}
      </Flex>
    </Link>
  );
};

interface MobileNavProps extends FlexProps {
  onOpen: () => void;
  totalCount?: number;
}

const MobileNav = ({ onOpen, totalCount = 0, ...rest }: MobileNavProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Flex
      ml={{ base: 0, md: 72 }}
      px={{ base: 4, md: 8 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('rgba(255, 255, 255, 0.8)', 'gray.900')}
      backdropFilter="blur(10px)"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.100', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'space-between' }}
      position="sticky"
      top="0"
      zIndex="sticky"
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<Icon as={FiMenu as any} />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        GONZAGA
      </Text>

      <HStack spacing={{ base: '0', md: '4' }} ml="auto">
        <Box position="relative">
          <IconButton
            size="md"
            variant="ghost"
            aria-label="notifications"
            icon={<Icon as={FiBell as any} />}
            rounded="full"
            onClick={() => navigate('/admin/admissions')}
          />
          {totalCount > 0 && (
            <Flex
              position="absolute"
              top="0"
              right="0"
              bg="red.500"
              color="white"
              w={4}
              h={4}
              rounded="full"
              align="center"
              justify="center"
              fontSize="xs"
              fontWeight="bold"
            >
              {totalCount}
            </Flex>
          )}
        </Box>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack spacing={3}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                  borderWidth="2px"
                  borderColor="blue.400"
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="0px"
                  ml="2"
                >
                  <Text fontSize="sm" fontWeight="bold" color="gray.700">{user?.firstName} {user?.lastName}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {user?.role}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <Icon as={FiChevronDown as any} color="gray.400" />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.100', 'gray.700')}
              shadow="lg"
              rounded="xl"
              p={2}
            >
              <MenuItem rounded="md">Profile</MenuItem>
              <MenuItem rounded="md">Settings</MenuItem>
              <MenuDivider />
              <MenuItem rounded="md" color="red.500" onClick={() => {
                logout();
                navigate('/login');
              }}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}
