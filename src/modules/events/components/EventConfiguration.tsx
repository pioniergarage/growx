import { Box, Button, Flex } from '@chakra-ui/react';

import EventForm from 'modules/events/components/EventForm';
import { GrowEvent, GrowEventWithSeats } from 'modules/events/types';
import { useState } from 'react';
import GrowEventCard from './GrowEventCard';

type EventConfigurationProps = {
    initialEvent: GrowEventWithSeats;
    isLoading: boolean;

    onSave: (event: GrowEvent) => void;
    onDelete: () => void;
};

const EventConfiguration: React.FC<EventConfigurationProps> = ({
    initialEvent,
    onDelete,
    onSave,
    isLoading,
}) => {
    const [isEditing, setEditing] = useState(false);
    const [event, setEvent] = useState(initialEvent);

    return (
        <>
            <Flex justifyContent="space-between">
                <Box maxW="xl">
                    <GrowEventCard event={event} />
                </Box>
                <Button onClick={() => setEditing(true)} isDisabled={isEditing}>
                    Edit
                </Button>
            </Flex>
            {isEditing && (
                <EventForm
                    onSubmit={(e) => {
                        setEditing(false);
                        onSave(e);
                    }}
                    onChange={(updated) =>
                        setEvent({
                            ...event,
                            ...updated,
                            id: initialEvent.id,
                        })
                    }
                    initialValue={initialEvent}
                    onDelete={onDelete}
                    onCancel={() => {
                        setEditing(false);
                        setEvent(initialEvent);
                    }}
                    isLoading={isLoading}
                />
            )}
        </>
    );
};

export default EventConfiguration;
