import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';

const ParticleBackground = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        const loadFull = (await import('tsparticles')).loadFull;
        await loadFull(engine);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore no problem in operation, although type error appears.
            transition={{ duration: 3 }}
        >
            <Box
                position="absolute"
                top={0}
                right={0}
                left={0}
                sx={{
                    '*': {
                        height: 'max(50vh, 30rem)',
                    },
                }}
            >
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                        pauseOnOutsideViewport: true,
                        fpsLimit: 120,
                        particles: {
                            color: {
                                value: '#ffffff',
                            },
                            move: {
                                direction: 'none',
                                enable: true,
                                random: true,
                                speed: 1,
                                straight: false,
                            },
                            number: {
                                value: 60,
                            },
                            shape: {
                                type: 'circle',
                            },
                            size: {
                                value: { min: 0, max: 2 },
                            },
                            opacity: {
                                value: { min: 0, max: 1 },
                            },
                        },
                        detectRetina: true,
                        fullScreen: {
                            enable: false,
                            zIndex: -1,
                        },
                    }}
                />
            </Box>
        </motion.div>
    );
};

export default ParticleBackground;
