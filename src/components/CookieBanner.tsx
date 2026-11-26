import { Box, Button, Checkbox, Flex, HStack, Link, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { createContext, useEffect, useState } from 'react';

// Define the shape of our consent object
export interface ConsentPreferences {
    analytics: boolean;
    marketing: boolean;
}

export const externalMediaConsent = createContext(false);
export const noOptionalConsent: ConsentPreferences = { analytics: false, marketing: false };
const consentKey = 'growConsentV2';

export function readConsentPreferences(): ConsentPreferences | null {
    try {
        const value = JSON.parse(localStorage.getItem(consentKey) ?? 'null');
        if (typeof value?.analytics === 'boolean' && typeof value.marketing === 'boolean') {
            return { analytics: value.analytics, marketing: value.marketing };
        }
    } catch {
        // Optional services stay disabled if browser storage is unavailable.
    }
    return null;
}

interface CookieBannerProps {
    onSave: (preferences: ConsentPreferences) => void;
}

export const CookieBanner = ({ onSave }: CookieBannerProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // Default preferences for the checkboxes
    const [preferences, setPreferences] = useState(noOptionalConsent);

    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'white');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const optionBg = useColorModeValue('gray.50', 'gray.700');

    useEffect(() => {
        const storedConsent = readConsentPreferences();
        if (storedConsent) {
            setPreferences(storedConsent);
        } else {
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
        saveAndClose(noOptionalConsent);
    };

    const handleSaveSettings = () => {
        saveAndClose(preferences);
    };

    const saveAndClose = (finalPreferences: ConsentPreferences) => {
        try {
            localStorage.setItem(consentKey, JSON.stringify(finalPreferences));
        } catch {
            // The choice still applies to the current page when storage is unavailable.
        }
        setPreferences(finalPreferences);
        setIsVisible(false);
        setShowSettings(false);
        onSave(finalPreferences);
    };

    if (!isVisible) return null;

    return (
        <Box
            position="fixed"
            bottom="0"
            left="0"
            right="0"
            maxH="100dvh"
            overflowY="auto"
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
                            Session cookies keep you signed in. The options below are voluntary.
                        </Text>
                        <Box p={3} bg={optionBg} borderRadius="md">
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
                        <Box p={3} bg={optionBg} borderRadius="md">
                            <Checkbox
                                isChecked={preferences.marketing}
                                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                                colorScheme="blue"
                            >
                                <Text fontSize="sm" fontWeight="medium">External media (YouTube)</Text>
                            </Checkbox>
                            <Text fontSize="xs" color="gray.500" mt={1} ml={6}>
                                Lets embedded YouTube videos connect to Google and access device information.
                            </Text>
                        </Box>
                        <HStack justify="flex-end" pt={2}>
                            <Button size="sm" variant="ghost" onClick={() => setShowSettings(false)}>Back</Button>
                            <Button size="sm" colorScheme="blue" onClick={handleSaveSettings}>Save preferences</Button>
                        </HStack>
                    </VStack>
                ) : (
                    <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between" gap={4}>
                        <Text color={textColor} fontSize="sm" textAlign={{ base: 'center', md: 'left' }}>
                            We use optional Google Analytics and YouTube embeds with your permission.{' '}
                            <Link href="/privacy" isExternal textDecoration="underline">Privacy notice</Link>
                        </Text>
                        <Flex gap={2} wrap="wrap" justify="center">
                            <Button size="sm" variant="link" onClick={() => setShowSettings(true)} px={2}>
                                Manage Settings
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleDeclineAll}>
                                Decline All
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleAcceptAll}>
                                Accept All
                            </Button>
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};
