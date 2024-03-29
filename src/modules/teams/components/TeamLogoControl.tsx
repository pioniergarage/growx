import FileSelect from '@/components/FileSelect';
import { HStack, IconButton, VStack } from '@chakra-ui/react';

import { useRemoveTeamLogo, useUploadTeamLogo } from 'modules/teams/hooks';
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';
import { Team } from '../types';
import TeamLogo from './TeamLogo';

export default function TeamLogoControl({ team }: { team: Team }) {
    const { uploadTeamLogo, isLoading: uploading } = useUploadTeamLogo();
    const { removeTeamLogo, isLoading: removing } = useRemoveTeamLogo();

    async function handleLogoUpload(files: FileList | null) {
        if (!files || files.length === 0) {
            throw new Error('You must select an image to upload.');
        }
        await uploadTeamLogo({ team, file: files[0] });
    }

    async function handleLogoRemove() {
        await removeTeamLogo({ team });
    }

    return (
        <VStack>
            <TeamLogo
                logo={team.logo}
                loading={uploading}
                size={{ base: 16, sm: 24 }}
            />
            <HStack alignSelf="start">
                <FileSelect onSelect={handleLogoUpload}>
                    <IconButton
                        size={{ base: 'xs', md: 'sm' }}
                        aria-label="upload logo"
                        isLoading={uploading}
                        variant="outline"
                        icon={<FaCloudUploadAlt />}
                    />
                </FileSelect>
                <IconButton
                    aria-label="delete logo"
                    onClick={handleLogoRemove}
                    isLoading={removing}
                    size={{ base: 'xs', md: 'sm' }}
                    variant="outline"
                    icon={<FaTrash />}
                />
            </HStack>
        </VStack>
    );
}
