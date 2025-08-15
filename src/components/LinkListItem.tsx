import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Card,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image
} from '@chakra-ui/react';
import Link from 'next/link';

interface LinkListItemProps {
    link: { id: number; title: string; href: string; img: string; };
}


function LinkListItem({ link }: LinkListItemProps) {
    return (
        <Link href={link.href} passHref key={link.id}>
            <Card
                as={Grid}
                alignItems="left"
                gridTemplateColumns={{ base: '1fr 2fr', md: '10rem 2fr' }}
                px={3}
                pt={4}
                pb={3}
                columnGap={{ base: 2, md: 4 }}
                opacity={1}
                cursor="pointer"
                _hover={{ bgColor: 'whiteAlpha.100' }}
                _focus={{ bgColor: 'whiteAlpha.200' }}
            >
                <Flex flexDir={{ base: 'column', md: 'row' }} gap={4}>
                    <Image
                        src={link.img}
                        alt="Grow Pioniergarage"
                        width="3rem"
                        objectFit="contain"
                    />
                    <Box>
                        <GridItem>
                            <Heading size="md">{link.title}</Heading>
                        </GridItem>
                        <GridItem>
                            <Button
                                leftIcon={<ExternalLinkIcon />}
                                size="sm"
                                variant="link"
                                onClick={() => { window.location.href = link.href }}
                            >
                                Go to Link
                            </Button>
                        </GridItem>
                    </Box>
                </Flex>

            </Card>
        </Link>
    );
}

export default LinkListItem;