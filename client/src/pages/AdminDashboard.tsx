import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import AppLayout from '../components/Layout/AppLayout';

export default function AdminDashboard() {
    return (
        <AppLayout>
            <Box p={8}>
                <Heading>Admin Dashboard</Heading>
                <Text mt={4}>Welcome to the Admin Dashboard.</Text>
            </Box>
        </AppLayout>
    );
}
