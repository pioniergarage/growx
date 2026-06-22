/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Checkbox, Flex, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// Define the shape of our consent object
export interface ConsentPreferences {
    analytics: boolean;
    marketing: boolean;
}

interface CookieBannerProps {
    onSave: (preferences: ConsentPreferences) => void;
}

export const CookieBanner = ({ onSave }: CookieBannerProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // Default preferences for the checkboxes
    const [preferences, setPreferences] = useState<ConsentPreferences>({
        analytics: false,
        marketing: false,
    });

    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'white');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    useEffect(() => {
        try {
            const storedConsent = localStorage.getItem('cookieConsent');
            if (!storedConsent) {
                setIsVisible(true);
            } else {
                // Parse existing preferences if they open settings manually later
                setPreferences(JSON.parse(storedConsent));
            }
        } catch (error) {
            // Failsafe in case of old data formats
            setIsVisible(true);
        }

        const handleShowBanner = () => setIsVisible(true);
        window.addEventListener('showCookieBanner', handleShowBanner);
        return () => window.removeEventListener('showCookieBanner', handleShowBanner);
    }, []);

    const handleAcceptAll = () => {
        const fullConsent = { analytics: true, marketing: true };
        saveAndClose(fullConsent);
    };

    const handleDeclineAll = () => {
        const noConsent = { analytics: false, marketing: false };
        saveAndClose(noConsent);
    };

    const handleSaveSettings = () => {
        saveAndClose(preferences);
    };

    const saveAndClose = (finalPreferences: ConsentPreferences) => {
        localStorage.setItem('cookieConsent', JSON.stringify(finalPreferences));
        setIsVisible(false);
        setShowSettings(false);
        onSave(finalPreferences);

        // Broadcast the specific marketing consent for the video component
        if (finalPreferences.marketing) {
            window.dispatchEvent(new Event('marketingConsentGranted'));
        }
    };

    if (!isVisible) return null;

    return (
        <Box
            position="fixed"
            bottom="0"
            left="0"
            right="0"
            p={4}
            bg={bgColor}
            borderTop="1px solid"
            borderColor={borderColor}
            boxShadow="0 -4px 20px rgba(0, 0, 0, 0.1)"
            zIndex="banner"
        >
            <Flex
                maxW="container.xl"
                mx="auto"
                direction="column"
                gap={4}
            >
                {showSettings ? (
                    <VStack align="stretch" spacing={4}>
                        <Text color={textColor} fontWeight="bold">Cookie Preferences</Text>
                        <Text color={textColor} fontSize="sm">
                            Select which cookies you want to accept. Essential cookies are always active as the site cannot function without them.
                        </Text>
                        <Box p={3} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
                            <Checkbox
                                isChecked={preferences.analytics}
                                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                colorScheme="blue"
                            >
                                <Text fontSize="sm" fontWeight="medium">Analytics Cookies</Text>
                            </Checkbox>
                            <Text fontSize="xs" color="gray.500" mt={1} ml={6}>
                                Used by Google Analytics to help us understand how visitors interact with our website.
                            </Text>
                        </Box>
                        <Box p={3} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
                            <Checkbox
                                isChecked={preferences.marketing}
                                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                                colorScheme="blue"
                            >
                                <Text fontSize="sm" fontWeight="medium">External Media & Marketing</Text>
                            </Checkbox>
                            <Text fontSize="xs" color="gray.500" mt={1} ml={6}>
                                Allows loading external content like YouTube videos, which may set tracking cookies.
                            </Text>
                        </Box>
                        <HStack justify="flex-end" pt={2}>
                            <Button size="sm" variant="ghost" onClick={() => setShowSettings(false)}>Back</Button>
                            <Button size="sm" colorScheme="blue" onClick={handleSaveSettings}>Accept and Save Preferences</Button>
                        </HStack>
                    </VStack>
                ) : (
                    <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" gap={4}>
                        <Text color={textColor} fontSize="sm" textAlign={{ base: 'center', md: 'left' }}>
                            We use cookies to improve your GROW experience and load external content.<br />
                            You can accept all, decline non-essential cookies, or manage your preferences.
                        </Text>
                        <Flex gap={2} wrap="wrap" justify="center">
                            <Button size="sm" variant="link" onClick={() => setShowSettings(true)} px={2}>
                                Manage Settings
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleDeclineAll}>
                                Decline All
                            </Button>
                            <Button size="sm" colorScheme="blue" onClick={handleAcceptAll}>
                                Accept All
                            </Button>
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};